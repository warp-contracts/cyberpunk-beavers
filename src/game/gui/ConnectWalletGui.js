import { WarpFactory } from 'warp-contracts';
import { ArweaveSigner } from 'warp-arbundles';
import { playClick } from '../utils/mithril.js';
import MetaMaskSDK from '@metamask/sdk';
import { getAddress } from '@ethersproject/address';
import m from 'mithril';

const CHANGE_SCENE_TIMEOUT_MS = window.warpAO.config.env === 'dev' ? 0 : 2000;

export function ConnectWalletSceneGui(initialVnode) {
  let walletConnectionText;
  let walletErrorText = null;
  const hasGeneratedWallet =
    localStorage.getItem('signing_mode') === 'generated' &&
    localStorage.getItem('generated_jwk') !== null &&
    localStorage.getItem('wallet_address') !== null;

  const MMSDK = new MetaMaskSDK({
    dappMetadata: {
      name: 'CyberBeavers',
      url: window.location.href,
    },
    logging: {
      sdk: false,
    },
  });

  async function handleMetamask(changeScene) {
    try {
      await MMSDK.connect();
      const provider = MMSDK.getProvider();
      const walletAddress = getAddress((await provider.request({ method: 'eth_requestAccounts', params: [] }))[0]);
      await setGeneratedWallet(walletAddress, 'metamask');
      changeSceneWithTimeout(changeScene, walletAddress);
    } catch (e) {
      walletConnectionText = `Could not connect to Metamask`;
      console.error(e);
    }
  }

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
      gtag('event', 'wallet_connection_arconnect', {
        walletAddress: walletAddress,
      });
      await setGeneratedWallet(walletAddress, 'arconnect');
      changeSceneWithTimeout(changeScene, walletAddress);
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
    gtag('event', 'wallet_connection_generated', {
      walletAddress: address,
    });
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
    changeSceneWithTimeout(changeScene, walletAddress);
  }

  async function setGeneratedWallet(walletAddress, signingMode) {
    walletConnectionText = `Wallet ${walletAddress} connected.`;
    localStorage.setItem('wallet_address', walletAddress);
    const { signer, address } = await generateSigner();
    window.warpAO.generatedSigner = signer;
    window.warpAO.signingMode = signingMode;
    localStorage.setItem('generated_wallet_address', address);
    localStorage.setItem('signing_mode', window.warpAO.signingMode);
    console.log('Wallet connected', walletAddress);
  }

  function changeSceneWithTimeout(changeScene, walletAddress) {
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
          m(
            '.button yellow',
            {
              onclick: async () => {
                playClick();
                window.open(
                  'https://github.com/warp-contracts/cyberpunk-beavers/blob/main/MANUAL.md#cyberpunk-beavers',
                  '_blank'
                );
              },
              style: {
                width: '150px',
                marginBottom: '40px',
              },
            },
            'Read manual'
          ),
          m(
            '.button green',
            {
              onclick: async () => {
                playClick();
                await handleArconnect(initialVnode.attrs.changeScene);
              },
            },
            'Connect Arweave wallet (ArConnect)'
          ),
          m(
            '.button red',
            {
              onclick: async () => {
                playClick();
                await handleGenerateWallet(initialVnode.attrs.changeScene);
              },
            },
            'Generate Arweave wallet'
          ),
          hasGeneratedWallet
            ? m(
                '.button red',
                {
                  onclick: async () => {
                    playClick();
                    await useGeneratedWallet(initialVnode.attrs.changeScene);
                  },
                },
                'Use generated Arweave wallet'
              )
            : null,
          m(
            '.button green',
            {
              onclick: async () => {
                playClick();
                await handleMetamask(initialVnode.attrs.changeScene);
              },
            },
            'Connect ETH wallet (MetaMask)'
          ),
          m('.connection-text', walletConnectionText),
          walletErrorText ? m('.connection-text.error', walletErrorText) : null,
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
