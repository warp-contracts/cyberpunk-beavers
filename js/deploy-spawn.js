import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import pkg from 'replace-in-files';
const replaceInFiles = pkg;

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];

console.info(`Deploying for ${env} env.`);

async function deploy() {
  const module = readFileSync('./dist/output.js', 'utf-8');
  const moduleTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Module'),
    new Tag('Module-Format', 'wasm32-unknown-emscripten'),
    new Tag('Input-Encoding', 'JSON-1'),
    new Tag('Output-Encoding', 'JSON-1'),
    new Tag('Memory-Limit', '500-mb'),
    new Tag('Compute-Limit', '9000000000000'),
    new Tag('Salt', '' + Date.now()),
  ];
  const srcTx = await warp.createSource({ src: module, tags: moduleTags }, signer);
  const srcTxId = await warp.saveSource(srcTx);
  console.log('MODULE_ID=', srcTxId);
  replaceId('moduleId', env, srcTxId);
  return srcTxId;
}

async function spawn(moduleId) {
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Module', moduleId),
    new Tag('Scheduler', 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M'),
    new Tag('SDK', 'ao'),
    new Tag('Content-Type', 'text/plain'),
    new Tag('Name', 'asia'),
  ];

  const data = JSON.stringify({ counter: {} });
  const processDataItem = createData(data, signer, { tags: processTags });
  await processDataItem.sign(signer);

  const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

  const processResponse = await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: processDataItem.getRaw(),
  }).then((res) => res.json());

  console.log('PROCESS_ID=', processResponse.id);
  replaceId('processId', env, processResponse.id);
}

function replaceId(prefix, env, newValue) {
  replaceInFiles({
    files: './js/warp-ao-ids.js',
    from: new RegExp(`(${prefix}_${env}:\\s*')([^']+)(')`),
    to: `$1${newValue}$3`,
  })
    .then(({ changedFiles, countOfMatchesByPaths }) => {
      console.log('Count of matches by paths:', countOfMatchesByPaths);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}

deploy()
  .then(spawn)
  .then(() => console.log(``));
