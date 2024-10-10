import { replaceId } from './../replace-id.js';
import { argument, dateFromArg, mandatoryArg } from './../common.mjs';
import Const, { maps } from '../../src/game/common/const.mjs';
import { schedulesForEnv } from './deploy-session-schedule.js';
import { deployModule, spawnProcess, spawnGame, sendAction, registerGameInBridge } from './deploy-spawn-common.js';
import { handleTokenTransfers } from './token-keeper.js';

// LOCAL OR PROD
const env = mandatoryArg('env', "Specify 'env' flash with either 'local' or 'prod' value");
const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

// SESSION CONFIG
const sessionConfig = mandatoryArg('config', "Should be something like 'ao', 'rsg' or 'prod-open-asia' ");

// TIME DATE SETTINGS
const execDate = dateFromArg(argument('time'));

console.info(`----- Full deployment for ${env} env starting at ${execDate}.`, muUrl);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function doIt() {
  const [hubSrcId, gameSrcId] = await Promise.all([deployModule('hub'), deployModule('game')]);
  const hubProcessId = await spawnProcess({
    muUrl,
    processName: 'hub',
    moduleId: hubSrcId,
  });
  replaceId(`hub_moduleId_${env}`, hubSrcId);
  replaceId(`hub_processId_${env}`, hubProcessId);
  console.log(`-- Replaced ao-ids`, hubSrcId, hubProcessId);

  let { commonSetup, setups, tokensShipment } = schedulesForEnv(env, sessionConfig, execDate);

  const gameProcesses = [];
  let counter = 0;
  for (let setup of setups) {
    const mapIndex = counter % (maps.length - 1);
    // Spawn game
    const requestedMapTxId = maps[mapIndex];
    await sleep(100);
    const gameProcessId = await spawnGame({
      muUrl,
      moduleId: gameSrcId,
      additionalTags: [{ name: 'Hub-Process-Tx', value: hubProcessId }],
      gameTokens: setup.gameTokens,
      requestedMapTxId,
    });

    await sleep(100);
    await registerGameInBridge(gameProcessId, commonSetup.bridgeProcessId);

    gameProcesses.push(gameProcessId);

    // Transfer tokens
    await handleTokenTransfers(gameProcessId, commonSetup.bridgeProcessId, tokensShipment, setup.gameTokens);

    // Setup game
    await sleep(100);
    console.log(`Setting up game ${gameProcessId} at ${new Date(setup?.start)}`);
    await sendAction(gameSrcId, gameProcessId, setup, muUrl);
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
    // console.log(r);
  })
  .catch(console.error);
