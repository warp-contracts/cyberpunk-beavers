import { EVENTS_NAME } from '../utils/events.js';
import { Text } from '../objects/Text.js';
import { colors } from '../utils/style.js';
import { mainSceneKey, statsSceneKey } from '../main.js';
import { trimString } from '../utils/utils.js';
import Phaser from 'phaser';
import { EventBus } from '../EventBus.js';

export default class StatsScene extends Phaser.Scene {
  walletAddress;
  stats;
  roundInfo;
  beaverChoice;
  processId;
  allPlayers;
  messageLogQueue = [];
  constructor() {
    super(statsSceneKey);
  }

  init() {
    console.log('Stats Scene - 1. Init');
    this.mainScene = this.scene.get(mainSceneKey);
  }

  preload() {
    console.log('Stats Scene - 2. Preload');
    this.load.image('hacker_beaver_portrait', 'assets/images/beavers/hacker_beaver/hacker_beaver_portrait.png');
    this.load.image('heavy_beaver_portrait', 'assets/images/beavers/heavy_beaver/heavy_beaver_portrait.png');
    this.load.image('speedy_beaver_portrait', 'assets/images/beavers/speedy_beaver/speedy_beaver_portrait.png');
    this.load.image('time_bar', 'assets/images/time_bar.png');
    this.load.image('AO', 'assets/images/token.png');
  }

  create() {
    console.log('Stats Scene - 3. Create');
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;
    this.processId = window.warpAO.processId();
    this.tokenProcessId = window.warpAO.tokenProcessId();
    if (this.walletAddress) {
      const beaverStatsBoxEl = this.createStatsBox();
      this.beaverStatsBox = this.add.dom(100, 100 + beaverStatsBoxEl.width, beaverStatsBoxEl);
    }
    this.initListeners();
    this.addCounterAO();
    this.addTitle();
    this.addRoundBar();
    this.addSubtitle();
    EventBus.emit('current-scene-ready', this);
  }

  addCounterAO() {
    this.aoCounter = new Text(this, this.gameWidth / 2, 30, 'Find the treasure...', {
      backgroundColor: 'black',
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      textTransform: 'uppercase',
      color: 'white',
    }).setDepth(1);
    this.aoCounter.x = this.gameWidth / 2 - this.aoCounter.width / 2;
    this.aoCounterImg = this.add.image(
      this.gameWidth / 2 + this.aoCounter.width / 2 + 24,
      this.aoCounter.y + this.aoCounter.height / 2,
      'AO'
    );
    this.aoCounterImg.setDepth(2);
    this.aoCounterImg.visible = false;
  }

  addTitle() {
    this.title = new Text(this, this.gameWidth / 2, 80, 'ROUNDS LEFT 700', {
      backgroundColor: 'black',
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      textTransform: 'uppercase',
      color: 'white',
    }).setDepth(1);
    this.title.x = this.gameWidth / 2 - this.title.width / 2;
  }

  addSubtitle() {
    this.subtitle = new Text(this, this.gameWidth / 2, this.timeBar.y + this.timeBar.height, 'AP: 10', {
      backgroundColor: 'black',
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

  gameOver() {
    this.title.setText(`GAME OVER`);
  }

  initListeners() {
    this.game.events.on(EVENTS_NAME.updateStats, (stats) => this.onUpdateStats(stats));
    this.game.events.on(EVENTS_NAME.updateRoundInfo, (roundInfo) => this.onUpdateRoundInfo(roundInfo));
    this.game.events.on(EVENTS_NAME.updatePlayers, (player) => this.onUpdatePlayers(player));
    this.game.events.on(EVENTS_NAME.updateOtherPlayerStats, (player) => this.onUpdateOtherPlayerStats(player));
    this.game.events.on(EVENTS_NAME.nextMessage, ({ response, lag }) => this.onNexMessage(response, lag));
  }

  me(interaction) {
    if (interaction.players && interaction.players[this.walletAddress]) {
      return interaction.players[this.walletAddress];
    }
    if (interaction.player && interaction.player.walletAddress === this.walletAddress) {
      return interaction.player;
    }
  }

  createStatsBox() {
    const beaverStatsBoxEl = document.createElement('div');
    beaverStatsBoxEl.id = 'stats-box';

    beaverStatsBoxEl.style = `width: 350px;
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
      <div style="display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: #fcee09;
        font-family: 'Press Start 2P';
        font-size: 0.5rem;
        padding: 30px 20px 30px 30px;
        clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <img src="assets/images/beavers/${this.beaverChoice}/${this.beaverChoice}_portrait.png" width=72 height=72/>
          <div style="display:flex; flex-grow: 1;"> </div>
          <div style="display: flex; flex-grow: 1; flex-direction: column;">
            ${this.label('player', 'stats-scene-player', this.displayName({ userName: this.userName, walletAddress: this.walletAddress }), { marginTop: 18, paddingLeft: 0, inline: 'padding-right: 10px;' })}
            ${this.label('process', 'stats-scene-contract', `<a style="color: black;" target="_blank" href='https://www.ao.link/#/entity/${this.processId}'>${trimString(this.processId)}</a>`, { marginTop: 10, paddingLeft: 0, inline: 'padding-right: 10px;' })}
            ${this.label('lag', 'stats-scene-lag', this.formatLag(window.warpAO.lag), { marginTop: 10, paddingLeft: 0, inline: 'padding-right: 10px; width: 170px; text-align: right;' })}
          </div>
        </div>
        ${this.label('hp', 'stats-scene-hp', this.stats?.hp.current, { marginTop: 10, paddingLeft: 0, inline: 'padding-right: 10px;' })}
        ${this.label('frags/deaths', 'stats-scene-frags', `${this.stats?.kills.frags}/${this.stats?.kills.deaths}`, { marginTop: 10, paddingLeft: 0, inline: 'padding-right: 10px;' })}
        ${this.label('cbcoins', 'stats-scene-cbcoins-process', `<a style="color: black;" target="_blank" href='https://www.ao.link/#/token/${this.tokenProcessId}'>${trimString(this.tokenProcessId)}</a>`, { marginTop: 10, paddingLeft: 0, inline: 'padding-right: 10px;' })}
        ${this.label('owned', 'stats-scene-cbcoins', this.stats?.coins.balance, { marginTop: 5, paddingLeft: 15, inline: 'padding-right: 10px;' })}
        ${this.label('gained', 'stats-scene-gained', this.stats?.coins.gained, { marginTop: 5, paddingLeft: 15, inline: 'padding-right: 10px;' })}
        <div id="stats-scene-other-beavers">${this.addPlayersModal()}</div>
      </div>`;

    return beaverStatsBoxEl;
  }

  addPlayersModal() {
    const otherPlayersLength = Object.keys(this.allPlayers).length - 1;
    if (Object.keys(this.allPlayers).length <= 1) return '';
    return `
      <div style="position: relative;">
        <div style="display: flex; justify-content: center;">
          <div style="display: flex;
            justify-content: center;
            margin-top: 25px;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;">OTHER BEAVERS (<span class="total-players">${otherPlayersLength}</span>)
          </div>
        </div>
        <div id="other-players-box" style="max-height: 300px; overflow-y: scroll; padding-right: 10px;">${this.addPlayers()}
        </div>
      </div>`;
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
      <div class="list-item" style="display: flex; justify-content: space-between; align-items: end; margin-top: 25px;" id="player-box-${player.walletAddress}" data-coins-gained=${player.stats?.coins.gained}>
        <img src="assets/images/beavers/${player.beaverChoice}/${player.beaverChoice}_portrait.png" width=64 height=64/>
        <div style="display:flex; flex-grow: 1;"> </div>
        <div style="display: flex; flex-grow: 1; flex-direction: column;">
          <div style="align-self: flex-end;" id="stats-scene-wallet-address">${this.displayName(player)}</div>
          <div style="display: flex; justify-content: space-between; flex-direction: column;">
            ${this.label('hp', `stats-scene-hp-${player.walletAddress}`, player.stats.hp.current, { marginTop: 10, paddingLeft: 0, inline: '' })}
            ${this.label('frags/deaths', `stats-scene-frags-${player.walletAddress}`, `${player.stats?.kills.frags}/${player.stats?.kills.deaths}`, { marginTop: 10, paddingLeft: 0, inline: '' })}
            ${this.label('cbcoins', `stats-scene-cbcoins-${player.walletAddress}`, player.stats?.coins.balance, { marginTop: 10, paddingLeft: 0, inline: '' })}
            ${this.label('gained', `stats-scene-gained-${player.walletAddress}`, player.stats?.coins.gained, { marginTop: 10, paddingLeft: 0, inline: '' })}
          </div>
        </div>
      </div>`;
  }

  displayName(player) {
    if (player.userName) {
      if (player.userName.length > 11) {
        trimString(player.userName, 4, 3, 4);
      }
      return player.userName;
    }
    if (player.walletAddress) {
      return trimString(player.walletAddress);
    }
    return '';
  }

  formatLag(lag) {
    return lag ? `${lag.total}(${lag.cuCalc})ms` : 'N/A';
  }

  onUpdateStats(stats) {
    document.getElementById('stats-scene-hp').innerText = stats?.player?.hp?.current;
    document.getElementById('stats-scene-frags').innerText =
      `${stats?.player?.kills.frags}/${stats?.player?.kills.deaths}`;
    document.getElementById('stats-scene-cbcoins').innerText = stats?.player?.coins.balance;
    document.getElementById('stats-scene-gained').innerText = stats?.player?.coins.gained;
    this.subtitle.setText(`AP: ${stats?.player?.ap?.current}`);
    if (stats?.player?.ap?.current === 0) {
      this.subtitle.setColor(colors.red);
    } else {
      this.subtitle.setColor(colors.white);
    }
    if (stats?.game?.gameTreasuresCounter) {
      this.aoCounter.setText(`${stats?.game?.gameTreasuresCounter}   HIDDEN`);
      this.aoCounter.x = this.gameWidth / 2 - this.aoCounter.width / 2;
      this.aoCounterImg.x = this.gameWidth / 2 + this.aoCounter.width / 2 - 150;
      this.aoCounterImg.visible = true;
      this.aoCounterImg.setDepth(2);
    }
  }

  onUpdateRoundInfo(roundInfo) {
    if (!this.mainScene.gameOver) {
      this.timeMask.x = this.initialtimeMaskPosition - this.stepWidth * roundInfo.gone;
      this.title.setText(`ROUNDS LEFT ${roundInfo.roundsToGo || roundInfo.currentRound}`);
    }
  }

  onUpdatePlayers(player) {
    this.allPlayers[player.walletAddress] = player;
    const totalPlayers = Object.keys(this.allPlayers).length;
    if (totalPlayers == 2) {
      document.getElementById('stats-scene-other-beavers').innerHTML = this.addPlayersModal();
    } else if (totalPlayers > 2) {
      document.getElementById('other-players-box').classList.add('list-container');
      const totalPlayersSpan = document.getElementsByClassName('total-players')[0];
      totalPlayersSpan.textContent = '' + (totalPlayers - 1);
      const playerBoxes = document.querySelectorAll('[id^="player-box"]');
      const lastPlayerBox = playerBoxes[playerBoxes.length - 1];
      lastPlayerBox.insertAdjacentHTML('afterend', this.addOtherPlayerBox(player));
    }
  }

  onUpdateOtherPlayerStats(player) {
    const currentGainedValue = document.getElementById(`stats-scene-gained-${player.walletAddress}`).innerText;
    const newGainedValue = player.coins.gained;
    document
      .getElementById(`player-box-${player.walletAddress}`)
      .setAttribute('data-coins-gained', player.coins.gained);
    if (newGainedValue != currentGainedValue) {
      this.shufflePlayersList();
    }
    document.getElementById(`stats-scene-hp-${player.walletAddress}`).innerText = player.hp.current;
    document.getElementById(`stats-scene-frags-${player.walletAddress}`).innerText =
      `${player.kills.frags}/${player.kills.deaths}`;
    document.getElementById(`stats-scene-cbcoins-${player.walletAddress}`).innerText = player.coins.balance;
    document.getElementById(`stats-scene-gained-${player.walletAddress}`).innerText = player.coins.gained;
  }

  onNexMessage(response, lag) {
    const player = this.me(response);

    if (player) {
      if (lag && lag.total > 0) {
        document.getElementById('stats-scene-lag').innerHTML = `${this.formatLag(lag)}`;
      }
      const messageLog = {
        player,
        ...response,
      };
      const newLen = this.messageLogQueue.push(messageLog);
      if (newLen > 4) {
        this.messageLogQueue.shift();
      }
    }
  }

  shufflePlayersList() {
    const container = document.getElementById('other-players-box');
    let items = Array.from(container.children);

    // Sort players list
    for (let i = items.length - 1; i > 0; i--) {
      const itemsBeforeSort = [...items];
      items.sort((a, b) => b.dataset.coinsGained - a.dataset.coinsGained);
      let sameOrder = true;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id != itemsBeforeSort[i].id) {
          sameOrder = false;
          break;
        }
      }

      // Shuffle only if players list order has changed
      if (!sameOrder) {
        const itemHeight = items[0].offsetHeight;
        // Store original positions
        const originalPositions = items.map((item) => item.offsetTop);
        // Animate to new positions
        items.forEach((item, index) => {
          item.classList.add('shuffling');
          item.style.top = `${originalPositions[index]}px`;
        });

        // Add shuffling class and set initial positions
        items.forEach((item, index) => {
          const newTop = index * itemHeight;
          item.style.transform = `translateY(${newTop - parseFloat(item.style.top)}px)`;
        });

        setTimeout(() => {
          items.forEach((item, index) => {
            item.classList.remove('shuffling');
            item.style.transform = '';
            item.style.top = '';
            container.appendChild(item); // This rearranges the DOM
          });
        }, 500); // After animation completes
      }
    }
  }

  label(name, id, content, style) {
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: ${style.marginTop}px; padding-left:${style.paddingLeft}px">
        <div>${name.toUpperCase()}</div>
        <div style="display: flex; justify-content: space-between;">
          <div style="${style.inline}" id="${id}">${content}</div>
        </div>
      </div>`;
  }
}
