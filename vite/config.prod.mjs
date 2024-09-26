import { defineConfig, loadEnv } from 'vite';
import Const from '../src/game/common/const.mjs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [],
    server: {
      watch: false,
      hmr: false,
      host: '0.0.0.0',
      port: 9001,
      open: `index.html?${env.VITE_GAME_MODE == Const.GAME_MODES.rsg.type ? `&mode=${env.VITE_GAME_MODE}` : ''}`,
    },
  };
});
