import { initWebSocket } from './websocket.js';
import { initSubscription } from './sse.js';

export const serverConnectionGame = await (async () => {
  return initServerConnection(window.warpAO.moduleId(), window.warpAO.processId(), true, true);
})();

export const serverConnectionChat = await (async () => {
  return initServerConnection(window.warpAO.chatModuleId(), window.warpAO.chatProcessId(), false, false);
})();

async function initServerConnection(moduleId, processId, verifyNonce, verifyLag) {
  if (window.warpAO.config.env === 'dev') {
    return initWebSocket(moduleId, processId);
  } else {
    return initSubscription(moduleId, processId, verifyNonce, verifyLag);
  }
}
