import Const from './common/const.mjs';
import Player from './Player.js';
import { Tag } from 'warp-contracts';
import { createData } from 'warp-arbundles';
import { EVENTS_NAME } from './utils/events.js';

export default class MainPlayer extends Player {
  async update() {
    const { up, left, right, down } = Const.Direction;
    const { attack, move, pick, dig } = Const.Command;

    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.anims.isPlaying && this.anims.stop();
      await this.send({ cmd: move, dir: left });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.anims.isPlaying && this.anims.stop();
      await this.send({ cmd: move, dir: right });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.anims.isPlaying && this.anims.stop();
      await this.send({ cmd: move, dir: up });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.anims.isPlaying && this.anims.stop();
      await this.send({ cmd: move, dir: down });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
      this.anims.isPlaying && this.anims.stop();
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
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.p)) {
      this.anims.isPlaying && this.anims.stop();
      if (this.onGameObject) {
        await this.send({ cmd: pick });
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.d)) {
      this.anims.isPlaying && this.anims.stop();
      await this.send({ cmd: dig });
    } else {
      this.anims.play(`${this.beaverChoice}_idle`, true);
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
      console.log(
        'Locked actions until tx is resolved',
        this.lockingDataItemId
      );
    } else {
      console.log(`Action disabled until tx resolved `, this.lockingDataItemId);
    }
  }
}
