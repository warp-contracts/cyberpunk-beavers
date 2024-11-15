import Const from '../../src/game/common/const.mjs';
import { sendAction } from './deploy-spawn-common.js';
import ids from '../../src/game/config/warp-ao-ids.js';
import { SetupType } from '../../src/game/process/cmd/setup.mjs';

const setup = {
  cmd: Const.Command.setup,
  type: SetupType.simple,
  playersLimit: 11,
  scoresSent: true,
  walletsWhitelist: [],
};

async function fetchProdGames() {
  let hubState = await (await fetch(`http://localhost:8090/current-state/${ids.hub_processId_local}`)).json();
  return Object.fromEntries(
    Object.entries(hubState.result.Output.games).filter(([_, game]) => game.gameplayMode === 'deathmatch')
  );
}

async function changeWalletLimit(processes) {
  for (const [processId, game] of Object.entries(processes)) {
    const { module: moduleId } = game;

    const result = await sendAction(moduleId, processId, setup, 'http://localhost:8080');
    console.log(result);
  }
}

fetchProdGames()
  .then(changeWalletLimit)
  .then(() => console.log(`Finished`));
