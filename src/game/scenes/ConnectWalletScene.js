import { connectWalletSceneKey, gameHubSceneKey } from '../../main.js';
import Phaser from 'phaser';
import { ConnectWalletSceneGui } from '../gui/ConnectWalletGui.js';
import { showGui, hideGui } from '../utils/mithril.js';
import { WebFontFile } from '../objects/WebFontFile.js';
import { checkProfile } from '../utils/utils.js';

export default class ConnectWalletScene extends Phaser.Scene {
  constructor() {
    super(connectWalletSceneKey);
  }

  init() {
    console.log(`Connect Wallet Scene - 1. Init`);
  }

  preload() {
    console.log('Connect Wallet Scene - 2. Preload');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create() {
    console.log('Connect Wallet Scene - 3. Create');
    const self = this;
    m.mount(showGui(), {
      view: () => {
        return m(ConnectWalletSceneGui, {
          changeScene: (address) => {
            self.changeScene(address);
            checkProfile(address).then();
          },
        });
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
