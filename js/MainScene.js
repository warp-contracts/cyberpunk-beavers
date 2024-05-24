import Player from './Player.js';
import Const from './common/const.mjs';
import MainPlayer from './MainPlayer.js';
import { initPubSub, subscribe } from 'warp-contracts-pubsub';

export default class MainScene extends Phaser.Scene {
  round;
  obstacle;
  pInfo;
  gameObjectsLayer;
  constructor() {
    super('MainScene');
  }

  init(data) {
    console.log('Main Scene - 1. Init', data);
    this.beaverChoice = data.beaverChoice;
    this.signer = data.signer;
    this.walletAddress = data.walletAddress;
  }

  preload() {
    console.log('Main Scene - 2. Preload');
    Player.preload(this);
    this.load.image('tiles', 'assets/images/dices.png');
    this.load.image('cyberpunk_bg', 'assets/images/bg_tiles.png');
    this.load.image('cyberpunk_game_objects', 'assets/images/bee.png');
    this.load.image('beaver_agile48', 'assets/images/beaver_agile48.png');
    this.load.image('beaver_runner48', 'assets/images/beaver_runner48.png');
    this.load.image('beaver_tank48', 'assets/images/beaver_tank48.png');
    this.load.image(
      'beaver_techy48',
      'assets/images/beaver_player_techy48.png'
    );
    this.load.image(
      'beaver_water_pistol48',
      'assets/images/beaver_water_pistol48.png'
    );
    this.load.image('player_bat48', 'assets/images/idle_bat.png');
  }

  create() {
    console.log('Main Scene - 3. Create');
    this.initSubscription();
    //this.initWebSocket();
    this.obstacle = this.physics.add.sprite(240, 240, 'atlas', 'walk-1');
    this.pInfo = this.add
      .text(10, 10, 'Playeroo')
      .setOrigin(0)
      .setStyle({ fontFamily: 'Arial' });
    this.pInfo.setDepth(10);
    this.allPlayers = {};
  }

  createMainPlayer(playerInfo) {
    this.mainPlayer = new MainPlayer({
      walletAddress: playerInfo.walletAddress,
      signer: this.signer,
      stats: playerInfo.stats,
      scene: this,
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
      texture: `${playerInfo.beaverId}48`,
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
      texture: `${playerInfo.beaverId}48`,
      frame: 'walk-1',
    }));
  }

  update() {
    const roundInfo = this.roundTick();
    this.pInfo.x = this.mainPlayer?.x - game.config.width / 2 + 20;
    this.pInfo.y = this.mainPlayer?.y - game.config.height / 2 + 20;
    const ps = this.mainPlayer?.stats;
    const stats = `AP: ${ps?.ap.current} \nHP:${ps?.hp.current} \nScore: ${ps?.score}`;
    this.pInfo.setText(
      `${this.mainPlayer?.walletAddress}\n${roundInfo}\n${stats}`
    );

    this.mainPlayer?.update();
    // for (const [_, player] of Object.entries(this.allPlayers)) {
    //   if (!player.anims.isPlaying) {
    //     player.anims.play('idle');
    //   }
    // }
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

    return `Round: ${currentRound} ${'◦'.repeat(left)}`;
  }

  initWebSocket() {
    this.ws = new WebSocket('ws://localhost:8080');

    const self = this;
    self.ws.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);
      console.log(response.cmd);
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
              self.initMap(response.groundTilemap, response.gameObjectsTilemap);
              self.createMainPlayer(response.player);
              self.initCamera();
            }
          }
          break;

        case Const.Command.moved:
          {
            console.log('Player moved', event.data);
            if (!self.allPlayers[response.walletAddress]) {
              console.log('Setting up new player', response.walletAddress);
              self.createPlayer(response);
            } else {
              self.allPlayers[response.walletAddress].moveTo(response);
            }

            if (response.onGameObject != null) {
              console.log(
                `Player stood on a game object: ${JSON.stringify(response.onGameObject)}`
              );
              this.mainPlayer.onGameObject = response.onGameObject;
            }
          }
          break;

        case Const.Command.stats:
          {
            console.log('Player stats', event.data);
            if (response.walletAddress === self.mainPlayer.walletAddress) {
              console.log('Stats update', response.walletAddress);
              self.mainPlayer.stats = response.stats;
            }
          }
          break;

        case Const.Command.picked:
          {
            console.log(`Player picked a game object.`);
            this.gameObjectsLayer.removeTileAt(
              response.pos[0],
              response.pos[1]
            );
          }
          break;

        case Const.Command.digged:
          {
            console.log(`Player digged a game object.`);
            this.gameObjectsLayer
              .getTileAt(response.pos[0], response.pos[1])
              .setVisible(true);
          }
          break;
      }
    });
    self.ws.addEventListener('open', () => {
      const player = JSON.parse(localStorage.getItem('player'));
      console.log(`Found player info in local storage`, player);
      if (player) {
        self.ws.send(
          JSON.stringify({
            cmd: Const.Command.join,
            walletAddress: this.walletAddress,
          })
        );
      } else {
        self.ws.send(
          JSON.stringify({
            cmd: Const.Command.register,
            walletAddress: this.walletAddress,
            beaverId: self.beaverChoice,
          })
        );
      }
    });
  }

  initMap(level1, level2) {
    this.groundLayer = this.createLayer(level1, 'cyberpunk_bg', 0);
    this.gameObjectsLayer = this.createLayer(level2, 'cyberpunk_game_objects');
    this.gameObjectsLayer.forEachTile((t) => t.setVisible(false));
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

    console.log("processId", window.__ao.config.processId);

    const subscription = subscribe(
        `results/ao/${window.__ao.config.processId}`,
        ({ data }) => {
          const message = JSON.parse(data);
          console.log('\n ==== new message ==== ', message.nonce);
          if (message.tags) {
            const salt = message.tags.find(t => t.name === 'Salt');
            console.log('\n ==== created      ==== ', new Date(parseInt(salt.value)));
          }
          console.log('\n ==== sent from CU ==== ', message.sent);
          console.log('\n ==== received     ==== ', new Date());

          handleMessage(message.response);
        },
        console.error
    )
        .then(() => console.log('waiting for messages...'))
        .catch((e) => console.error(e));


    function handleMessage(response) {
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
            self.initMap(response.groundTilemap, response.gameObjectsTilemap);
            self.createMainPlayer(response.player);
            self.initCamera();
          }
        }
          break;

        case Const.Command.moved:
        {
          console.log('Player moved', event.data);
          if (!self.allPlayers[response.walletAddress]) {
            console.log('Setting up new player', response.walletAddress);
            self.createPlayer(response);
          } else {
            self.allPlayers[response.walletAddress].moveTo(response);
          }

          if (response.onGameObject != null) {
            console.log(
                `Player stood on a game object: ${JSON.stringify(response.onGameObject)}`
            );
            this.mainPlayer.onGameObject = response.onGameObject;
          }
        }
          break;

        case Const.Command.stats:
        {
          console.log('Player stats', event.data);
          if (response.walletAddress === self.mainPlayer.walletAddress) {
            console.log('Stats update', response.walletAddress);
            self.mainPlayer.stats = response.stats;
          }
        }
          break;

        case Const.Command.picked:
        {
          console.log(`Player picked a game object.`);
          this.gameObjectsLayer.removeTileAt(
              response.pos[0],
              response.pos[1]
          );
        }
          break;

        case Const.Command.digged:
        {
          console.log(`Player digged a game object.`);
          this.gameObjectsLayer
              .getTileAt(response.pos[0], response.pos[1])
              .setVisible(true);
        }
          break;
      }
    }


  }
}
