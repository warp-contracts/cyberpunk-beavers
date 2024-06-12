import Const from './common/const.mjs';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { walletAddress, stats, scene, x, y, texture, animated, beaverChoice } = data;
    super(scene, x, y, texture);
    this.walletAddress = walletAddress;
    this.beaverChoice = beaverChoice;
    this.stats = stats;
    this.animated = animated;
    scene.add.existing(this);
    if (animated) {
      this.initAnimations();
    }
    this.initInputKeys();
    this.onGameObject = null;
    this.setDepth(3);
    console.log(this);
  }

  moveTo(response) {
    let movementTemplate = {
      targets: this,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onStart: () => {
        this.anims.stop();
        // this.anims.play(`${this.beaverChoice}_idle`, true);
      },
      onComplete: () => {
        this.anims.play(`${this.beaverChoice}_idle`, true);
      },
    };

    const moveHorizontal = 26 + response.pos[0] * Const.Tile.size - this.x;
    const moveVertical = 26 + response.pos[1] * Const.Tile.size - this.y;

    this.scaleX = Math.sign(moveHorizontal) || this.scaleX;
    this.scene.tweens.add({ ...movementTemplate, x: `+=${moveHorizontal}` });
    this.scene.tweens.add({ ...movementTemplate, y: `+=${moveVertical}` });
  }

  update() {
    this.anims.play(`${this.beaverChoice}_idle`, true);
  }

  initAnimations() {
    this.scene.anims.create({
      key: `${this.beaverChoice}_idle`,
      frames: this.scene.anims.generateFrameNames(`${this.beaverChoice}_anim`, {
        prefix: 'frame-',
        start: 0,
        end: 12,
      }),
      frameRate: 24,
    });
  }

  initInputKeys() {
    this.inputKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      p: Phaser.Input.Keyboard.KeyCodes.P,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
}
