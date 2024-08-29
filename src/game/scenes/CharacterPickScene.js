import { WebFontFile } from '../objects/WebFontFile.js';
import { mainSceneKey, characterPickSceneKey, leaderboardSceneKey } from '../../main.js';
import Phaser from 'phaser';
import { CharacterPickGui } from '../gui/CharacterPickGui.js';
import { hideGui, showGui } from '../utils/mithril.js';

export default class CharacterPickScene extends Phaser.Scene {
  score;
  playerAgileOne;

  constructor() {
    super(characterPickSceneKey);
  }

  init(data) {
    console.log(`Player Pick Scene - 1. Init`, data);
    this.initData = data;
  }

  preload() {
    console.log('Player Pick Scene - 2. Preload');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create() {
    console.log('Player Pick Scene - 3. Create');
    const self = this;
    m.mount(showGui(), {
      view: () => {
        return m(CharacterPickGui, {
          changeScene: (beaverChoice) => {
            hideGui();
            self.changeScene(beaverChoice);
          },
        });
      },
    });
  }

  update() {
    if (this.initData.gameEnd && this.initData.gameEnd < Date.now()) {
      this.scene.start(leaderboardSceneKey, { walletAddress: this.initData.walletAddress });
    }
  }

  changeScene(beaverChoice) {
    this.scene.start(mainSceneKey, {
      ...this.initData,
      beaverChoice,
    });
  }
}
