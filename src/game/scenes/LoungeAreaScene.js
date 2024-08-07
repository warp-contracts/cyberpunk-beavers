import Const from '../common/const.mjs';
import { colors } from '../utils/style.js';
import { serverConnection } from '../lib/serverConnection.js';
import { TextButton } from '../objects/TextButton.js';
import {
  mainSceneKey,
  loungeAreaSceneKey,
  connectWalletSceneKey,
  playerPickSceneKey,
  leaderboardSceneKey,
} from '../main.js';
import { checkProfile } from '../utils/utils.js';
import Phaser from 'phaser';
import { EventBus } from '../EventBus.js';

export default class LoungeAreaScene extends Phaser.Scene {
  beaverId;
  enqueueButton;
  running;

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
      this.server = serverConnection.game;
      this.server.subscribe(this);
      this.profilePromise = checkProfile(this.walletAddress);
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

    this.subHeader = this.add.text(100, 150, '--:--:--', {
      fill: colors.yellow,
      font: '20px',
    });

    this.wallets = this.add.text(600, 300, 'Queue is empty', {
      fill: colors.yellow,
      font: '20px',
    });
    EventBus.emit('current-scene-ready', this);
  }

  async update() {
    if (
      this.enqueueButton &&
      this.walletsQueue.indexOf(this.walletAddress) > -1 &&
      this.walletsBench.indexOf(this.walletAddress) > -1
    ) {
      this.enqueueButton.destroy();
    }
    await this.countdown();
  }

  async countdown() {
    if (!this.gameError) {
      const now = new Date();
      let subHeaderTxt = '--:--:--';
      if (this.gameEnd) {
        let diff = Math.round((this.gameEnd - now) / 1000);
        if (diff >= 0) {
          subHeaderTxt = `The game will finish in\n${this.formatCountdownTo(diff)}`;
        } else {
          // We don't want to go directly to leaderboard until we don't have the latest players stats
          this.server.send({ cmd: Const.Command.info });
        }
      }
      if (this.gameStart) {
        let diff = Math.round((this.gameStart - now) / 1000);
        if (diff <= 0) {
          await this.gameActive();
        } else {
          subHeaderTxt = this.formatCountdownTo(diff);
        }
      }
      this.subHeader.setText(subHeaderTxt);
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

  async handleMessage(response) {
    console.log(`Got message`, response);
    switch (response.cmd) {
      case Const.Command.stats:
        {
          console.log(`Got me some stats`, response);
          if (response.end && response.end < new Date()) {
            this.goToLeaderboard(response);
            return;
          }
          this.gameStart = response.start;
          this.gameEnd = response.end;
          this.walletsQueue = response.walletsQueue;
          this.walletsBench = response.walletsBench;
          this.playersLimit = response.playersLimit;
          this.scrollbar = null;

          this.displayWaitingList(response);
          if (response.error) {
            console.error('Failed to fetch game info', response.error);
            this.scene.start(connectWalletSceneKey);
          } else if (!this.gameError) {
            if (response.players && response.players[this.walletAddress]) {
              this.beaverId = response.players[this.walletAddress].beaverId;
            }
            if (response.active) {
              await this.gameActive();
            } else if (Date.now() < response.start) {
              if (!this.walletsQueue.includes(this.walletAddress) && !this.walletsBench.includes(this.walletAddress)) {
                this.displayEnqueueButton();
              } else if (this.enqueueButton) {
                this.enqueueButton.destroy();
              }
            } else {
              this.goToLeaderboard(response);
            }
          }
        }
        break;
    }
  }

  canParticipate() {
    const logPref = `Lounge Area - canParticipate`;
    if (!this.playersLimit) {
      console.log(`${logPref} no player limit`);
      return true;
    }
    if (!this.walletsQueue) {
      console.log(`${logPref} no wallets queue`);
      return true;
    }
    if (this.playersLimit > this.walletsQueue.length) {
      console.log(`${logPref} no limit not yet reached`);
      return true;
    }
    if (this.walletsQueue.indexOf(this.walletAddress) > -1) {
      console.log(`${logPref} player on the wallets queue`);
      return true;
    }
    console.log(`${logPref} - nope, limit reached ${this.playersLimit}`);
    return false;
  }

  async gameActive() {
    if (this.beaverId) {
      await this.goToMainScene();
    } else if (this.canParticipate()) {
      await this.goToPlayerPick();
    } else {
      this.header.setText(`The game has started and reached players limit.`);
    }
  }

  goToLeaderboard(response) {
    this.scene.start(leaderboardSceneKey, {
      players: response.players,
      mainPlayer: {
        walletAddress: this.walletAddress,
      },
    });
  }

  async goToMainScene() {
    const userName = (await this.profilePromise)?.Profile?.UserName;
    this.scene.start(mainSceneKey, {
      userName,
      walletAddress: this.walletAddress,
      beaverId: this.beaverId,
      gameStart: this.gameStart,
      gameEnd: this.gameEnd,
    });
  }

  async goToPlayerPick() {
    if (!this.running) {
      this.running = true;
      const userName = (await this.profilePromise)?.Profile?.UserName;
      this.scene.start(playerPickSceneKey, {
        userName,
        walletAddress: this.walletAddress,
        gameStart: this.gameStart,
        gameEnd: this.gameEnd,
      });
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
          await self.server.send({ cmd: Const.Command.enqueue }, true);
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
    // this.scrollbar = new Scrollbar(
    //   this,
    //   walletQueue ? 420 : 300,
    //   600,
    //   window.innerHeight - 400,
    //   'y',
    //   this.wallets.setSize(this.wallets.width + 100, this.wallets.height + 50),
    //   {
    //     track: colors.lightGreen,
    //     thumb: colors.darkGreen,
    //   }
    // );
  }
}
