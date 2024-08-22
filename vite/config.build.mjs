import { defineConfig } from 'vite';

const phasermsg = () => {
  return {
    name: 'phasermsg',
    buildStart() {
      process.stdout.write(`Building for production...\n`);
    },
    buildEnd() {
      const line = '---------------------------------------------------------';
      const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
      process.stdout.write(`${line}\n${msg}\n${line}\n`);

      process.stdout.write(`✨ Done ✨\n`);
    },
  };
};

export default defineConfig({
  base: './',
  plugins: [phasermsg()],
  logLevel: 'warning',
  server: {
    port: 9001,
    open: 'index.html',
  },
  esbuild: {
    supported: {
      'top-level-await': true, //browsers can handle top-level-await features
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
    minify: false,
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
      keep_classnames: true,
      format: {
        comments: false,
      },
    },
  },
});
