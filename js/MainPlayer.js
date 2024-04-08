import Const from './common/const.mjs';
import Player from "./Player.js";


export default class MainPlayer extends Player {

    update() {
        console.log('update', this.playerName);

        const {up, left, right, down} = Const.Direction;
        const {attack, move} = Const.Command;
        const pid = this.playerName;

        if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
            this.send({cmd: move, pid, dir: left});
        } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
            this.send({cmd: move, pid, dir: right});
        } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
            this.send({cmd: move, pid, dir: up});
        } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
            this.send({cmd: move, pid, dir: down});
        } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
            this.send({cmd: attack, pid, dir: down});
            this.send({cmd: attack, pid, dir: up});
            this.send({cmd: attack, pid, dir: left});
            this.send({cmd: attack, pid, dir: right});
        } else {
            this.anims.play('idle', true);
        }
    }

    nextRound() {
        this.stats.ap.current = this.stats.ap.max;
    }

    send(message) {
        this.scene.ws.send(JSON.stringify(message));
    }
}
