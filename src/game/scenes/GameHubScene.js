import Const from '../common/const.mjs';
import { colors } from '../utils/style.js';
import { serverConnection } from '../lib/serverConnection.js';
import { TextButton } from '../objects/TextButton.js';
import { loungeAreaSceneKey, connectWalletSceneKey, gameHubSceneKey } from '../main.js';
import { trimString } from '../utils/utils.js';
import { Scrollbar } from '../objects/Scrollbar.js';
import Phaser from 'phaser';
import { EventBus } from '../EventBus.js';

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
    this.gameButtons = [];
    this.textBorders = [];
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
    } else {
      this.scene.start(connectWalletSceneKey);
    }

    const headerText = this.gameError ? `Games are currently unavailable.\n${this.gameError}\n\n` : 'Games\n\n';

    this.header = this.add.text(100, 100, headerText, {
      fill: colors.yellow,
      font: '20px',
    });

    this.container = this.add.container();
    EventBus.emit('current-scene-ready', this);
  }

  update() {}

  handleMessage(response) {
    const self = this;
    console.log(`Got message`, response);
    switch (response.cmd) {
      case Const.Command.hubStats: {
        this.textBorders?.forEach((b) => b.destroy());
        this.textBorders = [];
        this.gameButtons?.forEach((b) => b.destroy());
        this.gameButtons = [];

        console.log(`Found games: ${Object.keys(response.games).length}`);
        if (response.games) {
          let i = 0;
          let activeGames = [];
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
          for (const [processId, game] of games) {
            console.log(`${++i} ${processId}: ${game}`);
            let bLabel = `${i} ${trimString(processId, 5, 2, 4)}`;
            if (game.walletsQueue && game.playersLimit) {
              bLabel += `\nPlayers: ${game.walletsQueue.length}/${game.playersLimit}`;
            }
            if (game.playWindow) {
              if (game.playWindow.begin && game.playWindow.begin > Date.now()) {
                bLabel += `\nStart at: ${new Date(game.playWindow.begin).toLocaleString()}`;
              } else if (game.playWindow.end && game.playWindow.end < Date.now()) {
                bLabel += `\nFinished at: ${new Date(game.playWindow.end).toLocaleString()}`;
              } else {
                activeGames.push(processId);
                const termination = game.playWindow.end
                  ? `until ${new Date(game.playWindow.end).toLocaleString()}`
                  : '';
                bLabel += `\nActive ${termination}`;
              }
            }

            this.gameButtons[i] = new TextButton(
              this,
              100,
              -75 + i * 100,
              bLabel,
              {
                fill: colors.green,
                font: '20px',
              },
              async () => {
                console.log(`picked ${++i} ${processId}`);
                await serverConnection.initGame(game.module, processId, game.mapTxId);
                await serverConnection.initChat(game.chatModuleId, game.chatProcessId);
                this.scene.start(loungeAreaSceneKey, {
                  walletAddress: this.walletAddress,
                });
              }
            );

            if (activeGames.includes(processId)) {
              this.textBorders[i] = this.add.rectangle(
                100 + (this.gameButtons[i].width / 2 + 100 / 2),
                -100 + i * 150,
                this.gameButtons[i].width + 100,
                100,
                0xffffff,
                0
              );
              this.textBorders[i].setStrokeStyle(2, 0x00ff00);
              Phaser.Display.Align.In.Center(this.gameButtons[i], this.textBorders[i]);
              this.container.add(this.textBorders[i], false);
            }

            this.container.add(this.gameButtons[i], false);
          }
        }

        break;
      }
    }

    const bounds = self.container.getBounds();
    self.scrollbar = new Scrollbar(
      self,
      this.textBorders.length > 0 ? 360 : 310,
      500,
      window.innerHeight - 300,
      'y',
      self.container.setSize(bounds.width + 200, bounds.height + 50),
      { track: colors.lightGreen, thumb: colors.darkGreen }
    );
  }
}
