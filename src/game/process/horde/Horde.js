import { calculatePlayerRandomPos } from '../cmd/registerPlayer.mjs';
import Const, { AP_COSTS, GAME_MODES } from '../../common/const.mjs';
import { calculateLootBonus } from '../cmd/attack.mjs';
import { addCoins } from '../../common/tools.mjs';
import { HORDE_GAME_STATUS, MONSTER_TYPES, MONSTERS_HIERARCHY } from '../../common/hordeConst.mjs';
import { ClientUpdates } from './ClientUpdates.js';
import { Brain } from './Brain.js';

const MAX_MONSTERS_PER_WAVE = 10;
// remember to update MONSTERS_FOR_WAVE_PROBS if changing this value
const WAVES_NUMBER = 6;
const WAVE_ROUNDS_LIMIT = 100;

// the amount of rounds before a next monsters wave is generated
const WAVE_INTERVAL_ROUNDS = 2;

/**
 * e.g. first wave [0.25, 0.5, 0.7, 0.8, 0.95],
 * - private 0.25 chance, sergeant 0.25 chance, lieutenant 0.2 chance, etc...
 * TODO: generate?
 */
const MONSTERS_FOR_WAVE_PROBABILITIES = [
  [0.3, 0.6, 0.9, 2, 3],
  [0.2, 0.4, 0.8, 0.9, 1],
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
export function getChebyshevDistance(x1, y1, x2, y2) {
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

export class Horde {
  constructor(state) {
    this.state = state;
    this.playerAttack = null;
    // an object that is supposed to be sent back to clients - and clients should
    // update their state only based on these values
    this.clientUpdates = new ClientUpdates(state);
  }

  /**
   * This function is supposed to be called AFTER player's action has been processed
   * or periodically - either by the MU or the clients
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
      if (!this.state.nextWaveGenerationRound) {
        this._scheduleNextWave(this.state.round.current + 2);
      } else if (this._isNewWaveReady()) {
        this._generateWave(msgTimestamp);
        this.setWaveInfo();
      } else {
        this.clientUpdates.gameStatus = HORDE_GAME_STATUS.WAITING_FOR_WAVE;
      }
      return this.clientUpdates.updates;
    }

    this.setWaveInfo();

    if (this.playerAttack) {
      this.processPlayerAttack();
    }
    const shouldGenerateMoves = this._calculateGameEndConditions(msgTimestamp);
    if (shouldGenerateMoves) {
      this._moveMonsters(msgTimestamp);
    }

    return this.clientUpdates.updates;
  }

  registerAttack(attackInfo) {
    this.playerAttack = attackInfo;
  }

  alivePlayers() {
    return Object.values(this.state.players).filter((p) => p.stats.hp.current > 0);
  }

  // returns 1 if all monsters in the last wave are dead
  // otherwise returns waveIndex/WAVES_NUMBER rounded to 2 decimal places
  // - so beating only first wave returns 0
  progress() {
    if (this._isLastWave() && this._allMonstersDead()) {
      return 1;
    }
    return Math.floor(((this.state.currentWave?.index || 0) / WAVES_NUMBER) * 100) / 100;
  }

  _generateWave(msgTimestamp) {
    const state = this.state;
    const waveIndex = state.currentWave ? state.currentWave.index + 1 : 0;
    state.currentWave = null;
    state.nextWaveGenerationRound = null;
    console.log('Generating wave', waveIndex);

    const newWave = {
      index: waveIndex,
      // roundEnd is currently not used...
      roundEnd: state.round.current + WAVE_ROUNDS_LIMIT + waveIndex, // hmm...
      monsters: {},
    };

    const currentPlayers = Object.keys(state.players).length;
    const monstersMultiplier = this.progress() <= 0.5 ? 3 : 2;
    const monstersToGenerate = Math.min(currentPlayers * monstersMultiplier, MAX_MONSTERS_PER_WAVE);

    for (let i = 0; i < monstersToGenerate; i++) {
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
      newWave.monsters[`${monsterType}_${i}`] = newMonster;
      state.monstersOnTiles[newMonster.pos.y][newMonster.pos.x] = newMonster.walletAddress;
    }
    state.currentWave = newWave;
    this.clientUpdates.gameStatus = HORDE_GAME_STATUS.NEW_WAVE;
    this.clientUpdates.waveNumber = waveIndex + 1;
    this.clientUpdates.newWave = newWave;
    this.clientUpdates.isLastWave = this._isLastWave();

    console.log('Wave generated');

    return newWave;
  }

  _moveMonsters(msgTimestamp) {
    const self = this;
    const recoveredMonsters = getAliveRecoveredMonsters(msgTimestamp);
    for (let i = 0; i < recoveredMonsters.length; i++) {
      const recoveredMonster = recoveredMonsters[i];
      const brain = new Brain(this, recoveredMonster);
      self.clientUpdates.addMany(brain.generateNewMove());
      recoveredMonster.lastMoveTs = msgTimestamp;
      if (self._allPlayersDead()) {
        this.clientUpdates.gameStatus = HORDE_GAME_STATUS.LOOSE;
        return;
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
    return this.alivePlayers().length === 0;
  }

  _calculateGameEndConditions(msgTimestamp) {
    const self = this;

    if (this.state.nextWaveGenerationRound) {
      console.log({
        nextWaveGenerationRound: this.state.nextWaveGenerationRound,
        currentRound: this.state.round.current,
      });
      if (this._isNewWaveReady()) {
        this._generateWave(msgTimestamp);
        return false;
      } else {
        this.clientUpdates.gameStatus = HORDE_GAME_STATUS.WAITING_FOR_WAVE;
        return false;
      }
    }

    if (this._allPlayersDead()) {
      this.clientUpdates.gameStatus = HORDE_GAME_STATUS.LOOSE;
      return false;
    }

    if (this._allMonstersDead()) {
      if (this._isLastWave()) {
        this.clientUpdates.gameStatus = HORDE_GAME_STATUS.WIN;
        return false;
      } else {
        this._scheduleNextWave(this.state.round.current + WAVE_INTERVAL_ROUNDS);
        return false;
      }
    }

    this.clientUpdates.gameStatus = HORDE_GAME_STATUS.CONTINUE_WAVE;
    return true;
  }

  _allMonstersDead() {
    return this._aliveMonsters().length === 0;
  }

  _isLastWave() {
    return this.state.currentWave?.index === WAVES_NUMBER - 1;
  }

  _isNewWaveReady() {
    return this.state.round.current >= this.state.nextWaveGenerationRound;
  }

  _scheduleNextWave(round) {
    this.state.nextWaveGenerationRound = round;
    this.clientUpdates.gameStatus = HORDE_GAME_STATUS.WAITING_FOR_WAVE;
  }

  _aliveMonsters() {
    return Object.values(this.state.currentWave.monsters).filter((m) => m.stats.hp.current > 0);
  }

  processPlayerAttack() {
    const { dmg, player, monster } = this.playerAttack;
    this.playerAttack = null;
    monster.stats.hp.current -= dmg.finalDmg;
    if (monster.stats.hp.current < 0) {
      monster.stats.hp.current = 0;
      player.stats.kills.frags++;
      this.state.monstersOnTiles[monster.pos.y][monster.pos.x] = null;
    }
    monster.attackingPlayerId = player.walletAddress;
    const finished = monster.stats.hp === 0;
    const points = finished ? this._calculateKillPoints(monster, player) : this._calculateAttackPoints(monster, player);

    console.log(
      `Player ${player.walletAddress} is attacking monster ${monster.walletAddress} [-${dmg.finalDmg} HP: (${monster.stats.hp.current} HP)]`
    );
    // side-note: passing 'type' here is kinda dumb, since we're already passing the whole state...
    addCoins(player, GAME_MODES[this.state.mode].token, points, this.state);

    this.clientUpdates.addMany([
      {
        target: {
          type: 'monsters',
          id: monster.walletAddress,
        },
        scores: [{ value: -dmg.finalDmg, type: Const.Scores.hp }],
        action: {
          type: monster.stats.hp.current === 0 ? 'killed' : 'attacked',
          data: {
            attackingPlayer: player.walletAddress,
            attackingPlayerType: player.stats.name,
            hp: monster.stats.hp.current,
          },
        },
      },
      {
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
      },
    ]);
  }

  /**
   * TODO: each monster should have a random amount of "additionalTokens" to be looted after death
   * - the more, the higher is the monster's rank
   */
  _calculateKillPoints(monster, player) {
    return Math.floor(
      Const.Combat.DefaultLoot * monster.stats.points_multiplier + calculateLootBonus(player, this.state)
    );
  }

  /**
   * not sure how many points should be added after a successful attack...
   */
  _calculateAttackPoints(monster, player) {
    return Math.floor(Const.Combat.DefaultAttack * monster.stats.points_multiplier);
  }

  setWaveInfo() {
    this.clientUpdates.waveNumber = this.state.currentWave.index + 1;
    this.clientUpdates.aliveMonsters = this._aliveMonsters().length;
    this.clientUpdates.alivePlayers = this.alivePlayers().length;
  }
}
