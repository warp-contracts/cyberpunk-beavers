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
    this.load.image('D', 'assets/images/D.png');
    this.load.image('P', 'assets/images/P.png');
    this.load.image('SPACE', 'assets/images/SPACE.png');
    this.load.image('ARROWDOWN', 'assets/images/ARROWDOWN.png');
    this.load.image('ARROWLEFT', 'assets/images/ARROWLEFT.png');
    this.load.image('ARROWRIGHT', 'assets/images/ARROWRIGHT.png');
    this.load.image('ARROWUP', 'assets/images/ARROWUP.png');
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
    this.addLegend();
  }

  addLegend() {
    const height = 120;
    const width = 300;
    const moveKey = this.add
      .image(this.gameWidth - width, this.gameHeight - 32 - height, 'ARROWLEFT')
      .setScale(1.5);
    const moveKey2 = this.add
      .image(
        this.gameWidth - width + moveKey.width * 2,
        this.gameHeight - 32 - height,
        'ARROWUP'
      )
      .setScale(1.5);
    const moveKey3 = this.add
      .image(
        this.gameWidth - width + moveKey.width * 4,
        this.gameHeight - 32 - height,
        'ARROWDOWN'
      )
      .setScale(1.5);
    const moveKey4 = this.add
      .image(
        this.gameWidth - width + moveKey.width * 6,
        this.gameHeight - 32 - height,
        'ARROWRIGHT'
      )
      .setScale(1.5);
    const move = new Text(this, 0, 0, 'MOVE', {
      fontFamily: '"Press Start 2P"',
      fontSize: '18px',
      textTransform: 'uppercase',
      color: 'white',
    });
    Phaser.Display.Bounds.SetLeft(
      move,
      Phaser.Display.Bounds.GetCenterX(moveKey4) + moveKey4.width + 30
    );

    Phaser.Display.Bounds.SetCenterY(
      move,
      Phaser.Display.Bounds.GetCenterY(moveKey)
    );
    const digKey = this.add
      .image(
        this.gameWidth - width + moveKey.width * 6,
        this.gameHeight - 32 - height + 40,
        'D'
      )
      .setScale(1.5);
    const dig = new Text(this, 0, 0, 'DIG', {
      fontFamily: '"Press Start 2P"',
      fontSize: '18px',
      textTransform: 'uppercase',
      color: 'white',
    });
    Phaser.Display.Bounds.SetLeft(
      dig,
      Phaser.Display.Bounds.GetCenterX(digKey) + digKey.width + 30
    );

    Phaser.Display.Bounds.SetCenterY(
      dig,
      Phaser.Display.Bounds.GetCenterY(digKey)
    );

    const pickKey = this.add
      .image(
        this.gameWidth - width + moveKey.width * 6,
        this.gameHeight - 32 - height + 80,
        'P'
      )
      .setScale(1.5);
    const pick = new Text(this, 0, 0, 'PICK', {
      fontFamily: '"Press Start 2P"',
      fontSize: '18px',
      textTransform: 'uppercase',
      color: 'white',
    });
    Phaser.Display.Bounds.SetLeft(
      pick,
      Phaser.Display.Bounds.GetCenterX(pickKey) + pickKey.width + 30
    );

    Phaser.Display.Bounds.SetCenterY(
      pick,
      Phaser.Display.Bounds.GetCenterY(pickKey)
    );

    const attackKey = this.add
      .image(
        this.gameWidth - width + moveKey.width * 3,
        this.gameHeight - 32 - height + 120,
        'SPACE'
      )
      .setScale(1.5);

    const attack = new Text(this, 0, 0, 'ATTACK', {
      fontFamily: '"Press Start 2P"',
      fontSize: '18px',
      textTransform: 'uppercase',
      color: 'white',
    });
    Phaser.Display.Bounds.SetLeft(
      attack,
      Phaser.Display.Bounds.GetCenterX(attackKey) + attackKey.width / 1.25 + 30
    );

    Phaser.Display.Bounds.SetCenterY(
      attack,
      Phaser.Display.Bounds.GetCenterY(attackKey)
    );
  }

  addTitle() {
    this.title = new Text(this, this.gameWidth / 2, 50, 'ROUND 700', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      textTransform: 'uppercase',
      color: 'white',
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
