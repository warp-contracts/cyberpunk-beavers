import MainScene from './game/scenes/main-scene/MainScene.js';
import LoadingScene from './game/scenes/LoadingScene.js';
import CharacterPickScene from './game/scenes/CharacterPickScene.js';
import ConnectWalletScene from './game/scenes/ConnectWalletScene.js';
import MainSceneLoading from './game/scenes/MainSceneLoading.js';
import LeaderboardScene from './game/scenes/LeaderboardScene.js';
import LoungeAreaScene from './game/scenes/LoungeAreaScene.js';
import GameHubScene from './game/scenes/GameHubScene.js';
import GlobalLeaderboardScene from './game/scenes/GlobalLeaderboardScene.js';

export const scenes = {
  loadingScene: { key: 'loading-scene', scene: LoadingScene },
  connectWalletScene: { key: 'connect-wallet-scene', scene: ConnectWalletScene },
  gameHubScene: { key: 'game-hub-scene', scene: GameHubScene },
  loungeAreaScene: { key: 'lounge-area-scene', scene: LoungeAreaScene },
  characterPickScene: { key: 'character-pick-scene', scene: CharacterPickScene },
  mainScene: { key: 'main-scene', scene: MainScene },
  mainSceneLoading: { key: 'main-scene-loading', scene: MainSceneLoading },
  leaderboardScene: { key: 'leaderboard-scene', scene: LeaderboardScene },
  globalLeaderboardScene: { key: 'global-leaderboard-scene', scene: GlobalLeaderboardScene },
};

export const mainSceneKey = scenes.mainScene.key;
export const mainSceneLoadingKey = scenes.mainSceneLoading.key;
export const gameHubSceneKey = scenes.gameHubScene.key;
export const connectWalletSceneKey = scenes.connectWalletScene.key;
export const leaderboardSceneKey = scenes.leaderboardScene.key;
export const globalLeaderboardSceneKey = scenes.globalLeaderboardScene.key;
export const loadingSceneKey = scenes.loadingScene.key;
export const loungeAreaSceneKey = scenes.loungeAreaScene.key;
export const characterPickSceneKey = scenes.characterPickScene.key;

export const config = {
  title: 'CyberBeavers',
  type: Phaser.WEBGL,
  parent: 'game',
  antialiasGL: false,
  pixelArt: true,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.NONE,
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
  if (window.game?.isBooted) {
    setTimeout(() => {
      window.game?.scale.resize(window.innerWidth, window.innerHeight);
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();
