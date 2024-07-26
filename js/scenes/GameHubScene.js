import Const from '../common/const.mjs';
import { colors } from '../utils/style.js';
import { serverConnection } from '../lib/serverConnection.js';
import { TextButton } from '../objects/TextButton.js';
import { loungeAreaSceneKey, connectWalletSceneKey, gameHubSceneKey } from '../config/config.js';
import { trimString } from '../utils/utils.js';

export default class GameHubScene extends Phaser.Scene {
  beaverId;
  gameButtons;

  constructor() {
    super(gameHubSceneKey);
  }

  init(data) {
    console.log('Game Hub - 1. Init', data);
    this.walletAddress = data.walletAddress;
    this.gameError = data.error;
    this.gameButtons = [];
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

    this.container = this.add.container(50, 0);
  }

  update() {}

  handleMessage(response) {
    console.log(`Got message`, response);
    switch (response.cmd) {
      case Const.Command.hubStats: {
        this.textBorder?.destroy();
        if (this.gameButtons.length > 0) {
          this.gameButtons.forEach((b) => b.destroy());
          this.gameButtons = [];
        }
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
            if (game.players && game.playersLimit) {
              bLabel += `\nPlayers: ${game.players.length}/${game.playersLimit}`;
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
              75 + i * 100,
              bLabel,
              {
                fill: colors.green,
                font: '20px',
              },
              async () => {
                console.log(`picked ${++i} ${processId}`);
                await serverConnection.initGame(game.module, processId);
                await serverConnection.initChat(game.chatModuleId, game.chatProcessId);
                this.scene.start(loungeAreaSceneKey, {
                  walletAddress: this.walletAddress,
                });
              }
            );

            if (activeGames.includes(processId)) {
              this.textBorder = this.add.rectangle(
                100 + (this.gameButtons[i].width / 2 + 100 / 2),
                50 + i * 150,
                this.gameButtons[i].width + 100,
                100,
                0xffffff,
                0
              );
              this.textBorder.setStrokeStyle(2, 0x00ff00);
              Phaser.Display.Align.In.Center(this.gameButtons[i], this.textBorder);
            }
          }
        }

        break;
      }
    }
  }
}
