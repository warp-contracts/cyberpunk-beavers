import Const from '../../src/game/common/const.mjs';
import { sendAction } from './deploy-spawn-common.js';
import ids from '../../src/game/config/warp-ao-ids.js';

const setup = {
  cmd: Const.Command.setup,
  type: 'unrecognized',
  playersLimit: 10,
};

async function fetchProdGames() {
  let hubState = await (await fetch(`https://cu.warp.cc/current-state/${ids.hub_processId_prod}`)).json();
  return Object.fromEntries(
    Object.entries(hubState.result.Output.games).filter(([_, game]) => game.gameplayMode === 'horde')
  );
}

async function changeWalletLimit(processes) {
  for (const [processId, game] of Object.entries(processes)) {
    const { module: moduleId } = game;

    const result = await sendAction(moduleId, processId, setup, 'https://mu.warp.cc');
    console.log(result);
  }
}

fetchProdGames()
  .then(changeWalletLimit)
  .then(() => console.log(`Finished`));
