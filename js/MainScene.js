import Player from './Player.js';
import webSocketMock from "./WebSockerMock.js";
import Const from "./common/const.mjs";
import MainPlayer from "./MainPlayer.js";


export default class MainScene extends Phaser.Scene {
  round;
  obstacle;
  pInfo;
  constructor() {
    super('MainScene');
  }

  preload() {
    Player.preload(this);
    this.load.image('tiles', 'assets/images/dices.png');
    this.load.image('cyberpunk_bg', 'assets/images/bg_tiles.png');
    // this.load.tilemapTiledJSON('map', 'assets/images/map.json');
  }

  create() {
    this.initWebSocket();
    this.obstacle = this.physics.add.sprite(240, 240, 'atlas', 'walk-1');
    this.pInfo = this.add.text(10, 10, 'Playeroo')
        .setOrigin(0)
        .setStyle({fontFamily: 'Arial'});
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

    this.mainPlayer.inputKeys = this.input.keyboard.createCursorKeys();
    this.allPlayers[this.mainPlayer.playerName] = this.mainPlayer;
    return this.mainPlayer;
  }

  createPlayer(playerInfo) {
    return this.allPlayers[playerInfo.pid] = new Player({
      playerName: playerInfo.pid,
      scene: this,
      x: 26 + playerInfo.pos[0] * Const.Tile.size,
      y: 26 + playerInfo.pos[1] * Const.Tile.size,
      texture: 'atlas',
      frame: 'walk-1',
    });
  }

  update() {
    const roundInfo = this.roundTick();
    this.pInfo.x = this.mainPlayer?.x - game.config.width/2 + 20;
    this.pInfo.y = this.mainPlayer?.y - game.config.height/2 + 20;
    const ps = this.mainPlayer?.stats;
    const stats = `AP: ${ps?.ap.current} \nHP:${ps?.hp.current} \nScore: ${ps?.score}`
    this.pInfo.setText(`${this.mainPlayer?.playerName}\n${roundInfo}\n${stats}`);

    this.mainPlayer?.update();
    for (const [_, player] of Object.entries(this.allPlayers)) {
      if (!player.anims.isPlaying) {
        player.anims.play('idle');
      }
    }
  }

  roundTick() {
    if (!this.round) {
      return `Waiting to start the round...`
    }
    const tsChange = Date.now() - this.round.start;
    const currentRound = ~~(tsChange / this.round.interval);
    const left = ~~(10 - 10 * (tsChange - currentRound * this.round.interval)/this.round.interval);
    if (left === 9) {
      this.mainPlayer.nextRound();
    }

    return `Round: ${currentRound} ${'◦'.repeat(left)}`
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

      switch (response.cmd) {
        case Const.Command.registered: {
          console.log('Registered player', response.player);
          localStorage.setItem('player', JSON.stringify( { id: response.player.name }));
          self.round = response.round;
          self.initMap(response.level1, response.level2);
          self.createMainPlayer(response.player);
          self.initCamera();
        }
        break;

        case Const.Command.moved: {
          console.log('Player moved', event.data);
          if (!self.allPlayers[response.pid]) {
            console.log('Setting up new player', response.pid);
            self.createPlayer(response);
          } else {
            self.allPlayers[response.pid].moveTo(response);
          }
        }
        break;

        case Const.Command.stats: {
          console.log('Player stats', event.data);
          if (response.pid === self.mainPlayer.playerName) {
            console.log('Stats update', response.pid);
            self.mainPlayer.stats = response.stats
          }
        }
      }

    })
    self.ws.addEventListener("open", () => {
      const player = localStorage.getItem('player');
      if (!player) {
        self.ws.send(JSON.stringify({ cmd: Const.Command.register}));
      } else {
        self.ws.send(JSON.stringify({ cmd: Const.Command.join, playerId: JSON.parse(player).id }));
      }


    });
  }

  initMap(level1, level2) {
    // const map = this.make.tilemap({ key: 'map' });
    const map = this.make.tilemap({
      data: level1,
      tileWidth: Const.Tile.size,
      tileHeight: Const.Tile.size,
    });

    const tiles = map.addTilesetImage('cyberpunk_bg');
    map.createLayer(0, tiles, 0, 0);
    // // layer.setDepth(0);

    // const map2 = this.make.tilemap({
    //   data: level2,
    //   tileWidth: Const.Tile.size,
    //   tileHeight: Const.Tile.size,
    // });
    // const tiles = map2.addTilesetImage('tiles');

    // const tiles2 = map2.addTilesetImage('tiles');
    // map2.createLayer(1, tiles2, 0, 0);
  }

  initCamera() {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.mainPlayer, true, 0.09, 0.09);
    this.cameras.main.setZoom(1);
  }
}
