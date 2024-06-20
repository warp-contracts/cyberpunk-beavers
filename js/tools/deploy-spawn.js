import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import { replaceId } from './replace-id.js';
import Arweave from 'arweave';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];

console.info(`Deploying for ${env} env.`);
// RZrD8U6MsN48I5Z2lkBM4biSiVehB0eVbOA3pcXI_9U - 'default' map
// fI8pyDeSd3SqpKbxZUviFRgH2IryEbIiRGEdAJRFA0Y - ao 'tutorial' map
// TBIU0X-FkFu-KPdboiQgbVkkVyVPPsW73rbjX6aIGYg - Greg map 1 - BROKEN obstacles layer!!
// 3JwZKHRqBRJ98Y4arUilHLgwiyCMqWuCyACXwfEB9Ec - Greg map 1 fixed
const mapTxId = '3JwZKHRqBRJ98Y4arUilHLgwiyCMqWuCyACXwfEB9Ec';

async function readMapFromArweave() {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });
  try {
    const txData = await arweave.transactions.getData(mapTxId, { decode: true, string: true });
    return JSON.parse(txData);
  } catch (e) {
    console.error(e);
  }
}

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
  replaceId(`moduleId_${env}`, srcTxId);
  return srcTxId;
}

async function spawn(moduleId, mapJson) {
  console.log(mapJson);
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Module', moduleId),
    new Tag('Scheduler', 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M'),
    new Tag('SDK', 'ao'),
    new Tag('Content-Type', 'text/plain'),
    new Tag('Map-From-Tx', 'RZrD8U6MsN48I5Z2lkBM4biSiVehB0eVbOA3pcXI_9U'),
  ];

  const data = JSON.stringify({ rawMap: mapJson, mapApi: 'v1' });
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
  replaceId(`processId_${env}`, processResponse.id);
}

Promise.all([deploy(), readMapFromArweave()])
  .then(([srcId, mapJson]) => spawn(srcId, mapJson))
  .then(() => console.log(``));
