import Const from './common/const.mjs';
import Player from './Player.js';
import {Tag} from 'warp-contracts';
import {createData} from 'warp-arbundles';

export default class MainPlayer extends Player {
  update() {
    const { up, left, right, down } = Const.Direction;
    const { attack, move, pick, dig } = Const.Command;

    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.send({ cmd: move, dir: left });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.send({ cmd: move, dir: right });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.send({ cmd: move, dir: up });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.send({ cmd: move, dir: down });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
      this.send({ cmd: attack, dir: down });
      this.send({ cmd: attack, dir: up });
      this.send({ cmd: attack, dir: left });
      this.send({ cmd: attack, dir: right });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.p)) {
      if (this.onGameObject) {
        this.send({ cmd: pick });
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.d)) {
      this.send({ cmd: dig });
    } else {
      // this.anims.play('idle', true)
    }
  }

  nextRound() {
    this.stats.ap.current = this.stats.ap.max;
  }

  send(message) {
    // this.scene.ws.send(JSON.stringify(message))
    const messageTags = [
      new Tag('Action', JSON.stringify(message)),
      new Tag('Data-Protocol', 'ao'),
      new Tag('Type', 'Message'),
      new Tag('Variant', 'ao.TN.1'),
      {name: 'SDK', value: 'ao'},
      new Tag('From-Process', window.__ao.config.processId),
      new Tag('From-Module', window.__ao.config.moduleId),
      new Tag('Salt', '' + Date.now())
    ];

    const messageDataItem = createData('1234', this.signer, {
      tags: messageTags,
      target: window.__ao.config.processId,
    });
    messageDataItem.sign(this.signer).then(() => {
      const messageResponse = fetch(window.__ao.config.muAddress, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          Accept: 'application/json'
        },
        body: messageDataItem.getRaw()
      }).then((res) => res.json().then((parsed) => {
        console.log(parsed);
      }));
    });



  }
}
