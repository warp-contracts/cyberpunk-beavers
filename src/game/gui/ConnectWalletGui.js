import { WarpFactory } from 'warp-contracts';
import { ArweaveSigner } from 'warp-arbundles';
import { playClick } from '../utils/mithril.js';

const CHANGE_SCENE_TIMEOUT_MS = window.warpAO.config.env === 'dev' ? 0 : 2000;

export function ConnectWalletSceneGui(initialVnode) {
  let walletConnectionText;
  let walletErrorText = null;
  const hasGeneratedWallet =
    localStorage.getItem('signing_mode') === 'generated' &&
    localStorage.getItem('generated_jwk') !== null &&
    localStorage.getItem('wallet_address') !== null;

  async function handleArconnect(changeScene) {
    const timeoutId = setTimeout(() => {
      walletConnectionText = 'No wallet detected. Please install ArConnect.';
    }, 2000);

    async function doConnectWallet() {
      window.removeEventListener('arweaveWalletLoaded', doConnectWallet);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      try {
        await window.arweaveWallet.connect([
          'ACCESS_ADDRESS',
          'DISPATCH',
          'SIGN_TRANSACTION',
          'ACCESS_PUBLIC_KEY',
          'SIGNATURE',
        ]);
      } catch (e) {
        window.alert(
          `Problem with loading ArConnect.\nPlease refresh page and try again. Our best tech beavers are working on solving this problem.`
        );
      }
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      walletConnectionText = `Wallet ${walletAddress} connected.`;
      localStorage.setItem('wallet_address', walletAddress);
      const { signer, address } = await generateSigner();
      window.warpAO.generatedSigner = signer;
      window.warpAO.signingMode = 'arconnect';
      localStorage.setItem('generated_wallet_address', address);
      localStorage.setItem('signing_mode', window.warpAO.signingMode);
      console.log('Wallet connected');
      m.redraw();
      setTimeout(() => {
        changeScene(walletAddress);
      }, CHANGE_SCENE_TIMEOUT_MS);
    }

    if (window.arweaveWallet) {
      setTimeout(async () => await doConnectWallet(), 100);
    } else {
      window.addEventListener('arweaveWalletLoaded', doConnectWallet);
    }
  }

  async function handleGenerateWallet(changeScene) {
    const { signer, address, jwk } = await generateSigner();
    window.warpAO.generatedSigner = signer;
    console.log('Generated wallet address', address);
    localStorage.setItem('wallet_address', address);
    walletConnectionText = `Wallet ${address} generated.`;
    window.warpAO.signingMode = 'generated';
    localStorage.setItem('signing_mode', window.warpAO.signingMode);
    localStorage.setItem('generated_jwk', JSON.stringify(jwk));
    m.redraw();
    setTimeout(() => {
      changeScene(address);
    }, CHANGE_SCENE_TIMEOUT_MS);
  }

  async function useGeneratedWallet(changeScene) {
    const warpInst = WarpFactory.forMainnet();
    const generatedJwk = JSON.parse(localStorage.getItem('generated_jwk'));
    const walletAddress = await warpInst.arweave.wallets.jwkToAddress(generatedJwk);
    const signer = new ArweaveSigner(generatedJwk);
    window.warpAO.signingMode = 'generated';
    window.warpAO.generatedSigner = signer;
    console.log('Using generated wallet address', walletAddress);
    walletConnectionText = `Using generated ${walletAddress} wallet.`;
    m.redraw();
    setTimeout(() => {
      changeScene(walletAddress);
    }, CHANGE_SCENE_TIMEOUT_MS);
  }

  return {
    view: function () {
      return m('.connect-wallet', [
        m('.container', [
          m('.title', 'Hey stranger...'),
          m('', [
            m(
              '.button green',
              {
                onclick: async () => {
                  playClick();
                  await handleArconnect(initialVnode.attrs.changeScene);
                },
              },
              'Connect wallet'
            ),
            m(
              '.button red',
              {
                onclick: async () => {
                  playClick();
                  await handleGenerateWallet(initialVnode.attrs.changeScene);
                },
              },
              'Generate wallet'
            ),
            hasGeneratedWallet
              ? m(
                  '.button yellow',
                  {
                    onclick: async () => {
                      playClick();
                      await useGeneratedWallet(initialVnode.attrs.changeScene);
                    },
                  },
                  'Use generated wallet'
                )
              : null,
            m('.connection-text', walletConnectionText),
            walletErrorText ? m('.connection-text.error', walletErrorText) : null,
          ]),
        ]),
      ]);
    },
  };
}

const generateSigner = async () => {
  const warpInst = WarpFactory.forMainnet();
  const { jwk, address } = await warpInst.generateWallet();
  return { signer: new ArweaveSigner(jwk), address, jwk };
};
