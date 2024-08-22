import { WarpFactory } from 'warp-contracts';
import { ArweaveSigner } from 'warp-arbundles';
import { playClick } from '../utils/mithril.js';

export function ConnectWalletSceneGui(initialVnode) {
  let titleAnimationDone = warpAO.config.env !== 'prod';
  let walletConnectionText;

  return {
    onTypewriterFinished: function () {
      titleAnimationDone = true;
      m.redraw();
    },
    view: function () {
      return m('.connect-wallet', [
        m('.container', [
          m('.title', [m(Typewriter, { text: 'Hey stranger...', onFinished: this.onTypewriterFinished })]),
          titleAnimationDone
            ? m('', [
                m(
                  '.button green',
                  {
                    onclick: async () => {
                      playClick();
                      await handleArconnect(initialVnode.attrs.changeScene, walletConnectionText);
                    },
                  },
                  'Connect wallet'
                ),
                warpAO && warpAO.config.env != 'prod'
                  ? m(
                      '.button red',
                      {
                        onclick: async () => {
                          playClick();
                          await handleGenerateWallet(initialVnode.attrs.changeScene);
                        },
                      },
                      'Generate wallet'
                    )
                  : m('p', { class: 'connection-text' }, walletConnectionText),
              ])
            : null,
        ]),
      ]);
    },
  };
}

function Typewriter() {
  let displayedText = '';
  return {
    oninit: function (vnode) {
      let text = vnode.attrs.text;
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          displayedText += text[currentIndex];
          currentIndex++;
          m.redraw();
          setTimeout(typeNextChar, 100);
        } else if (vnode.attrs.onFinished) {
          vnode.attrs.onFinished();
        }
      };

      typeNextChar();
    },
    view: function () {
      return m('span', displayedText);
    },
  };
}

const handleArconnect = async (changeScene, walletConnectionText) => {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect([
      'ACCESS_ADDRESS',
      'DISPATCH',
      'SIGN_TRANSACTION',
      'ACCESS_PUBLIC_KEY',
      'SIGNATURE',
    ]);
    const walletAddress = await window.arweaveWallet.getActiveAddress();
    walletConnectionText = 'Wallet connected';
    localStorage.setItem('wallet_address', walletAddress);
    changeScene(walletAddress);
    const { signer, address } = await generateSigner();
    localStorage.setItem('generated_wallet_address', address);
    warpAO.generatedSigner = signer;
    warpAO.signingMode = 'arconnect';
  } else {
    walletConnectionText = 'No wallet detected. Please install ArConnect.';
  }
};

const handleGenerateWallet = async (changeScene) => {
  const { signer, address } = await generateSigner();
  warpAO.generatedSigner = signer;
  console.log('Generated wallet address', address);
  localStorage.setItem('wallet_address', address);
  changeScene(address);
  window.warpAO.signingMode = 'generated';
};

const generateSigner = async () => {
  const warpInst = WarpFactory.forMainnet();
  const { jwk, address } = await warpInst.generateWallet();
  return { signer: new ArweaveSigner(jwk), address };
};
