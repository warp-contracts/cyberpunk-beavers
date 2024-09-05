import Const from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import {
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  mainSceneKey,
  characterPickSceneKey,
  gameHubSceneKey,
} from '../../main.js';
import { loadMapTxId } from '../utils/utils.js';
import Phaser from 'phaser';
import { LoungeArenaSceneGui } from '../gui/LoungeArenaSceneGui.js';
import { hideGui, showGui } from '../utils/mithril.js';

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
    this.processId = data.processId;
  }

  preload() {
    console.log('Lounge Area - 2. Preload');
  }

  async create() {
    console.log('Lounge Area - 3. Create');

    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection.game;
      this.server.subscribe(this);
      this.server.send({ cmd: Const.Command.info });
      var self = this;
      m.mount(showGui(), {
        view: function () {
          return m(LoungeArenaSceneGui, {
            gameTxId: self.processId,
            walletAddress: self.walletAddress,
            gameError: self.gameError,
            gameStart: self.gameStart,
            gameEnd: self.gameEnd,
            walletsQueue: self.walletsQueue,
            playersLimit: self.playersLimit,
            diff: self.diff,
            onJoin: () =>
              setTimeout(async () => {
                await self.server.send({ cmd: Const.Command.enqueue }, true);
              }),
            onBack: () => {
              hideGui();
              self.scene.start(gameHubSceneKey);
            },
          });
        },
      });
    } else {
      this.scene.start(connectWalletSceneKey);
    }
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
          this.gameEnter = response.enter;
          this.gameEnd = response.end;
          this.walletsQueue = response.walletsQueue;
          this.playersLimit = response.playersLimit;

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
    const mapTxId = await loadMapTxId();
    this.scene.start(mainSceneKey, {
      mapTxId,
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
      const mapTxId = await loadMapTxId();
      this.scene.start(characterPickSceneKey, {
        mapTxId,
        walletAddress: this.walletAddress,
        gameStart: this.gameStart,
        gameEnter: this.gameEnter,
        gameEnd: this.gameEnd,
      });
    }
  }
}
