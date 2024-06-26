
export async function initWebSocket(moduleId, processId) {
  const ws = new WebSocket(`ws://localhost:8097/${processId}`);

  let nonce = 0;
  let currentListener = null;
  const unsubscribe = () => {
    if (currentListener) {
      ws.removeEventListener('message', currentListener);
    }
  }
  return {
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
  };
}

const messageListener = (target) => {
  return (event) => {
    const response = JSON.parse(event.data);
    console.log(`Got message`, response.txId, response.cmd);
    if (target.handleTx) {
      target.handleTx(response.txId);
    }
    if (target.handleMessage) {
      target.handleMessage(response);
    }
  }
}

function mockDataItem(moduleId, processId, data, nonce) {
  const withTags = window.warpAO.data(moduleId, processId, data);
  return {
    Owner: localStorage.getItem('wallet_address'),
    Id: Math.random().toString(36).substring(2),
    Signature: Math.random().toString(36).substring(2),
    Tags: withTags.tags,
    Timestamp: Date.now(),
    Nonce: nonce
  };
}
