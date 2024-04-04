import Const from './common/const.mjs';
import Player from "./Player.js";


export default class MainPlayer extends Player {

  update() {
    console.log('update', this.playerName);

    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.left }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.right }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.up }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.down }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.attack, dir: Const.Direction.down }));
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.attack, dir: Const.Direction.up }));
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.attack, dir: Const.Direction.left }));
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.attack, dir: Const.Direction.right }));
    } else {
      this.anims.play('idle', true);
    }
  }
}
