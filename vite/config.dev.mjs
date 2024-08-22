import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [],
  server: {
    port: 9000,
    open: 'index.html?env=dev',
  },
});
