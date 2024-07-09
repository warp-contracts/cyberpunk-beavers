import Const from './common/const.mjs';
import { trimString } from "./utils/utils.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { walletAddress, userName, stats, scene, x, y, texture, animated, beaverChoice } = data;
    super(scene, x, y, texture);
    this.walletAddress = walletAddress;
    this.beaverChoice = beaverChoice;
    this.userName = userName;
    this.stats = stats;
    this.animated = animated;
    scene.add.existing(this);
    this.initInputKeys();
    this.onGameObject = null;
    this.setDepth(5);

    this.healthBar = scene.add.rectangle(x, y - 32, this.calculateBarWidth(this.stats.hp), 6, 0xdc143c);
    this.apBar = scene.add.rectangle(x, y - 40, this.calculateBarWidth(this.stats.ap), 6, 0x00ff00);
    this.healthBar.setDepth(10);
    this.apBar.setDepth(10);

    const name = this.displayName();
    this.name = scene.add.text(x-2*name.length-8, y+22, name,
      {font: '10px', fill: "#ffffff", backgroundColor: "#000000", align: "center"});
    this.name.setDepth(8);
  }

  calculateBarWidth(stats) {
    const percentage = stats.current / stats.max;
    return Math.min(1, percentage) * 45;
  }

  displayName() {
    if (this.userName) {
      if (this.userName.length > 8) {
        return trimString(this.userName, 2, 2, 2)
      }
      return this.userName;
    }
    return trimString(this.walletAddress, 2, 2, 2);
  }

  updateStats(newStats) {
    this.healthBar.setSize(this.calculateBarWidth(newStats.hp), 6);
    this.apBar.setSize(this.calculateBarWidth(newStats.ap), 6);
    this.stats = newStats;
  }

  moveTo(response) {
    const self = this;
    this.baseMoveTo(
      response.pos,
      () => {
        self.anims.stop();
        self.anims.play(`${self.beaverChoice}_walk`, true);
      },
      () => {
        self.anims.stop();
        self.anims.play(`${self.beaverChoice}_idle`, true);
      });
  }

  attackAnim() {
    this.anims.play(`${this.beaverChoice}_attack`, true);
  }

  digAnim() {
    this.anims.play(`${this.beaverChoice}_dig`, true);
  }

  pickAnim() {
    this.anims.play(`${this.beaverChoice}_pick`, true);
  }

  baseMoveTo(pos, onStart, onComplete) {
    // console.log(`baseMoveTo`, pos);
    let movementTemplate = {
      targets: this,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onStart,
      onComplete
    };

    // TODO: this should fixed? and use prevPos into account
    const moveHorizontal = 24 + pos.x * Const.Tile.size - this.x;
    const moveVertical = 24 + pos.y * Const.Tile.size - this.y;

    this.scaleX = Math.sign(moveHorizontal) || this.scaleX;
    this.scene.tweens.add({ ...movementTemplate, x: `+=${moveHorizontal}`, y: `+=${moveVertical}` });
    this.scene.tweens.add({ ...movementTemplate, targets: [this.name, this.healthBar, this.apBar, /*this.rangeBarX, this.rangeBarY*/], x: `+=${moveHorizontal}`, y: `+=${moveVertical}` });

    return { movementTemplate, moveHorizontal, moveVertical }
  }


  bloodyRespawn(pos) {
    const self = this;
    self.scene.tweens.add({
        targets: [self],
        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 200,
        x: self.x,
        delay: 0,
        repeat: 2, // -1: infinity
        yoyo: false,
        onStart: () => {
          self.anims.play(`blood`, true);
        },
        onComplete: () => {
          self.baseMoveTo(
            pos,
            () => {},
            () => self.blink());
        },
      }
    );
  }

  blink() {
    this.scene.add.tween({
      targets: [this],
      ease: 'Sine.easeInOut',
      duration: 300,

      delay: 0,
      yoyo: true,
      alpha: { from: 1, to: 0 },
      repeat: 2
    });
  }

  update() {
    if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
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
