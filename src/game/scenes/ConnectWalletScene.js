import { connectWalletSceneKey, gameHubSceneKey } from '../main.js';
import Phaser from 'phaser';
import { ConnectWalletSceneGui } from '../gui/ConnectWalletGui.js';
import { showGui, hideGui } from '../utils/mithril.js';

export default class ConnectWalletScene extends Phaser.Scene {
  constructor() {
    super(connectWalletSceneKey);
  }

  init() {
    console.log(`Connect Wallet Scene - 1. Init`);
  }

  preload() {
    console.log('Connect Wallet Scene - 2. Preload');
  }

  create() {
    console.log('Connect Wallet Scene - 3. Create');
    const self = this;
    m.mount(showGui(), {
      view: () => {
        return m(ConnectWalletSceneGui, { changeScene: (address) => self.changeScene(address) });
      },
    });
  }

  changeScene(address) {
    hideGui();
    this.scene.start(gameHubSceneKey, {
      walletAddress: address,
    });
  }
}
