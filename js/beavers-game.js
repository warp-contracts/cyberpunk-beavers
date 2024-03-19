import MainScene from './MainScene.js';

const config = {
  width: 480,
  height: 480,
  backgroundColor: '#000000',
  type: Phaser.AUTO,
  parent: 'beavers-game',
  scene: [MainScene],
  scale: {
    zoom: 2,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      },
    ],
  },
};

console.log('phaser');

new Phaser.Game(config);
