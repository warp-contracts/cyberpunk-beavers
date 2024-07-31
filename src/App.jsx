import { useRef, useState } from 'react';
import { PhaserGame } from './game/PhaserGame';
import { connectWalletSceneKey } from './game/main';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import { PhaserSceneContext, WindowContext } from './contexts/Contexts';
import './App.css';

function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('');
  const phaserRef = useRef();

  const currentScene = (scene) => {
    setCurrentSceneKey(scene.scene.key);
  };

  return (
    <PhaserSceneContext.Provider value={phaserRef?.current?.scene}>
      <WindowContext.Provider value={window.warpAO}>
        <div id="app">
          <div className="wrapper">
            {currentSceneKey == connectWalletSceneKey && <ConnectWallet />}
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
          </div>
        </div>
      </WindowContext.Provider>
    </PhaserSceneContext.Provider>
  );
}

export default App;
