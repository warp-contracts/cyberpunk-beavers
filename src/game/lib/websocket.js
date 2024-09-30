export async function initWebSocket(moduleId, processId) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:8097/${processId}`);

    let nonce = 0;
    let currentListener = null;
    const unsubscribe = () => {
      if (currentListener) {
        ws.removeEventListener('message', currentListener);
      }
    };

    ws.onopen = (event) => {
      console.log(`ws connection ready`, event);
      resolve({
        unsubscribe,
        subscribe: (target) => {
          unsubscribe();
          currentListener = messageListener(target);
          ws.addEventListener('message', currentListener);
        },
        send: async (message) => {
          const di = mockDataItem(moduleId, processId, message, ++nonce);
          ws.send(JSON.stringify(di));
          return { id: di.Id };
        },
      });
    };
    ws.onerror = (event) => {
      console.log(`connection failed`, event);
      reject(event);
    };
  });
}

const messageListener = (target) => {
  return (event) => {
    const response = JSON.parse(event.data);
    console.log(`Got message`, response);
    if (target.handleTx && response.gameStats?.lastTxs) {
      target.handleTx(response.gameStats.lastTxs);
    }
    if (target.handleMessage) {
      target.handleMessage(response, null, localStorage.getItem('wallet_address'));
    }
  };
};

function mockDataItem(moduleId, processId, data, nonce) {
  const withTags = window.warpAO.data(moduleId, processId, data);
  return {
    Owner: localStorage.getItem('wallet_address'),
    Id: Math.random().toString(36).substring(2),
    Signature: Math.random().toString(36).substring(2),
    Tags: withTags.tags,
    Timestamp: Date.now(),
    Nonce: nonce,
  };
}
