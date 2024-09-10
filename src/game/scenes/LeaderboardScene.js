import { WebFontFile } from '../objects/WebFontFile.js';
import Const, { GameTreasure } from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import {
  mainSceneKey,
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  scenes,
  gameHubSceneKey,
} from '../../main.js';
import { formatCoin, trimString } from '../utils/utils.js';
import Phaser from 'phaser';
import { hideGui, showGui } from '../utils/mithril.js';
import { LeaderboardGui } from '../gui/LeaderboardGui.js';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super(leaderboardSceneKey);
  }

  init(data) {
    console.log('Leaderboard Scene - 1. Init');
    this.allPlayers = data.players;
    this.mainPlayer = data.mainPlayer;
    this.walletAddress = data.mainPlayer?.walletAddress || data.walletAddress;
    this.mainScene = this.scene.get(mainSceneKey);
  }

  preload() {
    console.log('Leaderboard Scene - 2. Preload');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  async create() {
    console.log('Leaderboard Scene - 3. Create');
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection.game;
      this.server.subscribe(this);

      var self = this;
      const tokenType = GameTreasure.trunk.type;
      m.mount(showGui(), {
        view: function () {
          return m(LeaderboardGui, {
            tokenType,
            data: /* [
              [1, { img: 'heavy_beaver', name: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY' }, 0, 69544, 5, 2],
              [2, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 10000, 20, 0],
              [3, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 30],
              [4, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [5, { img: 'hacker_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [6, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [7, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [8, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [9, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [10, { img: 'hacker_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [11, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [14, { img: 'hacker_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [15, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [16, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [17, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [18, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [19, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [20, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [21, { img: 'speedy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
              [22, { img: 'heavy_beaver', name: 'just_ppe' }, 0, 69544, 0, 0],
            ],*/ self.prepareCellsData(tokenType),
            back: () => {
              self.server.unsubscribe();
              self.restartScenes();
              self.scene.start(gameHubSceneKey, {
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

  prepareCellsData(tokenType) {
    const cells = [];
    if (!this.allPlayers || Object.keys(this.allPlayers).length == 0) {
      return cells;
    }
    let allPlayersKeys = Object.keys(this.allPlayers);
    allPlayersKeys.sort((a, b) => this.allPlayers[b].stats.coins?.gained - this.allPlayers[a].stats.coins?.gained);
    for (let i = 0; i < allPlayersKeys.length; i++) {
      const key = allPlayersKeys[i];
      const player = this.allPlayers[key];
      cells.push([
        i + 1,
        {
          img: player.beaverChoice || player.beaverId,
          name: player.userName || player.walletAddress,
        },
        player.stats?.coins?.gained,
        player.stats?.coins?.balance + player.stats?.coins?.gained,
        `${formatCoin(player.stats?.additionalTokens[tokenType]?.gained, tokenType) || '-'}`,
        player.stats?.kills?.frags,
        player.stats?.kills?.deaths,
      ]);
    }
    return cells;
  }

  displayName(player) {
    if (player.userName) {
      if (player.userName.length > 11) {
        trimString(player.userName, 4, 3, 4);
      }
      return player.userName;
    }
    return trimString(player.walletAddress);
  }

  handleMessage(response) {
    const urlParams = new URLSearchParams(window.location.search);
    const env = urlParams.get('env') || 'prod';

    if (response.cmd == Const.Command.nextProcessSet) {
      if (warpAO.config.reload) {
        window.location.reload();
      } else {
        this.server.switchProcess(response.processId, response.moduleId);

        window.warpAO.config[`processId_${env}`] = response.processId;
        window.warpAO.processId = () => {
          return response.processId;
        };

        window.warpAO.config[`moduleId_${env}`] = response.moduleId;
        window.warpAO.moduleId = () => {
          return response.moduleId;
        };
        hideGui();
        this.restartScenes();
        this.scene.start(loungeAreaSceneKey, { walletAddress: this.walletAddress });
      }
    }
  }

  restartScenes() {
    const self = this;
    self.mainScene.tileMap?.destroy();

    const scenesToRestartKeys = Object.keys(scenes);
    scenesToRestartKeys.forEach((s) => {
      const scene = scenes[s];
      if (scene.key != leaderboardSceneKey) {
        const sceneToDestroy = self.scene.get(scene.key);
        sceneToDestroy?.load?.reset();
        self.scene.remove(scene.key);
      }
    });

    scenesToRestartKeys.forEach((s) => {
      const scene = scenes[s];
      if (scene.key != leaderboardSceneKey) self.scene.add(scene.key, scene.scene, false);
    });
  }
}
