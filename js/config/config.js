import MainScene from '../scenes/MainScene.js';
import LoadingScene from '../scenes/LoadingScene.js';
import PlayerPickScene from '../scenes/PlayerPickScene.js';
import ConnectWalletScene from '../scenes/ConnectWalletScene.js';
import StatsScene from '../scenes/StatsScene.js';
import MainSceneLoading from '../scenes/MainSceneLoading.js';
import LeaderboardScene from '../scenes/LeaderboardScene.js';
import LoungeAreaScene from '../scenes/LoungeAreaScene.js';
import ChatScene from '../scenes/ChatScene.js';

export const scenes = {
  loadingScene: { key: 'loading-scene', scene: LoadingScene },
  connectWalletScene: { key: 'connect-wallet-scene', scene: ConnectWalletScene },
  loungeAreaScene: { key: 'lounge-area-scene', scene: LoungeAreaScene },
  playerPickScene: { key: 'player-pick-scene', scene: PlayerPickScene },
  mainScene: { key: 'main-scene', scene: MainScene },
  statsScene: { key: 'stats-scene', scene: StatsScene },
  mainSceneLoading: { key: 'main-scene-loading', scene: MainSceneLoading },
  leaderboardScene: { key: 'leaderboard-scene', scene: LeaderboardScene },
  chatScene: { key: 'chat-scene', scene: ChatScene },
};

export const mainSceneKey = scenes.mainScene.key;
export const mainSceneLoadingKey = scenes.mainSceneLoading.key;
export const connectWalletSceneKey = scenes.connectWalletScene.key;
export const leaderboardSceneKey = scenes.leaderboardScene.key;
export const statsSceneKey = scenes.statsScene.key;
export const loadingSceneKey = scenes.loadingScene.key;
export const loungeAreaSceneKey = scenes.loungeAreaScene.key;
export const playerPickSceneKey = scenes.playerPickScene.key;
export const chatSceneKey = scenes.chatScene.key;

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
  scene: Object.values(scenes).map((s) => s.scene),
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
