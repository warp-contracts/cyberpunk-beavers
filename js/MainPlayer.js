import Const from './common/const.mjs';
import Player from './Player.js';

export default class MainPlayer extends Player {
  update() {
    const { up, left, right, down } = Const.Direction;
    const { attack, move, pick, dig } = Const.Command;
    const walletAddress = this.walletAddress;

    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.send({ cmd: move, walletAddress, dir: left });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.send({ cmd: move, walletAddress, dir: right });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.send({ cmd: move, walletAddress, dir: up });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.send({ cmd: move, walletAddress, dir: down });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
      this.send({ cmd: attack, walletAddress, dir: down });
      this.send({ cmd: attack, walletAddress, dir: up });
      this.send({ cmd: attack, walletAddress, dir: left });
      this.send({ cmd: attack, walletAddress, dir: right });
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.p)) {
      if (this.onGameObject) {
        this.send({ cmd: pick, walletAddress });
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.d)) {
      this.send({ cmd: dig, walletAddress });
    } else {
      // this.anims.play('idle', true)
    }
  }

  nextRound() {
    this.stats.ap.current = this.stats.ap.max;
  }

  send(message) {
    this.scene.ws.send(JSON.stringify(message))


    const messageTags = [
      new Tag('Action', 'increment'),
      new Tag('Data-Protocol', 'ao'),
      new Tag('Type', 'Message'),
      new Tag('Variant', 'ao.TN.1'),
      {name: 'SDK', value: 'ao'},
      new Tag('From-Process', window.game.config.processId),
      new Tag('From-Module', window.game.config.moduleId),
      new Tag('Salt', '' + Date.now())
    ];

    const messageDataItem = createData('1234', signer, {
      tags: messageTags,
      target: processId
    });
    messageDataItem.sign(signer);

    const messageResponse = await fetch('http://localhost:3004', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        Accept: 'application/json'
      },
      body: messageDataItem.getRaw()
    }).then((res) => res.json());

  }
}
