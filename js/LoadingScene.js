export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading-scene');
  }
  create() {
    this.scene.start('MainScene');
    this.scene.start('ui-scene');
    console.log('Loading scene was created');
  }
}
