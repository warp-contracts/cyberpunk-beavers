import Player from './Player.js';
import EVENTS_NAME from './const.js';

const level1 = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
];

const level2 = [
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
  ],
];

export default class MainScene extends Phaser.Scene {
  collideLayer;
  obstacle;
  constructor() {
    super('MainScene');
  }

  preload() {
    Player.preload(this);
    this.load.image('tiles', 'assets/images/dices.png');
    // this.load.tilemapTiledJSON('map', 'assets/images/map.json');
  }

  create() {
    this.initMap();
    this.obstacle = this.physics.add.sprite(240, 240, 'atlas', 'walk-1');
    this.player = new Player({
      scene: this,
      x: 74,
      y: 74,
      texture: 'atlas',
      frame: 'walk-1',
    });
    this.player.anims.play('idle', true);
    // this.player.setDepth(2);

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
    });

    // function collisionHandler(obj1, obj2) {
    //   console.log('Colliding!', obj1, obj2);
    // }
    // this.physics.collide(
    //   this.player,
    //   this.collideLayer,
    //   collisionHandler,
    //   null,
    //   this
    // );
    // this.collideLayer.setCollision(1);

    // this.physics.add.collider(this.player, this.collideLayer);

    this.showDebugWalls();

    this.physics.collide(
      this.player,
      this.obstacle,
      () => console.log('colide'),
      null,
      this
    );

    this.initCamera();
    this.initListeners();
  }

  update() {
    this.player.update();
    if (!this.player.anims.isPlaying) {
      this.player.anims.play('idle');
    }
  }

  initMap() {
    // const map = this.make.tilemap({ key: 'map' });
    const map = this.make.tilemap({
      data: level1,
      tileWidth: 48,
      tileHeight: 48,
    });

    const tiles = map.addTilesetImage('tiles');
    const groundLayer = map.createLayer(0, tiles, 0, 0);
    // // layer.setDepth(0);

    const map2 = this.make.tilemap({
      data: level2,
      tileWidth: 48,
      tileHeight: 48,
    });
    // const tiles = map2.addTilesetImage('tiles');

    map2.addTilesetImage('tiles');
    this.collideLayer = map2.createLayer(0, tiles, 0, 0);

    // this.collideLayer.setDepth(10);
    map2.replaceByIndex(3, -1);
    this.physics.world.setBounds(
      0,
      0,
      this.collideLayer.width,
      this.collideLayer.height
    );
    this.collideLayer.setCollision(1);
    // this.physics.add.existing(this.collideLayer);

    // console.log(map2);

    // const tileset = map.addTilesetImage(
    //   'First Asset pack',
    //   'tiles',
    //   12,
    //   12,
    //   0,
    //   0
    // );
    // const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0);
    // const layer2 = map.createLayer('Tile Layer 2', tileset, 0, 0);
    // layer1.setCollisionByProperty({ collides: true });
    // layer2.setCollisionByProperty({ collides: true });

    // this.matter.world.convertTilemapLayer(layer1);
    // this.matter.world.convertTilemapLayer(layer2);

    // this.arcade.world.convertTilemapLayer(layer);
    this.showDebugWalls();
  }

  showDebugWalls() {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.collideLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  initCamera() {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(1);
  }

  handleValueChange(value) {
    if (value == 'a') {
      var tween = this.tweens.add({
        targets: this.player,
        // x: 1,
        x: '-=48',
        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false,
        onStart: () => {
          this.player.anims.play('walk', true);
          this.player.scaleX = -1;
        },
        onComplete: () => {
          this.player.anims.play('idle', true);
        },
      });
    } else if (value == 'd') {
      var tween = this.tweens.add({
        targets: this.player,
        // x: 1,
        x: '+=48',
        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false,
        onStart: () => {
          this.player.anims.play('walk', true);
          this.player.scaleX = 1;
        },
        onComplete: () => {
          this.player.anims.play('idle', true);
        },
      });
    } else if (value == 's') {
      var tween = this.tweens.add({
        targets: this.player,
        // x: 1,
        y: '+=48',
        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false,
        onStart: () => {
          this.player.anims.play('walk', true);
          // this.player.scaleX = 1;
        },
        onComplete: () => {
          this.player.anims.play('idle', true);
        },
      });
    } else if (value == 'w') {
      var tween = this.tweens.add({
        targets: this.player,
        // x: 1,
        y: '-=48',
        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false,
        onStart: () => {
          this.player.anims.play('walk', true);
        },
        onComplete: () => {
          this.player.anims.play('idle', true);
        },
      });
    } else {
      this.player.anims.play('idle', true);
    }
  }

  initListeners() {
    console.log('initializing events');
    this.game.events.on(EVENTS_NAME.currentMove, this.handleValueChange, this);
  }
}
