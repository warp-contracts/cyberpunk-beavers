import { connectWalletSceneKey, loadingSceneKey } from '../main.js';
import Phaser from 'phaser';
import { EventBus } from '../EventBus.js';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super(loadingSceneKey);
  }

  init() {
    console.log('Loading Scene - 1. Init');
  }

  preload() {
    console.log('Loading Scene - 2. Preload');
  }

  create() {
    console.log('Loading Scene - 3. Create');
    this.scene.start(connectWalletSceneKey);
    EventBus.emit('current-scene-ready', this);
  }
}
