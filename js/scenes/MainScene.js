import Player from '../Player.js';
import Const from '../common/const.mjs';
import MainPlayer from '../MainPlayer.js';
import { Text } from '../objects/Text.js';
import { EVENTS_NAME } from '../utils/events.js';
import { colors } from '../utils/style.js';
import { serverConnection } from '../lib/serverConnection.js';

export default class MainScene extends Phaser.Scene {
  round;
  obstacle;
  pInfo;
  gameObjectsLayer;
  gameTreasuresLayer;

  constructor() {
    super('main-scene');
  }

  init(data) {
    console.log('Main Scene - 1. Init', data);
    this.beaverChoice = data.beaverChoice;
    this.walletAddress = data.walletAddress;
    this.scene.launch('main-scene-loading');
    this.mainSceneLoading = this.scene.get('main-scene-loading');
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    this.load.image('cyberpunk_bg', 'assets/images/sand_map_tiles_min.png');
    this.load.image('cyberpunk_game_objects', 'assets/images/ap_hp.png');
    this.load.image('cyberpunk_game_treasures', 'assets/images/treasures.png');
    this.load.image('hacker_beaver_48', 'assets/images/hacker_beaver_48px.png');
    this.load.image('heavy_beaver_48', 'assets/images/heavy_beaver_48px.png');
    this.load.image('speedy_beaver_48', 'assets/images/speedy_beaver_48px.png');
    this.load.atlas(
      'heavy_beaver_anim',
      'assets/images/heavy_beaver_anim.png',
      'assets/images/heavy_beaver_anim_atlas.json'
    );
    this.load.atlas(
      'speedy_beaver_anim',
      'assets/images/speedy_beaver_anim.png',
      'assets/images/speedy_beaver_anim_atlas.json'
    );
    this.load.atlas(
      'hacker_beaver_anim',
      'assets/images/hacker_beaver_anim.png',
      'assets/images/hacker_beaver_anim_atlas.json'
    );
    this.load.audio('background_music', ['assets/audio/background_music.mp3']);
  }

  async create() {
    console.log('Main Scene - 3. Create');
    this.backgroundMusic = this.sound.add('background_music');
    this.backgroundMusic.loop = true;
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

    this.obstacle = this.physics.add.sprite(240, 240, 'atlas', 'walk-1');
    this.allPlayers = {};
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection;
      this.server.subscribe(this);
      await this.registerPlayer();
    } else {
      this.scene.start('connect-wallet-scene');
    }
  }

  async registerPlayer() {
    const player = JSON.parse(localStorage.getItem('player'));
    console.log(`Found player info in local storage`, player);
    if (player) {
      console.log('Joinning game...');
      await this.server.send({ cmd: Const.Command.join });
    } else {
      console.log('register player...');
      await this.server.send({
        cmd: Const.Command.register,
        beaverId: this.beaverChoice,
      });
    }
  }

  createMainPlayer(playerInfo) {
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

    this.allPlayers[this.mainPlayer.walletAddress] = this.mainPlayer;
    this.scene.launch('stats-scene', {
      beaverChoice: this.beaverChoice,
    });
    this.statsScene = this.scene.get('stats-scene');
    this.statsScene.walletAddress = this.mainPlayer?.walletAddress;
    this.statsScene.beaverChoice = this.beaverChoice;
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
    };
  }

  initMap(level1, level2, level3) {
    this.groundLayer = this.createLayer(level1, 'cyberpunk_bg', 0);
    this.gameObjectsLayer = this.createLayer(level2, 'cyberpunk_game_objects', 2);
    this.gameTreasuresLayer = this.createLayer(level3, 'cyberpunk_game_treasures', 1);
  }

  initCamera() {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.mainPlayer, true, 0.09, 0.09);
    this.cameras.main.setZoom(1);
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
          if (response.error) {
            console.error('Failed to join the game', response.error);
            localStorage.removeItem('player');
            self.scene.start('connect-wallet-scene');
          } else {
            localStorage.setItem(
              'player',
              JSON.stringify({
                id: response.player.walletAddress,
                beaverId: response.player.beaverId,
              })
            );
            self.round = response.round;
            if (response.player.walletAddress === this.walletAddress) {
              self.initMap(
                response.map.groundTilemap,
                response.map.gameObjectsTilemap,
                response.map.gameTreasuresTilemapForClient
              );
              self.createMainPlayer(response.player);
              self.initCamera();
            }
            this.scene.remove('main-scene-loading');
          }
        }
        break;

      case Const.Command.attacked:
      case Const.Command.moved:
        {
          console.log('Player', response.cmd, response.player.pos, response.player.onGameObject);
          if (!self.allPlayers[response.player.walletAddress]) {
            console.log('Setting up new player', response.player.walletAddress);
            const player = self.createPlayer(response.player);
            this.game.events.emit(EVENTS_NAME.updatePlayers, player);
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
          this.updateStats(response.opponentPlayer, response.opponentStats);
          this.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress, {
            forOpponent: {
              score: response.opponentScoreToDisplay,
              walletAddress: response.opponentPlayer?.walletAddress,
            },
          });
        }
        break;

      case Const.Command.picked:
        {
          if (response.picked) {
            console.log(`Player picked a game object.`);
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
          this.gameTreasuresLayer.putTileAt(0, response.player.pos.x, response.player.pos.y);
        } else {
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

  updateStats(responsePlayer, responseStats) {
    const self = this;
    console.log('Player stats', responsePlayer);
    if (responsePlayer?.walletAddress === self.mainPlayer.walletAddress) {
      console.log('Stats update', responsePlayer?.walletAddress);
      console.log('responseStats', responseStats);
      //responseStats.ap = self.mainPlayer.stats.ap;
      self.mainPlayer.stats = responseStats;
      this.game.events.emit(EVENTS_NAME.updateStats, responseStats);
    } else if (responsePlayer) {
      this.allPlayers[responsePlayer?.walletAddress].stats = responsePlayer.stats;
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
        fontFamily: '"Press Start 2P"',
        fontSize: '12px',
        textTransform: 'uppercase',
        fill: score.sign == 'positive' ? 'white' : 'red',
      }
    ).setDepth(10);
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
}
