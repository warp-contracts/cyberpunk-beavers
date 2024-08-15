import { WebFontFile } from '../objects/WebFontFile.js';
import { Text } from '../objects/Text.js';
import { mainSceneKey, playerPickSceneKey, leaderboardSceneKey } from '../main.js';
import Phaser from 'phaser';
import { EventBus } from '../EventBus.js';

export default class PlayerPickScene extends Phaser.Scene {
  score;
  playerAgileOne;

  constructor() {
    super(playerPickSceneKey);
  }

  init(data) {
    console.log(`Player Pick Scene - 1. Init`, data);
    this.initData = data;
  }

  preload() {
    console.log('Player Pick Scene - 2. Preload');
    this.load.image('post_apocalyptic_background', 'assets/images/background_post_apocalyptic.jpg');
    this.load.image('hacker_beaver', 'assets/images/beavers/hacker_beaver/hacker_beaver_200px.png');
    this.load.image('heavy_beaver', 'assets/images/beavers/heavy_beaver/heavy_beaver_200px.png');
    this.load.image('speedy_beaver', 'assets/images/beavers/speedy_beaver/speedy_beaver_200px.png');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create() {
    console.log('Player Pick Scene - 3. Create');
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;

    this.addAndPositionTitle();
    this.addBackground();
    this.addBeaverOptionPick({
      imgName: 'heavy_beaver',
      x: (this.gameWidth / 12) * 3,
      y: 0,
      name: 'beaver tank',
      body: 3,
      agility: 2,
      tech: 1,
    });
    this.addBeaverOptionPick({
      imgName: 'hacker_beaver',
      x: (this.gameWidth / 12) * 6,
      y: 0,
      name: 'techy beaver',
      body: 1,
      agility: 2,
      tech: 3,
    });
    this.addBeaverOptionPick({
      imgName: 'speedy_beaver',
      x: (this.gameWidth / 12) * 9,
      y: 0,
      name: 'agile beaver',
      body: 1,
      agility: 3,
      tech: 2,
    });
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    if (this.initData.gameEnd && this.initData.gameEnd < Date.now()) {
      this.scene.start(leaderboardSceneKey, { walletAddress: this.initData.walletAddress });
    }
  }

  addBeaverOptionPick(option) {
    const beaverSprite = this.add.image(option.x, option.y, option.imgName);
    beaverSprite.y = beaverSprite.height;
    beaverSprite.x = beaverSprite.x - beaverSprite.width / 2;

    const beaverStatsBoxEl = this.createStatsBox(
      beaverSprite.width,
      option.name,
      option.body,
      option.agility,
      option.tech
    );
    const beaverStatsBox = this.add.dom(0, 0, beaverStatsBoxEl);

    Phaser.Display.Bounds.SetTop(beaverStatsBox, beaverSprite.y + 1.3 * beaverSprite.height);
    Phaser.Display.Bounds.SetCenterX(beaverStatsBox, beaverSprite.x + (1.3 * beaverSprite.width) / 2);

    return beaverSprite
      .setInteractive({ useHandCursor: true })
      .setOrigin(0)
      .on('pointerover', () => {
        beaverSprite.preFX.addGlow();
        this.tweens.add({
          targets: [beaverSprite],
          scale: 1.1,
          ease: 'Linear',
          duration: 100,
        });
      })
      .on('pointerout', () => {
        beaverSprite.clearFX();
        this.tweens.add({
          targets: [beaverSprite],
          scale: 1,
          ease: 'Linear',
          duration: 100,
          // hold: 2000,
          // repeat: 0,
          // yoyo: true,
        });
      })
      .on('pointerdown', () => {
        console.log(option);
        this.scene.start(mainSceneKey, {
          ...this.initData,
          beaverChoice: option.imgName,
        });
      });
  }

  addBackground() {
    this.background = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'post_apocalyptic_background');
    this.background.setDisplaySize(this.gameWidth, this.gameHeight);
  }

  addAndPositionTitle() {
    this.title = new Text(this, this.gameWidth / 2, 100, 'PICK YOUR CHARACTER', {
      fontFamily: '"Press Start 2P"',
      fontSize: '50px',
      textTransform: 'uppercase',
      color: '#fcee09',
    }).setDepth(1);
    this.title.x = this.gameWidth / 2 - this.title.width / 2;
    this.title.blinkText();
  }

  createStatsBox(spriteWidth, name, body, agility, tech) {
    const beaverStatsBoxEl = document.createElement('div');
    beaverStatsBoxEl.style = `  width: ${spriteWidth * 1.5}px;
      height: 150px;
      border: 0;
      outline: none;
      background-color: #050a0e;
      cursor: pointer;
      position: relative;
      font-family: Tomorrow, sans-serif;
      font-size: 0.85rem;
      text-transform: uppercase;
      color: #050a0e;
      clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);`;
    beaverStatsBoxEl.innerHTML = `<div style="  display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background-color: #fcee09;
    font-family: 'Press Start 2P';
    padding: 10px;
    clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);">
    <div style="display: flex; justify-content: center;"><div>${name}</div></div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>body</div>
    <div style="display: flex; justify-content: space-between;">
    ${this.createStatsBoxes(body)}
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>AGILity</div>
    <div style="display: flex; justify-content: space-between;">
    ${this.createStatsBoxes(agility)}
    </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;"><div>TECH</div>
    <div style="display: flex; justify-content: space-between;">
    ${this.createStatsBoxes(tech)}
    </div>
    </div>
    </div>`;

    return beaverStatsBoxEl;
  }

  createStatsBoxes(body) {
    let boxes = ``;
    for (let i = 0; i < body; i++) {
      boxes += `<div style="background-color: black; height: 15px; width: 15px; margin-left: 5px;"></div>`;
    }

    return boxes;
  }
}
