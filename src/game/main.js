import { WEBGL, Scale, Game } from 'phaser';
import MainScene from './scenes/MainScene.js';
import LoadingScene from './scenes/LoadingScene.js';
import PlayerPickScene from './scenes/PlayerPickScene.js';
import ConnectWalletScene from './scenes/ConnectWalletScene.js';
import StatsScene from './scenes/StatsScene.js';
import MainSceneLoading from './scenes/MainSceneLoading.js';
import LeaderboardScene from './scenes/LeaderboardScene.js';
import LoungeAreaScene from './scenes/LoungeAreaScene.js';
import ChatScene from './scenes/ChatScene.js';
import GameHubScene from './scenes/GameHubScene.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

export const scenes = {
  loadingScene: { key: 'loading-scene', scene: LoadingScene },
  connectWalletScene: { key: 'connect-wallet-scene', scene: ConnectWalletScene },
  gameHubScene: { key: 'game-hub-scene', scene: GameHubScene },
  loungeAreaScene: { key: 'lounge-area-scene', scene: LoungeAreaScene },
  playerPickScene: { key: 'player-pick-scene', scene: PlayerPickScene },
  mainScene: { key: 'main-scene', scene: MainScene },
  statsScene: { key: 'stats-scene', scene: StatsScene },
  mainSceneLoading: { key: 'main-scene-loading', scene: MainSceneLoading },
  leaderboardScene: { key: 'leaderboard-scene', scene: LeaderboardScene },
  chatScene: { key: 'chat-scene', scene: ChatScene },
};

export const loadingSceneKey = scenes.loadingScene.key;
export const mainSceneKey = scenes.mainScene.key;
export const mainSceneLoadingKey = scenes.mainSceneLoading.key;
export const gameHubSceneKey = scenes.gameHubScene.key;
export const connectWalletSceneKey = scenes.connectWalletScene.key;
export const leaderboardSceneKey = scenes.leaderboardScene.key;
export const statsSceneKey = scenes.statsScene.key;
export const loungeAreaSceneKey = scenes.loungeAreaScene.key;
export const playerPickSceneKey = scenes.playerPickScene.key;
export const chatSceneKey = scenes.chatScene.key;

const config = {
  title: 'CyberBeavers',
  type: WEBGL,
  parent: 'game',
  antialias: false,
  backgroundColor: '#000000',
  scale: {
    mode: Scale.ScaleModes.None,
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
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
  canvasStyle: `display: block; width: 100%; height: 100%; margin: -1px;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: Object.values(scenes).map((s) => s.scene),
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
