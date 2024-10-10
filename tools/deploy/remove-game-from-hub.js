import Const from '../../src/game/common/const.mjs';
import { sendAction } from './deploy-spawn-common.js';

const MU_URL = 'http://localhost:8080';
const HUB_PROCESS_ID = 'xtJXSsP0ynCtb8NHSj5nWVt5s-vdRGdEs1-FjDHO59A';
const HUB_MODULE_ID = 'Zk4mn_wc_OQn2fM_Cby8a9RWU-rNTLTFi1uliXk1fGc';
const GAME_PROCESS_ID = 'Zf54Zos20jIABz7hAP-HjKCIXAkab18TwfAPxuDj3UI';
const GAME_MODULE_ID = '6v1xtbtY-Xo39Y1FnPqAS6Sj3dg-6PxdOyx-8sjB9m0';

async function removeFromHub(moduleId, processId, gameId) {
  const result = await sendAction(
    moduleId,
    processId,
    {
      cmd: Const.Command.hubRemoveGame,
      gameId,
    },
    MU_URL
  );
  console.log(result);
}

async function disableGame(moduleId, processId) {
  const result = await sendAction(
    moduleId,
    processId,
    {
      cmd: Const.Command.setup,
      type: 'unrecognized', // small hack, this type is not unrecognized by setup function, and will not trigger any time or mode updates
      walletsWhitelist: ['-'],
      playersLimit: 0,
      scoresSent: true,
      tokensTransferred: true,
    },
    MU_URL
  );
  console.log(result);
}

removeFromHub(HUB_MODULE_ID, HUB_PROCESS_ID, GAME_PROCESS_ID)
  .then(() => disableGame(GAME_MODULE_ID, GAME_PROCESS_ID))
  .then(() => console.log(`Finalizado`));
