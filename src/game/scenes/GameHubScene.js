import Const from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import { connectWalletSceneKey, gameHubSceneKey, loungeAreaSceneKey } from '../../main.js';
import Phaser from 'phaser';
import { GameHubGui } from '../gui/GameHubGui.js';
import { hideGui, showGui } from '../utils/mithril.js';

export default class GameHubScene extends Phaser.Scene {
  beaverId;
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
      this.server.send({ cmd: 'hubInfo' });
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
          });
        },
      });
    } else {
      this.scene.start(connectWalletSceneKey);
    }
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
          const gamesToSort = Object.entries(response.games).map(([k, v]) => {
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
                  finish: v.playWindow.end + 24 * 60 * 60 * 1000,
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
    }
  }
}
