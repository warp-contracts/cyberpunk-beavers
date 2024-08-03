import { useContext, useState } from 'react';
import Button from '../Button/Button';
import Typewriter from '../Typewriter/Typewriter';
import { ArweaveSigner } from 'warp-arbundles';
import { WarpFactory } from 'warp-contracts';
import './ConnectWallet.css';
import { PhaserSceneContext, WindowContext } from '../../contexts/Contexts';

function ConnectWallet() {
  const warpAO = useContext(WindowContext);
  const scene = useContext(PhaserSceneContext);
  const [walletConnectionText, setWalletConnectionText] = useState('');
  const [titleAnimationDone, setTitleAnimationDone] = useState(false);

  const handleArconnect = async () => {
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
      setWalletConnectionText('Wallet connected');
      localStorage.setItem('wallet_address', walletAddress);
      scene.changeScene(walletAddress);
      const { signer, address } = await generateSigner();
      localStorage.setItem('generated_wallet_address', address);
      warpAO.generatedSigner = signer;
      warpAO.signingMode = 'arconnect';
    } else {
      setWalletConnectionText('No wallet detected. Please install ArConnect.');
    }
  };

  const handleGenerateWallet = async () => {
    const { signer, address } = await generateSigner();
    warpAO.generatedSigner = signer;
    console.log('Generated wallet address', address);
    localStorage.setItem('wallet_address', address);
    scene.changeScene(address);
    window.warpAO.signingMode = 'generated';
  };

  return (
    <div className="connect-wallet">
      <div className="title">
        <Typewriter delay={100} setDone={setTitleAnimationDone}>
          Hey stranger...
        </Typewriter>
      </div>
      {titleAnimationDone && (
        <>
          <Button color="green" handleClick={async () => await handleArconnect()}>
            Connect wallet
          </Button>
          {warpAO && warpAO.config.env != 'prod' && (
            <Button color="red" handleClick={async () => await handleGenerateWallet()}>
              Generate wallet
            </Button>
          )}
          <p className="text">{walletConnectionText}</p>
        </>
      )}
    </div>
  );
}

async function generateSigner() {
  const warpInst = WarpFactory.forMainnet();
  const { jwk, address } = await warpInst.generateWallet();
  return { signer: new ArweaveSigner(jwk), address };
}

export default ConnectWallet;
