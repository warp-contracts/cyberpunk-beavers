import MainScene from './MainScene.js';
import LoadingScene from './LoadingScene.js';
import PlayerPickScene from './PlayerPickScene.js';
import ConnectWalletScene from './ConnectWalletScene.js';
import HintScene from './HintScene.js';

const config = {
  title: 'CyberBeavers',
  type: Phaser.WEBGL,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
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
    PlayerPickScene,
    MainScene,
    HintScene,
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

window.__ao = {
  config: {
    processId: "nHHezRJAfhitmdDaLUstnq1tbdnugqk2vqNOuPdupwE",
    moduleId: "7dkc0pHXrn-Bsu9LFRWx76FTqlA-dqR_fj8JwFAfJpo",
    muAddress: "http://localhost:3004"
  }
}
