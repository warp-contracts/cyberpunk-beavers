import Const, { BEAVER_TYPES } from '../common/const.mjs';
import { trimString } from '../utils/utils.js';
import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { walletAddress, userName, stats, equipment, scene, x, y, texture, animated, beaverChoice } = data;
    super(scene, x, y, texture);
    this.walletAddress = walletAddress;
    this.beaverChoice = beaverChoice;
    this.userName = userName;
    this.stats = stats;
    this.equipment = equipment;
    this.animated = animated;
    this.locked = false;
    scene.add.existing(this);
    this.initInputKeys();
    this.onGameObject = null;
    this.setDepth(5);

    this.position = this.addInfoText(x, y - 55, ``);
    this.healthBar = scene.add.rectangle(x, y - 32, this.calculateBarWidth(this.stats.hp), 6, 0xdc143c);
    this.apBar = scene.add.rectangle(x, y - 40, this.calculateBarWidth(this.stats.ap), 6, 0x00ff00);
    this.healthBar.setDepth(10);
    this.apBar.setDepth(10);
    this.position.setDepth(10);

    const name = this.displayName();
    this.name = scene.add.text(x - 2 * name.length - 8, y + 22, `${name}`, {
      font: '10px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      align: 'center',
    });
    this.name.setDepth(8);
  }

  calculateBarWidth(stats) {
    const percentage = stats.current / stats.max;
    return Math.min(1, percentage) * 45;
  }

  displayName() {
    if (this.userName) {
      if (this.userName.length > 8) {
        return trimString(this.userName, 2, 2, 2);
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

  updatePlayerPosition() {
    const newPlayerRanking = this.scene.ranking.indexOf(this.scene.ranking.find((r) => r[0] == this.walletAddress)) + 1;
    if (this.playerRanking != newPlayerRanking) {
      this.playerRanking = newPlayerRanking;
      const text = `${this.playerRanking}/${this.scene.ranking.length}`;
      this.position.setText(text);
      this.position.x = this.x - 3 * text.length;
      if (this.medal) this.medal.destroy();
      switch (this.playerRanking) {
        case 1:
          this.medal = this.scene.add.image(this.x - 25, this.y - 19, 'medal_gold');
          this.medal.setDepth(8);
          break;
        case 2:
          this.medal = this.scene.add.image(this.x - 25, this.y - 19, 'medal_silver');
          this.medal.setDepth(8);
          break;
        case 3:
          this.medal = this.scene.add.image(this.x - 25, this.y - 19, 'medal_brown');
          this.medal.setDepth(8);
          break;
      }
    }
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
      }
    );
  }

  moveAndExplode(response, isMainPlayer) {
    const self = this;
    this.baseMoveTo(
      response.movedPos,
      () => {
        self.anims.stop();
        self.anims.play(`${self.beaverChoice}_walk`, true);
      },
      () => {
        self.anims.stop();
        if (isMainPlayer) this.scene.explosionSound.play();
        this.explosionAnim().once('animationcomplete', () => {
          self.moveTo(response);
        });
      }
    );
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  attackAnim() {
    this.anims.play(`${this.beaverChoice}_attack`, true);
  }

  deathAnim(killer, shouldPlaySound) {
    const kill = BEAVER_TYPES[killer].stats.kill;
    const random = Math.floor(Math.random() * (Const.DEATH_SOUND_OPTIONS - 1 + 1) + 1);
    if (shouldPlaySound) this.scene[`${kill}${random}DeathSound`].play();
    return this.anims.play(`${this.beaverChoice}_death_${kill}`, true);
  }

  digAnim() {
    this.anims.play(`${this.beaverChoice}_dig`, true);
  }

  pickAnim() {
    this.anims.play(`${this.beaverChoice}_pick`, true);
  }

  explosionAnim() {
    return this.anims.play(`explosion_anim`, true);
  }

  baseMoveTo(pos, onStart, onComplete) {
    let movementTemplate = {
      targets: this,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onStart,
      onComplete,
    };

    // TODO: this should fixed? and use prevPos into account
    const moveHorizontal = 24 + pos.x * Const.Tile.size - this.x;
    const moveVertical = 24 + pos.y * Const.Tile.size - this.y;

    this.scaleX = Math.sign(moveHorizontal) || this.scaleX;
    this.scene.tweens.add({ ...movementTemplate, x: `+=${moveHorizontal}`, y: `+=${moveVertical}` });
    this.scene.tweens.add({
      ...movementTemplate,
      targets: [this.name, this.position, this.medal, this.healthBar, this.apBar /*this.rangeBarX, this.rangeBarY*/],
      x: `+=${moveHorizontal}`,
      y: `+=${moveVertical}`,
    });

    return { movementTemplate, moveHorizontal, moveVertical };
  }

  blink() {
    this.scene.add.tween({
      targets: [this],
      ease: 'Sine.easeInOut',
      duration: 300,

      delay: 0,
      yoyo: true,
      alpha: { from: 1, to: 0 },
      repeat: 2,
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
      c: Phaser.Input.Keyboard.KeyCodes.C,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      one: Phaser.Input.Keyboard.KeyCodes.ONE,
      two: Phaser.Input.Keyboard.KeyCodes.TWO,
    });
  }

  addInfoText(x, y, text) {
    return this.scene.add.text(x, y, text, {
      font: '10px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      align: 'center',
    });
  }
}
