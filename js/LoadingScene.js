export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading-scene');
  }

  init() {
    console.log('Loading Scene - 1. Init');
  }

  preload() {
    console.log('Loading Scene - 2. Preload');
    this.load.image('beaver_agile', 'assets/images/beaver_player_agile.png');
    this.load.image('beaver_runner', 'assets/images/beaver_runner.png');
    this.load.image('beaver_tank', 'assets/images/beaver_player_tank.png');
    this.load.image('beaver_techy', 'assets/images/beaver_player_techy.png');
    this.load.image(
      'beaver_water_pistol',
      'assets/images/beaver_water_pistol.png'
    );
    this.load.image('player_bat', 'assets/images/player_bat.png');
  }

  create() {
    console.log('Loading Scene - 3. Create');
    this.scene.start('connect-wallet-scene');
  }
}
