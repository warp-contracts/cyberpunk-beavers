export default class PlayerPickScene extends Phaser.Scene {
  score;
  playerAgileOne;

  constructor() {
    super('player-pick-scene');
  }

  init(data) {
    console.log(`Player Pick Scene - 1. Init`, data);
    this.initData = data;
    const player = JSON.parse(localStorage.getItem('player'));
    if (player?.beaverId) {
      this.scene.start('MainScene', {
        ...this.initData,
        beaverChoice: player.beaverId,
      });
    }
  }

  preload() {
    console.log('Player Pick Scene - 2. Preload');
  }

  create() {
    console.log('Player Pick Scene - 3. Create');
    this.add
      .text(10, 10, 'Choose one... and survive...')
      .setOrigin(0)
      .setStyle({ fontFamily: 'Arial' });
    this.playerAgileOne = this.addBeaverOptionPick({
      imgName: 'beaver_agile',
      x: 50,
      y: 100,
    });
    this.addBeaverOptionPick({
      imgName: 'beaver_tank',
      x: 250,
      y: 100,
    });
    this.addBeaverOptionPick({
      imgName: 'beaver_techy',
      x: 600,
      y: 100,
    });
    this.addBeaverOptionPick({
      imgName: 'beaver_runner',
      x: 50,
      y: 400,
    });
    this.addBeaverOptionPick({
      imgName: 'beaver_water_pistol',
      x: 270,
      y: 400,
    });
    this.addBeaverOptionPick({
      imgName: 'player_bat',
      x: 550,
      y: 400,
    });
  }

  addBeaverOptionPick(option) {
    const beaverSprite = this.add.sprite(option.x, option.y, option.imgName);
    return beaverSprite
      .setInteractive()
      .setOrigin(0)
      .on('pointerover', () => {
        beaverSprite.preFX.addGlow();
      })
      .on('pointerout', () => {
        beaverSprite.clearFX();
      })
      .on('pointerdown', () => {
        this.scene.start('MainScene', {
          ...this.initData,
          beaverChoice: option.imgName,
        });
      });
  }
}
