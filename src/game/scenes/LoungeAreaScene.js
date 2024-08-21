import Const from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import {
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  mainSceneKey,
  playerPickSceneKey,
} from '../main.js';
import { checkProfile } from '../utils/utils.js';
import Phaser from 'phaser';
import { EventBus } from '../EventBus.js';
import { hideGui, showGui } from '../../components/mithril/utils.js';
import { LoungeArenaSceneGui } from '../gui/LoungeArenaSceneGui.js';

export default class LoungeAreaScene extends Phaser.Scene {
  beaverId;
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
      var self = this;
      m.mount(showGui(), {
        view: function () {
          return m(LoungeArenaSceneGui, {
            gameTxId: self.gameTxId,
            walletAddress: self.walletAddress,
            gameError: self.gameError,
            gameStart: self.gameStart,
            gameEnd: self.gameEnd,
            walletsQueue: self.walletsQueue,
            walletsBench: self.walletsBench,
            playersLimit: self.playersLimit,
            diff: self.diff,
            onJoin: () =>
              setTimeout(async () => {
                await self.server.send({ cmd: Const.Command.enqueue }, true);
              }),
          });
        },
      });
    } else {
      this.scene.start(connectWalletSceneKey);
    }

    EventBus.emit('current-scene-ready', this);
  }

  async update() {
    await this.countdown();
  }

  async countdown() {
    if (!this.gameError) {
      const now = new Date();
      if (this.gameEnd) {
        this.diff = Math.round((this.gameEnd - now) / 1000);
        if (this.diff < 0) {
          // We don't want to go directly to leaderboard until we don't have the latest players stats
          this.server.send({ cmd: Const.Command.info });
        }
      }
      if (this.gameStart) {
        this.diff = Math.round((this.gameStart - now) / 1000);
        if (this.diff <= 0) {
          await this.gameActive();
        }
      }
      m.redraw();
    }
  }

  async handleMessage(response) {
    console.log(`Got message`, response);
    switch (response.cmd) {
      case Const.Command.stats:
        {
          if (response.end && response.end < new Date()) {
            this.goToLeaderboard(response);
            return;
          }
          this.gameStart = response.start;
          this.gameEnd = response.end;
          this.walletsQueue = response.walletsQueue;
          this.walletsBench = response.walletsBench;
          this.playersLimit = response.playersLimit;
          this.gameTxId = response.txId;

          if (response.error) {
            console.error('Failed to fetch game info', response.error);
            hideGui();
            this.scene.start(connectWalletSceneKey);
          } else if (!this.gameError) {
            if (response.players && response.players[this.walletAddress]) {
              this.beaverId = response.players[this.walletAddress].beaverId;
            }
            if (response.active) {
              await this.gameActive();
            } /*else if (Date.now() > response.end) {
            this.goToLeaderboard(response);
          }*/
          }
          m.redraw();
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
      hideGui();
      await this.goToMainScene();
    } else if (this.canParticipate()) {
      hideGui();
      await this.goToPlayerPick();
    }
  }

  goToLeaderboard(response) {
    hideGui();
    this.scene.start(leaderboardSceneKey, {
      players: response.players,
      mainPlayer: {
        walletAddress: this.walletAddress,
      },
    });
  }

  async goToMainScene() {
    hideGui();
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
      hideGui();
      const userName = (await this.profilePromise)?.Profile?.UserName;
      this.scene.start(playerPickSceneKey, {
        userName,
        walletAddress: this.walletAddress,
        gameStart: this.gameStart,
        gameEnd: this.gameEnd,
      });
    }
  }
}
