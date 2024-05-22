import esbuild from 'esbuild';
import {writeFileSync} from "fs";


esbuild.build({
  entryPoints: ['js/ao-game-contract.mjs'], // Path to your entry file
  bundle: true,                  // Bundle all dependencies into one file
  outfile: 'dist/output.js',     // Path to the output file
  format: 'iife',                 // Output format
  write: false,
  sourcemap: false,               // Generate source map
  minify: false,                  // Minify the output
  target: ['es2020'],            // Target modern JavaScript
}).catch(() => process.exit(1))
  .then((result) => {
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