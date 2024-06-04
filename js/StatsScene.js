import { EVENTS_NAME } from './utils/events.js';
import { Text } from './Text.js';

export default class StatsScene extends Phaser.Scene {
  walletAddress;
  stats;
  roundInfo;
  beaverChoice;
  processId;
  allPlayers;
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
    this.gameHeight = window.innerHeight;
    this.processId = window.warpAO.processId();
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
    this.addPlayersModal(this.allPlayers);
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

    this.game.events.on(EVENTS_NAME.updatePlayers, (players) => {
      this.allPlayers = players;
      document.getElementById('stats-scene-other-beavers').innerHTML =
        this.addPlayersModal();
    });
  }

  createStatsBox() {
    const beaverStatsBoxEl = document.createElement('div');

    beaverStatsBoxEl.style = `  width: 300px;
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
    background-color: #fcee09;
    font-family: 'Press Start 2P';
    font-size: 0.5rem;
    padding: 30px;
    clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);">
    <div style="display: flex; justify-content: space-between; align-items: center;">
    <img
src="assets/images/${this.beaverChoice}_portrait.png"
width=72
height=72/>
<div id="stats-scene-wallet-address">${this.walletAddress && this.walletAddress.substr(0, 3) + '...' + this.walletAddress.substr(this.walletAddress.length - 3)}</div>
</div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;"><div>PROCESS</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-contract"><a style="color: black;" target="_blank" href='https://www.ao.link/entity/${this.processId}'>${this.processId.substr(0, 3) + '...' + this.processId.substr(this.processId.length - 3)}</a></div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;"><div>HP</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-hp">${this.stats?.hp.current}</div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;"><div>SCORE</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-score">${this.stats?.score}</div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;"><div>COINS</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-coins">${this.stats?.coins}</div>
    </div>
    </div>
    <div id="stats-scene-other-beavers">
     ${this.addPlayersModal()}
     </div>
    </div>`;

    return beaverStatsBoxEl;
  }

  addPlayersModal() {
    if (Object.keys(this.allPlayers).length <= 1) return '';
    return `
    <div style="position: relative;">
    <div style="display: flex; justify-content: center;"><div style="display: flex;
    justify-content: center;
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;">OTHER BEAVERS</div></div>
      ${this.addPlayers()}
    </div>
    </div>
`;
  }

  addPlayers() {
    let playersBox = ``;
    let playersAddresses = Object.keys(this.allPlayers);
    playersAddresses = playersAddresses.filter((p) => p !== this.walletAddress);
    for (let i = 0; i < playersAddresses.length; i++) {
      playersBox += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <img
  src="assets/images/${this.allPlayers[playersAddresses[i]].texture.key.replace('_48', '_portrait')}.png"
  width=48
  height=48/>
  <div id="stats-scene-wallet-address">${playersAddresses[i] && playersAddresses[i].substr(0, 3) + '...' + playersAddresses[i].substr(playersAddresses[i].length - 3)}</div>
  </div>
      `;
    }
    return playersBox;
  }
}
