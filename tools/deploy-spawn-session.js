import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import { spawnGame, transferToken, setupGameContract, registerGameInBridge } from './game-common.js';
import { replaceId } from './replace-id.js';
import { dateFromArg } from './common.mjs';
import { hourSessionGamesConfig, TOKEN_CONTRACT, TOKEN_CONTRACT_MOCK } from './deploy-spawn-session-config.js';
import Const, { maps, GAME_MODES, GAMEPLAY_MODES, DEFAULT_ROUND_INTERVAL_MS } from '../src/game/common/const.mjs';
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
const gameTokens = env === 'local' ? TOKEN_CONTRACT_MOCK : TOKEN_CONTRACT;

// TIME DATE SETTINGS
const timeArgIndex = process.argv.indexOf('--time');
if (timeArgIndex === -1) {
  throw new Error('--time param not specified');
}
const timeArg = process.argv[process.argv.indexOf('--time') + 1];
const execDate = dateFromArg(timeArg);

// GAME MODE
const modeIdx = process.argv.indexOf('--gameMode');
const mode = modeIdx == -1 ? GAME_MODES.default.type : process.argv[modeIdx + 1];

// GAMEPLAY MODE
const gameplayModeIdx = process.argv.indexOf('--gameplayMode');
const gameplayMode = gameplayModeIdx == -1 ? GAMEPLAY_MODES.deathmatch : process.argv[gameplayModeIdx + 1];
const knownGameplayModes = Object.keys(GAMEPLAY_MODES);
if (!knownGameplayModes.includes(gameplayMode)) {
  throw new Error(`Unknown gameplayMode '${gameplayMode}'. Possible modes: ${knownGameplayModes}`);
}

// ROUND INTERVAL
const roundIntervalIdx = process.argv.indexOf('--roundInterval');
const roundInterval = roundIntervalIdx == -1 ? DEFAULT_ROUND_INTERVAL_MS : process.argv[roundIntervalIdx + 1];

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
  const moduleDataItem = createData(module, signer, { tags: moduleTags });
  await moduleDataItem.sign(signer);
  const moduleResponse = await fetch('https://up.arweave.net/tx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: moduleDataItem.getRaw(),
  }).then((res) => res.json());

  //console.log("Module response", moduleResponse);
  return moduleResponse.id;
  //const srcTx = await warp.createSource({ src: module, tags: moduleTags }, signer);
  //return await warp.saveSource(srcTx);
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
  const [hubSrcId, gameSrcId] = await Promise.all([deploy('hub'), deploy('game')]);
  const hubProcessId = await spawn({
    processName: 'hub',
    moduleId: hubSrcId,
  });
  replaceId(`hub_moduleId_${env}`, hubSrcId);
  replaceId(`hub_processId_${env}`, hubProcessId);
  console.log(`----- deployed hub`, hubSrcId, hubProcessId);

  const bridgeProcessId = ids[`bridge_processId_${env}`];
  let setups = hourSessionGamesConfig(env, hubProcessId, execDate, playersLimit, mode, {
    mode: gameplayMode,
    roundInterval,
  });

  const gameProcesses = [];
  let counter = 0;
  for (let s of setups) {
    const mapIndex = counter % (maps.length - 1);
    // Spawn game
    const requestedMapTxId = maps[mapIndex];
    await sleep(100);
    const gameProcessId = await spawnGame({
      muUrl,
      moduleId: gameSrcId,
      additionalTags: [{ name: 'Hub-Process-Tx', value: hubProcessId }],
      gameTokens,
      requestedMapTxId,
    });

    await sleep(100);
    await registerGameInBridge(gameProcessId, bridgeProcessId);

    gameProcesses.push(gameProcessId);

    // Transfer tokens
    if (env == 'prod' && mode != Const.GAME_MODES.rsg.type) {
      const cbcoinProcessId = gameTokens[Const.GameTreasure.cbcoin.type].id;
      console.log(`Transferring ${Const.GameTreasure.cbcoin.type} to game ${gameProcessId}`);
      await transferToken(cbcoinProcessId, gameProcessId, cbcoinProcessId);
    }

    // for (let [key, token] of Object.entries(gameTokens)
    //   .filter(([key]) => key !== Const.GameTreasure.cbcoin.type)
    //   .filter(([key]) => key !== Const.GameTreasure.rsg.type)
    //   .filter(([, token]) => token.amount > 0)) {
    //   const qty = token.amount * Const.GameTreasure[key].baseVal;
    //   console.log(`Transferring additional ${qty} ${key} to bridge ${bridgeProcessId}`);
    //   await transferToken(token.id, bridgeProcessId, null, qty);
    // }

    // Setup game
    await sleep(100);
    console.log(`Setting up game ${gameProcessId} at ${new Date(s?.start)}`, s);
    await setupGameContract(signer, gameSrcId, gameProcessId, s, muUrl);
    counter++;
  }

  return {
    [`moduleId_${env}`]: gameSrcId,
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
