import Const from './common/const.mjs';
import Player from './Player.js';
import { EVENTS_NAME } from './utils/events.js';

const { up, left, right, down } = Const.Direction;
const { attack, move, pick, dig } = Const.Command;

export default class MainPlayer extends Player {
  combatMode = false;
  mainScene;
  lastNoApPlayTimestamp;

  constructor(data) {
    let { stats, scene, x, y } = data;
    super(data);

    const attackMarkers = stats.attack_range * 2 + 1;

    this.rangeBarX = scene.add.grid(x, y, attackMarkers * 48, 48, 48, 48, 0xff0000, 0.2);
    this.rangeBarY = scene.add.grid(x, y, 48, attackMarkers * 48, 48, 48, 0xff0000, 0.2);
  }

  async update() {
    if (this.stats.ap.current === 0) {
      if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
      if (!this.mainScene.notEnoughApSound.isPlaying && !this.mainScene.beaverEliminatedSound.isPlaying) {
        const now = Date.now();
        if (!this.lastNoApPlayTimestamp || now - this.lastNoApPlayTimestamp > 5000) {
          this.mainScene.notEnoughApSound.play();
          this.lastNoApPlayTimestamp = now;
        }
      }
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputKeys.space)) {
      this.combatMode = true;
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      await this.action(left);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      await this.action(right);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      await this.action(up);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      await this.action(down);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
      this.combatMode = false;
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.p)) {
      if (this.onGameObject) {
        await this.send({ cmd: pick });
        this.pickAnim();
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.d) && this.stats.ap.current >= 2) {
      await this.send({ cmd: dig });
      this.digAnim();
    } else {
      if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
    }
  }

  baseMoveTo(pos, onStart, onComplete) {
    const { movementTemplate, moveHorizontal, moveVertical } = super.baseMoveTo(pos, onStart, onComplete);
    this.scene.tweens.add({
      ...movementTemplate,
      targets: [this.rangeBarX, this.rangeBarY],
      x: `+=${moveHorizontal}`,
      y: `+=${moveVertical}`,
    });
  }

  async action(dir) {
    switch (dir) {
      case left:
        this.scaleX = -1;
        break;
      case right:
        this.scaleX = 1;
        break;
    }
    if (this.combatMode) {
      await this.send({ cmd: attack, dir });
      this.attackAnim();
    } else {
      await this.send({ cmd: move, dir });
    }
  }

  nextRound() {
    this.stats.ap.current = this.stats.ap.max;
    this.updateStats(this.stats);
    this.scene.game.events.emit(EVENTS_NAME.updateStats, { player: this.stats });
  }

  async send(message) {
    if (this.locked) return;
    if (this.mainScene.lockingTx) {
      console.log(`Action locked for tx`, this.mainScene.lockingTx);
    } else {
      try {
        this.mainScene.lockingTx = (await this.scene.server.send(message)).id;
      } catch (e) {
        console.error(e);
        this.mainScene.lockingTx = null;
      }
      console.log('Locked actions until tx is resolved', this.mainScene.lockingTx);
    }
  }
}
