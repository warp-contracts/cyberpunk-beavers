import Player from './Player.js';
import Const from './common/const.mjs';
import MainPlayer from './MainPlayer.js';
import { initPubSub, subscribe } from 'warp-contracts-pubsub';
import { Text } from './Text.js';
import { EVENTS_NAME } from './utils/events.js';
import runNpc from './npc.mjs';

export default class MainScene extends Phaser.Scene {
  round;
  obstacle;
  pInfo;
  gameObjectsLayer;
  gameTreasuresLayer;

  constructor() {
    super('MainScene');
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
    this.backgroundMusic.play();
    this.obstacle = this.physics.add.sprite(240, 240, 'atlas', 'walk-1');
    this.allPlayers = {};
    if (!window.arweaveWallet) {
      this.scene.start('connect-wallet-scene');
    } else {
      this.server = window.warpAO.config.env === 'dev' ? await this.initWebSocket() : await this.initSubscription();
    }
  }

  createMainPlayer(playerInfo) {
    this.mainPlayer = new MainPlayer({
      walletAddress: playerInfo.walletAddress,
      stats: playerInfo.stats,
      scene: this,
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
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
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
      texture: `${playerInfo.beaverId}_48`,
      animated: true,
      beaverChoice: playerInfo.beaverId,
    });
    // not sure why but when there's more players sometimes this field gets erased
    if (!player.stats) {
      console.log('test');
      player.stats = playerInfo.stats;
    }
    this.allPlayers[playerInfo.walletAddress] = player;
    console.log(this.allPlayers[playerInfo.walletAddress]);
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
      this.mainPlayer.nextRound();
    }
    return {
      gone,
      currentRound,
    };
  }

  async initWebSocket() {
    const ws = new WebSocket('ws://localhost:8080');
    const self = this;
    const mockDataItem = (data) => {
      const withTags = window.warpAO.data(data);
      return {
        ...withTags,
        Owner: self.walletAddress,
        Id: Math.random().toString(36).substring(2),
        Tags: withTags.tags,
        Timestamp: Date.now(),
      };
    };

    ws.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);
      console.log(response.cmd);
      if (response.txId && this.mainPlayer) {
        this.mainPlayer.handleTx(response.txId);
      }
      self.handleMessage(response);
    });
    ws.addEventListener('open', () => {
      const player = JSON.parse(localStorage.getItem('player'));
      console.log(`Found player info in local storage`, player);
      if (player) {
        const data = mockDataItem({
          cmd: Const.Command.join,
        });
        console.log('data', data);
        ws.send(JSON.stringify(data));
      } else {
        ws.send(
          JSON.stringify(
            mockDataItem({
              cmd: Const.Command.register,
              beaverId: self.beaverChoice,
            })
          )
        );
      }
    });

    if (window.warpAO.npc) {
      await runNpc();
    }
    return {
      send: async (message) => {
        const di = mockDataItem(message);
        ws.send(JSON.stringify(di));
        return { id: di.Id };
      },
    };
  }

  initMap(level1, level2, level3) {
    this.groundLayer = this.createLayer(level1, 'cyberpunk_bg', 0);
    this.gameObjectsLayer = this.createLayer(level2, 'cyberpunk_game_objects', 2);
    this.gameTreasuresLayer = this.createLayer(level3, 'cyberpunk_game_treasures', 1);
    this.gameTreasuresLayer.forEachTile((t) => {
      if (t.index != 1) t.setVisible(false);
    });
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

  async initSubscription() {
    initPubSub();
    const self = this;
    if (window.warpAO.subscribed) {
      return;
    }

    console.log('Subscribing for processId: ', window.warpAO.processId());
    /*const subscription = await subscribe(
      `results/ao/${window.warpAO.processId()}`,
      ({ data }) => {
        const message = JSON.parse(data);
        if (message.nonce <= window.warpAO.nonce) {
          console.warn(`Message with ${message.nonce} has been already handled.`);
          return;
        }
        console.log(`\n ==== new message nonce ${message.nonce} ==== `, message);
        if (message.tags) {
          const salt = message.tags.find((t) => t.name === 'Salt');
          if (salt) {
            console.log('\n ==== created      ==== ', new Date(parseInt(salt.value)));
          }
        }
        console.log('\n ==== sent from CU ==== ', message.sent);
        console.log('\n ==== received     ==== ', new Date());

        if (message.txId && this.mainPlayer) {
          this.mainPlayer.handleTx(message.txId);
        }
        if (message.output && message.output.cmd) {
          message.output.txId = message.txId; // FIXME: well..., no the best approach
          this.handleMessage(message.output);
        }
      },
      console.error
    );

    console.log('Subscription started...');
    window.warpAO.subscribed = true;
    const player = JSON.parse(localStorage.getItem('player'));
    console.log(`Found player info in local storage`, player);
    if (player) {
      console.log('Joinning game...');
      await window.warpAO.send({
        cmd: Const.Command.join,
        walletAddress: this.walletAddress,
      });
    } else {
      console.log('register player...');
      await window.warpAO.send({
        cmd: Const.Command.register,
        walletAddress: this.walletAddress,
        beaverId: self.beaverChoice,
      });
    }

    return { send: window.warpAO.send };*/

        const sse = new EventSource(`${window.warpAO.config.cuAddress}/subscribe/${window.warpAO.processId()}`);
        const beforeUnloadHandler = (event) => {
          sse.close();
          /*!// Recommended
          event.preventDefault();

          // Included for legacy support, e.g. Chrome/Edge < 119
          event.returnValue = true;*/
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);

        sse.onerror = () => sse.close();
        sse.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log('\n ==== new message ==== ', message);
            if (message.tags) {
              const salt = message.tags.find((t) => t.name === 'Salt');
              console.log(
                '\n ==== created      ==== ',
                new Date(parseInt(salt.value))
              );
            }
            console.log('\n ==== sent from CU ==== ', message.sent);
            console.log('\n ==== received     ==== ', new Date());

            if (message.txId && this.mainPlayer) {
              this.mainPlayer.handleTx(message.txId);
            }
            if (message.output.cmd) {
              this.handleMessage(message.output);
            }
          } catch (e) {
            console.log(event);
          }
        };

        console.log('Subscription started...');
        const player = JSON.parse(localStorage.getItem('player'));
        console.log(`Found player info in local storage`, player);
        if (player) {
          console.log('Joining game...');
          window.warpAO.send({
            cmd: Const.Command.join,
            walletAddress: this.walletAddress,
          });
        } else {
          console.log('register player...');
          window.warpAO.send({
            cmd: Const.Command.register,
            walletAddress: this.walletAddress,
            beaverId: self.beaverChoice,
          });
        }

    return { send: window.warpAO.send };
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
            self.round = response.state.round;
            if (response.player.walletAddress === this.walletAddress) {
              self.initMap(
                response.state.groundTilemap,
                response.state.gameObjectsTilemap,
                response.state.gameTreasuresTilemap
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
            this.gameObjectsLayer.removeTileAt(response.player.pos[0], response.player.pos[1]);
            if (response.player.onGameTreasure.type == 'treasure') {
              this.gameTreasuresLayer.putTileAt(1, response.player.pos[0], response.player.pos[1]);
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
          this.gameTreasuresLayer.getTileAt(response.player.pos[0], response.player.pos[1]).setVisible(true);

          if (response.player?.walletAddress === self.mainPlayer.walletAddress) {
          }
        } else {
          const gameObjectTile = this.gameObjectsLayer.getTileAt(response.player.pos[0], response.player.pos[1])?.index;
          if (gameObjectTile == 2 || gameObjectTile == null) {
            this.gameTreasuresLayer.putTileAt(1, response.player.pos[0], response.player.pos[1]);
          }
          this.gameTreasuresLayer.getTileAt(response.player.pos[0], response.player.pos[1]).setVisible(true);
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
