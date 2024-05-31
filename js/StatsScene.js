import { EVENTS_NAME } from './utils/events.js';

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
  }

  create() {
    console.log('Stats Scene - 3. Create');
    if (this.walletAddress) {
      const beaverStatsBoxEl = this.createStatsBox();
      this.beaverStatsBox = this.add.dom(
        100,
        100 + beaverStatsBoxEl.width,
        beaverStatsBoxEl
      );
    }
    this.initListeners();
  }

  initListeners() {
    console.log('initial');
    this.game.events.on(EVENTS_NAME.updateStats, (stats) => {
      document.getElementById('stats-scene-ap').innerText = stats?.ap?.current;
      document.getElementById('stats-scene-hp').innerText = stats?.hp?.current;
      document.getElementById('stats-scene-coins').innerText = stats?.coins;
      document.getElementById('stats-scene-score').innerText = stats?.score;
    });

    this.game.events.on(EVENTS_NAME.updateRoundInfo, (roundInfo) => {
      document.getElementById('stats-scene-round-info').innerText = roundInfo;
    });
  }

  createStatsBox() {
    const beaverStatsBoxEl = document.createElement('div');

    beaverStatsBoxEl.style = `  width: 350px;
      height: 250px;
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
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>AP</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-ap">${this.stats?.ap.current}</div>
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
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>ROUND</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-round-info">${this.roundInfo}</div>
    </div>
    </div>
    </div>`;

    return beaverStatsBoxEl;
  }
}
