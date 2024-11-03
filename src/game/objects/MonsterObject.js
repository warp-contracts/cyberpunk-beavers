import Const, { BEAVER_TYPES, PLAYER_DEPTH } from '../common/const.mjs';
import Phaser from 'phaser';
import { MONSTER_TYPES, MONSTERS_HIERARCHY } from '../common/horde-const.mjs';

export const MONSTER_TO_BEAVER = {
  [MONSTER_TYPES.private.type]: BEAVER_TYPES.hacker_beaver.name,
  [MONSTER_TYPES.sergeant.type]: BEAVER_TYPES.heavy_beaver.name,
  [MONSTER_TYPES.lieutenant.type]: BEAVER_TYPES.hacker_beaver.name,
  [MONSTER_TYPES.captain.type]: BEAVER_TYPES.heavy_beaver.name,
  [MONSTER_TYPES.major.type]: BEAVER_TYPES.hacker_beaver.name,
  [MONSTER_TYPES.colonel.type]: BEAVER_TYPES.heavy_beaver.name,
};

export default class MonsterObject extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { monster, scene } = data;
    const texture = `${MONSTER_TO_BEAVER[monster.type]}_48`;
    super(scene, monster.pos.x, monster.pos.y, texture);
    this.additionalElements = [];
    this.walletAddress = monster.walletAddress;
    this.beaverChoice = MONSTER_TO_BEAVER[monster.type];
    this.stats = monster.stats;
    this.locked = false;
    scene.add.existing(this);
    this.setDepth(PLAYER_DEPTH);

    this.healthBar = scene.add.rectangle(this.x, this.y - 32, this.calculateBarWidth(this.stats.hp), 6, 0xdc143c);
    this.healthBar.setDepth(this.depth + 20);
    /* const displayName = monster.stats.type;
    this.name = scene.add.text(this.x - 2 * displayName.length - 8, this.y + 22, `${displayName}`, {
      font: '10px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      align: 'center',
    });*/
    this.addLayeredSprites();
    this.additionalElements.push(this.healthBar /*, this.name*/);

    this.monsterFx = this.postFX.addGlow(monster.stats.color, 2, 0, false, 0.1, 12);
    this.setScale(1 + MONSTERS_HIERARCHY.indexOf(monster.stats.type) / 10);
    this.setTint(monster.stats.color);
    this.monsterTween = this.scene.tweens.add({
      targets: this.monsterFx,
      outerStrength: 8,
      yoyo: true,
      loop: -1,
      ease: 'sine.inout',
    });
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

  updateStats(newStats) {
    this.healthBar.setSize(this.calculateBarWidth(newStats.hp), 6);
    this.stats = newStats;
  }

  setVisible(value) {
    super.setVisible(value);
    for (const e of this.additionalElements) {
      e.setVisible(value);
    }
  }

  moveTo(pos, playExplosion) {
    const self = this;
    if (self.isDead()) {
      return;
    }
    self.stats.pos = pos;
    self.baseMoveTo(
      pos,
      () => {
        if (self.isDead()) {
          return;
        }
        self.anims?.stop();
        self.anims?.play(`${self.beaverChoice}_walk`, true);
      },
      () => {
        if (self.isDead()) {
          return;
        }
        self.anims?.stop();
        if (playExplosion) {
          console.log('playing explosion anim');
          self.explosionAnim().once('animationcomplete', () => {
            self.anims.play(`${self.beaverChoice}_idle`, true);
          });
        } else {
          self.anims.play(`${self.beaverChoice}_idle`, true);
        }
      }
    );
  }

  kill() {
    this.lock();
    this.anims.stop();
    this.healthBar.setVisible(false);
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

  explosionAnim() {
    return this.anims.play(`explosion_anim`, false);
  }

  bloodSplatAnim(isMainPlayer) {
    const self = this;
    const bloodSplat = `blood_splat_${self.stats.hp.current >= self.stats.hp.max * 0.5 ? '1' : '2'}`;
    const bloodSplatSprite = self[bloodSplat];
    bloodSplatSprite.setPosition(self.x, self.y);
    bloodSplatSprite.setVisible(true);
    bloodSplatSprite.anims.play(bloodSplat, true);
    bloodSplatSprite.on('animationcomplete', () => {
      bloodSplatSprite.setVisible(false);
    });
  }

  baseMoveTo(pos, onStart, onComplete) {
    let movementTemplate = {
      targets: [this, this.healthBar /*this.name*/],
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

  update() {
    if (this.anims.isPlaying || this.isDead()) {
      return;
    }
    this.anims.play(`${this.beaverChoice}_idle`, true);
  }

  isDead() {
    return this.stats.hp.current <= 0;
  }
}
