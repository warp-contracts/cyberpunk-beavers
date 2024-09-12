import { initWebSocket } from './websocket.js';
import { initSubscription } from './sse.js';

export const serverConnection = await (async () => {
  const conn = {};
  conn.hub = await initServerConnection(
    window.warpAO.gameHubModuleId(),
    window.warpAO.gameHubProcessId(),
    false,
    true,
    true
  );

  conn.initGame = async (module, process, mapTxId) => {
    conn.game = await initServerConnection(module, process, false, true, false);
    window.warpAO.processId = () => process;
    window.warpAO.mapTxId = () => mapTxId;
    window.warpAO.nonce = -1;
    window.warpAO.spectatorMode = false;
  };
  return conn;
})();

async function initServerConnection(moduleId, processId, verifyNonce, verifyLag, alwaysUseConnectedWallet) {
  if (window.warpAO.config.env === 'dev') {
    return initWebSocket(moduleId, processId);
  } else {
    return initSubscription(moduleId, processId, verifyNonce, verifyLag, alwaysUseConnectedWallet);
  }
}
