import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [],
    server: {
      watch: false,
      hmr: false,
      host: '0.0.0.0',
      port: 9001,
      open: `index.html`,
    },
  };
});
