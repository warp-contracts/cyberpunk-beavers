import Const from './common/const.mjs';
import Player from "./Player.js";


export default class MainPlayer extends Player {
  constructor(data) {
    super(data);
    data.scene.physics.add.existing(this);
    data.scene.physics.add.collider(this, data.scene.collideLayer);
    this.getBody().setCollideWorldBounds(true);
    this.getBody().setSize(64, 64);
    this.getBody().setOffset(0, 0);
  }

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
    } else {
      this.anims.play('idle', true);
    }
  }
}
