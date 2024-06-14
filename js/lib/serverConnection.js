import { initWebSocket } from './websocket.js';
import { initSubscription } from './sse.js';


export const serverConnection = await (async () => {
  return await initServerConnection();
})();

async function initServerConnection() {
  if (window.warpAO.config.env === 'dev') {
    return await initWebSocket();
  } else {
    return await initSubscription();
  }
}

