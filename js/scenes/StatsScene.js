import { EVENTS_NAME } from '../utils/events.js';
import { Text } from '../objects/Text.js';
import { TextButton } from '../objects/TextButton.js';
import Const from '../common/const.mjs';
import { colors } from '../utils/style.js';

const defaultStyle = {
  fontFamily: '"Press Start 2P"',
  fontSize: '18px',
  textTransform: 'uppercase',
  color: 'white',
};

export default class StatsScene extends Phaser.Scene {
  walletAddress;
  stats;
  roundInfo;
  beaverChoice;
  processId;
  allPlayers;
  messageLogQueue = [];
  constructor() {
    super('stats-scene');
  }

  init() {
    console.log('Stats Scene - 1. Init');
    this.mainScene = this.scene.get('main-scene');
  }

  preload() {
    console.log('Stats Scene - 2. Preload');
    this.load.image('hacker_beaver_portrait', 'assets/images/beavers/hacker_beaver_portrait.png');
    this.load.image('heavy_beaver_portrait', 'assets/images/beavers/heavy_beaver_portrait.png');
    this.load.image('speedy_beaver_portrait', 'assets/images/beavers/speedy_beaver_portrait.png');
    this.load.image('time_bar', 'assets/images/time_bar.png');

    this.load.image('ARROWDOWN', 'assets/images/keys/ARROWDOWN.png');
    this.load.image('ARROWLEFT', 'assets/images/keys/ARROWLEFT.png');
    this.load.image('ARROWRIGHT', 'assets/images/keys/ARROWRIGHT.png');
    this.load.image('ARROWUP', 'assets/images/keys/ARROWUP.png');
    this.load.image('D', 'assets/images/keys/D.png');
    this.load.image('P', 'assets/images/keys/P.png');
    this.load.image('SPACE', 'assets/images/keys/SPACE.png');
  }

  create() {
    console.log('Stats Scene - 3. Create');
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;
    this.processId = window.warpAO.processId();
    if (this.walletAddress) {
      const beaverStatsBoxEl = this.createStatsBox();
      this.beaverStatsBox = this.add.dom(100, 100 + beaverStatsBoxEl.width, beaverStatsBoxEl);
      const interactionLogs = this.addInteractionLogs();
      this.interactionLogsDiv = this.add.dom(100, 100 + interactionLogs.width, interactionLogs);
    }
    this.initListeners();
    this.addTitle();
    this.addRoundBar();
    this.addSubtitle();
    this.addLegend();
    // this.leaderboardButton = new TextButton(
    //   this,
    //   this.gameWidth - 200,
    //   50,
    //   'Leaderboard',
    //   {
    //     fill: colors.white,
    //     font: '20px',
    //   },
    //   () => {
    //     document.getElementById('stats-box').style.display = 'none';
    //     document.getElementById('incoming-messages-box').style.display = 'none';
    //     this.scene.setVisible(false);
    //     this.mainScene.scene.pause();
    //     this.scene.launch('leaderboard-scene', { players: this.allPlayers });
    //   }
    // );
  }

  addLegend() {
    const self = this;
    const height = 200;
    const width = 300;
    const baseHeight = this.gameHeight - 32 - height;
    const baseWidth = this.gameWidth - width;
    const addImage = (w, h, t) => this.add.image(baseWidth + w, baseHeight + h, t).setScale(1.5);
    const addLabelRight = (key, t) => {
      const text = new Text(self, 0, 0, t, defaultStyle);
      Phaser.Display.Bounds.SetLeft(text, Phaser.Display.Bounds.GetCenterX(key) + key.width + 30);
      Phaser.Display.Bounds.SetCenterY(text, Phaser.Display.Bounds.GetCenterY(key));
    }

    const moveL = addImage(0, 0, 'ARROWLEFT');
    const moveU = addImage(moveL.width * 2, 0, 'ARROWUP');
    const moveD = addImage(moveL.width * 4, 0, 'ARROWDOWN');
    const moveR = addImage(moveL.width * 6, 0, 'ARROWRIGHT');
    addLabelRight(moveR, 'MOVE');

    const digKey = addImage(moveL.width * 6, 40, 'D');
    addLabelRight(digKey, 'DIG');

    const pickKey = addImage(moveL.width * 6, 80, 'P');
    addLabelRight(pickKey, 'PICK');

    const attackKey = addImage(moveL.width * 3 - 2, 120, 'SPACE');
    const plus = this.add.text(baseWidth + moveL.width * 3 - 2, baseHeight + 135, '+', defaultStyle);
    addImage(0, 170, 'ARROWLEFT');
    addImage(moveL.width * 2, 170, 'ARROWUP');
    addImage(moveL.width * 4, 170, 'ARROWDOWN');
    addImage(moveL.width * 6, 170, 'ARROWRIGHT');

    const attack = new Text(this, 0, 0, 'ATTACK', defaultStyle);
    Phaser.Display.Bounds.SetLeft(attack, Phaser.Display.Bounds.GetCenterX(attackKey) + attackKey.width / 1.25 + 30);
    Phaser.Display.Bounds.SetCenterY(attack, Phaser.Display.Bounds.GetCenterY(plus));
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
    this.subtitle = new Text(this, this.gameWidth / 2, this.timeBar.y + this.timeBar.height, 'AP: 10', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      textTransform: 'uppercase',
      color: colors.white,
    }).setDepth(1);
    this.subtitle.x = this.gameWidth / 2 - this.subtitle.width / 2;
  }

  addRoundBar() {
    this.timeBar = this.add
      .image(window.innerWidth / 2, this.title.y + this.title.height + 50, 'time_bar')
      .setDepth(100);

    this.timeMask = this.add.sprite(this.timeBar.x, this.timeBar.y, 'time_bar').setDepth(100);
    this.timeMask.visible = false;
    this.initialtimeMaskPosition = this.timeMask.x;
    this.timeBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.timeMask);
    this.stepWidth = this.timeMask.displayWidth / 10;
  }

  initListeners() {
    this.game.events.on(EVENTS_NAME.updateStats, (stats) => {
      document.getElementById('stats-scene-hp').innerText = stats?.hp?.current;
      document.getElementById('stats-scene-coins').innerText = stats?.coins.available + stats?.coins.transferred;
      this.subtitle.setText(`AP: ${stats?.ap?.current}`);
      if (stats?.ap?.current == 0) {
        this.subtitle.setColor(colors.red);
      } else {
        this.subtitle.setColor(colors.white);
      }
    });

    this.game.events.on(EVENTS_NAME.updateRoundInfo, (roundInfo) => {
      this.timeMask.x = this.initialtimeMaskPosition - this.stepWidth * roundInfo.gone;
      this.title.setText(`ROUND ${roundInfo.currentRound}`);
    });

    this.game.events.on(EVENTS_NAME.updatePlayers, (player) => {
      this.allPlayers[player.walletAddress] = player;
      const totalPlayers = Object.keys(this.allPlayers).length;
      if (totalPlayers == 2) {
        document.getElementById('stats-scene-other-beavers').innerHTML = this.addPlayersModal();
      } else if (totalPlayers > 2) {
        const totalPlayersSpan = document.getElementsByClassName('total-players')[0];
        totalPlayersSpan.textContent = '' + (totalPlayers - 1);
        const playerBoxes = document.querySelectorAll('[id="player-box"]');
        const lastPlayerBox = playerBoxes[playerBoxes.length - 1];
        lastPlayerBox.insertAdjacentHTML('afterend', this.addOtherPlayerBox(player));
      }
    });

    this.game.events.on(EVENTS_NAME.updateOtherPlayerStats, (player) => {
      document.getElementById(`stats-scene-hp-${player.walletAddress}`).innerText = player.hp.current;
      document.getElementById(`stats-scene-coins-${player.walletAddress}`).innerText =
        player.coins.available + player.coins.transferred;
    });

    this.game.events.on(EVENTS_NAME.nextMessage, (message) => {
      console.log(message);
      const player = this.me(message);
      if (player) {
        const messageLog = {
          player,
          ...message
        }
        const newLen = this.messageLogQueue.push(messageLog);
        if (newLen > 4) {
          this.messageLogQueue.shift();
        }
        document.getElementById('stats-scene-interaction-logs').innerHTML = this.interactionsFormatted();
      }
    });
  }

  me(interaction) {
    if (interaction.players && interaction.players[this.walletAddress]) {
      return interaction.players[this.walletAddress]
    }
    if (interaction.player && interaction.player.walletAddress === this.walletAddress) {
      return interaction.player;
    }
  }

  createStatsBox() {
    const beaverStatsBoxEl = document.createElement('div');
    beaverStatsBoxEl.id = 'stats-box';

    beaverStatsBoxEl.style = `  width: 350px;
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
    padding: 30px 20px 30px 30px;
    clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);">
    <div style="display: flex; justify-content: space-between; align-items: center;">
    <img
src="assets/images/beavers/${this.beaverChoice}_portrait.png"
width=72
height=72/>
<div style="padding-right: 10px;" id="stats-scene-wallet-address">${this.walletAddress && this.walletAddress.substr(0, 3) + '...' + this.walletAddress.substr(this.walletAddress.length - 3)}</div>
</div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;"><div>PROCESS</div>
    <div style="display: flex; justify-content: space-between;">
    <div style="padding-right: 10px;" id="stats-scene-contract"><a style="color: black;" target="_blank" href='https://www.ao.link/#/entity/${this.processId}'>${this.processId.substr(0, 3) + '...' + this.processId.substr(this.processId.length - 3)}</a></div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding-right: 10px;"><div>HP</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-hp">${this.stats?.hp.current}</div>
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding-right: 10px;"><div>COINS</div>
    <div style="display: flex; justify-content: space-between;">
    <div id="stats-scene-coins">${this.stats?.coins.available + this.stats?.coins.transferred}</div>
    </div>
    </div>
    <div id="stats-scene-other-beavers">
     ${this.addPlayersModal()}
     </div>
    </div>`;

    return beaverStatsBoxEl;
  }

  addPlayersModal() {
    const otherPlayersLength = Object.keys(this.allPlayers).length - 1;
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
    font-size: 12px;">OTHER BEAVERS (<span class="total-players">${otherPlayersLength}</span>)</div></div>
    <div style="max-height: 300px;
    overflow-y: scroll;
    padding-right: 10px;">
      ${this.addPlayers()}
    </div>
    </div>
    </div>
`;
  }

  addPlayers() {
    let playersBox = ``;
    let playersAddresses = Object.keys(this.allPlayers);
    playersAddresses = playersAddresses.filter((p) => p !== this.walletAddress);
    for (let i = 0; i < playersAddresses.length; i++) {
      const player = this.allPlayers[playersAddresses[i]];
      playersBox += this.addOtherPlayerBox(player);
    }
    return playersBox;
  }

  addOtherPlayerBox(player) {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;" id="player-box">
      <img
  src="assets/images/beavers/${player.beaverChoice}_portrait.png"
  width=48
  height=48/>
  <div style="display:flex; flex-grow: 1;"> </div>
  <div style="display: flex;
  flex-grow: 1;
  flex-direction: column;">
  <div style="align-self: flex-end;" id="stats-scene-wallet-address">${player.walletAddress && player.walletAddress.substr(0, 3) + '...' + player.walletAddress.substr(player.walletAddress.length - 3)}</div>
  <div style="display: flex; justify-content: space-between; flex-direction: column;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;"><div>HP</div>
  <div style="display: flex; justify-content: space-between;">
  <div id="stats-scene-hp-${player.walletAddress}">${player.stats.hp.current}</div>
  </div>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;"><div>COINS</div>
  <div style="display: flex; justify-content: space-between;">
  <div id="stats-scene-coins-${player.walletAddress}">${this.stats?.coins.available + this.stats?.coins.transferred}</div>
  </div>
  </div>
  </div>
  </div>
  </div>
      `;
  }

  addInteractionLogs() {
    const resultDiv = document.createElement('div');
    resultDiv.id = 'incoming-messages-box';
    resultDiv.style = ` width: 400px; height: 150px;
      border: 0; outline: none;
      background-color: #fcee09;
      position: absolute;
      bottom: 10px;left: 0px;
      font-size: 0.5rem;
      clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);`;
    resultDiv.innerHTML = `
    <div style="font-family: 'Press Start 2P'">
    <div style='margin: 18px 0 0 40px'>INCOMING MESSAGES</div>
    <div id="stats-scene-interaction-logs">${this.interactionsFormatted()}</div>
    </div>
    `;
    return resultDiv;
  }

  interactionsFormatted() {
    return this.messageLogQueue.map(this.formatMessageLog).join('');
  }

  formatMessageLog(ml) {
    let data = ``;
    switch (ml.cmd) {
      case Const.Command.moved: {
        data = `<div style='display: inline-block'>NEW POS ${ml.player.pos.x},${ml.player.pos.y}</div>`;
        break;
      }
      case Const.Command.attacked: {
        const info = ml.pos ? `POS ${ml.pos.x},${ml.pos.y}` : `Failed`;
        data = `<div style='display: inline-block'>${info}</div>`;
        break;
      }
      case Const.Command.token:
      case Const.Command.picked:
      case Const.Command.digged: {
        if (ml.scoreToDisplay && ml.scoreToDisplay.length > 0) {
          const score = ml.scoreToDisplay[0];
          data = `<div style='display: inline-block'>${score.value}${score.type}</div>`;
        }
        break;
      }
    }
    return `
      <div id="stats-message" style='margin: 18px 0 0 40px'><span style='display: inline-block; width: 60px; text-transform: uppercase;'>${ml.cmd}</span>
      <a style="display: inline-block; width: 120px; color: black;" target="_blank" href='https://www.ao.link/#/message/${ml.txId}'>${ml.txId.substr(0, 5) + '...' + ml.txId.substr(ml.txId.length - 5)}</a>
      ${data}
      </div>`;
  }
}
