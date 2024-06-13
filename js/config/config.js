import MainScene from '../scenes/MainScene.js';
import LoadingScene from '../scenes/LoadingScene.js';
import CharacterPickScene from '../scenes/CharacterPickScene.js';
import ConnectWalletScene from '../scenes/ConnectWalletScene.js';
import StatsScene from '../scenes/StatsScene.js';
import MainSceneLoading from '../scenes/MainSceneLoading.js';
import LeaderboardScene from '../scenes/LeaderboardScene.js';

const config = {
  title: 'CyberBeavers',
  type: Phaser.WEBGL,
  parent: 'game',
  antialias: true,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.ScaleModes.None,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%; margin: -1px;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [
    LoadingScene,
    ConnectWalletScene,
    CharacterPickScene,
    MainScene,
    StatsScene,
    MainSceneLoading,
    LeaderboardScene,
  ],
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);
      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();

window.game = new Phaser.Game(config);
