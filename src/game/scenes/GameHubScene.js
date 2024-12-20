import Const from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import {
  connectWalletSceneKey,
  gameHubSceneKey,
  globalLeaderboardSceneKey,
  loungeAreaSceneKey,
  mainSceneKey,
} from '../../main.js';
import Phaser from 'phaser';
import { GameHubGui } from '../gui/GameHubGui.js';
import { hideGui, showGui } from '../utils/mithril.js';
import { loadMapTxId } from '../utils/utils.js';
import { safeGet } from 'warp-contracts';
import m from 'mithril';

export default class GameHubScene extends Phaser.Scene {
  gameButtons;
  textBorders;

  constructor() {
    super(gameHubSceneKey);
  }

  init(data) {
    console.log('Game Hub - 1. Init', data);
    this.walletAddress = data.walletAddress;
    this.gameError = data.error;
  }

  preload() {
    console.log('Game Hub - 2. Preload');
  }

  async create() {
    console.log('Game Hub - 3. Create');

    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection.hub;
      this.server.subscribe(this);
      if (window.warpAO.config.env === 'dev') {
        this.server.send({ cmd: 'hubInfo' });
      } else {
        this.doFetchHubInfo(window.warpAO.gameHubProcessId());
      }
      const self = this;
      m.mount(showGui(), {
        view: function () {
          return m(GameHubGui, {
            gameError: self.gameError,
            games: self.games,
            joinGame: async (processId, game) => {
              console.log(`picked ${processId}`);
              await serverConnection.initGame(game.module, processId, game.mapTxId);
              hideGui();
              self.scene.start(loungeAreaSceneKey, {
                walletAddress: self.walletAddress,
                processId,
              });
            },
            spectateGame: async (processId, game) => {
              console.log(`spectating ${processId}`);
              await serverConnection.initGame(game.module, processId, game.mapTxId);
              window.warpAO.spectatorMode = true;
              hideGui();
              const mapTxId = await loadMapTxId();
              self.scene.start(mainSceneKey, {
                mapTxId,
                walletAddress: self.walletAddress,
              });
            },
            enterGlobalLeaderboard: async () => {
              hideGui();
              self.scene.start(globalLeaderboardSceneKey, {
                walletAddress: self.walletAddress,
              });
            },
          });
        },
      });
    } else {
      this.scene.start(connectWalletSceneKey);
    }
  }

  doFetchHubInfo(gameHubProcessId) {
    console.log('Fetching hub info');
    safeGet(`${window.warpAO.config.cuAddress}/current-state/${gameHubProcessId}`)
      .then((response) => {
        console.log('Hub info', response);
        const message = {
          games: response.result.State.games,
          removedGames: response.result.State.removedGames,
          cmd: Const.Command.hubStats,
        };
        this.handleMessage(message);
      })
      .catch(console.error);
  }

  update() {}

  handleMessage(response) {
    const self = this;
    console.log(`Got message`, response);
    switch (response.cmd) {
      case Const.Command.hubStats: {
        console.log(`Found games: ${Object.keys(response.games).length}`);
        if (response.games) {
          // show active games on the top
          const gamesToSort = Object.entries(response.games)
            .filter(([k, v]) => v.mode === warpAO.config.mode)
            .map(([k, v]) => {
              if (v.playWindow?.end) {
                if (v.playWindow.end > Date.now()) {
                  return [
                    k,
                    {
                      ...v,
                      finish: v.playWindow.end,
                    },
                  ];
                }
                return [
                  k,
                  {
                    ...v,
                    finish: v.playWindow.end + 365 * 24 * 60 * 60 * 1000,
                  },
                ];
              }
              return [
                k,
                {
                  ...v,
                  finish: v.playWindow?.begin,
                },
              ];
            });
          let games = gamesToSort.sort(([k1, v1], [k2, v2]) => v1.finish - v2.finish);
          this.games = games;
          m.redraw();
        }

        break;
      }
      default:
        throw new Error(`Unknown command received ${response.cmd}`);
    }
  }
}
