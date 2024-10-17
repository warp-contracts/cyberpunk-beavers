import Player from '../../objects/Player.js';
import Const, { BEAVER_TYPES, GAMEPLAY_MODES, MAIN_PLAYER_DEPTH } from '../../common/const.mjs';
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
import { checkBalance, checkBalanceRsg, generatedWalletAddress, getUsernameFromStorage } from '../../utils/utils.js';
import { doPreloadAssets } from './preload.js';
import { doAddSounds } from './sounds.js';
import { doInitCamera } from './camera.js';
import { doInitAnimations } from './animations.js';
import { doCreateTileMap, initMapObjects } from './maps.js';
import { FOV } from '../../objects/FOV.js';
import { executeScan } from './commands/scanned.js';
import { Shrink } from '../../objects/Shrink.js';
import { handleAttacked } from './commands/attacked.js';

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
  gameObjectsSprites = {};
  lastAttack = { criticalHit: false };

  constructor() {
    super(mainSceneKey);
  }

  init(data) {
    console.log('Main Scene - 1. Init', data);
    this.beaverId = data.beaverId;
    this.beaverChoice = data.beaverChoice;
    this.walletAddress = data.walletAddress;
    this.mainSceneLoading = this.scene.get(mainSceneLoadingKey);
    this.gameStart = data.gameStart;
    this.gameEnter = data.gameEnter;
    this.server = serverConnection.game;
    this.server.subscribe(this);
    this.gameActive = false;
    this.gameEnd = data.gameEnd;
    this.mapTxId = data.mapTxId;
    const user = getUsernameFromStorage(this.walletAddress);
    this.userName = user.username;
    this.userId = user.id;
    this.spectatorMode = window.warpAO.spectatorMode;
    this.isEverythingFuckingInitialized = false;
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
    if (!this.spectatorMode) {
      this.fov = new FOV(this, this.beaverChoice || this.beaverId);
    }
    /*this.lights.enable();
    this.lights.setAmbientColor(0x909090);*/

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
    console.log('MainSceneGui');
    m.mount(showGui(true), {
      view: function () {
        return m(MainSceneGui, {
          mainPlayer: {
            stats: self.mainPlayer?.stats,
            walletAddress: self.mainPlayer?.walletAddress,
            userName: self.mainPlayer?.userName,
            beaverChoice: self.beaverId || self.beaverChoice,
          },
          lastAttack: self.lastAttack,
          mainPlayerEquipment: self.mainPlayer?.equipment,
          gameStats: self.gameStats,
          roundInfo: self.roundInfo,
          gameOver: self.gameOver,
          playersTotal: Object.keys(self.allPlayers).length,
          diff: self.diff,
          gameActive: self.gameActive,
          spectatorMode: self.spectatorMode,
          roundsToShrink: self.shrink?.roundsToShrink,
        });
      },
    });
    console.log('After MainSceneGui');
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
    console.log('register mode', warpAO.config.aoMode);

    const balance =
      warpAO.config.env === 'dev'
        ? 0
        : warpAO.config.aoMode
          ? await checkBalance(this.walletAddress)
          : await checkBalanceRsg(this.userId);
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
    //if ()
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

    if (this.gameEnter && !this.gameActive && !this.gameEnterTimeUp) {
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
        this.scene.start(leaderboardSceneKey, {
          players: this.allPlayers,
          mainPlayer: this.mainPlayer,
          gameTokens: this.gameStats.gameTokens,
        });
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
      if (camera.worldView.x === 0 && camera.worldView.y === 0) {
        //sometimes initial camera coords are fucked, therefore FOV calculation is fucked up
        //and everything is fucking black, until player moves.
        return;
      }

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
      this.fov?.update(player, bounds);
    }
    m.redraw();
    this.lastAttack.criticalHit = false;
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
    this.server.send({ cmd: Const.Command.activate });
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
    /*console.log('Checking locked tx', {
      lastTxs,
      locking: this.lockingTx,
    });*/
    const lockingTx = this.lockingTx;
    if (lastTxs && lastTxs.includes(this.lockingTx)) {
      this.lockingTx = null;
      //console.log('Actions unlocked', lockingTx);
    }
  }

  handleMessage(response, lag, msgWalletAddress) {
    const self = this;
    const cmd = response.cmd;

    if (!self.isEverythingFuckingInitialized && !REGISTER_COMMANDS.includes(cmd)) {
      console.log('Not fully fucking initialized, skipping cmd', cmd);
      return;
    }

    // note - yes, this code has to run before a message is handled by a target handler
    if (response.battleRoyale) {
      if (!self.shrink) {
        self.shrink = new Shrink(self);
      }
      const br = response.battleRoyale;
      if (br.shrink) {
        console.log('Adding shrink map', {
          shrink: br.shrink,
          killedPlayers: br.killedPlayers,
          allPlayersKeys: Object.keys(self.allPlayers),
        });
        self.shrink.createShrinkMap(br.shrink.offset + br.shrink.size);
        for (let walletAddress of Object.keys(self.allPlayers)) {
          console.log(`Kill player?`, walletAddress);
          if (br.killedPlayers.hasOwnProperty(walletAddress)) {
            console.log('Kill player', walletAddress);
            const killedOne = self.allPlayers[walletAddress];
            self.updateStats(br.killedPlayers[walletAddress], response.gameStats);
            self.lockAndKill(killedOne, walletAddress === self.mainPlayer.walletAddress);
          }
        }
      }
      if (br.shrinkWarn) {
        console.log('Rounds to shrink', br.roundsToShrink);
        self.shrink.roundsToShrink = br.roundsToShrink;
        if (!self.shrink.warnMap && br.roundsToShrink === 1) {
          console.log('Adding shrink warn map', br.shrinkWarn);
          self.shrinkWarn.play();
          self.shrink.createWarningMap(br.shrinkWarn.offset, br.shrinkWarn.size);
        }
      }
    }

    if (response.dead === self.mainPlayer?.walletAddress) {
      console.log("You're already dead");
    }

    if (self.allPlayers && response?.player?.walletAddress) {
      if (self.allPlayers[response.player.walletAddress]?.isLocked()) return;
    }

    const toRespawn = response.gameStats?.gameObjectsToRespawnInRound;
    if (toRespawn?.length) {
      for (let { pos } of toRespawn) {
        self.gameObjectsSprites[pos.y]?.[pos.x]?.setVisible(true);
      }
    }

    if (
      !self.gameActive &&
      response.gameStats?.activated &&
      response.player?.walletAddress == self.mainPlayer?.walletAddress
    ) {
      self.gameActive = true;
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
            self.mode = response.battleRoyale ? GAMEPLAY_MODES.battleRoyale : GAMEPLAY_MODES.deathmatch;
            if (self.gameEnd) {
              self.roundsCountdownTotal = ~~((self.gameEnd - response.round.start) / response.round.interval);
            }
            for (const [wallet, player] of Object.entries(response.players)) {
              if (wallet === self.walletAddress) {
                if (!self.mainPlayer) {
                  self.beaverId = player.beaverId;
                  self.createMainPlayer(player);
                  doInitCamera(self, false);
                  initMapObjects({
                    treasuresLayer: response.map.gameTreasuresTilemapForClient,
                    objectsLayer: response.map.gameObjectsTilemap,
                    mainScene: self,
                  });
                  self.scene.remove(mainSceneLoadingKey);
                  /*self.light = self.lights.addLight(self.mainPlayer.x, self.mainPlayer.y, 200)
                .setIntensity(3);*/
                }
                self.isEverythingFuckingInitialized = true;
              } else {
                self.addOtherPlayer(player);
              }
              console.log(`Player ${wallet} stats`, player.stats);
              if (
                self.mode === GAMEPLAY_MODES.battleRoyale &&
                player.stats.hp.current === 0 &&
                !self.allPlayers[wallet].isLocked()
              ) {
                self.lockAndKill(self.allPlayers[wallet], wallet === self.walletAddress);
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
        self.isEverythingFuckingInitialized = true;
        break;

      case Const.Command.attacked:
        handleAttacked(response, self);
        break;

      case Const.Command.landmineActivated:
        {
          if (response?.player?.walletAddress === self.mainPlayer?.walletAddress && response?.scoreToDisplay) {
            self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
            self.gameObjectsLayer?.putTileAt(2, response.player.pos.x, response.player.pos.y);
            self[`mineGrid_${response.player.pos.x}_${response.player.pos.y}`] = self.add
              .grid(self.mainPlayer?.x, self.mainPlayer?.y, 48, 48, 48, 48, MINE_ACTIVATED_COLOR, 0.4)
              .setDepth(MAIN_PLAYER_DEPTH - 1);
          }
        }
        break;
      case Const.Command.teleported:
      case Const.Command.moved:
        {
          const isMainPlayer = response.player.walletAddress === self.mainPlayer?.walletAddress;
          if (!self.allPlayers[response.player.walletAddress]) {
            self.addOtherPlayer(response.player);
          } else {
            if (response.encounter?.type === Const.GameObject.active_mine.type) {
              const mineLeftByMainPlayer = response.encounter?.leftBy === self.mainPlayer?.walletAddress;
              if (mineLeftByMainPlayer) {
                self.gameObjectsLayer?.removeTileAt(response.player.movedPos.x, response.player.movedPos.y);
                self[`mineGrid_${response.player.movedPos.x}_${response.player.movedPos.y}`].destroy();
              }

              if (isMainPlayer) {
                self.mainPlayer.moveAndExplode(response.player, true);
              } else {
                self.allPlayers[response.player.walletAddress].moveAndExplode(response.player, mineLeftByMainPlayer);
              }
            } else {
              self.allPlayers[response.player.walletAddress].moveTo(response.player);
            }
          }

          if (response.player.onGameObject != null && isMainPlayer) {
            self.mainPlayer.onGameObject = response.player.onGameObject;
          }

          if (response.player.onGameTreasure != null && isMainPlayer) {
            self.mainPlayer.onGameTreasure = response.player.onGameTreasure;
          }

          self.updateStats(response.player, response.gameStats);
          self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
          if (isMainPlayer && response.moved === false) {
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
            const { x, y } = response.player?.pos;
            if (self.mainPlayer?.walletAddress === response.player.walletAddress) {
              self.pickUpSound.play();
              self.mainPlayer.equipment = response.player.equipment;
            } else {
              self.allPlayers[response.player.walletAddress]?.pickAnim();
            }
            self.gameObjectsLayer?.removeTileAt(x, y);

            const spriteToHide = self.gameObjectsSprites[y]?.[x];
            if (spriteToHide) {
              spriteToHide.setVisible(false);
            } else {
              console.error('Could not find sprite to remove at tile position', {
                x,
                y,
              });
            }

            if (response.player.onGameTreasure?.tile > 0) {
              //FIXME: create some dedicated fun for this
              self.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, x, y);
            }

            if (response.picked.type == GameTreasure.gun.type && !self.theGunCollectedSound.isPlaying) {
              self.theGunCollectedSound.play();
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
          self.mainPlayer.diggedTreasures[`${response.player.pos.x}, ${response.player.pos.y}`] = response.digged.tile;
          self.gameTreasuresLayer?.putTileAt(response.digged.tile, response.player.pos.x, response.player.pos.y);
        } else {
          if (self.mainPlayer?.walletAddress === response.player.walletAddress) self.digSound.play();
          self.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, response.player.pos.x, response.player.pos.y);
        }
        self.updateStats(response.player, response.gameStats);
        self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }

      case Const.Command.scanned: {
        executeScan(response, self);
        break;
      }

      case Const.Command.hpApplied: {
        if (!response.applied) {
          self.noCollectSound.play();
          return;
        }
        self.updateStats(response.player, response.gameStats);
        self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }
    }

    // note - yes, this code has to run after a message is handled by a target handler
    // - as we need to have updated players' stats
    if (response.battleRoyale) {
      const br = response.battleRoyale;

      if (br.totalShrinkSize && self.shrink.currentShrinkSize !== br.totalShrinkSize) {
        console.log('Updating shrink map', br.totalShrinkSize);
        self.shrink.createShrinkMap(br.totalShrinkSize);
        self.killThemAll();
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

  killThemAll() {
    for (const [wallet, player] of Object.entries(this.allPlayers)) {
      if (this.mode === GAMEPLAY_MODES.battleRoyale && player.stats.hp.current === 0 && !player.isLocked()) {
        this.lockAndKill(player, wallet === this.mainPlayer?.walletAddress);
      }
    }
  }

  lockAndKill(player, playDeathSound) {
    player.deathAnim(BEAVER_TYPES.speedy_beaver.name, playDeathSound);
    player.kill();
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
