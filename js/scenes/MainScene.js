import Player from '../Player.js';
import Const, { BEAVER_TYPES } from '../common/const.mjs';
import MainPlayer from '../MainPlayer.js';
import { Text } from '../objects/Text.js';
import { EVENTS_NAME } from '../utils/events.js';
import { serverConnectionGame } from '../lib/serverConnection.js';
import {
  mainSceneKey,
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  mainSceneLoadingKey,
  statsSceneKey,
  chatSceneKey,
} from '../config/config.js';
import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import { createData } from 'warp-arbundles';
import { WebFontFile } from '../WebFontFile.js';

export default class MainScene extends Phaser.Scene {
  round;
  obstacle;
  gameObjectsLayer;
  gameTreasuresLayer;
  roundsCountdownTotal;

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
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    this.load.image('map_layer_ground', 'assets/maps/tilemaps/ground_tilemap.png');
    this.load.image('map_layer_decoration', 'assets/maps/tilemaps/decorations_tilemap.png');
    this.load.image('map_layer_obstacles', 'assets/maps/tilemaps/obstacles_tilemap.png');

    this.load.image('cyberpunk_game_objects', 'assets/images/ap_hp.png');
    this.load.image('cyberpunk_game_treasures', 'assets/images/treasures.png');

    this.load.image('hacker_beaver_48', 'assets/images/beavers/hacker_beaver_48px.png');
    this.load.image('heavy_beaver_48', 'assets/images/beavers/heavy_beaver_48px.png');
    this.load.image('speedy_beaver_48', 'assets/images/beavers/speedy_beaver_48px.png');
    this.load.atlas(
      'heavy_beaver_anim_idle',
      'assets/images/beavers/heavy_beaver_anim_idle.png',
      'assets/images/beavers/heavy_beaver_anim_atlas_idle.json'
    );
    this.load.atlas(
      'speedy_beaver_anim_idle',
      'assets/images/beavers/speedy_beaver_anim_idle.png',
      'assets/images/beavers/speedy_beaver_anim_atlas_idle.json'
    );
    this.load.atlas(
      'hacker_beaver_anim_idle',
      'assets/images/beavers/hacker_beaver_anim_idle.png',
      'assets/images/beavers/hacker_beaver_anim_atlas_idle.json'
    );
    this.load.atlas(
      'heavy_beaver_anim_walk',
      'assets/images/beavers/heavy_beaver_anim_walk.png',
      'assets/images/beavers/heavy_beaver_anim_atlas_walk.json'
    );
    this.load.atlas(
      'speedy_beaver_anim_walk',
      'assets/images/beavers/speedy_beaver_anim_walk.png',
      'assets/images/beavers/speedy_beaver_anim_atlas_walk.json'
    );
    this.load.atlas(
      'hacker_beaver_anim_walk',
      'assets/images/beavers/hacker_beaver_anim_walk.png',
      'assets/images/beavers/hacker_beaver_anim_atlas_walk.json'
    );
    this.load.atlas('blood', 'assets/images/blood_100x100.png', 'assets/images/blood_100x100.json');
    this.load.audio('background_music', ['assets/audio/background_music.mp3']);
    this.load.audio('pick_up_sound', ['assets/audio/pick.mp3']);
    this.load.audio('dig_sound', ['assets/audio/dig.mp3']);
    this.load.audio('treasure_sound', ['assets/audio/treasure_arcade.mp3']);
    this.load.audio('attack_heavy_beaver_sound', ['assets/audio/attack_heavy_beaver.mp3']);
    this.load.audio('attack_speedy_beaver_sound', ['assets/audio/attack_speedy_beaver.mp3']);
    this.load.audio('attack_hacker_beaver_sound', ['assets/audio/attack_hacker_beaver.mp3']);
    this.load.audio('beaver_eliminated_sound', ['assets/audio/beaver_eliminated.m4a']);
    this.load.audio('not_enough_ap', ['assets/audio/not_enough_ap.m4a']);
    this.load.audio('new_challenger', ['assets/audio/new_challenger.m4a']);
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  async create() {
    console.log('Main Scene - 3. Create');
    this.addSounds();
    this.allPlayers = {};
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnectionGame;
      this.server.subscribe(this);
      await this.registerPlayer();
    } else {
      this.scene.start(connectWalletSceneKey);
    }
  }

  async registerPlayer() {
    const balance = await this.checkBalance();
    console.log(balance);
    if (this.beaverId) {
      console.log(`Beaver has already been previously, Joinning game...`, this.beaverId);
      await this.server.send({ cmd: Const.Command.join, balance: balance && parseInt(balance) });
    } else {
      console.log('Register player...');
      await this.server.send({
        cmd: Const.Command.register,
        beaverId: this.beaverChoice,
        balance: balance && parseInt(balance),
      });
    }
  }

  async checkBalance() {
    const processId = window.warpAO.tokenProcessId();
    const generatedSigner = window.warpAO.generatedSigner;
    let dataItemSigner;
    const tags = [
      { name: 'Action', value: 'Balance' },
      { name: 'Recipient', value: this.walletAddress },
    ];
    const data = '1234';

    if (generatedSigner) {
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
    return await message({
      process: processId,
      tags,
      signer: dataItemSigner,
      data,
    })
      .catch((e) => {
        console.error(e);
      })
      .then((id) =>
        result({
          message: id,
          process: processId,
        })
      )
      .then((r) => r?.Messages[0]?.Data);
  }

  createMainPlayer(playerInfo) {
    console.log(playerInfo);
    this.mainPlayer = new MainPlayer({
      walletAddress: playerInfo.walletAddress,
      stats: playerInfo.stats,
      scene: this,
      x: 26 + playerInfo.pos.x * Const.Tile.size,
      y: 26 + playerInfo.pos.y * Const.Tile.size,
      texture: `${playerInfo.beaverId}_48`,
      animated: true,
      beaverChoice: playerInfo.beaverId,
    });
    this.mainPlayer.mainScene = this;

    this.allPlayers[this.mainPlayer.walletAddress] = this.mainPlayer;
    this.scene.launch(statsSceneKey, {
      beaverChoice: this.beaverChoice,
    });
    this.scene.launch('chat-scene');
    this.statsScene = this.scene.get(statsSceneKey);
    this.statsScene.walletAddress = this.mainPlayer?.walletAddress;
    this.statsScene.beaverChoice = this.beaverId || this.beaverChoice;
    this.statsScene.stats = this.mainPlayer.stats;
    this.statsScene.allPlayers = this.allPlayers;

    return this.mainPlayer;
  }

  createPlayer(playerInfo) {
    const player = new Player({
      walletAddress: playerInfo.walletAddress,
      scene: this,
      stats: playerInfo.stats,
      x: 26 + playerInfo.pos.x * Const.Tile.size,
      y: 26 + playerInfo.pos.y * Const.Tile.size,
      texture: `${playerInfo.beaverId}_48`,
      animated: true,
      beaverChoice: playerInfo.beaverId,
    });
    this.allPlayers[playerInfo.walletAddress] = player;
    return player;
  }

  update() {
    if (this.gameEnd && this.gameEnd < Date.now()) {
      this.backgroundMusic.stop();
      this.scene.remove(statsSceneKey);
      this.scene.remove(chatSceneKey);
      this.scene.start(leaderboardSceneKey, { players: this.allPlayers, mainPlayer: this.mainPlayer });
    }
    const roundInfo = this.roundTick();
    this.game.events.emit(EVENTS_NAME.updateRoundInfo, roundInfo);

    this.mainPlayer?.update();
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

  handleTx(id) {
    if (id && this.mainPlayer) {
      this.mainPlayer.handleTx(id);
    }
  }

  handleMessage(response) {
    const self = this;
    this.game.events.emit(EVENTS_NAME.nextMessage, response);
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
        if (
          response.player.walletAddress === self.mainPlayer.walletAddress ||
          response.opponent.walletAddress === self.mainPlayer.walletAddress
        ) {
          switch (response.player.beaverId) {
            case BEAVER_TYPES.heavy_beaver.name:
              this.attackHeavyBeaverSound.play();
              break;
            case BEAVER_TYPES.hacker_beaver.name:
              this.attackHackerBeaverSound.play();
              break;
            case BEAVER_TYPES.speedy_beaver.name:
              this.attackSpeedyBeaverSound.play();
              break;
            default:
              console.log('Beaver type not found');
          }
        }
        this.updateStats(response.player, response.player?.stats);
        this.updateStats(response.opponent, response.opponent?.stats);
        if (response.opponentFinished) {
          if (!this.beaverEliminatedSound.isPlaying) {
            this.beaverEliminatedSound.play();
          }
          if (response.opponent?.walletAddress === self.mainPlayer.walletAddress) {
            self.mainPlayer.bloodyRespawn(response.opponent.pos);
          } else {
            self.allPlayers[response.opponent?.walletAddress]?.bloodyRespawn(response.opponent.pos);
          }
        }
        this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress, {
          forOpponent: {
            score: response.opponentScoreToDisplay,
            walletAddress: response.opponent?.walletAddress,
          },
        });
        break;
      case Const.Command.moved:
        {
          console.log('Player', response.cmd, response.player.pos, response.player.onGameObject);
          if (!self.allPlayers[response.player.walletAddress]) {
            self.addOtherPlayer(response.player);
          } else {
            self.allPlayers[response.player.walletAddress].moveTo(response.player);
          }

          if (response.player.onGameObject != null) {
            console.log(`Player stood on a game object: ${JSON.stringify(response.player.onGameObject)}`);
            this.mainPlayer.onGameObject = response.player.onGameObject;
          }

          if (response.player.onGameTreasure != null) {
            console.log(`Player stood on a game treasure: ${JSON.stringify(response.player.onGameTreasure)}`);
            this.mainPlayer.onGameTreasure = response.player.onGameTreasure;
          }

          this.updateStats(response.player, response.stats);
          this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
          if (response.moved === false) {
            if (!this.notEnoughApSound.isPlaying) {
              this.notEnoughApSound.play();
            }
          }
        }
        break;

      case Const.Command.picked:
        {
          if (response.picked) {
            console.log(`Player picked a game object.`);
            if (this.mainPlayer.walletAddress == response.player.walletAddress) this.pickUpSound.play();
            this.gameObjectsLayer.removeTileAt(response.player.pos.x, response.player.pos.y);
            if (response.player.onGameTreasure.type == 'treasure') {
              this.gameTreasuresLayer.putTileAt(1, response.player.pos.x, response.player.pos.y);
            }
          }
          this.updateStats(response.player, response.stats);
          response.picked && this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        }
        break;

      case Const.Command.digged: {
        if (!response.digged) {
          return;
        }
        if (response.digged?.type == Const.GameObject.treasure.type) {
          console.log(`Player digged a game treasure.`);
          if (this.mainPlayer.walletAddress == response.player.walletAddress) this.treasureSound.play();
          this.gameTreasuresLayer.putTileAt(0, response.player.pos.x, response.player.pos.y);
        } else {
          if (this.mainPlayer.walletAddress == response.player.walletAddress) this.digSound.play();
          const gameObjectTile = this.gameObjectsLayer.getTileAt(response.player.pos.x, response.player.pos.y)?.index;
          if (gameObjectTile == 2 || gameObjectTile == null) {
            this.gameTreasuresLayer.putTileAt(1, response.player.pos.x, response.player.pos.y);
          }
          this.gameTreasuresLayer.putTileAt(1, response.player.pos.x, response.player.pos.y);
        }
        this.updateStats(response.player, response.stats);
        this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }
      case Const.Command.token: {
        this.updateStats(response.player, response.stats);
        this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
        break;
      }
    }
  }

  addOtherPlayer(pInfo) {
    if (!this.allPlayers[pInfo.walletAddress]) {
      console.log('Setting up new player', pInfo.walletAddress);
      const player = this.createPlayer(pInfo);
      this.game.events.emit(EVENTS_NAME.updatePlayers, player);
    }
    return this.allPlayers[pInfo.walletAddress];
  }

  updateStats(responsePlayer, responseStats) {
    const self = this;
    console.log('Player stats', responsePlayer);
    if (responsePlayer?.walletAddress === self.mainPlayer.walletAddress) {
      console.log('Stats update', responsePlayer?.walletAddress);
      console.log('responseStats', responseStats);
      //responseStats.ap = self.mainPlayer.stats.ap;
      self.mainPlayer.updateStats(responseStats);
      this.game.events.emit(EVENTS_NAME.updateStats, responseStats);
    } else if (responsePlayer) {
      this.allPlayers[responsePlayer?.walletAddress].updateStats(responsePlayer.stats);
      this.game.events.emit(EVENTS_NAME.updateOtherPlayerStats, {
        ...responseStats,
        walletAddress: responsePlayer.walletAddress,
      });
    }
  }

  displayPlayerScore(scores, walletAddress, options) {
    if (!scores || scores.length == 0) return;
    const isMainPlayer = this.mainPlayer.walletAddress == walletAddress;
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

    if (this.mainPlayer.walletAddress == opponent) {
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
        backgroundColor: "black",
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
    this.pickUpSound = this.sound.add('pick_up_sound', { loop: false, volume: 3 });
    this.digSound = this.sound.add('dig_sound', { loop: false, volume: 0.5 });
    this.treasureSound = this.sound.add('treasure_sound', { loop: false, volume: 0.5 });
    this.attackHeavyBeaverSound = this.sound.add('attack_heavy_beaver_sound', { loop: false, volume: 1.0 });
    this.attackHackerBeaverSound = this.sound.add('attack_hacker_beaver_sound', { loop: false, volume: 1.0 });
    this.attackSpeedyBeaverSound = this.sound.add('attack_speedy_beaver_sound', { loop: false, volume: 1.0 });
    this.beaverEliminatedSound = this.sound.add('beaver_eliminated_sound', { loop: false, volume: 2.0 });
    this.notEnoughApSound = this.sound.add('not_enough_ap', { loop: false, volume: 0.5 });
    this.newChallengerSound = this.sound.add('new_challenger', { loop: false, volume: 2.0 });

    if (window.warpAO.config.env !== 'local') {
      this.backgroundMusic.play();
    }
    const musicKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    musicKey.on('up', () => {
      if (this.backgroundMusic.isPlaying) {
        console.log('Music off');
        this.backgroundMusic.stop();
      } else {
        console.log('Music on');
        this.backgroundMusic.play();
      }
    });
  }
}
