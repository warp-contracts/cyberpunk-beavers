import { connectWalletSceneKey, gameHubSceneKey } from '../../main.js';
import Phaser from 'phaser';
import { ConnectWalletSceneGui } from '../gui/ConnectWalletGui.js';
import { showGui, hideGui } from '../utils/mithril.js';
import { WebFontFile } from '../objects/WebFontFile.js';
import { checkProfile, checkProfileRsg } from '../utils/utils.js';
import { GAME_MODES } from '../common/const.mjs';

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
            const mode = window.warpAO.signingMode === 'metamask' ? GAME_MODES.rsg.type : GAME_MODES.ao.type;
            warpAO.config.mode = mode;
            warpAO.config.aoMode = mode === GAME_MODES.ao.type;
            self.changeScene(address);
            if (warpAO.config.aoMode) {
              checkProfile(address).then();
            } else if (warpAO.config.mode == GAME_MODES[warpAO.config.mode].type) {
              checkProfileRsg(address).then();
            }
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
