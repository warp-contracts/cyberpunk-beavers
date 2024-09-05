import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import { replaceId } from './replace-id.js';
import ids from '../src/game/config/warp-ao-ids.js';
import { setupGameContract, transferToken, spawnGame } from './game-common.js';
import { dateFromArg } from './common.mjs';
import { gameCustomConfig } from './deploy-spawn-session-config.js';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

// LOCAL OR PROD
const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];
const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

// TIME DATE SETTINGS
const timeIdx = process.argv.indexOf('--time');
const execDate = timeIdx > 0 ? dateFromArg(process.argv[timeIdx + 1]) : null;

// TREASURES AMOUNT
const treasuresIdx = process.argv.indexOf('--treasures');
const treasures = process.argv[treasuresIdx + 1];

// PLAYERS LIMIT
const playersLimitIdx = process.argv.indexOf('--limit');
const playersLimit = process.argv[playersLimitIdx + 1];

console.info(`Deploying for ${env} env at ${execDate}.`);

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
  // replaceId(`${keyPrefix}previousModuleId_${env}`, ids[`${keyPrefix}moduleId_${env}`]);
  replaceId(`${keyPrefix}moduleId_${env}`, srcTxId);
  return srcTxId;
}

async function spawn({ processName, moduleId }) {
  console.log(`Spawning ${processName}`);
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Name', ` spawn ${processName}`),
    new Tag('Module', moduleId),
    new Tag('Scheduler', 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M'),
    new Tag('SDK', 'ao'),
    new Tag('Content-Type', 'text/plain'),
  ];

  const processDataItem = createData('{}', signer, { tags: processTags });
  await processDataItem.sign(signer);

  const processResponse = await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: processDataItem.getRaw(),
  }).then((res) => res.json());
  return processResponse.id;
}

async function doIt() {
  const hubProcessId = ids[`hub_processId_${env}`];
  const [gameSrcId] = await Promise.all([deploy('game')]);
  const gameProcessId = await spawnGame({
    muUrl,
    moduleId: gameSrcId,
    additionalTags: [{ name: 'Hub-Process-Tx', value: hubProcessId }],
    treasures,
  });

  if (env == 'prod') {
    console.log(`Transferring token to game ${gameProcessId}`);
    await transferToken(ids[`token_processId_${env}`], gameProcessId, ids[`token_processId_${env}`]);
  }

  const customConfig = gameCustomConfig(hubProcessId, execDate.getTime(), playersLimit);

  console.log(`Setting up contract ${gameProcessId} with config`, customConfig);
  setTimeout(async () => {
    await setupGameContract(signer, gameSrcId, gameProcessId, customConfig, muUrl);
  }, 1000);

  return {
    [`processId_${env}`]: gameProcessId,
    [`moduleId_${env}`]: gameSrcId,
    [`hub_processId_${env}`]: hubProcessId,
  };
}

doIt().then(console.log);
