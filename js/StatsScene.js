import { EVENTS_NAME } from './utils/events.js';
import { Text } from './Text.js';

export default class StatsScene extends Phaser.Scene {
  walletAddress;
  stats;
  roundInfo;
  beaverChoice;
  constructor() {
    super('stats-scene');
  }

  init() {
    console.log('Stats Scene - 1. Init');
  }

  preload() {
    console.log('Stats Scene - 2. Preload');
    this.load.image(
      'hacker_beaver_portrait',
      'assets/images/hacker_beaver_portrait.png'
    );
    this.load.image(
      'heavy_beaver_portrait',
      'assets/images/heavy_beaver_portrait.png'
    );
    this.load.image(
      'speedy_beaver_portrait',
      'assets/images/speedy_beaver_portrait.png'
    );
    this.load.image('time_bar', 'assets/images/time_bar.png');
  }

  create() {
    console.log('Stats Scene - 3. Create');
    this.gameWidth = window.innerWidth;
    if (this.walletAddress) {
      const beaverStatsBoxEl = this.createStatsBox();
      this.beaverStatsBox = this.add.dom(
        100,
        100 + beaverStatsBoxEl.width,
        beaverStatsBoxEl
      );
    }
    this.initListeners();
    this.addTitle();
    this.addRoundBar();
    this.addSubtitle();
  }

  addTitle() {
    this.title = new Text(this, this.gameWidth / 2, 50, 'ROUND 700', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      textTransform: 'uppercase',
      color: '#fcee09',
    }).setDepth(1);
    this.title.x = this.gameWidth / 2 - this.title.width / 2;
  }

  addSubtitle() {
    this.subtitle = new Text(
      this,
      this.gameWidth / 2,
      this.timeBar.y + this.timeBar.height,
      'AP: 10',
      {
        fontFamily: '"Press Start 2P"',
        fontSize: '20px',
        textTransform: 'uppercase',
        color: 'white',
      }
    ).setDepth(1);
    this.subtitle.x = this.gameWidth / 2 - this.subtitle.width / 2;
  }

  addRoundBar() {
    this.timeBar = this.add
      .image(
        window.innerWidth / 2,
        this.title.y + this.title.height + 50,
        'time_bar'
      )
      .setDepth(100);

    this.timeMask = this.add
      .sprite(this.timeBar.x, this.timeBar.y, 'time_bar')
      .setDepth(100);
    this.timeMask.visible = false;
    this.initialtimeMaskPosition = this.timeMask.x;
    this.timeBar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.timeMask
    );
    this.stepWidth = this.timeMask.displayWidth / 10;
  }

  initListeners() {
    console.log('initial');
    this.game.events.on(EVENTS_NAME.updateStats, (stats) => {
      document.getElementById('stats-scene-hp').innerText = stats?.hp?.current;
      document.getElementById('stats-scene-coins').innerText = stats?.coins;
      document.getElementById('stats-scene-score').innerText = stats?.score;
      this.subtitle.setText(`AP: ${stats?.ap?.current}`);
    });

    this.game.events.on(EVENTS_NAME.updateRoundInfo, (roundInfo) => {
      this.timeMask.x =
        this.initialtimeMaskPosition - this.stepWidth * roundInfo.gone;
      this.title.setText(`ROUND ${roundInfo.currentRound}`);
    });
  }

  createStatsBox() {
    const beaverStatsBoxEl = document.createElement('div');

    beaverStatsBoxEl.style = `  width: 300px;
      height: 200px;
      border: 0;
      outline: none;
      background-color: #050a0e;
      position: relative;
      font-family: Tomorrow, sans-serif;
      font-size: 0.5rem;
      text-transform: uppercase;
      color: #050a0e;
      clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);`;
    beaverStatsBoxEl.innerHTML = `
    <div style="  display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background-color: #fcee09;
    font-family: 'Press Start 2P';
    font-size: 0.5rem;
    padding: 30px;
    clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);">
    <div style="display: flex; justify-content: space-between; align-items: center;">
    <img
src="assets/images/${this.beaverChoice}_portrait.png"
width=96
height=96/>
<div id="stats-scene-wallet-address">${this.walletAddress && this.walletAddress.substr(0, 3) + '...' + this.walletAddress.substr(this.walletAddress.length - 3)}</div>
</div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>HP</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-hp">${this.stats?.hp.current}</div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>SCORE</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-score">${this.stats?.score}</div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>COINS</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-coins">${this.stats?.coins}</div>
    </div>
    </div>
    </div>`;

    return beaverStatsBoxEl;
  }
}
