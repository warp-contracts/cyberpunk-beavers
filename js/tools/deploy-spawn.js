import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import { replaceId } from './replace-id.js';
import Arweave from 'arweave';
import ids from '../../js/config/warp-ao-ids.js';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];

console.info(`Deploying for ${env} env.`);

const maps = [
  'qtcpzuuGoVKVQGMuq_PMaRHEL071Ja1SV8dvC-gur2Q', // - 'default' map
  'AeSkeoKPIpM71iapW6Onv4681CAXOU9DEr2XcgDZPI0', // - ao 'tutorial' map
  'IOcu1uK7ViJc9OOA2PeUbAh1hAUlibeqOYbV2fmMZ6U', // Greg map 1
  '0ZhvZfjkwDOOfG1ns-afJNHVYysaMsshYdMfIeUb_hM'  // Greg map 2
]

const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const mapTxId = maps[randomIntegerInRange(0, maps.length - 1)];

async function readMapFromArweave() {
  console.log(`Loading map ${mapTxId}`);
  const response = await fetch(`https://arweave.net/${mapTxId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('could not load map tx from Arweave');
}

async function deploy(processName) {
  console.log(`Deploying ${processName}`);
  const module = readFileSync(`./dist/output-${processName}.js`, 'utf-8');
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
  const keyPrefix = processName == 'game' ? '' : `${processName}_`;
  replaceId(`${keyPrefix}previousModuleId_${env}`, ids[`${keyPrefix}moduleId_${env}`]);
  replaceId(`${keyPrefix}moduleId_${env}`, srcTxId);
  return srcTxId;
}

async function spawn({ processName, moduleId, chatProcessId, mapJson }) {
  console.log(`Spawning ${processName}`);
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Module', moduleId),
    new Tag('Scheduler', 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M'),
    new Tag('SDK', 'ao'),
    new Tag('Content-Type', 'text/plain'),
  ];

  if (mapJson) {
    processTags.push(new Tag('Map-From-Tx', mapTxId));
  }
  if (chatProcessId) {
    processTags.push(new Tag('Chat-Process-Tx', chatProcessId));
  }

  const data = mapJson ? JSON.stringify({ rawMap: mapJson, mapApi: 'v1' }) : '{}';
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

  const keyPrefix = processName == 'game' ? '' : `${processName}_`;
  replaceId(`${keyPrefix}previousProcessId_${env}`, ids[`${keyPrefix}processId_${env}`]);
  replaceId(`${keyPrefix}processId_${env}`, processResponse.id);
  return processResponse.id;
}

async function doIt() {
  const [gameSrcId, chatSrcId, mapJson] = await Promise.all([deploy('game'), deploy('chat'), readMapFromArweave()]);
  const chatProcessId = await spawn({
    processName: 'chat',
    moduleId: chatSrcId,
  });
  const gameProcessId = await spawn({
    processName: 'game',
    moduleId: gameSrcId,
    chatProcessId,
    mapJson,
  });

  return {
    [`processId_${env}`]: gameProcessId,
    [`moduleId_${env}`]: gameSrcId,
    [`chat_processId_${env}`]: chatProcessId,
    [`chat_moduleId_${env}`]: chatSrcId,
    mapTxId,
  };
}

doIt().then((r) => {
  console.log(r);
});
