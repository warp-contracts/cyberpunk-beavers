import Const from '../common/const.mjs';
import { EVENTS_NAME } from '../utils/events.js';
import { colors } from '../utils/style.js';
import { serverConnection } from '../lib/serverConnection.js';
import { TextButton } from '../objects/TextButton.js';

export default class LoungeAreaScene extends Phaser.Scene {
  beaverId
  enqueueButton

  constructor() {
    super('lounge-area-scene');
  }

  init(data) {
    console.log('Lounge Area - 1. Init', data);
    this.walletAddress = data.walletAddress;
  }

  preload() {
    console.log('Lounge Area - 2. Preload');
  }

  async create() {
    console.log('Lounge Area - 3. Create');

    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection;
      this.server.subscribe(this);
      this.server.send({ cmd: Const.Command.info });
    } else {
      this.scene.start('connect-wallet-scene');
    }

    this.header = this.add.text(100, 100, 'Please, have a seat and relax... The game will start when the time comes..\n\n', {
      fill: colors.yellow,
      font: '20px',
    });

    this.tt = this.add.text(100, 150, '--:--:--', {
      fill: colors.yellow,
      font: '20px',
    });

    this.wallets = this.add.text(100, 300, 'Queue is empty', {
      fill: colors.yellow,
      font: '20px',
    });
  }
  

  update() {
    this.countdown();
  }

  countdown() {
    if (!this.gameStart) {
      return;
    }

    const now = new Date();
    let diff = Math.round((this.gameStart - now)/1000);
    if (diff <= 0) {
      if (this.beaverId) {
        this.scene.start('main-scene', { walletAddress: this.walletAddress, beaverId: this.beaverId });
      } else {
        this.scene.start('player-pick-scene', { walletAddress: this.walletAddress });
      }
    } else {
      const hour = Math.floor(diff / 3600);
      diff -= hour * 3600;
      const min = Math.floor(diff / 60);
      const sec = diff - min * 60;
      const padZero = (x) => x.toString().padStart(2, '0');
      this.tt.setText(`${padZero(hour)}:${padZero(min)}:${padZero(sec)}`);
    }
  }

  handleMessage(response) {
    this.game.events.emit(EVENTS_NAME.nextMessage, response);
    console.log(response);
    switch (response.cmd) {
      case Const.Command.stats:
        {
          if (response.error) {
            console.error('Failed to fetch game info', response.error);
            this.scene.start('connect-wallet-scene');
          } else {
            this.beaverId = response.beaverId;
            if (response.active) {
              if (response.beaverId) {
                this.scene.start('main-scene', {
                  walletAddress: this.walletAddress,
                  beaverId: response.beaverId });
              } else {
                this.scene.start('player-pick-scene', { walletAddress: this.walletAddress });
              }
            } else if (Date.now() < response.start) {
              if (!response.walletsQueue.includes(this.walletAddress) &&
                !response.walletsBench.includes(this.walletAddress)) {
                this.displayEnqueueButton();
              } else if (this.enqueueButton) {
                this.enqueueButton.destroy();
              }
              this.gameStart = response.start;
              this.displayWaitingList(response);
              this.countdown();
            } else {
              this.displayFinalResult(response);
            }
          }
        }
        break;
    }
  }

  displayEnqueueButton() {
    const self = this;
    this.enqueueButton = new TextButton(
      this,
      100,
      200,
      'Would you date to join?',
      {
        fill: colors.red,
        font: '20px',
      },
      async () => {
        setTimeout(async () => {
          await self.server.send({ cmd: Const.Command.enqueue })
        });
      }
    );
  }

  displayFinalResult(result) {
    const st = result.stats;
    this.header.setText(`Game Finished`);
    this.tt.setText(`
    Beaver ${result?.beaverId}\n
    TOKEN ${st?.coins.transferred}\n
    Round ${st?.round.last}\n
    HP: ${st?.hp.current}\n`);
  }

  displayWaitingList(response) {
    console.log(`Waiting queue`, response.walletsQueue)
    const walletQueue = response.walletsQueue.join('\n\n');
    const walletBench = response.walletsBench.join('\n\n');
    this.wallets.setText(
      `Waiting list:\n
      \n${walletQueue}\n
      \nWaiting for next games:\n
      \n${walletBench}`);
  }
}