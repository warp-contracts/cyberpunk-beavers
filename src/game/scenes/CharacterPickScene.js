import { WebFontFile } from '../objects/WebFontFile.js';
import { mainSceneKey, characterPickSceneKey, mainSceneLoadingKey } from '../../main.js';
import Phaser from 'phaser';
import { CharacterPickGui } from '../gui/CharacterPickGui.js';
import { hideGui, showGui } from '../utils/mithril.js';
import m from 'mithril';

export default class CharacterPickScene extends Phaser.Scene {
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
          beaverChoice: self.beaverChoice,
          gameplayMode: self.initData.gameplayMode,
          setCharacter: async (beaverChoice) => {
            self.beaverChoice = beaverChoice;
            setTimeout(
              () => {
                self.goToMainScene();
              },
              window.warpAO.config.env === 'dev' ? 0 : 4000
            );
          },
        });
      },
    });
  }

  goToMainScene() {
    const self = this;
    hideGui();
    this.scene.start(mainSceneKey, {
      ...this.initData,
      beaverChoice: self.beaverChoice,
    });
    this.scene.launch(mainSceneLoadingKey);
  }
}
