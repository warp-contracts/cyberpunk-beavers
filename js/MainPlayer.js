import Const from './common/const.mjs'
import Player from './Player.js'

export default class MainPlayer extends Player {
  update() {
    console.log('update', this.playerName)

    const { up, left, right, down } = Const.Direction
    const { attack, move, pick } = Const.Command
    const pid = this.playerName

    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.send({ cmd: move, pid, dir: left })
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.send({ cmd: move, pid, dir: right })
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.send({ cmd: move, pid, dir: up })
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.send({ cmd: move, pid, dir: down })
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
      this.send({ cmd: attack, pid, dir: down })
      this.send({ cmd: attack, pid, dir: up })
      this.send({ cmd: attack, pid, dir: left })
      this.send({ cmd: attack, pid, dir: right })
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.p)) {
      if (this.onGameObject) {
        this.send({ cmd: pick, pid })
      }
    } else {
      this.anims.play('idle', true)
    }
  }

  nextRound() {
    this.stats.ap.current = this.stats.ap.max
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
