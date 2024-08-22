import { useRef, useState } from 'react';
import { PhaserGame } from './game/PhaserGame';
import './App.css';

function App() {
  const [currentSceneKey, setCurrentSceneKey] = useState('');
  const phaserRef = useRef();

  const currentScene = (scene) => {
    setCurrentSceneKey(scene.scene.key);
  };

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
    </div>
  );
}

export default App;
