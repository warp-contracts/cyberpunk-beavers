import MainScene from './game/scenes/MainScene.js';
import LoadingScene from './game/scenes/LoadingScene.js';
import PlayerPickScene from './game/scenes/PlayerPickScene.js';
import ConnectWalletScene from './game/scenes/ConnectWalletScene.js';
import MainSceneLoading from './game/scenes/MainSceneLoading.js';
import LeaderboardScene from './game/scenes/LeaderboardScene.js';
import LoungeAreaScene from './game/scenes/LoungeAreaScene.js';
import ChatScene from './game/scenes/ChatScene.js';
import GameHubScene from './game/scenes/GameHubScene.js';

export const scenes = {
  connectWalletScene: { key: 'connect-wallet-scene', scene: ConnectWalletScene },
  gameHubScene: { key: 'game-hub-scene', scene: GameHubScene },
  loadingScene: { key: 'loading-scene', scene: LoadingScene },
  loungeAreaScene: { key: 'lounge-area-scene', scene: LoungeAreaScene },
  playerPickScene: { key: 'player-pick-scene', scene: PlayerPickScene },
  mainScene: { key: 'main-scene', scene: MainScene },
  mainSceneLoading: { key: 'main-scene-loading', scene: MainSceneLoading },
  leaderboardScene: { key: 'leaderboard-scene', scene: LeaderboardScene },
  chatScene: { key: 'chat-scene', scene: ChatScene },
};

export const mainSceneKey = scenes.mainScene.key;
export const mainSceneLoadingKey = scenes.mainSceneLoading.key;
export const gameHubSceneKey = scenes.gameHubScene.key;
export const connectWalletSceneKey = scenes.connectWalletScene.key;
export const leaderboardSceneKey = scenes.leaderboardScene.key;
export const loadingSceneKey = scenes.loadingScene.key;
export const loungeAreaSceneKey = scenes.loungeAreaScene.key;
export const playerPickSceneKey = scenes.playerPickScene.key;
export const chatSceneKey = scenes.chatScene.key;

const config = {
  title: 'CyberBeavers',
  type: Phaser.WEBGL,
  parent: 'game',
  antialiasGL: false,
  pixelArt: true,
  render: {
    pixelArt: true,
  },
  backgroundColor: '#000000',
  /*scale: {
    mode: Phaser.Scale.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },*/
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
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
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();

window.game = new Phaser.Game(config);
