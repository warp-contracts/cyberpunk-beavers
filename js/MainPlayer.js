import Const from './common/const.mjs';
import Player from './Player.js';
import { EVENTS_NAME } from './utils/events.js';

const { up, left, right, down } = Const.Direction;
const { attack, move, pick, dig } = Const.Command;

export default class MainPlayer extends Player {
  combatMode = false;
  mainScene;
  lastNoApPlayTimestamp;

  async update() {
    if (this.stats.ap.current === 0) {
      if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
      if (!this.mainScene.notEnoughApSound.isPlaying && !this.mainScene.beaverEliminatedSound.isPlaying) {
        const now = Date.now();
        if (!this.lastNoApPlayTimestamp || now - this.lastNoApPlayTimestamp > 4000) {
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
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.d) && this.stats.ap.current >= 2) {
      await this.send({ cmd: dig });
    } else {
      if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
    }
  }

  async action(dir) {
    if (this.combatMode) {
      await this.send({ cmd: attack, dir });
    } else {
      await this.send({ cmd: move, dir });
    }
  }

  nextRound() {
    this.stats.ap.current = this.stats.ap.max;
    this.scene.game.events.emit(EVENTS_NAME.updateStats, this.stats);
    this.lockingDataItemId = undefined;
  }

  handleTx(txId) {
    if (txId === this.lockingDataItemId) {
      this.lockingDataItemId = undefined;
      console.log('Actions unlocked', txId);
    }
  }

  async send(message) {
    if (!this.lockingDataItemId) {
      this.lockingDataItemId = 'locking...';
      this.lockingDataItemId = (await this.scene.server.send(message)).id;
      console.log('Locked actions until tx is resolved', this.lockingDataItemId);
    } else {
      console.log(`Action disabled until tx resolved `, this.lockingDataItemId);
    }
  }
}
