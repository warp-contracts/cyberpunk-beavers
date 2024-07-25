import { initWebSocket } from './websocket.js';
import { initSubscription } from './sse.js';

export const serverConnection = await (async () => {
  const conn = {};
  conn.hub = await initServerConnection(
    window.warpAO.gameHubModuleId(),
    window.warpAO.gameHubProcessId(),
    false,
    false,
    true
  );

  conn.initGame = async (module, process) => {
    conn.game = await initServerConnection(module, process, true, true, false);
    window.warpAO.processId = () => process;
  };
  conn.initChat = async (module, process) => {
    conn.chat = await initServerConnection(module, process, false, false, true);
    window.warpAO.chatProcessId = () => process;
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
