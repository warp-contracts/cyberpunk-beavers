import { connectWalletSceneKey, loadingSceneKey } from '../../main.js';
import Phaser from 'phaser';
import { doPreloadAssets } from './main-scene/preload.js';

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

    doPreloadAssets(this);
    this.load.start();
    this.scene.launch(connectWalletSceneKey);
  }
}
