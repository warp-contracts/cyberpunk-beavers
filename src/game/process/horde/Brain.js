import { getChebyshevDistance, getSnakeDistance } from './Horde.js';
import { calculateDamage, respawnPlayer } from '../cmd/attack.mjs';
import Const from '../../common/const.mjs';
import { AStar } from './AStar.js';
import { GameObject } from '../../common/gameObject.mjs';

// how much of the generated path monsters 'remember' before
// recalculating the path again
const MAX_PATH_LENGTH = 6;

export class Brain {
  constructor(horde, monster) {
    this._monster = monster;
    this._state = horde.state;
    this._alivePlayers = horde.alivePlayers();
    this._pathFinder = new AStar(this._state.obstaclesTilemap, this._state.playersOnTiles, this._state.monstersOnTiles);
    this._monsters = horde; // this one sucks hard (required for verifyLandmines)
  }

  /**
   * current logic:
   * 1. if already was attacking any player (monster.attackedPlayerId)
   *  - if that player is still within attack range and is alive - continue attack
   *  - else - generate the shortest path to the monster.attackedPlayerId and move
   * 2. else if was attacked by any player (monster.attackingPlayerId)
   *  - if that player is within attack range and is alive - fight back
   *  - else
   *    - else - generate the shortest path to the monster.attackingPlayerId
   * 3. else - find nearest player with the lowest HP - if in range - attack,
   *    -  else - generate the shortest path (A*) and move
   */
  generateNewMove() {
    const monster = this._monster;
    let targetPlayer = null;
    // console.log(` ==== ${monster.walletAddress} =====`);

    /**
     * if monster is both already attacking some player and at the same time is being
     * attacked by another player AND the monster is aggressive enough
     * - it will switch to the player that is attacking him
     * UNLESS - the monster is attacking a digging player - in such
     * case he is focusing on him
     */
    if (this._isAlreadyAttackingPlayer() && !this._isAttackingDigger() && this._isBeingAttackedByOtherPlayer()) {
      const chanceToFightBack = Math.random(++this._state.randomCounter);
      if (
        chanceToFightBack <= monster.stats.aggressiveness &&
        this._isPlayerWithIdAlive(monster.attackingPlayerId) &&
        this._isPlayerInAttackRange(monster.attackingPlayerId)
      ) {
        targetPlayer = this._state.players[monster.attackingPlayerId];
        monster.attackedPlayerId = null;
      }
    }

    if (!targetPlayer) {
      if (this._isAlreadyAttackingPlayer()) {
        if (this._isPlayerWithIdAlive(monster.attackedPlayerId)) {
          targetPlayer = this._state.players[monster.attackedPlayerId];
          if (!this._isAttackingDigger() && this._anyActiveDiggers()) {
            const chanceToSwitchToDigger = Math.random(++this._state.randomCounter);
            if (chanceToSwitchToDigger <= monster.stats.aggressiveness) {
              targetPlayer = null;
              monster.attackedPlayerId = null;
            }
          }
        } else {
          monster.attackedPlayerId = null;
        }
      } else if (this._isBeingAttackedByOtherPlayer()) {
        if (this._isPlayerWithIdAlive(monster.attackingPlayerId)) {
          targetPlayer = this._state.players[monster.attackingPlayerId];
        } else {
          monster.attackingPlayerId = null;
        }
      }
    }

    targetPlayer = targetPlayer ? this._withDistanceFromMonster(targetPlayer) : this._findPlayerToAttack(monster);
    monster.attackedPlayerId = targetPlayer.player.walletAddress;
    monster.isAttackingDigger = this._state.diggers.includes(targetPlayer.player.walletAddress);

    const result = [];

    if (
      this._state.activated &&
      this._isPlayerInAttackRange(targetPlayer) &&
      this._isPlayerWithIdAlive(monster.attackedPlayerId)
    ) {
      // console.log(`Monster ${monster.walletAddress} is attacking player ${targetPlayer.player.walletAddress}`);
      return result.concat(this._attackPlayer(targetPlayer.player));
    } else {
      // console.log(`Monster ${monster.walletAddress} is moving to player ${targetPlayer.player.walletAddress}`);
      if (!monster.currentPath?.length) {
        const path = this._findShortestPath(targetPlayer.player);
        if (!path || path.length === 1) {
          console.log(`Monster ${monster.walletAddress}: I don\'t know what to do with my life :(`);
          // TODO: commit suicide?
          return result;
        }
        // remove the first element, as it is the current monster position (i.e. starting point)
        path.shift();
        if (path.length > MAX_PATH_LENGTH) {
          path.splice(MAX_PATH_LENGTH);
        }
        this._monster.currentPath = path;
      }
      return result.concat(this._move());
    }
  }

  _move() {
    const self = this;
    const nextStep = this._monster.currentPath.shift();
    this._state.monstersOnTiles[this._monster.pos.y][this._monster.pos.x] = null;
    this._monster.pos = {
      x: nextStep.col,
      y: nextStep.row,
    };
    // console.log(`New monster ${this._monster.walletAddress} position`, this._monster.pos);
    this._state.monstersOnTiles[nextStep.row][nextStep.col] = this._monster.walletAddress;
    const encounter = verifyLandmine(this._monster);

    return {
      target: {
        type: 'monsters',
        id: this._monster.walletAddress,
      },
      action: {
        type: 'move',
        data: {
          newPosition: this._monster.pos,
          encounter,
        },
      },
    };

    function verifyLandmine(monster) {
      const hiddenObject = self._state.gameHiddenObjects[monster.pos.y][monster.pos.x];
      let encounter = null;
      if (hiddenObject?.type === GameObject.active_mine.type) {
        self._state.gameHiddenObjects[monster.pos.y][monster.pos.x] = null;
        self._monsters.playerAttack = {
          dmg: { finalDmg: GameObject.active_mine.damage },
          player: self._state.players[hiddenObject.owner],
          monster,
        };
        encounter = {
          pos: monster.pos,
          owner: hiddenObject.owner,
          type: GameObject.active_mine.type,
        };
      }
      return encounter;
    }
  }

  _attackPlayer(player) {
    const distance = getChebyshevDistance(this._monster.pos.x, this._monster.pos.y, player.pos.x, player.pos.y);

    const { finalDmg } = calculateDamage(this._monster, player, { range: distance - 1 }, this._state);
    // console.log('Damage', finalDmg);
    const result = [
      {
        target: {
          type: 'monsters',
          id: this._monster.walletAddress,
        },
        action: {
          type: 'attacking',
          data: {
            dir: player.pos.x < this._monster.pos.x ? 'left' : 'right',
          },
        },
      },
    ];

    let actionType = 'attacked';
    if (finalDmg > 0) {
      player.stats.hp.current -= finalDmg;

      if (player.stats.hp.current <= 0) {
        player.stats.hp.current = 0;
        if (this._state.diggers.includes(player.walletAddress)) {
          this._state.diggers.splice(this._state.diggers.indexOf(player.walletAddress), 1);
        }
        if (player.stats.lives.current > 0) {
          player.stats.lives.current--;
          respawnPlayer(player, this._state);
          actionType = 'respawned';
        } else {
          player.stats.kills.deaths++;
          actionType = 'killed';
        }
      }

      result.push({
        target: {
          type: 'players',
          id: player.walletAddress,
        },
        scores: [{ value: -finalDmg, type: Const.Scores.hp }],
        action: {
          type: actionType,
          data: {
            attackingPlayer: player.walletAddress,
            attackingMonsterType: this._monster.stats.type,
            hp: player.stats.hp.current,
            pos: player.pos,
            lives: player.stats.lives.current,
          },
        },
      });
    }

    return result;
  }

  _findShortestPath(targetPlayer) {
    return this._pathFinder.findPath(
      { col: this._monster.pos.x, row: this._monster.pos.y },
      { col: targetPlayer.pos.x, row: targetPlayer.pos.y },
      targetPlayer.walletAddress
    );
  }

  _isAlreadyAttackingPlayer() {
    return this._monster.attackedPlayerId !== null;
  }

  _isAttackingDigger() {
    return this._monster.isAttackingDigger;
  }

  _isPlayerWithIdAlive(walletAddress) {
    return this._state.players[walletAddress].stats.hp.current > 0;
  }

  _isBeingAttackedByOtherPlayer() {
    return this._monster.attackingPlayerId !== null;
  }

  _withDistanceFromMonster(player) {
    return {
      player,
      distance: getSnakeDistance(this._monster.pos.x, this._monster.pos.y, player.pos.x, player.pos.y),
    };
  }

  _findPlayerToAttack() {
    const monster = this._monster;
    const self = this;
    return this._alivePlayers
      .map((player) => this._withDistanceFromMonster(player))
      .sort(byBiggestChanceToKill)
      .shift();

    /**
     * find nearest digger first - if any
     * otherwise:
     * if either of the players is in range - return that player
     * if both players are in range - return the one that will have less hp after attack
     * - that's an approximation (as no dmg multipliers, critical hits, etc. are taken into account - only base dmg)
     * if none of the players is in range - return the one that is closer to monster.
     */
    function byBiggestChanceToKill(p1, p2) {
      const player1Hp = p1.player.stats.hp.current;
      const player2Hp = p2.player.stats.hp.current;

      const player1Dmg = self._isPlayerInAttackRange(p1) ? monster.stats.weapon.damage[p1.distance] : 0;
      const player2Dmg = self._isPlayerInAttackRange(p2) ? monster.stats.weapon.damage[p2.distance] : 0;

      const player1IsDigger = self._state.diggers.includes(p1.player.walletAddress);
      const player2IsDigger = self._state.diggers.includes(p2.player.walletAddress);

      if (player1IsDigger && player2IsDigger) {
        return p1.distance - p2.distance;
      }

      if (player1IsDigger) {
        return -1;
      }

      if (player2IsDigger) {
        return 1;
      }

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

  _anyActiveDiggers() {
    return this._state.diggers.length;
  }

  _isPlayerInAttackRange(playerWithDistance) {
    const attackRange = this._monster.stats.weapon.attack_range;
    const monsterPosition = this._monster.pos;
    const playerPosition = playerWithDistance.player.pos;

    const distance = getChebyshevDistance(monsterPosition.x, monsterPosition.y, playerPosition.x, playerPosition.y);
    /*console.log({
      attackRange,
      monsterPosition,
      playerPosition,
      distance,
    });*/

    return distance <= attackRange;
  }
}
