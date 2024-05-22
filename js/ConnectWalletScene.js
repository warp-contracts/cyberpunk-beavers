import { TextButton } from './TextButton.js';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';
import { Text } from './Text.js';

export default class ConnectWalletScene extends Phaser.Scene {
  constructor() {
    super('connect-wallet-scene');
  }

  init() {
    console.log(`Connect Wallet Scene - 1. Init`);
    const signer = JSON.parse(localStorage.getItem('signer'));
    if (signer?.publicKey) {
      this.scene.start('player-pick-scene', {
        signer,
      });
    }
  }

  preload() {
    console.log('Connect Wallet Scene - 2. Preload');
  }

  create() {
    console.log('Connect Wallet Scene - 3. Create');
    this.helloText = new Text(this, 100, 100, 'Hello!', {
      fill: '#0f0',
    });
    this.clickButton = new TextButton(
      this,
      100,
      200,
      'Connect wallet',
      {
        fill: '#0f0',
      },
      async () => await this.connectWallet()
    );
  }

  async connectWallet() {
    if (window.arweaveWallet) {
      await window.arweaveWallet.connect([
        'ACCESS_ADDRESS',
        'SIGN_TRANSACTION',
        'ACCESS_PUBLIC_KEY',
        'SIGNATURE',
      ]);
      const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
      await userSigner.setPublicKey();
      new Text(this, 100, 300, 'Wallet connected', {
        fill: '#ADD8E6',
      });
      localStorage.setItem('signer', JSON.stringify(userSigner));
      this.scene.start('player-pick-scene', { signer: userSigner });
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
