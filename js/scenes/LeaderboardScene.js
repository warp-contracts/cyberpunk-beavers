import { Text } from '../objects/Text.js';
import { TextButton } from '../objects/TextButton.js';
import { colors } from '../utils/style.js';
import { WebFontFile } from '../WebFontFile.js';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('leaderboard-scene');
  }

  init(data) {
    console.log('Leaderboard Scene - 1. Init');
    this.allPlayers = data.players;
    this.mainPlayer = data.mainPlayer;
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;
    this.mainScene = this.scene.get('main-scene');
    this.statsScene = this.scene.get('stats-scene');
  }

  preload() {
    console.log('Leaderboard Scene - 2. Preload');
    const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js';
    this.load.plugin('rexgridtableplugin', url, true);
    const sliderUrl =
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
    this.load.plugin('rexsliderplugin', sliderUrl, true);
    this.load.image('post_apocalyptic_background', 'assets/images/background_post_apocalyptic.png');
    this.load.image('hacker_beaver_portrait', 'assets/images/beavers/hacker_beaver_portrait.png');
    this.load.image('heavy_beaver_portrait', 'assets/images/beavers/heavy_beaver_portrait.png');
    this.load.image('speedy_beaver_portrait', 'assets/images/beavers/speedy_beaver_portrait.png');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create() {
    console.log('Leaderboard Scene - 3. Create');
    this.addBackground();
    this.addAndPositionTitle();
    this.createGridTable(this);
    // this.closeButton = new TextButton(
    //   this,
    //   this.gameWidth - 200,
    //   50,
    //   'Close',
    //   {
    //     fill: colors.white,
    //     font: '20px',
    //   },
    //   () => {
    //     this.statsScene.scene.setVisible(true);
    //     document.getElementById('stats-box').style.display = 'block';
    //     document.getElementById('incoming-messages-box').style.display = 'block';
    //     this.mainScene.scene.resume();
    //     this.scene.stop();
    //   }
    // ).setDepth(13);
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
        cellWidth: (this.gameWidth - this.gameWidth / 5) / 4,
        cellsCount: cells.length,
        columns: 4,
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
    const cells = [['RANK', 'PLAYER', 'SCORE', 'HP']];
    if (this.allPlayers.length == 0) {
      return cells;
    }
    let allPlayersKeys = Object.keys(this.allPlayers);
    allPlayersKeys.sort(
      (a, b) => this.allPlayers[b].stats.coins?.available - this.allPlayers[a].stats.coins?.available
    );
    for (let i = 0; i < allPlayersKeys.length; i++) {
      const key = allPlayersKeys[i];
      cells.push([
        i + 1,
        {
          img: this.allPlayers[key].beaverChoice || this.allPlayers[key].beaverId,
          address: key.substr(0, 3) + '...' + key.substr(key.length - 3),
        },
        this.allPlayers[key].stats.coins?.available,
        this.allPlayers[key].stats.hp?.current,
      ]);
    }
    if (this.mainPlayer?.walletAddress) {
      const mainPlayerCell = cells.find(
        (c) =>
          c[1].address ==
          this.mainPlayer.walletAddress.substr(0, 3) +
            '...' +
            this.mainPlayer.walletAddress.substr(this.mainPlayer.walletAddress.length - 3)
      );
      const mainPlayerIndex = cells.indexOf(mainPlayerCell);
      cells.splice(mainPlayerIndex, 1);
      cells.splice(1, 0, mainPlayerCell);
    }
    return cells.flat(1);
  }
}
