import Const, { BEAVER_TYPES } from '../common/const.mjs';
import { convertToCamelCase, trimString } from '../utils/utils.js';
import Phaser from 'phaser';

const RANKING_TO_TEXTURE = {
  1: 'medal_gold',
  2: 'medal_silver',
  3: 'medal_brown',
};
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { walletAddress, userName, stats, equipment, scene, x, y, texture, animated, beaverChoice, tilePos } = data;
    super(scene, x, y, texture);
    this.additionalElements = [];
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
    this.setDepth(10);

    this.position = this.addInfoText(x, y - 55, ``);
    this.healthBar = scene.add.rectangle(x, y - 32, this.calculateBarWidth(this.stats.hp), 6, 0xdc143c);
    this.apBar = scene.add.rectangle(x, y - 40, this.calculateBarWidth(this.stats.ap), 6, 0x25a31f);
    this.healthBar.setDepth(this.depth + 20);
    this.apBar.setDepth(this.depth + 20);
    this.position.setDepth(this.depth + 20);
    const name = this.displayName();
    this.name = scene.add.text(x - 2 * name.length - 8, y + 22, `${name}`, {
      font: '10px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      align: 'center',
    });
    this.name.setDepth(this.depth + 20);
    this.additionalElements.push(this.position, this.healthBar, this.apBar, this.name);
    this.addLayeredSprites();
  }

  addLayeredSprites() {
    const self = this;
    ['blood_splat_1', 'blood_splat_2'].forEach((bs) => {
      self[bs] = self.scene.add.sprite(self.x, self.y, bs);
      self[bs].setOrigin(self.originX, self.originY);
      self[bs].setDepth(self.depth + 1);
      self[bs].setVisible(false);
    });
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
      if (this.medal) {
        const medalIndex = this.additionalElements.indexOf(this.medal);
        if (medalIndex !== -1) {
          this.additionalElements.splice(medalIndex, 1);
        }
        this.medal.destroy();
      }

      if (newPlayerRanking <= 3) {
        this.medal = this.scene.add.image(this.x - 25, this.y - 19, RANKING_TO_TEXTURE[newPlayerRanking]);
        this.medal.setDepth(this.depth + 20);
        this.additionalElements.push(this.medal);
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
        if (isMainPlayer || this.scene.spectatorMode) this.scene.explosionSound.play();
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

  isLocked() {
    return this.locked;
  }

  attackAnim() {
    this.anims.play(`${this.beaverChoice}_attack`, true);
  }

  deathAnim(killer, shouldPlaySound) {
    const kill = BEAVER_TYPES[killer].stats.kill;
    const random = Math.floor(Math.random() * Const.DEATH_SOUND_OPTIONS + 1);
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

  bloodSplatAnim(isMainPlayer) {
    const self = this;
    const bloodSplat = `blood_splat_${self.stats.hp.current >= self.stats.hp.max * 0.5 ? '1' : '2'}`;
    const bloodSplatSprite = self[bloodSplat];
    const bloodSplatSound = self.scene[`${convertToCamelCase(bloodSplat)}Sound`];
    bloodSplatSprite.setPosition(self.x, self.y);
    bloodSplatSprite.setVisible(true);
    bloodSplatSprite.anims.play(bloodSplat, true);
    if (isMainPlayer || self.scene.spectatorMode) bloodSplatSound.play();
    bloodSplatSprite.on('animationcomplete', () => {
      bloodSplatSprite.setVisible(false);
    });
  }

  baseMoveTo(pos, onStart, onComplete) {
    let movementTemplate = {
      targets: [this, this.name, this.position, this.medal, this.healthBar, this.apBar],
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 300,
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

  setVisible(value) {
    super.setVisible(value);
    for (const e of this.additionalElements) {
      e.setVisible(value);
    }
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
      three: Phaser.Input.Keyboard.KeyCodes.THREE,
      four: Phaser.Input.Keyboard.KeyCodes.FOUR,
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
