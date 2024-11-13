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
import m from 'mithril';

export default class LoungeAreaScene extends Phaser.Scene {
  beaverId;
  running;
  viewMounted = false;

  constructor() {
    super(loungeAreaSceneKey);
  }

  init(data) {
    console.log('Lounge Area - 1. Init', data);
    this.walletAddress = data.walletAddress;
    this.playerError = data.error;
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
    } else {
      this.scene.start(connectWalletSceneKey);
    }
  }

  async update() {
    await this.countdown();
  }

  async countdown() {
    if (!this.playerError) {
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
      if (this.viewMounted) {
        m.redraw();
      }
    }
  }

  async handleMessage(response) {
    console.log(`Got message`, response);
    switch (response.cmd) {
      case Const.Command.tokensSent:
      case Const.Command.stats:
        {
          if (response.end && response.end < new Date()) {
            this.goToLeaderboard(response);
            return;
          }
          if (response?.player?.walletAddress === this.walletAddress && response?.player?.error) {
            this.playerError = response.player.error;
          }
          this.gameStart = response.start;
          this.gameEnter = response.enter;
          this.gameEnd = response.end;
          this.walletsQueue = response.walletsQueue;
          this.playersLimit = response.playersLimit;
          this.gameplayMode = response.gameplayMode;

          if (response.error) {
            console.error('Failed to fetch game info', response.error);
            this.doHideGui();
            this.scene.start(connectWalletSceneKey);
          } else {
            if (response.players && response.players[this.walletAddress]) {
              this.beaverId = response.players[this.walletAddress].beaverId;
            }
            if (response.active && !this.playerError) {
              await this.gameActive();
            } else {
              if (!this.viewMounted) {
                const self = this;
                m.mount(showGui(), {
                  view: function () {
                    return m(LoungeArenaSceneGui, {
                      gameTxId: self.processId,
                      walletAddress: self.walletAddress,
                      playerError: self.playerError,
                      gameStart: self.gameStart,
                      gameEnd: self.gameEnd,
                      walletsQueue: self.walletsQueue,
                      playersLimit: self.playersLimit,
                      gameplayMode: self.gameplayMode,
                      diff: self.diff,
                      onJoin: () =>
                        setTimeout(async () => {
                          await self.server.send({ cmd: Const.Command.enqueue }, true);
                        }),
                      onBack: () => {
                        self.doHideGui();
                        self.server.unsubscribe();
                        self.scene.start(gameHubSceneKey);
                      },
                    });
                  },
                });
                this.viewMounted = true;
              }
            }
          }
          if (this.viewMounted) {
            m.redraw();
          }
        }
        break;
    }
  }

  canParticipate() {
    const logPref = `Lounge Area - canParticipate`;
    if (!this.playersLimit) {
      console.log(`${logPref}, no player limit`);
      return true;
    }
    if (!this.walletsQueue) {
      console.log(`${logPref}, no wallets queue`);
      return true;
    }
    if (this.playersLimit > this.walletsQueue.length) {
      console.log(`${logPref}, limit not yet reached`);
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
      this.doHideGui();
      await this.goToMainScene();
    } else if (this.canParticipate()) {
      await this.goToPlayerPick();
    } else {
      this.diff = Math.round((this.gameEnd - Date.now()) / 1000);
    }
  }

  goToLeaderboard(response) {
    this.doHideGui();
    this.scene.start(leaderboardSceneKey, {
      players: response.players,
      mainPlayer: {
        walletAddress: this.walletAddress,
      },
      gameTokens: response.gameStats?.gameTokens,
    });
  }

  async goToMainScene() {
    this.doHideGui();
    const mapTxId = await loadMapTxId();
    if (this.scene?.isActive()) {
      this.scene.start(mainSceneKey, {
        mapTxId,
        walletAddress: this.walletAddress,
        beaverId: this.beaverId,
        gameStart: this.gameStart,
        gameEnd: this.gameEnd,
      });
    } else {
      console.log(`Lounge Area already inactive`);
    }
  }

  async goToPlayerPick() {
    if (!this.running) {
      this.running = true;
      this.doHideGui();
      const mapTxId = await loadMapTxId();
      this.scene.start(characterPickSceneKey, {
        mapTxId,
        walletAddress: this.walletAddress,
        gameStart: this.gameStart,
        gameEnter: this.gameEnter,
        gameEnd: this.gameEnd,
        gameplayMode: this.gameplayMode,
      });
    }
  }

  doHideGui() {
    this.viewMounted = false;
    hideGui();
  }
}
