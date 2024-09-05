import Player from '../../objects/Player.js';
import Const from '../../common/const.mjs';
import MainPlayer from '../../objects/MainPlayer.js';
import { Text } from '../../objects/Text.js';
import { serverConnection } from '../../lib/serverConnection.js';
import {
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  mainSceneKey,
  mainSceneLoadingKey,
} from '../../../main.js';
import Phaser from 'phaser';
import { MainSceneGui } from '../../gui/MainScene/MainSceneGui.js';
import { hideGui, showGui } from '../../utils/mithril.js';
import { MINE_ACTIVATED_COLOR } from '../../utils/style.js';
import { checkBalance, generatedWalletAddress, getUsernameFromStorage } from '../../utils/utils.js';
import { doPreloadAssets } from './preload.js';
import { doAddSounds, doPlayAttackSound, doPlayOpponentFinishedSound } from './sounds.js';
import { doInitCamera } from './camera.js';
import { doInitAnimations } from './animations.js';
import { doCreateTileMap, initMapObjects } from './maps.js';

const { GameTreasure } = Const;

export default class MainScene extends Phaser.Scene {
  round;
  gameObjectsLayer;
  gameTreasuresLayer;
  roundsCountdownTotal;
  gameOver = false;
  lockingTx = null;
  gameStats = {};

  constructor() {
    super(mainSceneKey);
  }

  init(data) {
    console.log('Main Scene - 1. Init', data);
    this.beaverId = data.beaverId;
    this.beaverChoice = data.beaverChoice;
    this.walletAddress = data.walletAddress;
    this.scene.launch(mainSceneLoadingKey);
    this.mainSceneLoading = this.scene.get(mainSceneLoadingKey);
    this.gameStart = data.gameStart;
    this.gameEnter = data.gameEnter;
    this.server = serverConnection.game;
    this.server.subscribe(this);
    this.gameActive = false;
    this.gameEnd = data.gameEnd;
    this.mapTxId = data.mapTxId;
    this.userName = getUsernameFromStorage(this.walletAddress);
    this.spectatorMode = window.warpAO.spectatorMode;
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    doPreloadAssets(this);
  }

  async create() {
    console.log('Main Scene - 3. Create');

    // create the Tilemap
    doCreateTileMap(this);

    this.allPlayers = {};
    this.ranking = [];
    doAddSounds(this);
    doInitAnimations(this);
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      console.log('this.spectatorMode', this.spectatorMode);
      if (this.spectatorMode) {
        await this.registerSpectator();
      } else {
        await this.registerPlayer();
      }
    } else {
      this.scene.start(connectWalletSceneKey);
    }

    let self = this;
    m.mount(showGui(true), {
      view: function () {
        return m(MainSceneGui, {
          mainPlayer: {
            stats: self.mainPlayer?.stats,
            walletAddress: self.mainPlayer?.walletAddress,
            userName: self.mainPlayer?.userName,
            beaverChoice: self.beaverId || self.beaverChoice,
          },
          mainPlayerEquipment: self.mainPlayer?.equipment,
          gameStats: self.gameStats,
          roundInfo: self.roundInfo,
          gameOver: self.gameOver,
          playersTotal: Object.keys(self.allPlayers).length,
          diff: self.diff,
          gameActive: self.gameActive,
          spectatorMode: self.spectatorMode,
        });
      },
    });
  }

  async registerSpectator() {
    await this.server.send(
      {
        cmd: Const.Command.registerSpectator,
      },
      true
    );
  }

  async registerPlayer() {
    const balance = await checkBalance(this.walletAddress);
    if (this.beaverId) {
      console.log(`Beaver has already been registered previously, joining game...`, this.beaverId);
      await this.server.send(
        {
          cmd: Const.Command.join,
          balance: balance && parseInt(balance),
          generatedWalletAddress: generatedWalletAddress(),
        },
        true
      );
    } else {
      console.log('Register player...');
      await this.server.send(
        {
          cmd: Const.Command.register,
          beaverId: this.beaverChoice,
          userName: this.userName,
          balance: balance && parseInt(balance),
          generatedWalletAddress: generatedWalletAddress(),
        },
        true
      );
    }
  }

  createMainPlayer(playerInfo) {
    this.mainPlayer = new MainPlayer({
      walletAddress: playerInfo.walletAddress,
      userName: playerInfo.userName,
      equipment: playerInfo.equipment,
      stats: playerInfo.stats,
      scene: this,
      x: 24 + playerInfo.pos.x * Const.Tile.size,
      y: 24 + playerInfo.pos.y * Const.Tile.size,
      texture: `${playerInfo.beaverId}_48`,
      animated: true,
      beaverChoice: playerInfo.beaverId,
    });
    this.mainPlayer.mainScene = this;

    this.allPlayers[this.mainPlayer.walletAddress] = this.mainPlayer;
    this.updateRanking();

    m.redraw();

    return this.mainPlayer;
  }

  createPlayer(playerInfo) {
    const player = new Player({
      walletAddress: playerInfo.walletAddress,
      userName: playerInfo.userName,
      scene: this,
      stats: playerInfo.stats,
      x: 24 + playerInfo.pos.x * Const.Tile.size,
      y: 24 + playerInfo.pos.y * Const.Tile.size,
      texture: `${playerInfo.beaverId}_48`,
      animated: true,
      beaverChoice: playerInfo.beaverId,
    });
    this.allPlayers[playerInfo.walletAddress] = player;
    this.updateRanking();
    return player;
  }

  update() {
    if (this.gameOver) {
      m.redraw();
      return;
    }

    if (this.gameEnter && this.gameEnter > Date.now() && !this.gameActive && !this.gameEnterTimeUp) {
      this.waitForGameEnter();
    }

    this.roundInfo = this.roundTick();
    if ((this.gameEnd && this.gameEnd < Date.now()) || this.roundInfo.roundsToGo == 0) {
      this.gameOver = true;
      this.backgroundMusic.stop();
      this.backgroundMusicMetal.stop();
      this.gameOverSound.play();
      this.server.send({ cmd: Const.Command.info }); // sent just so we can send the tokens at the end of the game
      setTimeout(() => {
        hideGui();
        this.scene.start(leaderboardSceneKey, { players: this.allPlayers, mainPlayer: this.mainPlayer });
      }, 3000);
    }
    if (this.roundInfo.roundsToGo == 3 && !this.threeRoundsPlayed) {
      this.threeRoundsPlayed = true;
      this.threeRoundsLeftSound.play();
    }
    if (this.roundInfo.roundsToGo == 1 && !this.lastRoundPlayed) {
      this.lastRoundPlayed = true;
      this.lastRoundSound.play();
    }

    Object.keys(this.allPlayers).forEach((p) => {
      this.allPlayers[p].update();
    });
    m.redraw();
  }

  waitForGameEnter() {
    const self = this;
    const now = Date.now();
    self.diff = Math.round((self.gameEnter - now) / 1000);
    if (self.diff <= 0) {
      self.activateGame();
    }
  }

  activateGame() {
    this.gameEnterTimeUp = true;
    this.server.send({ cmd: Const.Command.activate }, true);
  }

  roundTick() {
    if (!this.round) {
      return `Waiting to start the round...`;
    }
    const tsChange = Date.now() - this.round.start;
    const currentRound = ~~(tsChange / this.round.interval);
    const gone = ~~((10 * (tsChange - currentRound * this.round.interval)) / this.round.interval);
    if (gone === 1) {
      this.mainPlayer?.nextRound();
    }
    return {
      gone,
      currentRound,
      roundsToGo: this.roundsCountdownTotal && this.roundsCountdownTotal - currentRound,
    };
  }

  handleTx(lastTxs) {
    console.log('Checking locked tx', {
      lastTxs,
      locking: this.lockingTx,
    });
    const lockingTx = this.lockingTx;
    if (lastTxs && lastTxs.includes(this.lockingTx)) {
      this.lockingTx = null;
      console.log('Actions unlocked', lockingTx);
    }
  }

  handleMessage(response, lag, msgWalletAddress) {
    const self = this;
    console.log('walletAddress', msgWalletAddress);
    if (this.allPlayers[response.player?.walletAddress]?.locked) return;
    switch (response.cmd) {
      case Const.Command.activated: {
        if (self.mainPlayer?.walletAddress == response.player?.walletAddress) {
          self.gameActive = true;
          self.gameActiveSound.play();
        }
        break;
      }
      case Const.Command.registered:
        {
          console.log('Registered player', response);
          if (
            response.error ||
            (response.player && response.player.walletAddress === this.walletAddress && response.player.error)
          ) {
            console.error('Failed to join the game', response.player);
            this.scene.remove('main-scene-loading');
            hideGui();
            self.scene.start(loungeAreaSceneKey, { error: response.player.error });
          } else {
            self.round = response.round;
            if (this.gameEnd) {
              self.roundsCountdownTotal = ~~((self.gameEnd - response.round.start) / response.round.interval);
            }
            for (const [wallet, player] of Object.entries(response.players)) {
              if (wallet === this.walletAddress && !this.mainPlayer) {
                this.beaverId = player.beaverId;
                self.createMainPlayer(player);
                doInitCamera(self, false);
                initMapObjects({
                  treasuresLayer: response.map.gameTreasuresTilemapForClient,
                  objectsLayer: response.map.gameObjectsTilemap,
                  mainScene: self,
                });
              } else {
                self.addOtherPlayer(player);
              }
            }

            this.scene.remove(mainSceneLoadingKey);
            if (!this.gameEnter || (this.gameEnter && this.gameEnter <= Date.now())) {
              setTimeout(() => self.activateGame(), 100);
            }
          }
        }
        break;
      case Const.Command.registeredSpectator:
        console.log('registeredSpectator', {
          walletAddress: msgWalletAddress,
          'this.walletAddress': this.walletAddress,
        });
        self.round = response.round;
        if (this.gameEnd) {
          self.roundsCountdownTotal = ~~((self.gameEnd - response.round.start) / response.round.interval);
        }
        if (msgWalletAddress === this.walletAddress) {
          doInitCamera(self, true);
          initMapObjects({
            treasuresLayer: response.map.gameTreasuresTilemapForClient,
            objectsLayer: response.map.gameObjectsTilemap,
            mainScene: self,
          });
        }
        for (const [wallet, player] of Object.entries(response.players)) {
          self.addOtherPlayer(player);
        }

        this.scene.remove(mainSceneLoadingKey);
        if (!this.gameEnter || (this.gameEnter && this.gameEnter <= Date.now())) {
          setTimeout(() => self.activateGame(), 100);
        }
        break;

      case Const.Command.attacked:
        const isKillerMainPlayer = response.player?.walletAddress === self.mainPlayer?.walletAddress;
        const isOpponentMainPlayer = response.opponent?.walletAddress === self.mainPlayer?.walletAddress;
        if (isOpponentMainPlayer) {
          doPlayAttackSound(response.player.beaverId, this);
        }
        this.updateStats(response.player, response.gameStats);
        this.updateStats(response.opponent, response.gameStats);
        if (response.player.walletAddress !== self.mainPlayer?.walletAddress) {
          this.allPlayers[response.player.walletAddress]?.attackAnim();
        }
        const opponent = self.allPlayers[response.opponent?.walletAddress];
        if (response.opponentFinished) {
          opponent?.lock();
          if (isKillerMainPlayer) {
            setTimeout(() => {
              doPlayOpponentFinishedSound(response.player, response.revenge, self);
            }, 900);
          } else {
            if (!this.beaverEliminatedSound.isPlaying) {
              this.beaverEliminatedSound.play();
            }
          }
          opponent
            ?.deathAnim(response.player.beaverId, isOpponentMainPlayer || isKillerMainPlayer)
            .once('animationcomplete', () => {
              opponent.baseMoveTo(
                response.opponent.pos,
                () => {},
                () => opponent.blink()
              );
              opponent.unlock();
            });
        } else {
          opponent?.bloodSplatAnim(isOpponentMainPlayer || isKillerMainPlayer);
        }
        this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress, {
          forOpponent: {
            score: response.opponentScoreToDisplay,
            walletAddress: response.opponent?.walletAddress,
          },
        });
        break;

      case Const.Command.landmineActivated:
        {
          if (response?.player?.walletAddress === self.mainPlayer?.walletAddress && response?.scoreToDisplay) {
            this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
            this.gameObjectsLayer.putTileAt(2, response.player.pos.x, response.player.pos.y);
            this[`mineGrid_${response.player.pos.x}_${response.player.pos.y}`] = this.add.grid(
              self.mainPlayer?.x,
              self.mainPlayer?.y,
              48,
              48,
              48,
              48,
              MINE_ACTIVATED_COLOR,
              0.4
            );
          }
        }
        break;
      case Const.Command.teleported:
      case Const.Command.moved:
        {
          if (!self.allPlayers[response.player.walletAddress]) {
            self.addOtherPlayer(response.player);
          } else {
            if (response.encounter?.type === Const.GameObject.active_mine.type) {
              const mineLeftByMainPlayer = response.encounter?.leftBy === self.mainPlayer?.walletAddress;
              if (mineLeftByMainPlayer) {
                this.gameObjectsLayer.removeTileAt(response.player.movedPos.x, response.player.movedPos.y);
                this[`mineGrid_${response.player.movedPos.x}_${response.player.movedPos.y}`].destroy();
              }

              if (response.player.walletAddress === self.mainPlayer?.walletAddress) {
                self.mainPlayer.moveAndExplode(response.player, true);
              } else {
                self.allPlayers[response.player.walletAddress].moveAndExplode(response.player, mineLeftByMainPlayer);
              }
            } else {
              self.allPlayers[response.player.walletAddress].moveTo(response.player);
            }
          }

          if (
            response.player.onGameObject != null &&
            response.player.walletAddress === self.mainPlayer?.walletAddress
          ) {
            this.mainPlayer.onGameObject = response.player.onGameObject;
          }

          if (
            response.player.onGameTreasure != null &&
            response.player.walletAddress === self.mainPlayer?.walletAddress
          ) {
            this.mainPlayer.onGameTreasure = response.player.onGameTreasure;
          }

          this.updateStats(response.player, response.gameStats);
          this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
          if (response.moved === false) {
            if (!this.notEnoughApSound.isPlaying) {
              this.notEnoughApSound.play();
            }
          } else if (response.cmd === Const.Command.teleported) {
            if (!this.teleportSound.isPlaying) {
              this.teleportSound.play();
            }
          }
        }
        break;
      case Const.Command.picked:
        {
          if (response.picked) {
            if (this.mainPlayer?.walletAddress === response.player.walletAddress) {
              this.pickUpSound.play();
              this.mainPlayer.equipment = response.player.equipment;
            } else {
              this.allPlayers[response.player.walletAddress]?.pickAnim();
            }
            this.gameObjectsLayer.removeTileAt(response.player.pos.x, response.player.pos.y);
            const spriteToRemove = this.gameObjectSprites.find((s) => {
              return response.player.pos.x === s.tilePosition.x && response.player.pos.y === s.tilePosition.y;
            });
            if (spriteToRemove) {
              spriteToRemove.destroy();
            } else {
              console.error('Could not find sprite to remove at tile position', {
                x: response.player.pos.x,
                y: response.player.pos.y,
              });
            }

            if (response.player.onGameTreasure?.tile > 0) {
              //FIXME: create some dedicated fun for this
              this.gameTreasuresLayer.putTileAt(GameTreasure.hole.tile, response.player.pos.x, response.player.pos.y);
            }
          } else {
            if (this.mainPlayer?.walletAddress === response.player.walletAddress) {
              this.noCollectSound.play();
            }
          }
          this.updateStats(response.player, response.gameStats);
          response.picked && this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        }
        break;

      case Const.Command.digged: {
        if (!response.digged) {
          return;
        }
        if (response.player.walletAddress !== self.mainPlayer?.walletAddress) {
          this.allPlayers[response.player.walletAddress]?.digAnim();
        }
        if (response.digged?.tile > 0) {
          if (this.mainPlayer?.walletAddress === response.player.walletAddress) this.treasureSound.play();
          this.gameTreasuresLayer.putTileAt(response.digged.tile, response.player.pos.x, response.player.pos.y);
        } else {
          if (this.mainPlayer?.walletAddress === response.player.walletAddress) this.digSound.play();
          this.gameTreasuresLayer.putTileAt(GameTreasure.hole.tile, response.player.pos.x, response.player.pos.y);
        }
        this.updateStats(response.player, response.gameStats);
        this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }
    }
  }

  addOtherPlayer(pInfo) {
    if (!pInfo || pInfo.error) {
      return;
    }
    if (!this.allPlayers[pInfo.walletAddress]) {
      if (!this.newChallengerSound.isPlaying) {
        const now = Date.now();
        if (!this.newChallengerSoundLastTs || now - this.newChallengerSoundLastTs > 5000) {
          this.newChallengerSoundLastTs = now;
          this.newChallengerSound.play();
        }
      }
      console.log('Setting up new player', pInfo.walletAddress);
      const player = this.createPlayer(pInfo);
    }
    return this.allPlayers[pInfo.walletAddress];
  }

  updateStats(responsePlayer, gameStats) {
    const self = this;
    let currentCoinsGained;
    let newCoinsGained;
    if (responsePlayer?.walletAddress === self.mainPlayer?.walletAddress) {
      currentCoinsGained = self.mainPlayer?.stats.coins.gained;
      newCoinsGained = responsePlayer.stats.coins.gained;
      self.mainPlayer.equipment = responsePlayer.equipment;
      self.mainPlayer.updateStats(responsePlayer.stats);
      self.gameStats = gameStats;
    } else if (responsePlayer && this.allPlayers[responsePlayer.walletAddress]) {
      currentCoinsGained = this.allPlayers[responsePlayer?.walletAddress].stats.coins.gained;
      newCoinsGained = responsePlayer.stats.coins.gained;
      this.allPlayers[responsePlayer?.walletAddress].updateStats(responsePlayer.stats);
    }
    if (currentCoinsGained != newCoinsGained) {
      self.updateRanking();
    }
  }

  displayPlayerScore(scores, walletAddress, options) {
    if (!scores || scores.length == 0) return;
    const isMainPlayer = this.mainPlayer?.walletAddress == walletAddress;
    const opponent = options?.forOpponent?.walletAddress;

    if (isMainPlayer && opponent) {
      scores.forEach((s) => {
        const scoreText = this.createScoreText(this.mainPlayer, s, {
          opponent: this.allPlayers[options?.forOpponent.walletAddress],
        });
        this.createScoreTween(scoreText);
      });
    } else if (isMainPlayer) {
      scores.forEach((s) => {
        const scoreText = this.createScoreText(this.mainPlayer, s);
        this.createScoreTween(scoreText);
      });
    }

    if (isMainPlayer && opponent) {
      options?.forOpponent?.score.forEach((s) => {
        const scoreText = this.createScoreText(this.allPlayers[options?.forOpponent.walletAddress], s, {
          forOpponent: this.allPlayers[options?.forOpponent.walletAddress],
          mainPlayer: this.mainPlayer,
        });
        this.createScoreTween(scoreText);
      });
    }

    if (this.mainPlayer?.walletAddress === opponent) {
      options?.forOpponent?.score.forEach((s) => {
        const scoreText = this.createScoreText(this.allPlayers[options?.forOpponent.walletAddress], s, {
          forOpponent: this.allPlayers[options?.forOpponent.walletAddress],
          mainPlayer: this.mainPlayer,
        });
        this.createScoreTween(scoreText);
      });

      scores.forEach((s) => {
        const scoreText = this.createScoreText(this.mainPlayer, s, {
          forFighter: this.allPlayers[walletAddress],
        });
        this.createScoreTween(scoreText);
      });
    }
  }

  createScoreText(player, score, options) {
    if (!score || !parseInt(score.value)) {
      return '';
    }
    return new Text(
      this,
      options?.forFighter
        ? options?.forFighter?.x > player.x
          ? options?.forFighter?.x + 15
          : options?.forFighter?.x - 60
        : options?.forOpponent
          ? player.x < options?.mainPlayer.x
            ? player.x - 60
            : player.x + 15
          : options?.opponent
            ? options?.opponent?.x < player.x
              ? player.x + 15
              : player.x - 30
            : player.x + 15,
      player.y - (score.sign == 'negative' ? 40 : 60),
      `${score.value}${score.type}`,
      {
        backgroundColor: 'black',
        fontFamily: '"Press Start 2P"',
        fontSize: '12px',
        textTransform: 'uppercase',
        fill: score.sign == 'positive' ? 'green' : 'red',
      }
    ).setDepth(20);
  }

  createScoreTween(target) {
    this.tweens.add({
      targets: target,
      alpha: { from: 0, to: 1 },
      ease: 'Power2',
      duration: 500,
      repeat: 0,
      yoyo: true,
    });
  }

  updateRanking() {
    this.ranking = Object.entries(this.allPlayers).sort((a, b) => b[1].stats.coins.gained - a[1].stats.coins.gained);
    Object.values(this.allPlayers).forEach((p) => p.updatePlayerPosition());
  }
}
