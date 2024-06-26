import Const from '../common/const.mjs';
import { colors } from '../utils/style.js';
import { serverConnectionGame } from '../lib/serverConnection.js';
import { TextButton } from '../objects/TextButton.js';
import {
  mainSceneKey,
  loungeAreaSceneKey,
  connectWalletSceneKey,
  playerPickSceneKey,
  leaderboardSceneKey,
} from '../config/config.js';

export default class LoungeAreaScene extends Phaser.Scene {
  beaverId;
  enqueueButton;

  constructor() {
    super(loungeAreaSceneKey);
  }

  init(data) {
    console.log('Lounge Area - 1. Init', data);
    this.walletAddress = data.walletAddress;
    this.gameError = data.error;
  }

  preload() {
    console.log('Lounge Area - 2. Preload');
  }

  async create() {
    console.log('Lounge Area - 3. Create');

    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnectionGame;
      this.server.subscribe(this);
      this.server.send({ cmd: Const.Command.info });
    } else {
      this.scene.start(connectWalletSceneKey);
    }

    const headerText = this.gameError
      ? `Cannot join the game.\n${this.gameError}\n\n`
      : 'Please, have a seat and relax... The game will start when the time comes..\n\n';

    this.header = this.add.text(100, 100, headerText, {
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
    if (this.gameError && this.gameEnd) {
      const now = new Date();
      let diff = Math.round((this.gameEnd - now) / 1000);
      if (diff >= 0) {
        this.tt.setText(`The game will finish in\n${this.formatCountdownTo(diff)}`);
      } else {
        this.server.send({ cmd: Const.Command.info });
      }
    } else if (this.gameStart) {
      const now = new Date();
      let diff = Math.round((this.gameStart - now) / 1000);
      if (diff <= 0) {
        if (this.beaverId) {
          this.scene.start(mainSceneKey, {
            walletAddress: this.walletAddress,
            beaverId: this.beaverId,
            gameStart: this.gameStart,
            gameEnd: this.gameEnd,
          });
        } else if (!this.gameError) {
          this.scene.start(playerPickSceneKey, {
            walletAddress: this.walletAddress,
            gameStart: this.gameStart,
            gameEnd: this.gameEnd,
          });
        }
      } else {
        this.tt.setText(this.formatCountdownTo(diff));
      }
    }
  }

  formatCountdownTo(diff) {
    const hour = Math.floor(diff / 3600);
    diff -= hour * 3600;
    const min = Math.floor(diff / 60);
    const sec = diff - min * 60;
    const padZero = (x) => x.toString().padStart(2, '0');
    return `${padZero(hour)}:${padZero(min)}:${padZero(sec)}`;
  }

  handleMessage(response) {
    switch (response.cmd) {
      case Const.Command.stats:
        {
          if (response.end && response.end < new Date()) {
            this.scene.start(leaderboardSceneKey, {
              players: response.players,
              mainPlayer: {
                walletAddress: this.walletAddress,
              },
            });
            return;
          }
          this.gameStart = response.start;
          this.gameEnd = response.end;
          this.displayWaitingList(response);
          if (response.error) {
            console.error('Failed to fetch game info', response.error);
            this.scene.start(connectWalletSceneKey);
          } else if (!this.gameError) {
            if (response.player && response.player.walletAddress === this.walletAddress) {
              this.beaverId = response.player.beaverId;
            }
            if (response.active) {
              if (this.beaverId) {
                this.scene.start(mainSceneKey, {
                  walletAddress: this.walletAddress,
                  beaverId: this.beaverId,
                  gameStart: response.start,
                  gameEnd: response.end,
                });
              } else {
                this.scene.start(playerPickSceneKey, {
                  walletAddress: this.walletAddress,
                  gameStart: response.start,
                  gameEnd: response.end,
                });
              }
            } else if (Date.now() < response.start) {
              if (
                !response.walletsQueue.includes(this.walletAddress) &&
                !response.walletsBench.includes(this.walletAddress)
              ) {
                this.displayEnqueueButton();
              } else if (this.enqueueButton) {
                this.enqueueButton.destroy();
              }
              this.countdown();
            } else {
              this.scene.start(leaderboardSceneKey, {
                players: response.players,
                mainPlayer: {
                  walletAddress: this.walletAddress,
                },
              });
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
      'Click here to join',
      {
        fill: colors.red,
        font: '20px',
      },
      async () => {
        setTimeout(async () => {
          await self.server.send({ cmd: Const.Command.enqueue });
        });
      }
    );
  }

  displayWaitingList(response) {
    console.log(`Waiting queue`, response.walletsQueue);
    const walletQueue = (response.walletsQueue || []).join('\n\n');
    const walletBench = (response.walletsBench || []).join('\n\n');
    this.wallets.setText(
      `Waiting list:\n
      \n${walletQueue}\n
      \nWaiting for next games:\n
      \n${walletBench}`
    );
  }
}
