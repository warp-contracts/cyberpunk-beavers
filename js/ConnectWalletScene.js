import { TextButton } from './TextButton.js';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';
import { Text } from './Text.js';
import { colors } from './utils/style.js';

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

    await this.helloText.animateText();

    this.clickButton = new TextButton(
      this,
      100,
      200,
      'Connect wallet',
      {
        fill: colors.yellow,
        font: '20px',
      },
      async () => await this.connectWallet()
    );

    await this.clickButton.animateText();
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
