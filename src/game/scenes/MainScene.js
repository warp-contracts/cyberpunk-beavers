import Player from '../objects/Player.js';
import Const, { BEAVER_TYPES } from '../common/const.mjs';
import MainPlayer from '../objects/MainPlayer.js';
import { Text } from '../objects/Text.js';
import { EVENTS_NAME } from '../utils/events.js';
import { serverConnection } from '../lib/serverConnection.js';
import {
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  mainSceneKey,
  mainSceneLoadingKey,
  statsSceneKey,
} from '../../main.js';
import { createDataItemSigner, dryrun } from '@permaweb/aoconnect';
import { createData } from 'warp-arbundles';
import { ANIM_SETTINGS } from './anim/settings.js';
import Phaser from 'phaser';
import { MUSIC_SETTINGS } from './music/settings.js';
import { MainSceneGui } from '../gui/MainSceneGui.js';
import { hideGui, showGui } from '../utils/mithril.js';
import { MINE_ACTIVATED_COLOR } from '../utils/style.js';

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
    this.gameEnd = data.gameEnd;
    this.userName = data.userName;
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    this.load.image('map_layer_ground', 'assets/maps/tilemaps/ground_tilemap.png');
    this.load.image('map_layer_decoration', 'assets/maps/tilemaps/decorations_tilemap.png');
    this.load.image('map_layer_obstacles', 'assets/maps/tilemaps/obstacles_tilemap.png');

    this.load.image('cyberpunk_game_objects', 'assets/images/game_objects.png');
    this.load.image('cyberpunk_game_treasures', 'assets/images/treasures.png');

    this.load.image('medal_gold', 'assets/images/medal-gold.png');
    this.load.image('medal_silver', 'assets/images/medal-silver.png');
    this.load.image('medal_brown', 'assets/images/medal-brown.png');

    Object.keys(Const.BEAVER_TYPES).forEach((b) => {
      this.loadBeaverAssets(b);
    });

    this.load.atlas(
      `explosion_anim`,
      `assets/images/anims/explosion/explosion_anim.png`,
      `assets/images/anims/explosion/explosion_anim_atlas.json`
    );

    this.load.audio('background_music', ['assets/audio/background_music.mp3']);
    this.load.audio('background_music_metal', ['assets/audio/background_music_metal.mp3']);
    this.load.audio('pick_up_sound', ['assets/audio/pick.mp3']);
    this.load.audio('dig_sound', ['assets/audio/dig.mp3']);
    this.load.audio('treasure_sound', ['assets/audio/treasure_arcade.mp3']);
    this.load.audio('beaver_eliminated_sound', ['assets/audio/beaver_eliminated.m4a']);
    this.load.audio('not_enough_ap', ['assets/audio/not_enough_ap.m4a']);
    this.load.audio('new_challenger', ['assets/audio/new_challenger.m4a']);
    this.load.audio('game_over', ['assets/audio/game_over.m4a']);
    this.load.audio('3_rounds_left', ['assets/audio/3_rounds_left.m4a']);
    this.load.audio('last_round', ['assets/audio/last_round.m4a']);
    this.load.audio('first_blood', ['assets/audio/first_blood.m4a']);
    this.load.audio('double_kill', ['assets/audio/double_kill.m4a']);
    this.load.audio('triple_kill', ['assets/audio/triple_kill.m4a']);
    this.load.audio('god_like', ['assets/audio/god_like.m4a']);
    this.load.audio('revenge', ['assets/audio/revenge.m4a']);
    this.load.audio('teleport', ['assets/audio/teleport.mp3']);
    this.load.audio('explosion', ['assets/audio/explosion_powerful_dynamite.mp3']);
    this.forDeathSounds((k, i) => this.loadDeathSound(k, i, this));
  }

  forDeathSounds(execute) {
    for (let i = 0; i < Const.DEATH_SOUND_OPTIONS; i++) {
      Object.values(Const.Kills).forEach((k) => execute(k, i + 1));
    }
  }

  loadDeathSound(k, i, self) {
    self.load.audio(`death_${k}_${i}`, [`assets/audio/death_${k}_${i}.mp3`]);
  }

  addDeathSound(k, i) {
    this[`${k}${i}DeathSound`] = this.sound.add(`death_${k}_${i}`, { loop: false, volume: 2.0 });
  }

  loadBeaverAssets(beaver) {
    this.load.image(`${beaver}_48`, `assets/images/beavers/${beaver}/${beaver}_48px.png`);
    this.loadBeaverAnim(beaver, 'idle');
    this.loadBeaverAnim(beaver, 'walk');
    this.loadBeaverAnim(beaver, 'attack');
    this.loadBeaverAnim(beaver, 'dig');
    this.loadBeaverAnim(beaver, 'pick');
    Object.values(Const.Kills).forEach((k) => this.loadBeaverAnim(beaver, `death_${k}`));
    this.load.audio(`attack_${beaver}_sound`, [`assets/audio/attack_${beaver}.mp3`]);
  }

  loadBeaverAnim(beaver, asset) {
    this.load.atlas(
      `${beaver}_anim_${asset}`,
      `assets/images/beavers/${beaver}/${beaver}_anim_${asset}.png`,
      `assets/images/beavers/${beaver}/${beaver}_anim_${asset}_atlas.json`
    );
  }

  async create() {
    console.log('Main Scene - 3. Create');
    this.allPlayers = {};
    this.ranking = [];
    this.addSounds();
    this.initAnimations();
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection.game;
      this.server.subscribe(this);
      await this.registerPlayer();
    } else {
      this.scene.start(connectWalletSceneKey);
    }

    let self = this;
    m.mount(showGui(), {
      view: function () {
        return m(MainSceneGui, {
          mainPlayerStats: self.mainPlayer?.stats,
          mainPlayerEquipment: self.mainPlayer?.equipment,
          gameStats: self.gameStats,
          roundInfo: self.roundInfo,
          gameOver: self.gameOver,
        });
      },
    });
  }

  initAnimations() {
    this.anims.create({
      key: `explosion_anim`,
      frames: this.anims.generateFrameNames(`explosion_anim`, { prefix: 'explosion-f', start: 1, end: 8 }),
      frameRate: 24,
    });

    for (const [beaver, anims] of Object.entries(ANIM_SETTINGS)) {
      for (const [anim, config] of Object.entries(anims)) {
        const { prefix, start, end, frameRate } = config;
        this.anims.create({
          key: `${beaver}_${anim}`,
          frames: this.anims.generateFrameNames(`${beaver}_anim_${anim}`, { prefix, start, end }),
          frameRate,
        });
      }
    }
  }

  async registerPlayer() {
    const balance = await this.checkBalance();
    const generatedWalletAddress =
      warpAO.signingMode == 'arconnect' ? localStorage.getItem('generated_wallet_address') : null;
    // console.log(balance);
    if (this.beaverId) {
      console.log(`Beaver has already been registered previously, joining game...`, this.beaverId);
      await this.server.send(
        { cmd: Const.Command.join, balance: balance && parseInt(balance), generatedWalletAddress },
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
          generatedWalletAddress,
        },
        true
      );
    }
  }

  async checkBalance() {
    const processId = window.warpAO.tokenProcessId();
    let dataItemSigner;

    if (window.warpAO.signingMode === 'generated') {
      const generatedSigner = window.warpAO.generatedSigner;
      dataItemSigner = async ({ data, tags, target, anchor, createDataItem }) => {
        const dataItem = createData(data, generatedSigner, {
          tags,
          target,
        });
        await dataItem.sign(generatedSigner);
        return {
          id: await dataItem.id,
          raw: await dataItem.getRaw(),
        };
      };
    } else {
      dataItemSigner = createDataItemSigner(window.arweaveWallet);
    }

    try {
      let now = Date.now();
      const result = await dryrun({
        process: processId,
        tags: [
          { name: 'Action', value: 'Balance' },
          { name: 'Target', value: this.walletAddress },
        ],
        signer: dataItemSigner,
        data: '1234',
      });
      const balance = result.Messages[0].Tags.find((t) => t.name === 'Balance').value;
      console.log(`Checking balance ${balance} took ${Date.now() - now}ms`);
      return balance;
    } catch (error) {
      console.error(error);
      return '0';
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
    this.scene.launch(statsSceneKey, {
      beaverChoice: this.beaverChoice,
    });
    // this.scene.launch(chatSceneKey, { userName: playerInfo.userName });
    this.statsScene = this.scene.get(statsSceneKey);
    this.statsScene.walletAddress = this.mainPlayer?.walletAddress;
    this.statsScene.userName = this.mainPlayer?.userName;
    this.statsScene.beaverChoice = this.beaverId || this.beaverChoice;
    this.statsScene.stats = this.mainPlayer.stats;
    this.statsScene.allPlayers = this.allPlayers;

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
    m.redraw();
    if (this.gameOver) {
      return;
    }
    this.roundInfo = this.roundTick();
    if ((this.gameEnd && this.gameEnd < Date.now()) || this.roundInfo.roundsToGo == 0) {
      this.gameOver = true;
      this.backgroundMusic.stop();
      this.gameOverSound.play();
      this.server.send({ cmd: Const.Command.info }); // sent just so we can send the tokens at the end of the game
      setTimeout(() => {
        hideGui();
        this.scene.remove(statsSceneKey);
        this.scene.start(leaderboardSceneKey, { players: this.allPlayers, mainPlayer: this.mainPlayer });
      }, 2000);
    }
    if (this.roundInfo.roundsToGo == 3 && !this.threeRoundsPlayed) {
      this.threeRoundsPlayed = true;
      this.threeRoundsLeftSound.play();
    }
    if (this.roundInfo.roundsToGo == 1 && !this.lastRoundPlayed) {
      this.lastRoundPlayed = true;
      this.lastRoundSound.play();
    }

    // this.game.events.emit(EVENTS_NAME.updateRoundInfo, roundInfo);

    Object.keys(this.allPlayers).forEach((p) => {
      this.allPlayers[p].update();
    });
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

  initMap({ groundLayer, decorationLayer, obstaclesLayer, treasuresLayer, objectsLayer }) {
    this.groundLayer = this.createLayer(groundLayer, 'map_layer_ground', 0);
    this.decorationLayer = this.createLayer(decorationLayer, 'map_layer_decoration', 1);
    this.obstaclesLayer = this.createLayer(obstaclesLayer, 'map_layer_obstacles', 2);
    this.gameTreasuresLayer = this.createLayer(treasuresLayer, 'cyberpunk_game_treasures', 3);
    this.gameObjectsLayer = this.createLayer(objectsLayer, 'cyberpunk_game_objects', 4);
  }

  initCamera() {
    const camera = this.cameras.main;

    camera.setSize(this.game.scale.width, this.game.scale.height);
    camera.startFollow(this.mainPlayer, true, 0.09, 0.09);
    camera.setZoom(1);

    let cameraDragStartX;
    let cameraDragStartY;

    this.input.on('pointerdown', () => {
      cameraDragStartX = camera.scrollX;
      cameraDragStartY = camera.scrollY;
    });

    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        camera.scrollX = cameraDragStartX + (pointer.downX - pointer.x) / camera.zoom;
        camera.scrollY = cameraDragStartY + (pointer.downY - pointer.y) / camera.zoom;
      }
    });

    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      // Get the current world point under pointer.
      const worldPoint = camera.getWorldPoint(pointer.x, pointer.y);
      const newZoom = camera.zoom - camera.zoom * 0.001 * deltaY;
      camera.zoom = Phaser.Math.Clamp(newZoom, 0.25, 2);

      // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
      camera.preRender();
      const newWorldPoint = camera.getWorldPoint(pointer.x, pointer.y);
      // Scroll the camera to keep the pointer under the same world point.
      camera.scrollX -= newWorldPoint.x - worldPoint.x;
      camera.scrollY -= newWorldPoint.y - worldPoint.y;
    });
  }

  createLayer(data, image, depth) {
    const map = this.make.tilemap({
      data,
      tileWidth: Const.Tile.size,
      tileHeight: Const.Tile.size,
    });

    const tiles = map.addTilesetImage(image);
    const layer = map.createLayer(0, tiles, 0, 0);

    if (depth) {
      layer.setDepth(depth);
    }

    return layer;
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

  handleMessage(response, lag) {
    const self = this;
    this.game.events.emit(EVENTS_NAME.nextMessage, { response, lag });
    if (this.allPlayers[response.player?.walletAddress]?.locked) return;
    switch (response.cmd) {
      case Const.Command.registered:
        {
          console.log('Registered player', response);
          if (
            response.error ||
            (response.player && response.player.walletAddress === this.walletAddress && response.player.error)
          ) {
            console.error('Failed to join the game', response.player);
            this.scene.remove('main-scene-loading');
            self.scene.start(loungeAreaSceneKey, { error: response.player.error });
          } else {
            self.round = response.round;
            if (this.gameEnd) {
              self.roundsCountdownTotal = ~~((self.gameEnd - response.round.start) / response.round.interval);
            }
            for (const [wallet, player] of Object.entries(response.players)) {
              if (wallet === this.walletAddress && !this.mainPlayer) {
                this.beaverId = player.beaverId;
                self.initMap({
                  groundLayer: response.map.groundTilemap,
                  decorationLayer: response.map.decorationTilemap,
                  obstaclesLayer: response.map.obstaclesTilemap,
                  treasuresLayer: response.map.gameTreasuresTilemapForClient,
                  objectsLayer: response.map.gameObjectsTilemap,
                });
                self.createMainPlayer(player);
                self.initCamera();
              } else {
                if (!this.newChallengerSound.isPlaying) {
                  const now = Date.now();
                  if (!this.newChallengerSoundLastTs || now - this.newChallengerSoundLastTs > 5000) {
                    this.newChallengerSoundLastTs = now;
                    this.newChallengerSound.play();
                  }
                }
                self.addOtherPlayer(player);
              }
            }

            this.scene.remove(mainSceneLoadingKey);
          }
        }
        break;

      case Const.Command.attacked:
        const isKillerMainPlayer = response.player?.walletAddress === self.mainPlayer?.walletAddress;
        const isOpponentMainPlayer = response.opponent?.walletAddress === self.mainPlayer?.walletAddress;
        if (isOpponentMainPlayer) {
          this.playAttackSound(response.player.beaverId);
        }
        this.updateStats(response.player, response.gameStats);
        this.updateStats(response.opponent, response.gameStats);
        if (response.player.walletAddress !== self.mainPlayer?.walletAddress) {
          this.allPlayers[response.player.walletAddress]?.attackAnim();
        }
        if (response.opponentFinished) {
          const opponent = self.allPlayers[response.opponent?.walletAddress];
          opponent?.lock();
          if (isKillerMainPlayer) {
            setTimeout(() => {
              self.opponentFinishedSound(response.player, response.revenge);
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
              if (response.encounter?.leftBy === self.mainPlayer?.walletAddress) {
                this.gameObjectsLayer.removeTileAt(response.player.movedPos.x, response.player.movedPos.y);
                this[`mineGrid_${response.player.movedPos.x}_${response.player.movedPos.y}`].destroy();
              }

              if (response.player.walletAddress === self.mainPlayer?.walletAddress) {
                self.mainPlayer.moveAndExplode(response.player, true);
              } else {
                self.allPlayers[response.player.walletAddress].moveAndExplode(response.player, false);
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
            if (response.player.onGameTreasure.type === Const.GameObject.treasure.type) {
              this.gameTreasuresLayer.putTileAt(1, response.player.pos.x, response.player.pos.y);
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
        if (response.digged?.type == Const.GameObject.treasure.type) {
          // console.log(`Player digged a game treasure.`);
          if (this.mainPlayer?.walletAddress == response.player.walletAddress) this.treasureSound.play();
          this.gameTreasuresLayer.putTileAt(0, response.player.pos.x, response.player.pos.y);
        } else {
          if (this.mainPlayer?.walletAddress == response.player.walletAddress) this.digSound.play();
          const gameObjectTile = this.gameObjectsLayer.getTileAt(response.player.pos.x, response.player.pos.y)?.index;
          if (gameObjectTile == 2 || gameObjectTile == null) {
            this.gameTreasuresLayer.putTileAt(1, response.player.pos.x, response.player.pos.y);
          }
          this.gameTreasuresLayer.putTileAt(1, response.player.pos.x, response.player.pos.y);
        }
        this.updateStats(response.player, response.gameStats);
        this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }
    }
  }

  playAttackSound(beaverId) {
    let sound = null;
    switch (beaverId) {
      case BEAVER_TYPES.heavy_beaver.name:
        sound = this.attackHeavyBeaverSound;
        break;
      case BEAVER_TYPES.hacker_beaver.name:
        sound = this.attackHackerBeaverSound;
        break;
      case BEAVER_TYPES.speedy_beaver.name:
        sound = this.attackSpeedyBeaverSound;
        break;
      default:
        console.log('Beaver type not found');
    }
    if (sound != null) {
      sound.play();
    }
  }

  opponentFinishedSound(player, revenge) {
    if (revenge) {
      if (!this.revengeSound.isPlaying) {
        this.revengeSound.play();
      }
      return;
    }
    switch (player.stats.kills.fragsInRow) {
      case 1:
        if (!this.firstBloodSound.isPlaying) {
          this.firstBloodSound.play();
        }
        break;
      case 2:
        if (!this.doubleKillSound.isPlaying) {
          this.doubleKillSound.play();
        }
        break;
      case 3:
        if (!this.tripleKillSound.isPlaying) {
          this.tripleKillSound.play();
        }
        break;
      case 10:
        if (!this.godLikeSound.isPlaying) {
          this.godLikeSound.play();
        }
        break;
      default:
        if (!this.beaverEliminatedSound.isPlaying) {
          this.beaverEliminatedSound.play();
        }
    }
  }

  addOtherPlayer(pInfo) {
    if (!pInfo || pInfo.error) {
      return;
    }
    if (!this.allPlayers[pInfo.walletAddress]) {
      console.log('Setting up new player', pInfo.walletAddress);
      const player = this.createPlayer(pInfo);
      this.game.events.emit(EVENTS_NAME.updatePlayers, player);
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
      this.game.events.emit(EVENTS_NAME.updateStats, {
        player: responsePlayer.stats,
        game: gameStats,
      });
    } else if (responsePlayer && this.allPlayers[responsePlayer.walletAddress]) {
      currentCoinsGained = this.allPlayers[responsePlayer?.walletAddress].stats.coins.gained;
      newCoinsGained = responsePlayer.stats.coins.gained;
      this.allPlayers[responsePlayer?.walletAddress].updateStats(responsePlayer.stats);
      this.game.events.emit(EVENTS_NAME.updateOtherPlayerStats, {
        ...responsePlayer.stats,
        walletAddress: responsePlayer.walletAddress,
      });
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

    if (this.mainPlayer && this.mainPlayer.walletAddress === opponent) {
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

  addSounds() {
    this.backgroundMusic = this.sound.add('background_music', { loop: true, volume: 0.25 });
    this.backgroundMusicMetal = this.sound.add('background_music_metal', { loop: true, volume: 0.25 });
    this.pickUpSound = this.sound.add('pick_up_sound', { loop: false, volume: 3 });
    this.digSound = this.sound.add('dig_sound', { loop: false, volume: 0.5 });
    this.treasureSound = this.sound.add('treasure_sound', { loop: false, volume: 0.5 });
    this.attackHeavyBeaverSound = this.sound.add('attack_heavy_beaver_sound', { loop: false, volume: 0.5 });
    this.attackHackerBeaverSound = this.sound.add('attack_hacker_beaver_sound', { loop: false, volume: 0.5 });
    this.attackSpeedyBeaverSound = this.sound.add('attack_speedy_beaver_sound', { loop: false, volume: 0.5 });
    this.beaverEliminatedSound = this.sound.add('beaver_eliminated_sound', { loop: false, volume: 2.0 });
    this.notEnoughApSound = this.sound.add('not_enough_ap', { loop: false, volume: 1.0 });
    this.newChallengerSound = this.sound.add('new_challenger', { loop: false, volume: 2.0 });
    this.gameOverSound = this.sound.add('game_over', { loop: false, volume: 2.0 });
    this.threeRoundsLeftSound = this.sound.add('3_rounds_left', { loop: false, volume: 2.0 });
    this.lastRoundSound = this.sound.add('last_round', { loop: false, volume: 2.0 });
    this.firstBloodSound = this.sound.add('first_blood', { loop: false, volume: 4.0 });
    this.doubleKillSound = this.sound.add('double_kill', { loop: false, volume: 4.0 });
    this.tripleKillSound = this.sound.add('triple_kill', { loop: false, volume: 4.0 });
    this.godLikeSound = this.sound.add('god_like', { loop: false, volume: 4.0 });
    this.revengeSound = this.sound.add('revenge', { loop: false, volume: 4.0 });
    this.teleportSound = this.sound.add('teleport', { loop: false, volume: 5.0 });
    this.explosionSound = this.sound.add('explosion', { loop: false, volume: 0.5 });
    this.forDeathSounds((k, i) => this.addDeathSound(k, i, this));

    const backgroundMusic = this[MUSIC_SETTINGS.mapIdToBackgroundMusic[window.warpAO.mapTxId()]];
    if (window.warpAO.config.env !== 'local') {
      backgroundMusic?.play();
    }
    const musicKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    musicKey.on('up', () => {
      if (backgroundMusic?.isPlaying) {
        backgroundMusic?.stop();
      } else {
        backgroundMusic?.play();
      }
    });
  }

  updateRanking() {
    this.ranking = Object.entries(this.allPlayers).sort((a, b) => b[1].stats.coins.gained - a[1].stats.coins.gained);
    Object.values(this.allPlayers).forEach((p) => p.updatePlayerPosition());
  }
}
