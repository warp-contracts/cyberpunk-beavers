import { defineConfig, loadEnv } from 'vite';
import Const from '../src/game/common/const.mjs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.VITE_GAME_MODE);
  return {
    base: './',
    plugins: [],
    server: {
      port: 9001,
      open: `index.html?env=dev${env.VITE_GAME_MODE == Const.GAME_MODES.rsg.type ? `&mode=${env.VITE_GAME_MODE}` : ''}`,
    },
  };
});
