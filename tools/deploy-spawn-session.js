import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import { spawnGame, transferToken, setupGameContract } from './game-common.js';
import { replaceId } from './replace-id.js';
import { dateFromArg } from './common.mjs';
import { activeGamesConfig, hourSessionGamesConfig } from './deploy-spawn-session-config.js';
import ids from '../src/game/config/warp-ao-ids.js';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}

// LOCAL OR PROD
const env = process.argv[envIdx + 1];
const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

// TIME DATE SETTINGS
const timeArg = process.argv[process.argv.indexOf('--time') + 1];
const execDate = dateFromArg(timeArg);

// TREASURES AMOUNT
const treasuresIdx = process.argv.indexOf('--treasures');
const treasures = process.argv[treasuresIdx + 1];

// PLAYERS LIMIT
const playersLimitIdx = process.argv.indexOf('--limit');
const playersLimit = process.argv[playersLimitIdx + 1];

console.info(`Full deployment for ${env} env starting at ${execDate}.`, muUrl);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  return await warp.saveSource(srcTx);
}

async function spawn({ processName, moduleId }) {
  console.log(`Spawning ${processName}`);
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Name', `spawn ${processName}`),
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
  console.log(`----- starting full deploy`);
  const [hubSrcId, gameSrcId, chatSrcId] = await Promise.all([deploy('hub'), deploy('game'), deploy('chat')]);
  const hubProcessId = await spawn({
    processName: 'hub',
    moduleId: hubSrcId,
  });
  replaceId(`hub_moduleId_${env}`, hubSrcId);
  replaceId(`hub_processId_${env}`, hubProcessId);
  console.log(`----- deployed hub`, hubSrcId, hubProcessId);

  let setups = execDate
    ? hourSessionGamesConfig(hubProcessId, execDate, playersLimit)
    : activeGamesConfig(hubProcessId, playersLimit);

  const gameProcesses = [];
  for (let s of setups) {
    // Spawn chat
    await sleep(1000);
    const chatProcessId = await spawn({
      processName: 'chat',
      moduleId: chatSrcId,
    });
    s.chatProcessId = chatProcessId;
    s.chatModuleId = chatSrcId;

    // Spawn game
    await sleep(1000);
    const gameProcessId = await spawnGame({
      muUrl,
      moduleId: gameSrcId,
      additionalTags: [
        { name: 'Chat-Process-Tx', value: chatProcessId },
        { name: 'Chat-Module-Tx', value: chatSrcId },
        { name: 'Hub-Process-Tx', value: hubProcessId },
      ],
      treasures,
    });
    gameProcesses.push(gameProcessId);

    // Transfer tokens
    if (env == 'prod') {
      console.log(`Transferring token to game ${gameProcessId}`);
      await transferToken(ids[`token_processId_${env}`], gameProcessId);
    }

    // Setup game
    await sleep(1000);
    console.log(`Setting up game ${gameProcessId} at ${new Date(s?.start)}`, s);
    await setupGameContract(signer, gameSrcId, gameProcessId, s, muUrl);
  }

  return {
    [`moduleId_${env}`]: gameSrcId,
    [`chat_moduleId_${env}`]: chatSrcId,
    [`hub_moduleId_${env}`]: hubSrcId,
    [`hub_processId_${env}`]: hubProcessId,
    gameProcesses,
  };
}

doIt()
  .then((r) => {
    console.log(r);
  })
  .catch(console.error);
