import { Text } from '../objects/Text.js';
import { colors } from '../utils/style.js';
import { WebFontFile } from '../WebFontFile.js';
import Const from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import { EVENTS_NAME } from '../utils/events.js';
import {
  mainSceneKey,
  connectWalletSceneKey,
  leaderboardSceneKey,
  loungeAreaSceneKey,
  statsSceneKey,
  scenes,
  gameHubSceneKey,
} from '../config/config.js';
import { trimString } from '../utils/utils.js';
import { TextButton } from '../objects/TextButton.js';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super(leaderboardSceneKey);
  }

  init(data) {
    console.log('Leaderboard Scene - 1. Init');
    this.allPlayers = data.players;
    this.mainPlayer = data.mainPlayer;
    this.walletAddress = data.mainPlayer?.walletAddress || data.walletAddress;
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;
    this.mainScene = this.scene.get(mainSceneKey);
    this.statsScene = this.scene.get(statsSceneKey);
  }

  preload() {
    console.log('Leaderboard Scene - 2. Preload');
    const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js';
    this.load.plugin('rexgridtableplugin', url, true);
    const sliderUrl =
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
    this.load.plugin('rexsliderplugin', sliderUrl, true);
    this.load.image('post_apocalyptic_background', 'assets/images/background_post_apocalyptic.png');
    this.load.image('hacker_beaver_portrait', 'assets/images/beavers/hacker_beaver/hacker_beaver_portrait.png');
    this.load.image('heavy_beaver_portrait', 'assets/images/beavers/heavy_beaver/heavy_beaver_portrait.png');
    this.load.image('speedy_beaver_portrait', 'assets/images/beavers/speedy_beaver/speedy_beaver_portrait.png');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  async create() {
    console.log('Leaderboard Scene - 3. Create');
    if (window.arweaveWallet || window.warpAO.generatedSigner) {
      this.server = serverConnection.game;
      this.serverChat = serverConnection.chat;
      this.server.subscribe(this);
      this.serverChat.subscribe(this);
    } else {
      this.scene.start(connectWalletSceneKey);
    }
    this.addBackground();
    this.addAndPositionTitle();
    this.addReturnToHubButton();
    this.createGridTable(this);
  }

  addBackground() {
    this.background = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'post_apocalyptic_background');
    this.background.setDisplaySize(this.gameWidth, this.gameHeight);
    this.background.setDepth(10);
  }

  addAndPositionTitle() {
    this.title = new Text(this, this.gameWidth / 2, 100, 'TOP BEAVERS', {
      fontFamily: '"Press Start 2P"',
      fontSize: '50px',
      textTransform: 'uppercase',
      color: colors.yellow,
    });
    this.title.x = this.gameWidth / 2 - this.title.width / 2;
    this.title.setDepth(11);
  }

  addReturnToHubButton() {
    const self = this;
    const textBorder = self.add.rectangle(200, 125, 200, 50, 0xffffff, 0);
    textBorder.setStrokeStyle(2, 0x00ff00);
    textBorder.setDepth(50);

    this.backButton = new TextButton(
      this,
      0,
      0,
      '< Back',
      {
        fill: colors.green,
        font: '30px',
      },
      () => {
        self.server.unsubscribe();
        self.serverChat.unsubscribe();
        self.restartScenes();
        self.scene.start(gameHubSceneKey, {
          walletAddress: self.walletAddress,
        });
      }
    );
    this.backButton.setDepth(50);

    Phaser.Display.Align.In.Center(this.backButton, textBorder);
  }

  createGridTable() {
    const self = this;
    const cells = this.prepareCellsData();

    const newCellObject = function (scene, cell) {
      let input;
      if (cells[cell.index].img) {
        const img = self.add.image(5, 5, `${cells[cell.index].img}_portrait`);
        const txt = new Text(self, 5, 5, cells[cell.index].address, {
          fontFamily: '"Press Start 2P"',
          fontSize: '20px',
          textTransform: 'uppercase',
          color: colors.white,
        });
        Phaser.Display.Bounds.SetRight(img, Phaser.Display.Bounds.GetLeft(txt) - 10);
        const container = self.add.container(5, 5, [img, txt]);
        container.sendToBack(txt);
        input = container;
      } else {
        input = new Text(self, 5, 5, cells[cell.index], {
          fontFamily: '"Press Start 2P"',
          fontSize: '20px',
          textTransform: 'uppercase',
          color: colors.white,
        });
      }
      const container = scene.add.container(0, 0, [input]);
      return container;
    };

    const onCellVisible = function (cell) {
      cell.setContainer(newCellObject(this, cell));
    };
    this.table = this.add.rexGridTable(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth - this.gameWidth / 5,
      this.gameHeight / 2,
      {
        cellHeight: 105,
        cellWidth: (this.gameWidth - this.gameWidth / 5) / 5,
        cellsCount: cells.length,
        columns: 5,
        cellVisibleCallback: onCellVisible.bind(this),
      }
    );

    this.table.setDepth(12);
    this.add.graphics().lineStyle(3, 0xff0000).strokeRectShape(this.table.getBounds());

    const topRight = this.table.getTopRight();
    const bottomRight = this.table.getBottomRight();
    const thumb = this.add.rectangle(0, 0, 25, 50, 0xffffff);
    thumb.setDepth(13);
    thumb.slider = this.plugins.get('rexsliderplugin').add(thumb, {
      endPoints: [
        {
          x: topRight.x + 10,
          y: topRight.y + 10,
        },
        {
          x: bottomRight.x + 10,
          y: bottomRight.y - 10,
        },
      ],
      valuechangeCallback: function (newValue) {
        self.table.setTableOYByPercentage(newValue).updateTable().setDepth(12);
      },
    });
  }

  prepareCellsData() {
    const cells = [['RANK', 'PLAYER', 'CBCOINS', 'GAINED', 'HP']];
    if (!this.allPlayers || Object.keys(this.allPlayers).length == 0) {
      return cells.flat(1);
    }
    let allPlayersKeys = Object.keys(this.allPlayers);
    allPlayersKeys.sort((a, b) => this.allPlayers[b].stats.coins?.gained - this.allPlayers[a].stats.coins?.gained);
    for (let i = 0; i < allPlayersKeys.length; i++) {
      const key = allPlayersKeys[i];
      cells.push([
        i + 1,
        {
          img: this.allPlayers[key].beaverChoice || this.allPlayers[key].beaverId,
          address: this.displayName(this.allPlayers[key]),
        },
        this.allPlayers[key].stats?.coins?.balance + this.allPlayers[key].stats?.coins?.gained,
        this.allPlayers[key].stats?.coins?.gained,
        this.allPlayers[key].stats?.hp?.current,
      ]);
    }
    return cells.flat(1);
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
        this.serverChat.switchProcess(response.chatProcessId, response.chatModuleId);

        window.warpAO.config[`processId_${env}`] = response.processId;
        window.warpAO.processId = () => {
          return response.processId;
        };

        window.warpAO.config[`moduleId_${env}`] = response.moduleId;
        window.warpAO.moduleId = () => {
          return response.moduleId;
        };
        window.warpAO.config[`chat_processId_${env}`] = response.chatProcessId;
        window.warpAO.chatProcessId = () => {
          return response.chatProcessId;
        };

        window.warpAO.config[`chat_moduleId_${env}`] = response.chatModuleId;
        window.warpAO.chatModuleId = () => {
          return response.chatModuleId;
        };
        this.restartScenes();
        this.scene.start(loungeAreaSceneKey, { walletAddress: this.walletAddress });
      }
    }
  }

  restartScenes() {
    const self = this;

    const scenesToRestartKeys = Object.keys(scenes);
    scenesToRestartKeys.forEach((s) => {
      const scene = scenes[s];
      if (scene.key != leaderboardSceneKey) self.scene.remove(scene.key);
    });

    this.game.events.removeAllListeners(EVENTS_NAME.updateRoundInfo);
    this.game.events.removeAllListeners(EVENTS_NAME.nextMessage);
    this.game.events.removeAllListeners(EVENTS_NAME.updatePlayers);
    this.game.events.removeAllListeners(EVENTS_NAME.updateStats);
    this.game.events.removeAllListeners(EVENTS_NAME.updateOtherPlayerStats);

    scenesToRestartKeys.forEach((s) => {
      const scene = scenes[s];
      if (scene.key != leaderboardSceneKey) self.scene.add(scene.key, scene.scene, false);
    });
  }
}
