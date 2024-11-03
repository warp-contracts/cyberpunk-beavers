import { calculatePlayerRandomPos } from '../cmd/registerPlayer.mjs';
import Const, { AP_COSTS, GAME_MODES, GameObject } from '../../common/const.mjs';
import { calculateDamage, calculateLootBonus } from '../cmd/attack.mjs';
import { addCoins } from '../../common/tools.mjs';
import { AStar } from './astar.js';
import { HORDE_GAME_STATUS, MONSTER_TYPES, MONSTERS_HIERARCHY } from '../../common/horde-const.mjs';

const MONSTERS_PER_WAVE = 2;
// remember to update MONSTERS_FOR_WAVE_PROBS if changing this value
const WAVES_NUMBER = 5;
const WAVE_ROUNDS_LIMIT = 100;
// how much of the generated path monsters 'remember' before
// recalculating the path again
const MAX_PATH_LENGTH = 6;

// the amount of rounds before a next monsters wave is generated
const WAVE_INTERVAL_ROUNDS = 2;

/**
 * e.g. first wave [0.25, 0.5, 0.7, 0.8, 0.95],
 * - private 0.25 chance, sergeant 0.25 chance, lieutenant 0.2 chance, etc...
 * TODO: generate?
 */
const MONSTERS_FOR_WAVE_PROBABILITIES = [
  [0.3, 0.6, 0.9, 2, 3],
  [0.15, 0.3, 0.7, 0.8, 0.9],
  [0.1, 0.2, 0.4, 0.65, 0.8],
  [0.0, 0.0, 0.3, 0.6, 0.7],
  [0.0, 0.0, 0.0, 0.3, 0.5],
];

// note: cannot use Map here! - "QuickJSUseAfterFree: Lifetime not alive"
const ChebyshevDistanceCache = {};
const SnakeDistanceCache = {};

// https://www.datacamp.com/tutorial/chebyshev-distance
// - for calculating weapon attack range
function getChebyshevDistance(x1, y1, x2, y2) {
  function ChebyshevDistance(x1, y1, x2, y2) {
    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
  }

  return getDistance({ x1, y1, x2, y2 }, ChebyshevDistance, ChebyshevDistanceCache);
}

// a.k.a. Manhattan distance https://www.datacamp.com/tutorial/manhattan-distance
// - heuristic used for calculating distance between player and monster
// (same is used in A* pathfinding)
export function getSnakeDistance(x1, y1, x2, y2) {
  function SnakeDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  return getDistance({ x1, y1, x2, y2 }, SnakeDistance, SnakeDistanceCache);
}

function getDistance({ x1, y1, x2, y2 }, distanceCalcFunction, cache) {
  const key = `${x1}:${y1}:${x2}:${y2}`;

  if (!cache.hasOwnProperty(key)) {
    const distance = distanceCalcFunction(x1, y1, x2, y2);
    const reverseDirectionKey = `${x2}:${y2}:${x1}:${y1}`;
    cache[key] = distance;
    cache[reverseDirectionKey] = distance;
  }

  return cache[key];
}

export class Monsters {
  constructor(state, msgTimestamp, devMode = true) {
    this.state = state;
    this.playerAttack = null;

    // an object that is supposed to be sent back to clients - and clients should
    // update their state only based on these values
    this.clientUpdates = {
      players: {},
      monsters: {},
      game: {},
    };

    this.pathFinder = new AStar(state.obstaclesTilemap, state.playersOnTiles, state.monstersOnTiles);
  }

  /**
   * This function is supposed to be called AFTER player's action has been processed
   * or periodically - by the CU itself.
   * Order of processing:
   * 1. generate wave if not yet generated
   * 2. process attack from player (if any)
   * 3. verify game win condition
   * 4. verify new wave condition
   * 5. verify game end condition
   * 6. move all the monsters (and verify land mines) - if wave or game is not over
   */
  tick(msgTimestamp) {
    if (!this.state.currentWave) {
      this._generateWave(0, msgTimestamp);
      return;
    }

    this.setWaveInfo();

    if (this.playerAttack) {
      this._processPlayerAttack();
    }
    const shouldGenerateMoves = this._calculateGameEndConditions(msgTimestamp);
    if (shouldGenerateMoves) {
      this._moveMonsters(msgTimestamp);
    }

    return this.clientUpdates;
  }

  registerAttack(attackInfo) {
    this.playerAttack = attackInfo;
  }

  _generateWave(waveIndex, msgTimestamp) {
    console.log('Generating wave', waveIndex);
    const state = this.state;
    state.currentWave = null;
    const nouvelleVague = {
      index: waveIndex,
      roundEnd: state.round.current + WAVE_ROUNDS_LIMIT + waveIndex, // hmm...
      monsters: {},
    };

    for (let i = 0; i < MONSTERS_PER_WAVE; i++) {
      const randomValue = Math.random(++state.randomCounter);
      let monsterIdx = MONSTERS_FOR_WAVE_PROBABILITIES[waveIndex].findIndex((e) => randomValue <= e);
      if (monsterIdx === -1) {
        monsterIdx = MONSTERS_HIERARCHY.length - 1;
      }
      const monsterType = MONSTERS_HIERARCHY[monsterIdx];
      console.log({
        randomValue,
        monsterIdx,
        monsterType,
      });
      const newMonster = {
        walletAddress: `${monsterType}_${i}`,
        type: monsterType,
        stats: {
          ...MONSTER_TYPES[monsterType],
        },
        attackedPlayerId: null, // i.e. their wallet address
        attackingPlayerId: null, // i.e. their wallet address
        lastMoveTs: msgTimestamp,
        pos: calculatePlayerRandomPos(state),
        activeBoosts: {},
      };
      console.log(JSON.stringify(newMonster));
      nouvelleVague.monsters[`${monsterType}_${i}`] = newMonster;
      state.monstersOnTiles[newMonster.pos.y][newMonster.pos.x] = newMonster.walletAddress;
    }
    state.currentWave = nouvelleVague;
    this.clientUpdates.game.status = HORDE_GAME_STATUS.NEW_WAVE;
    this.clientUpdates.game.waveNumber = waveIndex + 1;
    this.clientUpdates.game.newWave = nouvelleVague;

    console.log('Wave generated');

    return nouvelleVague;
  }

  _moveMonsters(msgTimestamp) {
    const self = this;
    const recoveredMonsters = getAliveRecoveredMonsters(msgTimestamp);
    for (let i = 0; i < recoveredMonsters.length; i++) {
      generateNewMove(recoveredMonsters[i]);
      recoveredMonsters[i].lastMoveTs = msgTimestamp;
      if (self._allPlayersDead()) {
        this.clientUpdates.game.status = HORDE_GAME_STATUS.LOOSE;
        return;
      }
    }

    /**
     * current logic:
     * 1. if already was attacking any player (monster.attackedPlayerId)
     *  - if that player is still within attack range - continue attack
     *  - else - generate the shortest path to the monster.attackedPlayerId and move
     * 2. else if was attacked by any player (monster.attackingPlayerId)
     *  - if that player is within attack range - fight back
     *  - else
     *    - find nearest player with the lowest HP - if in range - attack
     *    - else generate the shortest path to the monster.attackingPlayerId
     * 3. else - find nearest player with the lowest HP - if in range - attack, else - generate the shortest path (A*) and move
     */
    function generateNewMove(monster) {
      let targetPlayer = null;
      console.log(` ==== ${monster.walletAddress} =====`);

      if (isAlreadyAttackingPlayer(monster)) {
        if (isPlayerWithIdAlive(monster.attackedPlayerId)) {
          targetPlayer = self.state.players[monster.attackedPlayerId];
        } else {
          monster.attackedPlayerId = null;
        }
      } else if (isBeingAttackedByOtherPlayer(monster)) {
        if (isPlayerWithIdAlive(monster.attackingPlayerId)) {
          targetPlayer = self.state.players[monster.attackingPlayerId];
        } else {
          monster.attackingPlayerId = null;
        }
      }

      targetPlayer = targetPlayer ? withDistanceFromMonster(targetPlayer, monster) : findPlayerToAttack(monster);
      monster.attackedPlayerId = targetPlayer.player.walletAddress;

      if (self.state.activated && isPlayerInAttackRange(monster, targetPlayer)) {
        console.log(`Monster ${monster.walletAddress} is attacking player ${targetPlayer.player.walletAddress}`);
        attackPlayer(monster, targetPlayer.player);
      } else {
        console.log(`Monster ${monster.walletAddress} is moving to player ${targetPlayer.player.walletAddress}`);
        if (!monster.currentPath?.length) {
          const path = findShortestPath(monster, targetPlayer.player);
          if (!path || path.length === 1) {
            console.error(`Monster ${monster.walletAddress}: I don\'t know what to do with my life :(`);
            // TODO: commit suicide?
            return;
          }
          path.shift(); // remove the first element, as it is the current position
          if (path.length > MAX_PATH_LENGTH) {
            path.splice(MAX_PATH_LENGTH);
          }
          monster.currentPath = path;
        } else {
          move(monster, monster.currentPath.shift());
        }
      }
    }

    function move(monster, nextStep) {
      self.state.monstersOnTiles[monster.pos.y][monster.pos.x] = null;
      monster.pos = {
        x: nextStep.col,
        y: nextStep.row,
      };
      console.log(`New monster ${monster.walletAddress} position`, monster.pos);
      self.state.monstersOnTiles[nextStep.row][nextStep.col] = monster.walletAddress;
      const encounter = verifyLandmine(monster);

      self._addClientUpdate({
        target: {
          type: 'monsters',
          id: monster.walletAddress,
        },
        action: {
          type: 'move',
          data: {
            newPosition: monster.pos,
            encounter,
          },
        },
      });

      function verifyLandmine(monster) {
        const hiddenObject = self.state.gameHiddenObjects[monster.pos.y][monster.pos.x];
        let encounter = null;
        if (hiddenObject?.type === GameObject.active_mine.type) {
          self.state.gameHiddenObjects[monster.pos.y][monster.pos.x] = null;
          self.playerAttack = {
            dmg: { finalDmg: Const.GameObject.active_mine.damage },
            player: self.state.players[hiddenObject.owner],
            monster,
          };
          encounter = {
            pos: monster.pos,
            owner: hiddenObject.owner,
            type: GameObject.active_mine.type,
          };
          self._processPlayerAttack();
        }
        return encounter;
      }
    }

    function findShortestPath(monster, targetPlayer) {
      return self.pathFinder.findPath(
        { col: monster.pos.x, row: monster.pos.y },
        { col: targetPlayer.pos.x, row: targetPlayer.pos.y }
      );
    }

    function withDistanceFromMonster(player, monster) {
      return {
        player,
        distance: getSnakeDistance(monster.pos.x, monster.pos.y, player.pos.x, player.pos.y),
      };
    }

    function findPlayerToAttack(monster) {
      const alivePlayers = self._alivePlayers();

      return alivePlayers
        .map((player) => withDistanceFromMonster(player, monster))
        .sort(byBiggestChanceToKill)
        .shift();

      /**
       * if either of the players is in range - return that player
       * if both players are in range - return the one that will have less hp after attack
       * - that's an approximation (as no dmg multipliers, critical hits, etc. are taken into account - only base dmg)
       * if none of the players is in range - return the one that is closer to monster.
       */
      function byBiggestChanceToKill(p1, p2) {
        const player1Hp = p1.player.stats.hp.current;
        const player2Hp = p2.player.stats.hp.current;

        const player1Dmg = isPlayerInAttackRange(monster, p1) ? monster.stats.weapon.damage[p1.distance] : 0;
        const player2Dmg = isPlayerInAttackRange(monster, p2) ? monster.stats.weapon.damage[p2.distance] : 0;

        if (player1Dmg > 0 && player2Dmg === 0) {
          return -1;
        }
        if (player2Dmg > 0 && player1Dmg === 0) {
          return 1;
        }
        if (player1Dmg > 0 && player2Dmg > 0) {
          return player1Hp - player1Dmg - (player2Hp - player2Dmg);
        }

        return p1.distance - p2.distance;
      }
    }

    function isPlayerWithIdAlive(walletAddress) {
      return self.state.players[walletAddress].stats.hp.current > 0;
    }

    function isBeingAttackedByOtherPlayer(monster) {
      return monster.attackingPlayerId !== null;
    }

    function isPlayerInAttackRange(monster, playerWithDistance) {
      const attackRange = monster.stats.weapon.attack_range;
      const monsterPosition = monster.pos;
      const playerPosition = playerWithDistance.player.pos;

      const distance = getChebyshevDistance(monsterPosition.x, monsterPosition.y, playerPosition.x, playerPosition.y);
      console.log({
        attackRange,
        monsterPosition,
        playerPosition,
        distance,
      });

      return distance <= attackRange;
    }

    function isAlreadyAttackingPlayer(monster) {
      return monster.attackedPlayerId !== null;
    }

    function attackPlayer(monster, player) {
      const distance = getChebyshevDistance(monster.pos.x, monster.pos.y, player.pos.x, player.pos.y);

      const { finalDmg } = calculateDamage(monster, { range: distance - 1 }, self.state);
      console.log('Damage', finalDmg);
      if (finalDmg > 0) {
        player.stats.hp.current -= finalDmg;

        if (player.stats.hp.current < 0) {
          player.stats.hp.current = 0;
        }
        console.log('Player HP:', player.stats.hp.current);
        self._addClientUpdate({
          target: {
            type: 'players',
            id: player.walletAddress,
          },
          scores: [{ value: -finalDmg, type: Const.Scores.hp }],
          action: {
            type: player.stats.hp.current === 0 ? 'killed' : 'attacked',
            data: {
              attackingMonsterType: monster.stats.type,
              hp: player.stats.hp.current,
            },
          },
        });
        self._addClientUpdate({
          target: {
            type: 'monsters',
            id: monster.walletAddress,
          },
          action: {
            type: 'attacking',
            data: {
              dir: player.pos.x < monster.pos.x ? 'left' : 'right',
            },
          },
        });
      }
    }

    function getAliveRecoveredMonsters(msgTimestamp) {
      function hasRecoveredFromPreviousMove(monster) {
        return monster.stats.hp.current > 0 && msgTimestamp - monster.lastMoveTs > monster.stats.move_recovery_ms;
      }

      return Object.values(self.state.currentWave.monsters).filter(hasRecoveredFromPreviousMove);
    }
  }

  _allPlayersDead() {
    return this._alivePlayers().length === 0;
  }

  _calculateGameEndConditions(msgTimestamp) {
    const self = this;
    if (this.state.currentWave.nextWaveGenerationRound) {
      console.log({
        nextWaveGenerationRound: this.state.currentWave.nextWaveGenerationRound,
        currentRound: this.state.round.current,
      });
      if (this.state.round.current >= this.state.currentWave.nextWaveGenerationRound) {
        this._generateWave(++this.state.currentWave.index, msgTimestamp);
        return false;
      } else {
        this.clientUpdates.game.status = HORDE_GAME_STATUS.WAITING_FOR_WAVE;
        return false;
      }
    }

    if (self._allPlayersDead()) {
      this.clientUpdates.game.status = HORDE_GAME_STATUS.LOOSE;
      return false;
    }

    if (allMonstersDead()) {
      if (isLastWave()) {
        this.clientUpdates.game.status = HORDE_GAME_STATUS.WIN;
        return false;
      } else {
        this.state.currentWave.nextWaveGenerationRound = this.state.round.current + WAVE_INTERVAL_ROUNDS;
        this.clientUpdates.game.status = HORDE_GAME_STATUS.WAITING_FOR_WAVE;
        return false;
      }
    }

    /*if (isWaveFinished()) {
      // we've already checked whether all monsters have been killed
      // - so at this point the game is lost...
      this.clientUpdates.game.status = HORDE_GAME_STATUS.LOOSE;
      return false;
    }*/

    this.clientUpdates.game.status = HORDE_GAME_STATUS.CONTINUE_WAVE;
    return true;

    function isWaveFinished() {
      return self.state.round.current > self.state.currentWave.roundEnd;
    }

    function allMonstersDead() {
      return self._aliveMonsters().length === 0;
    }

    function isLastWave() {
      return self.state.currentWave.index === WAVES_NUMBER - 1;
    }
  }

  _aliveMonsters() {
    return Object.values(this.state.currentWave.monsters).filter((m) => m.stats.hp.current > 0);
  }

  _alivePlayers() {
    return Object.values(this.state.players).filter((p) => p.stats.hp.current > 0);
  }

  _processPlayerAttack() {
    const { dmg, player, monster } = this.playerAttack;
    this.playerAttack = null;
    monster.stats.hp.current -= dmg.finalDmg;
    if (monster.stats.hp.current < 0) {
      monster.stats.hp.current = 0;
    }
    monster.attackingPlayerId = player.walletAddress;
    const finished = monster.stats.hp === 0;
    const points = finished ? this._calculateKillPoints(monster, player) : this._calculateAttackPoints(monster, player);

    console.log(
      `Player ${player.walletAddress} is attacking monster ${monster.walletAddress} [-${dmg.finalDmg} HP: (${monster.stats.hp.current} HP)]`
    );
    // side-note: passing 'type' here is kinda dumb, since we're already passing the whole state...
    addCoins(player, GAME_MODES[this.state.mode].token, points, this.state);

    this._addClientUpdate({
      target: {
        type: 'monsters',
        id: monster.walletAddress,
      },
      scores: [{ value: -dmg.finalDmg, type: Const.Scores.hp }],
      action: {
        type: monster.stats.hp.current === 0 ? 'killed' : 'attacked',
        data: {
          attackingPlayerType: player.stats.name,
          hp: monster.stats.hp.current,
        },
      },
    });
    this._addClientUpdate({
      target: {
        type: 'players',
        id: player.walletAddress,
      },
      action: {
        type: 'attacking',
        data: {
          ap: player.stats.ap.current,
          coins: player.stats.coins,
        },
      },
      scores: [
        { value: points, type: Const.Scores.coin },
        { value: -AP_COSTS.attack, type: Const.Scores.ap },
      ],
    });
  }

  _addClientUpdate({ target, scores, stats, action }) {
    if (!this.clientUpdates[target.type][target.id]) {
      this.clientUpdates[target.type][target.id] = {
        scores: [],
        actions: [],
        fullObject: null,
      };
    }
    if (scores?.length) {
      this.clientUpdates[target.type][target.id].scores.push(...scores);
    }
    if (stats) {
      this.clientUpdates[target.type][target.id].stats = stats;
    }
    if (action) {
      this.clientUpdates[target.type][target.id].actions.push(action);
    }
    if (target.type === 'monsters') {
      this.clientUpdates[target.type][target.id].fullObject = this.state.currentWave.monsters[target.id];
    }
  }

  /**
   * TODO: each monster should have a random amount of "additionalTokens" to be looted after death
   * - the more, the higher is the monster's rank
   */
  _calculateKillPoints(monster, player) {
    return Const.Combat.DefaultLoot * monster.stats.points_multiplier + calculateLootBonus(player, this.state);
  }

  /**
   * not sure how many points should be added after a successful attack...
   */
  _calculateAttackPoints(monster, player) {
    return Const.Combat.DefaultAttack * monster.stats.points_multiplier;
  }

  setWaveInfo() {
    this.clientUpdates.game.waveNumber = this.state.currentWave.index + 1;
    this.clientUpdates.game.aliveMonsters = this._aliveMonsters().length;
    this.clientUpdates.game.alivePlayers = this._alivePlayers().length;
  }
}
