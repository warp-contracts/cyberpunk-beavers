import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene }, ref) {
  const game = useRef();

  // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
  useLayoutEffect(() => {
    if (game.current === undefined) {
      game.current = StartGame('game-container');

      window.sizeChanged = () => {
        if (game.current.isBooted) {
          setTimeout(() => {
            game.current.scale.resize(window.innerWidth, window.innerHeight);
            game.current.canvas.setAttribute(
              'style',
              `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
            );
          }, 100);
        }
      };
      window.onresize = () => window.sizeChanged();

      if (ref !== null) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = undefined;
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on('current-scene-ready', (currentScene) => {
      if (currentActiveScene instanceof Function) {
        currentActiveScene(currentScene);
      }
      ref.current.scene = currentScene;
    });

    return () => {
      EventBus.removeListener('current-scene-ready');
    };
  }, [currentActiveScene, ref]);

  return <div id="game-container"></div>;
});

// Props definitions
PhaserGame.propTypes = {
  currentActiveScene: PropTypes.func,
};
