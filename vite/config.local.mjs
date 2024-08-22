import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [],
  server: {
    port: 9001,
    open: 'index.html?env=local',
  },
});
