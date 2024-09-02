import { WebFontFile } from '../objects/WebFontFile.js';
import {
  mainSceneKey,
  characterPickSceneKey,
  leaderboardSceneKey,
  gameHubSceneKey,
  loungeAreaSceneKey,
} from '../../main.js';
import Phaser from 'phaser';
import { CharacterPickGui } from '../gui/CharacterPickGui.js';
import { hideGui, showGui } from '../utils/mithril.js';
import Const from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import { checkBalance, generatedWalletAddress, getUsernameFromStorage } from '../utils/utils.js';

export default class CharacterPickScene extends Phaser.Scene {
  constructor() {
    super(characterPickSceneKey);
  }

  init(data) {
    console.log(`Player Pick Scene - 1. Init`, data);
    this.server = serverConnection.game;
    this.server.subscribe(this);
    this.initData = data;
    this.userName = getUsernameFromStorage(data.walletAddress);
    if (data.gameEnter && data.gameEnter > Date.now()) {
      this.gameEnter = data.gameEnter;
    }
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
          diff: self.diff,
          setCharacter: async (beaverChoice) => {
            self.beaverChoice = beaverChoice;
            if (!self.gameEnter) {
              self.goToMainScene();
            } else {
              await self.registerPlayer();
            }
          },
        });
      },
    });
  }

  update() {
    if (this.initData.gameEnd && this.initData.gameEnd < Date.now()) {
      this.scene.start(leaderboardSceneKey, { walletAddress: this.initData.walletAddress });
    }

    if (this.gameEnter <= Date.now() && this.beaverChoice) {
      this.scene.start(mainSceneKey, {
        ...this.initData,
        beaverChoice: this.beaverChoice,
      });
    }

    if (this.gameEnter) this.countdown();
  }

  countdown() {
    const self = this;
    const now = new Date();
    if (self.gameEnter > now) {
      self.diff = Math.round((self.gameEnter - now) / 1000);
      if (self.diff <= 0) {
        self.server.send({ cmd: Const.Command.dequeue }, true);
        if (self.beaverChoice) {
          self.goToMainScene(self.beaverChoice);
        } else {
          self.scene.start(gameHubSceneKey, {
            walletAddress: self.initData.walletAddress,
          });
        }
      }
    }

    m.redraw();
  }

  goToMainScene() {
    const self = this;
    hideGui();
    this.scene.start(mainSceneKey, {
      ...this.initData,
      beaverId: self.beaverId,
      beaverChoice: self.beaverChoice,
      balance: self.balance,
    });
  }

  async registerPlayer() {
    const self = this;
    self.balance = await checkBalance(self.initData.walletAddress);
    console.log(`Player's balance: ${self.balance}`);
    console.log(`Register player...`);
    const test = generatedWalletAddress();
    console.log(test);
    await self.server.send(
      {
        cmd: Const.Command.register,
        beaverId: self.beaverChoice,
        userName: self.userName,
        balance: self.balance && parseInt(self.balance),
        generatedWalletAddress: test,
      },
      true
    );
  }

  handleMessage(response) {
    const self = this;
    if (response.cmd == Const.Command.registered) {
      const player = response.player;
      if (response.error || (player && player.walletAddress === self.walletAddress && player.error)) {
        console.error('Failed to register to the game', player);
        self.scene.start(loungeAreaSceneKey, { error: player.error });
      } else if (player && player.walletAddress === self.initData.walletAddress) {
        self.beaverId = player.beaverId;
      }
    }
  }
}
