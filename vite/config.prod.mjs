import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    watch: false,
    hmr: false,
    host: '0.0.0.o',
    port: 9001,
    open: 'index.html',
  },
});
