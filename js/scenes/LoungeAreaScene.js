import Const from '../common/const.mjs';
import { EVENTS_NAME } from '../utils/events.js';
import { colors } from '../utils/style.js';
import { serverConnection } from '../lib/serverConnection.js';

export default class LoungeAreaScene extends Phaser.Scene {
  round;

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
      this.server.send({ cmd: Const.Command.info })
    } else {
      this.scene.start('connect-wallet-scene');
    }

    this.header = this.add.text(100, 100, 'Please, have a seat and relax... The game will start in', {
      fill: colors.yellow,
      font: '20px',
    });

    this.tt = this.add.text(100, 200, '--:--:--', {
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
      this.scene.start('player-pick-scene', { walletAddress: this.walletAddress });
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
    switch (response.cmd) {
      case Const.Command.stats:
        {
          if (response.error) {
            console.error('Failed to fetch game info', response.error);
            this.scene.start('connect-wallet-scene');
          } else {
            if (response.active) {
              if (response.beaverId) {
                this.scene.start('main-scene', {
                  walletAddress: this.walletAddress,
                  beaverChoice: response.beaverId });
              } else {
                this.scene.start('player-pick-scene', { walletAddress: this.walletAddress });
              }
            } else if (Date.now() < response.start) {
              this.gameStart = response.start;
              this.countdown();
            } else {
              this.displayFinalResult(response);
            }
          }
        }
        break;
    }
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
}