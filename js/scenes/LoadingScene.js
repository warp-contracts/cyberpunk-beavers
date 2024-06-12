export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading-scene');
  }

  init() {
    console.log('Loading Scene - 1. Init');
    if (window.warpAO.config.env === 'dev') {
      localStorage.clear();
    }
  }

  preload() {
    console.log('Loading Scene - 2. Preload');
  }

  create() {
    console.log('Loading Scene - 3. Create');
    this.scene.start('connect-wallet-scene');
  }
}
