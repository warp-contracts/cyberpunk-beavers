import { connectWalletSceneKey, gameHubSceneKey } from '../main.js';
import { EventBus } from '../EventBus.js';
import Phaser from 'phaser';

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

  async create() {
    console.log('Connect Wallet Scene - 3. Create');
    EventBus.emit('current-scene-ready', this);
  }

  changeScene(address) {
    this.scene.start(gameHubSceneKey, {
      walletAddress: address,
    });
  }
}
