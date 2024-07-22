import { TextButton } from '../objects/TextButton.js';
import { Text } from '../objects/Text.js';
import { colors } from '../utils/style.js';
import { ArweaveSigner } from 'warp-arbundles';
import { WarpFactory } from 'warp-contracts';
import { loungeAreaSceneKey, connectWalletSceneKey } from '../config/config.js';

export default class ConnectWalletScene extends Phaser.Scene {
  constructor() {
    super(connectWalletSceneKey);
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

    const textBorder = this.add.rectangle(200, 200, 200, 50, 0xffffff, 0);
    textBorder.setStrokeStyle(2, 0x00ff00);

    this.connectWalletButton = new TextButton(
      this,
      100,
      200,
      'Connect wallet',
      {
        fill: colors.green,
        font: '20px',
      },
      async () => {
        await self.connectWallet();
      }
    );

    Phaser.Display.Align.In.Center(this.connectWalletButton, textBorder);

    await this.connectWalletButton.animateText(animationSpeed);

    if (window.warpAO.config.env != 'prod') {
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
  }

  async generateWallet() {
    const { signer, address } = await this.generateSigner();
    window.warpAO.generatedSigner = signer;
    console.log('Generated wallet address', address);
    localStorage.setItem('wallet_address', address);
    this.scene.start(loungeAreaSceneKey, {
      walletAddress: address,
    });
    window.warpAO.signingMode = 'generated';
  }

  async generateSigner() {
    const warpInst = WarpFactory.forMainnet();
    const { jwk, address } = await warpInst.generateWallet();
    return { signer: new ArweaveSigner(jwk), address };
  }

  async connectWallet() {
    if (window.arweaveWallet) {
      console.log('connect?');
      await window.arweaveWallet.connect([
        'ACCESS_ADDRESS',
        'DISPATCH',
        'SIGN_TRANSACTION',
        'ACCESS_PUBLIC_KEY',
        'SIGNATURE',
      ]);
      console.log('connect');
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      new Text(this, 100, 300, 'Wallet connected', {
        fill: '#ADD8E6',
      });
      localStorage.setItem('wallet_address', walletAddress);
      this.scene.start(loungeAreaSceneKey, {
        walletAddress,
      });
      const { signer, address } = await this.generateSigner();
      localStorage.setItem('generated_wallet_address', address);
      window.warpAO.generatedSigner = signer;
      window.warpAO.signingMode = 'arconnect';
    } else {
      new Text(this, 100, 300, 'No wallet detected. Please install ArConnect.', { fill: '#FF0000' });
    }
  }
}
