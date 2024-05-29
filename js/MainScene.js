import Player from './Player.js';
import Const from './common/const.mjs';
import MainPlayer from './MainPlayer.js';
import { initPubSub, subscribe } from 'warp-contracts-pubsub';
import { EVENTS_NAME } from './utils/events.js';
import { HINTS } from './utils/hints.js';

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
    this.scene.launch('hint-scene');
    this.scene.launch('stats-scene', {
      beaverChoice: this.beaverChoice,
    });
    this.scene.launch('main-scene-loading');
    this.statsScene = this.scene.get('stats-scene');
    this.mainSceneLoading = this.scene.get('main-scene-loading');
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    Player.preload(this);
    this.load.image('tiles', 'assets/images/dices.png');
    this.load.image('cyberpunk_bg', 'assets/images/sand_tiles.png');
    this.load.image('cyberpunk_game_objects', 'assets/images/bee.png');
    this.load.image('cyberpunk_game_treasures', 'assets/images/treasures.png');
    this.load.image('hacker_beaver_48', 'assets/images/hacker_beaver_48px.png');
    this.load.image('heavy_beaver_48', 'assets/images/heavy_beaver_48px.png');
    this.load.image('speedy_beaver_48', 'assets/images/speedy_beaver_48px.png');
  }

  async create() {
    console.log('Main Scene - 3. Create');
    this.obstacle = this.physics.add.sprite(240, 240, 'atlas', 'walk-1');
    this.allPlayers = {};
    if (!window.arweaveWallet) {
      this.scene.start('connect-wallet-scene');
    } else {
      this.server = window.game.config.ao
        ? this.initSubscription()
        : this.initWebSocket();
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
      animated: false,
      frame: 'walk-1',
    });

    this.allPlayers[this.mainPlayer.walletAddress] = this.mainPlayer;
    return this.mainPlayer;
  }

  createPlayer(playerInfo) {
    return (this.allPlayers[playerInfo.walletAddress] = new Player({
      walletAddress: playerInfo.walletAddress,
      scene: this,
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
      texture: `${playerInfo.beaverId}_48px`,
      frame: 'walk-1',
    }));
  }

  update() {
    const roundInfo = this.roundTick();

    this.statsScene.walletAddress = this.mainPlayer?.walletAddress;
    this.statsScene.stats = this.mainPlayer?.stats;
    this.statsScene.roundInfo = roundInfo;
    this.statsScene.beaverChoice = this.beaverChoice;

    this.mainPlayer?.update();
  }

  roundTick() {
    if (!this.round) {
      return `Waiting to start the round...`;
    }
    const tsChange = Date.now() - this.round.start;
    const currentRound = ~~(tsChange / this.round.interval);
    const left = ~~(
      10 -
      (10 * (tsChange - currentRound * this.round.interval)) /
        this.round.interval
    );
    if (left === 9) {
      this.mainPlayer.nextRound();
    }

    return `${'◦'.repeat(left)} ${currentRound}`;
  }

  initWebSocket() {
    const ws = new WebSocket('ws://localhost:8080');
    const self = this;
    const mockDataOwner = (data) => {
      const withTags = window.warpAO.data(data);
      return {
        ...withTags,
        Owner: self.walletAddress,
        Tags: withTags.tags,
        Timestamp: Date.now(),
      };
    };

    ws.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);
      console.log(response.cmd);
      self.handleMessage(response);
    });
    ws.addEventListener('open', () => {
      const player = JSON.parse(localStorage.getItem('player'));
      console.log(`Found player info in local storage`, player);
      if (player) {
        const data = mockDataOwner({
          cmd: Const.Command.join,
        });
        console.log('data', data);
        ws.send(JSON.stringify(data));
      } else {
        ws.send(
          JSON.stringify(
            mockDataOwner({
              cmd: Const.Command.register,
              beaverId: self.beaverChoice,
            })
          )
        );
      }
    });
    return {
      send: async (message) => {
        ws.send(JSON.stringify(mockDataOwner(message)));
      },
    };
  }

  initMap(level1, level2, level3) {
    this.groundLayer = this.createLayer(level1, 'cyberpunk_bg', 0);
    this.gameObjectsLayer = this.createLayer(
      level2,
      'cyberpunk_game_objects',
      2
    );
    this.gameTreasuresLayer = this.createLayer(
      level3,
      'cyberpunk_game_treasures',
      1
    );
    // this.gameTreasuresLayer.forEachTile((t) => t.setVisible(false));
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

  initSubscription() {
    initPubSub();
    const self = this;

    console.log('processId', window.warpAO.config.processId);

    const subscription = subscribe(
      `results/ao/${window.warpAO.config.processId}`,
      ({ data }) => {
        const message = JSON.parse(data);
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

        if (message.output.cmd) {
          this.handleMessage(message.output);
        }
      },
      console.error
    )
      .then(() => {
        console.log('Subscription started...');
        const player = JSON.parse(localStorage.getItem('player'));
        console.log(`Found player info in local storage`, player);
        if (player) {
          console.log('Joinning game...');
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
      })
      .catch((e) => console.error(e));

    return {
      send: async (message) => {
        await window.warpAO.send(message);
      },
    };
  }

  handleMessage(response) {
    const self = this;
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

      case Const.Command.moved:
        {
          console.log(
            'Player moved',
            response.player.pos,
            response.player.onGameObject
          );
          if (!self.allPlayers[response.player.walletAddress]) {
            console.log('Setting up new player', response.player.walletAddress);
            self.createPlayer(response.player);
          } else {
            self.allPlayers[response.player.walletAddress].moveTo(
              response.player
            );
          }

          if (response.player.onGameObject != null) {
            console.log(
              `Player stood on a game object: ${JSON.stringify(response.player.onGameObject)}`
            );
            this.mainPlayer.onGameObject = response.player.onGameObject;
          }

          if (response.player.onGameTreasure != null) {
            console.log(
              `Player stood on a game treasure: ${JSON.stringify(response.player.onGameTreasure)}`
            );
            this.mainPlayer.onGameTreasure = response.player.onGameTreasure;
          }

          this.updateStats(response.player, response.stats);
          this.updateStats(response.opponentPlayer, response.opponentStats);
        }
        break;

      case Const.Command.picked:
        {
          if (response.picked) {
            console.log(`Player picked a game object.`);
            this.gameObjectsLayer.removeTileAt(
              response.player.pos[0],
              response.player.pos[1]
            );
            if (response.player.onGameTreasure.type == 'treasure') {
              this.gameTreasuresLayer.putTileAt(
                1,
                response.player.pos[0],
                response.player.pos[1]
              );
            }
            if (
              response.player?.walletAddress === self.mainPlayer.walletAddress
            ) {
              this.game.events.emit(
                EVENTS_NAME.displayHint,
                HINTS.picked(response.picked.type)
              );
            }
          }
          this.updateStats(response.player, response.stats);
        }
        break;

      case Const.Command.digged:
        {
          if (response.digged?.type == Const.GameObject.treasure.type) {
            console.log(`Player digged a game treasure.`);
            this.gameTreasuresLayer
              .getTileAt(response.player.pos[0], response.player.pos[1])
              .setVisible(true);

            if (
              response.player?.walletAddress === self.mainPlayer.walletAddress
            ) {
              this.game.events.emit(
                EVENTS_NAME.displayHint,
                HINTS.digged(response.player.onGameTreasure.type)
              );
            }
          } else {
            const gameObjectTile = this.gameObjectsLayer.getTileAt(
              response.player.pos[0],
              response.player.pos[1]
            )?.index;
            if (gameObjectTile == 2 || gameObjectTile == null) {
              this.gameTreasuresLayer.putTileAt(
                1,
                response.player.pos[0],
                response.player.pos[1]
              );
            }
          }
        }
        this.updateStats(response.player, response.stats);
        break;
    }
  }

  updateStats(responsePlayer, responseStats) {
    const self = this;
    console.log('Player stats', responsePlayer);
    if (responsePlayer?.walletAddress === self.mainPlayer.walletAddress) {
      console.log('Stats update', responsePlayer?.walletAddress);
      self.mainPlayer.stats = responseStats;
    }
  }
}
