import Const from './common/const.mjs';
import Player from './Player.js';
import { EVENTS_NAME } from './utils/events.js';

const { up, left, right, down, every } = Const.Direction;
const { attack, move, pick, dig } = Const.Command;

export default class MainPlayer extends Player {
  combatDir = false;

  async update() {
    if (this.stats.ap.current === 0)  {
      this.anims.play(`${this.beaverChoice}_idle`, true);
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputKeys.space)) {
      this.combatDir = every;
    } else if  (Phaser.Input.Keyboard.JustDown(this.inputKeys.left) && this.combatDir) {
      this.combatDir = left;
    } else if  (Phaser.Input.Keyboard.JustDown(this.inputKeys.right) && this.combatDir) {
      this.combatDir = right;
    } else if  (Phaser.Input.Keyboard.JustDown(this.inputKeys.up) && this.combatDir) {
      this.combatDir = up;
    } else if  (Phaser.Input.Keyboard.JustDown(this.inputKeys.down) && this.combatDir) {
      this.combatDir = down;
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      await this.action(left);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      await this.action(right);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      await this.action(up);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      await this.action(down);
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space) && this.combatDir) {
      this.anims.isPlaying && this.anims.stop();
      if (this.combatDir === every) {
        await this.attackEverywhere();
      } else {
        await this.send({ cmd: attack, dir: this.combatDir });
      }
      this.combatDir = false;
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.p)) {
      this.anims.isPlaying && this.anims.stop();
      if (this.onGameObject) {
        await this.send({ cmd: pick });
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.d) && this.stats.ap.current >= 2) {
      this.anims.isPlaying && this.anims.stop();
      await this.send({ cmd: dig });
    } else {
      this.anims.play(`${this.beaverChoice}_idle`, true);
    }
  }

  async attackEverywhere() {
    if (this.lockingDataItemId) {
      console.log(`Action disabled until tx resolved `, this.lockingDataItemId);
    } else {
      await this.send({ cmd: attack, dir: down });
      this.lockingDataItemId = undefined;
      await this.send({ cmd: attack, dir: up });
      this.lockingDataItemId = undefined;
      await this.send({ cmd: attack, dir: left });
      this.lockingDataItemId = undefined;
      await this.send({ cmd: attack, dir: right });
    }
  }

  async action(dir) {
    this.anims.isPlaying && this.anims.stop();
    if (this.combatDir) {
      await this.send({ cmd: attack, dir });
    } else {
      await this.send({ cmd: move, dir });
    }
    this.combatDir = false;
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
