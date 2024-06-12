import { TextButton } from './TextButton.js';
import { Text } from './Text.js';
import { colors } from './utils/style.js';
import {ArweaveSigner} from "warp-arbundles";
import {WarpFactory} from "warp-contracts";

export default class ConnectWalletScene extends Phaser.Scene {
  constructor() {
    super('connect-wallet-scene');
  }

  init() {
    console.log(`Connect Wallet Scene - 1. Init`);
  }

  preload() {
    console.log('Connect Wallet Scene - 2. Preload');
  }

  async create() {
    console.log('Connect Wallet Scene - 3. Create');

    this.helloText = new Text(this, 100, 100, 'Hello stranger...', {
      fill: colors.yellow,
      font: '20px',
    });

    const animationSpeed = window.warpAO.config.env !== 'prod' ? 1 : 50;

    await this.helloText.animateText(animationSpeed);

    const self = this;

    this.connectWalletButton = new TextButton(
      this,
      100,
      200,
      'Connect wallet',
      {
        fill: colors.yellow,
        font: '20px',
      },
      async () =>  {
        setTimeout(async () => {
          await self.connectWallet();
        });
      }
    );
    await this.connectWalletButton.animateText(animationSpeed);

    // remove in 'prod'?
    this.generateWalletButton = new TextButton(
      this,
      100,
      300,
      'Generate wallet',
      {
        fill: colors.red,
        font: '20px',
      },
      async () => await this.generateWallet()
    );
  }

  async generateWallet() {
    const warpInst = WarpFactory.forMainnet();
    const { jwk, address } = await warpInst.generateWallet();
    window.warpAO.generatedSigner = new ArweaveSigner(jwk);
    console.log("Generated wallet address", address);
    localStorage.setItem('wallet_address', address);
    localStorage.removeItem('player');
    this.scene.start('player-pick-scene', {
      walletAddress: address,
    });

  }

  async connectWallet() {
    if (window.arweaveWallet) {
      await window.arweaveWallet.connect([
        'ACCESS_ADDRESS',
        'DISPATCH',
        'SIGN_TRANSACTION',
        'ACCESS_PUBLIC_KEY',
        'SIGNATURE',
      ]);
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      new Text(this, 100, 300, 'Wallet connected', {
        fill: '#ADD8E6',
      });
      localStorage.setItem('wallet_address', walletAddress);
      this.scene.start('player-pick-scene', {
        walletAddress,
      });
    } else {
      new Text(
        this,
        100,
        300,
        'No wallet detected. Please install ArConnect.',
        { fill: '#FF0000' }
      );
    }
  }
}
