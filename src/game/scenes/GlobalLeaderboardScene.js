import { WebFontFile } from '../objects/WebFontFile.js';
import { connectWalletSceneKey, gameHubSceneKey, globalLeaderboardSceneKey } from '../../main.js';
import Phaser from 'phaser';
import { hideGui, showGui } from '../utils/mithril.js';
import { GlobalLeaderboardGui } from '../gui/Leaderboard/GlobalLeaderboardGui.js';
import m from 'mithril';

export default class GlobalLeaderboardScene extends Phaser.Scene {
  constructor() {
    super(globalLeaderboardSceneKey);
  }

  init(data) {
    console.log('Global Leaderboard Scene - 1. Init');
    this.walletAddress = data.walletAddress;
    this.leaderboardProcessId = window.warpAO.leaderboardProcessId();
  }

  preload() {
    console.log('Global Leaderboard Scene - 2. Preload');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  async create() {
    console.log('Global Leaderboard Scene - 3. Create');
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      var self = this;

      m.mount(showGui(), {
        view: function () {
          return m(GlobalLeaderboardGui, {
            walletAddress: self.walletAddress,
            leaderboardProcessId: self.leaderboardProcessId,
            back: () => {
              hideGui();
              self.scene.start(gameHubSceneKey, {
                walletAddress: self.walletAddress,
              });
            },
          });
        },
      });
    } else {
      this.scene.start(connectWalletSceneKey);
    }
  }
}
