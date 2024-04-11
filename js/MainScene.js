import Player from './Player.js';
import webSocketMock from './WebSockerMock.js';
import Const from './common/const.mjs';
import MainPlayer from './MainPlayer.js';

export default class MainScene extends Phaser.Scene {
  round;
  obstacle;
  pInfo;
  gameObjectsLayer;
  constructor() {
    super('MainScene');
  }

  preload() {
    Player.preload(this);
    this.load.image('tiles', 'assets/images/dices.png');
    this.load.image('cyberpunk_bg', 'assets/images/bg_tiles.png');
    this.load.image('cyberpunk_game_objects', 'assets/images/bee.png');
  }

  create() {
    this.initWebSocket();
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
      playerName: playerInfo.name,
      stats: playerInfo.stats,
      scene: this,
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
      texture: 'atlas',
      frame: 'walk-1',
    });
    this.mainPlayer.anims.play('idle', true);

    this.allPlayers[this.mainPlayer.playerName] = this.mainPlayer;
    return this.mainPlayer;
  }

  createPlayer(playerInfo) {
    return (this.allPlayers[playerInfo.pid] = new Player({
      playerName: playerInfo.pid,
      scene: this,
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
      texture: 'atlas',
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
      `${this.mainPlayer?.playerName}\n${roundInfo}\n${stats}`
    );

    this.mainPlayer?.update();
    for (const [_, player] of Object.entries(this.allPlayers)) {
      if (!player.anims.isPlaying) {
        player.anims.play('idle');
      }
    }
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
    if (game.config.useWebSocket) {
      this.ws = new WebSocket('ws://localhost:8080');
    } else {
      this.ws = webSocketMock();
    }

    const self = this;
    self.ws.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);
      console.log(response.cmd);
      switch (response.cmd) {
        case Const.Command.registered:
          {
            console.log('Registered player', response.player);
            localStorage.setItem(
              'player',
              JSON.stringify({ id: response.player.name })
            );
            self.round = response.round;
            self.initMap(response.groundTilemap, response.gameObjectsTilemap);
            self.createMainPlayer(response.player);
            self.initCamera();
          }
          break;

        case Const.Command.moved:
          {
            console.log('Player moved', event.data);
            if (!self.allPlayers[response.pid]) {
              console.log('Setting up new player', response.pid);
              self.createPlayer(response);
            } else {
              self.allPlayers[response.pid].moveTo(response);
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
            if (response.pid === self.mainPlayer.playerName) {
              console.log('Stats update', response.pid);
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
      }
    });
    self.ws.addEventListener('open', () => {
      const player = localStorage.getItem('player');
      if (!player) {
        self.ws.send(JSON.stringify({ cmd: Const.Command.register }));
      } else {
        self.ws.send(
          JSON.stringify({
            cmd: Const.Command.join,
            playerId: JSON.parse(player).id,
          })
        );
      }
    });
  }

  initMap(level1, level2) {
    this.groundLayer = this.createLayer(level1, 'cyberpunk_bg', 0);
    this.gameObjectsLayer = this.createLayer(level2, 'cyberpunk_game_objects');
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
}
