import esbuild from 'esbuild';
import { writeFileSync } from 'fs';

const commonEsbuildSettings = {
  bundle: true,
  format: 'iife',
  write: false,
  sourcemap: false,
  minify: false,
  target: ['es2020'],
};

const processes = [
  {
    entryPoints: ['src/game/process/hub.mjs'],
    outfile: 'dist/output-hub.js',
    ...commonEsbuildSettings,
  },
  {
    entryPoints: ['src/game/process/game.mjs'],
    outfile: 'dist/output-game.js',
    ...commonEsbuildSettings,
  },
];

processes.forEach(async (process) => {
  console.log(`Building ${process.entryPoints[0]}`);
  const result = await esbuild.build(process);

  for (let out of result.outputFiles) {
    let contractSrc = out.text;
    const lines = contractSrc.trim().split('\n');
    const first = lines[0];
    const last = lines[lines.length - 1];

    if (
      (/\(\s*\(\)\s*=>\s*{/g.test(first) || /\s*\(\s*function\s*\(\)\s*{/g.test(first)) &&
      /}\s*\)\s*\(\)\s*;/g.test(last)
    ) {
      lines.shift();
      lines.pop();
      contractSrc = lines.join('\n');
    }

    writeFileSync(out.path, contractSrc);

    //console.log(out.path, out.contents, out.hash, out.text)
  }
});
