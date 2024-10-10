import { readFileSync } from 'fs';
import ids from '../../src/game/config/warp-ao-ids.js';
import { argument, dateFromArg, mandatoryArg } from './../common.mjs';
import { deployModule, sendAction, transferToken, spawnGame } from './deploy-spawn-common.js';
import { gameSetup, schedulesForEnv } from './deploy-session-schedule.js';
import { handleTokenTransfers } from './token-keeper.js';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));

// LOCAL OR PROD
const env = mandatoryArg('env', "Specify 'env' flash with either 'local' or 'prod' value");
const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

// SESSION CONFIG
const sessionConfig = mandatoryArg('config', "Should be something like 'ao', 'rsg' or 'prod-open-asia' ");

// TIME DATE SETTINGS
const execDate = dateFromArg(mandatoryArg('time'));

// OVERRIDE CONFIG
const overrideSetup = JSON.parse(argument('setup') || '{}');

console.info(`Deploying for ${env} env at ${execDate}.`);

async function doIt() {
  const hubProcessId = ids[`hub_processId_${env}`];
  const [gameSrcId] = await Promise.all([deployModule('game')]);

  let { commonSetup, setups, tokensShipment } = schedulesForEnv(env, sessionConfig, execDate);
  const customConfig = gameSetup(env, commonSetup, {
    ...overrideSetup,
    start: execDate.getTime(),
    end: execDate.getTime() + 300000, //fixme
  });

  const gameProcessId = await spawnGame({
    muUrl,
    moduleId: gameSrcId,
    additionalTags: [{ name: 'Hub-Process-Tx', value: hubProcessId }],
    gameTokens: customConfig.gameTokens,
  });

  // Transfer tokens
  await handleTokenTransfers(gameProcessId, commonSetup.bridgeProcessId, tokensShipment, customConfig.gameTokens);

  console.log(`Setting up contract ${gameProcessId} with config`, customConfig);
  setTimeout(async () => {
    await sendAction(gameSrcId, gameProcessId, customConfig, muUrl);
  }, 1000);

  return {
    [`processId_${env}`]: gameProcessId,
    [`moduleId_${env}`]: gameSrcId,
    [`hub_processId_${env}`]: hubProcessId,
  };
}

doIt().then(console.log);
