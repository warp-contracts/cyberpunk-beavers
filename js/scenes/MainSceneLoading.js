import { Text } from '../objects/Text.js';

export default class MainSceneLoading extends Phaser.Scene {
  constructor() {
    super('main-scene-loading');
  }

  init() {
    console.log('Main Scene Loading - 1. Init');
  }

  preload() {
    console.log('Main Scene Loading - 2. Preload');
    this.load.image(
      'post_apocalyptic_background',
      'assets/images/background_post_apocalyptic.png'
    );
  }

  create() {
    console.log('Hint Scene - 3. Create');
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;
    this.addBackground();
    this.addAndPositionTitle();
  }

  addBackground() {
    this.background = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      'post_apocalyptic_background'
    );
    this.background.setDisplaySize(this.gameWidth, this.gameHeight);
  }

  addAndPositionTitle() {
    this.title = new Text(this, this.gameWidth / 2, 100, 'LOADING', {
      fontFamily: '"Press Start 2P"',
      fontSize: '50px',
      textTransform: 'uppercase',
      color: '#fcee09',
    });
    this.title.x = this.gameWidth / 2 - this.title.width / 2;
  }
}
