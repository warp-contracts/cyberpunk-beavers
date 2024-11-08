import { GameObject } from '../../common/const.mjs';
import MonsterObject, { MONSTER_TO_BEAVER } from '../../objects/MonsterObject.js';
import { scoreToDisplay } from '../../common/tools.mjs';
import { doPlayAttackSound } from './sounds.js';
import { HORDE_GAME_STATUS } from '../../common/horde-const.mjs';

export class HordeManager {
  constructor(scene) {
    this.scene = scene;
    this.monsters = {};
    this.prepareNextWavePlayed = false;
  }

  processUpdate(response) {
    const { players, monsters, game } = response.hordeTick;
    const { gameStats } = response;
    //console.log('========= HORDE TICK BEGIN ==========');
    console.log({ players, monsters, game });
    this.updateMonsters(monsters);
    this.updatePlayers(players, gameStats);
    this.scene.hordeWaveNumber = game.waveNumber;
    this.scene.hordeAliveMonsters = game.aliveMonsters;
    this.scene.hordeAlivePlayers = game.alivePlayers;

    switch (game.status) {
      case HORDE_GAME_STATUS.NEW_WAVE: {
        this.processNewWave(game.newWave);
        this.prepareNextWavePlayed = false;
        this.scene.waitingForNewWave = false;
        if (game.isLastWave) {
          this.scene.bringItOn.play();
        } else {
          this.scene.newWave.play();
        }
        break;
      }
      case HORDE_GAME_STATUS.WAITING_FOR_WAVE: {
        this.scene.waitingForNewWave = true;
        if (!this.prepareNextWavePlayed) {
          this.scene.prepareNextWave.play();
          this.prepareNextWavePlayed = true;
        }
        break;
      }
      case HORDE_GAME_STATUS.CONTINUE_WAVE: {
        this.prepareNextWavePlayed = false;
        this.scene.waitingForNewWave = false;
        break;
      }
      case HORDE_GAME_STATUS.LOOSE:
      case HORDE_GAME_STATUS.WIN: {
        this.prepareNextWavePlayed = false;
        this.scene.endGame(game.status);
        break;
      }
      default:
        throw new Error(`Unknown game status ${game.status}`);
    }
    //console.log('========= HORDE TICK END   ==========');
  }

  processNewWave(newWave) {
    console.log('Processing new wave!');
    const self = this;
    Object.values(this.monsters).forEach((monster) => monster.destroy());
    this.monsters = {};
    Object.values(newWave.monsters).forEach((monster) => {
      this.monsters[monster.walletAddress] = new MonsterObject({ monster, scene: self.scene });
    });
  }

  updateMonsters(monstersUpdates) {
    const self = this;
    for (const monsterId of Object.keys(monstersUpdates)) {
      const monsterUpdates = monstersUpdates[monsterId];
      if (!self.monsters[monsterId]) {
        self.monsters[monsterId] = new MonsterObject({
          monster: monsterUpdates.fullObject,
          scene: self.scene,
        });
      }
      const monsterObject = self.monsters[monsterId];
      const actions = monsterUpdates.actions;
      for (const action of actions) {
        switch (action.type) {
          case 'move': {
            const { encounter, newPosition } = action.data;
            if (action.data.encounter?.type === GameObject.active_mine.type) {
              if (encounter.owner === self.scene.mainPlayer.walletAddress) {
                self.scene.clearLandmine(newPosition);
              }
              monsterObject.moveTo(newPosition, true);
            }
            monsterObject.moveTo(newPosition);
            break;
          }
          case 'attacking': {
            monsterObject.scaleX = action.data.dir === 'left' ? -1 : 1;
            monsterObject.attackAnim();
            doPlayAttackSound(MONSTER_TO_BEAVER[monsterObject.stats.type], self.scene);
            break;
          }
          case 'attacked': {
            monsterObject.bloodSplatAnim(true);
            monsterObject.stats.hp.current = action.data.hp;
            monsterObject.updateStats(monsterObject.stats);
            break;
          }
          case 'landmine': {
            monsterObject.bloodSplatAnim(true);
            break;
          }
          case 'killed': {
            monsterObject.stats.hp.current = 0;
            monsterObject.kill();
            monsterObject.deathAnim(action.data.attackingPlayerType, true);
            break;
          }
        }
      }

      self._createScores(monsterObject, monsterUpdates.scores);
    }
  }

  updatePlayers(playersUpdates, gameStats) {
    const self = this;
    for (const playerId of Object.keys(playersUpdates)) {
      const playerUpdates = playersUpdates[playerId];
      if (!self.scene.allPlayers[playerId]) {
        // well...let's not handle adding players here :)
        continue;
      }
      const player = self.scene.allPlayers[playerId];
      const isMainPLayer = player.walletAddress === self.scene.mainPlayer.walletAddress;

      const actions = playerUpdates.actions;
      for (const action of actions) {
        switch (action.type) {
          // i.e. is being attacked by monster
          case 'attacked': {
            if (isMainPLayer) {
              doPlayAttackSound(player.beaverId, self.scene);
            }
            player.bloodSplatAnim(isMainPLayer);
            player.stats.hp.current = action.data.hp;
            player.updateStats(player.stats);
            break;
          }
          // i.e. has been killed by monster
          case 'killed': {
            console.warn('=========== KILL ========');
            player.kill();
            player.deathAnim(MONSTER_TO_BEAVER[action.data.attackingMonsterType], isMainPLayer);
            break;
          }
          // i.e. is attacking monster
          case 'attacking': {
            player.stats.ap.current = action.data.ap;
            player.stats.coins = action.data.coins;
            self.scene.updateStats(player, gameStats);
            break;
          }
        }
      }

      self._createScores(player, playerUpdates.scores);
    }
  }

  _createScores(sprite, rawScores) {
    const scores = scoreToDisplay(rawScores);
    for (const score of scores) {
      this.scene.createScoreTween(this.scene.createScoreText(sprite, score));
    }
  }
}
