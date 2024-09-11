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
import { FOVLayer } from '../../objects/FOVLayer.js';

const { GameTreasure } = Const;

const REGISTER_COMMANDS = [Const.Command.registeredSpectator, Const.Command.registered];

export default class MainScene extends Phaser.Scene {
  round;
  allPlayers = {};
  ranking = [];
  gameObjectsLayer;
  gameTreasuresLayer;
  roundsCountdownTotal;
  gameOver = false;
  lockingTx = null;
  gameStats = {};
  followedPlayer = null;
  fov = null;

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
    this.registered = false;
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    doPreloadAssets(this);
  }

  async create() {
    console.log('Main Scene - 3. Create');

    // create the Tilemap
    doCreateTileMap(this);
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

  update(time, delta) {
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

    if (this.mainPlayer) {
      const camera = this.cameras.main;

      const player = new Phaser.Math.Vector2({
        x: this.tileMap.worldToTileX(this.mainPlayer.x),
        y: this.tileMap.worldToTileY(this.mainPlayer.y),
      });

      const bounds = new Phaser.Geom.Rectangle(
        this.tileMap.worldToTileX(camera.worldView.x) - 1,
        this.tileMap.worldToTileY(camera.worldView.y) - 1,
        this.tileMap.worldToTileX(camera.worldView.width) + 2,
        this.tileMap.worldToTileX(camera.worldView.height) + 2
      );
      this.fov.update(player, bounds);
    }
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
    const cmd = response.cmd;
    if (!self.registered && !REGISTER_COMMANDS.includes(cmd)) {
      console.log('Not fully registered, skipping cmd', cmd);
      return;
    }

    if (self.allPlayers && response?.player?.walletAddress) {
      if (self.allPlayers[response.player.walletAddress]?.locked) return;
    }

    switch (cmd) {
      case Const.Command.activated: {
        if (self.mainPlayer?.walletAddress == response.player?.walletAddress) {
          self.gameActive = true;
          // self.gameActiveSound.play();
        }
        break;
      }
      case Const.Command.registered:
        {
          console.log('Registered player', response);
          if (
            response.error ||
            (response.player && response.player.walletAddress === self.walletAddress && response.player.error)
          ) {
            console.error('Failed to join the game', response.player);
            self.scene.remove('main-scene-loading');
            hideGui();
            self.scene.start(loungeAreaSceneKey, { error: response.player.error });
          } else {
            self.round = response.round;
            self.gameStats = response.gameStats;
            if (self.gameEnd) {
              self.roundsCountdownTotal = ~~((self.gameEnd - response.round.start) / response.round.interval);
            }
            for (const [wallet, player] of Object.entries(response.players)) {
              if (wallet === self.walletAddress && !self.mainPlayer) {
                self.beaverId = player.beaverId;
                self.createMainPlayer(player);
                doInitCamera(self, false);
                initMapObjects({
                  treasuresLayer: response.map.gameTreasuresTilemapForClient,
                  objectsLayer: response.map.gameObjectsTilemap,
                  mainScene: self,
                });
                self.fov = new FOVLayer(this, self.mainPlayer.stats.fov);
                self.scene.remove(mainSceneLoadingKey);
                self.registered = true;
              } else {
                self.addOtherPlayer(player);
              }
            }
            self.followWinner();

            if (!self.gameEnter || (self.gameEnter && self.gameEnter <= Date.now())) {
              setTimeout(() => self.activateGame(), 100);
            }
          }
        }
        break;
      case Const.Command.registeredSpectator:
        self.gameStart = response.start;
        self.gameEnd = response.end;
        self.gameEnter = response.enter;
        self.round = response.round;
        self.gameStats = response.gameStats;
        if (self.gameEnd) {
          self.roundsCountdownTotal = ~~((self.gameEnd - response.round.start) / response.round.interval);
        }
        for (const [wallet, player] of Object.entries(response.players)) {
          self.addOtherPlayer(player);
        }
        if (msgWalletAddress === self.walletAddress) {
          doInitCamera(self, true);
          self.followWinner();
          initMapObjects({
            treasuresLayer: response.map.gameTreasuresTilemapForClient,
            objectsLayer: response.map.gameObjectsTilemap,
            mainScene: self,
          });
        }

        self.scene.remove(mainSceneLoadingKey);
        if (!self.gameEnter || (self.gameEnter && self.gameEnter <= Date.now())) {
          setTimeout(() => self.activateGame(), 100);
        }
        self.registered = true;
        break;

      case Const.Command.attacked:
        const isKillerMainPlayer = response.player?.walletAddress === self.mainPlayer?.walletAddress;
        const isOpponentMainPlayer = response.opponent?.walletAddress === self.mainPlayer?.walletAddress;
        if (isOpponentMainPlayer || self.spectatorMode) {
          doPlayAttackSound(response.player.beaverId, this);
        }
        self.updateStats(response.player, response.gameStats);
        self.updateStats(response.opponent, response.gameStats);
        if (response.player.walletAddress !== self.mainPlayer?.walletAddress) {
          self.allPlayers[response.player.walletAddress]?.attackAnim();
        }
        const opponent = self.allPlayers[response.opponent?.walletAddress];
        if (response.opponentFinished) {
          opponent?.lock();
          if (isKillerMainPlayer) {
            setTimeout(() => {
              doPlayOpponentFinishedSound(response.player, response.revenge, self);
            }, 900);
          } else {
            if (!self.beaverEliminatedSound.isPlaying) {
              self.beaverEliminatedSound.play();
            }
          }
          opponent
            ?.deathAnim(response.player.beaverId, isOpponentMainPlayer || isKillerMainPlayer || this.spectatorMode)
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
        self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress, {
          forOpponent: {
            score: response.opponentScoreToDisplay,
            walletAddress: response.opponent?.walletAddress,
          },
        });
        break;

      case Const.Command.landmineActivated:
        {
          if (response?.player?.walletAddress === self.mainPlayer?.walletAddress && response?.scoreToDisplay) {
            self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
            self.gameObjectsLayer?.putTileAt(2, response.player.pos.x, response.player.pos.y);
            this[`mineGrid_${response.player.pos.x}_${response.player.pos.y}`] = self.add.grid(
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
                self.gameObjectsLayer?.removeTileAt(response.player.movedPos.x, response.player.movedPos.y);
                self[`mineGrid_${response.player.movedPos.x}_${response.player.movedPos.y}`].destroy();
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
            self.mainPlayer.onGameObject = response.player.onGameObject;
          }

          if (
            response.player.onGameTreasure != null &&
            response.player.walletAddress === self.mainPlayer?.walletAddress
          ) {
            self.mainPlayer.onGameTreasure = response.player.onGameTreasure;
          }

          self.updateStats(response.player, response.gameStats);
          self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
          if (response.moved === false) {
            if (!self.notEnoughApSound.isPlaying) {
              self.notEnoughApSound.play();
            }
          } else if (cmd === Const.Command.teleported) {
            if (!self.teleportSound.isPlaying) {
              self.teleportSound.play();
            }
          }
        }
        break;
      case Const.Command.picked:
        {
          if (response.picked) {
            if (self.mainPlayer?.walletAddress === response.player.walletAddress) {
              self.pickUpSound.play();
              self.mainPlayer.equipment = response.player.equipment;
            } else {
              self.allPlayers[response.player.walletAddress]?.pickAnim();
            }
            self.gameObjectsLayer?.removeTileAt(response.player.pos.x, response.player.pos.y);
            const spriteToRemove = self.gameObjectSprites?.find((s) => {
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
              self.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, response.player.pos.x, response.player.pos.y);
            }
          } else {
            if (self.mainPlayer?.walletAddress === response.player.walletAddress) {
              self.noCollectSound.play();
            }
          }
          self.updateStats(response.player, response.gameStats);
          response.picked && self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        }
        break;

      case Const.Command.digged: {
        if (!response.digged) {
          return;
        }
        if (response.player.walletAddress !== self.mainPlayer?.walletAddress) {
          self.allPlayers[response.player.walletAddress]?.digAnim();
        }
        if (response.digged?.tile > 0) {
          if (self.mainPlayer?.walletAddress === response.player.walletAddress || self.spectatorMode)
            self.treasureSound.play();
          self.gameTreasuresLayer?.putTileAt(response.digged.tile, response.player.pos.x, response.player.pos.y);
        } else {
          if (self.mainPlayer?.walletAddress === response.player.walletAddress) self.digSound.play();
          self.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, response.player.pos.x, response.player.pos.y);
        }
        self.updateStats(response.player, response.gameStats);
        self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }
    }
  }

  followWinner() {
    if (this.spectatorMode && !this.followedPlayer && this.ranking?.length) {
      this.followedPlayer = this.ranking[0][1];
      this.cameras.main.startFollow(this.followedPlayer);
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
    if (!score || !parseInt(score.value) || !player) {
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
