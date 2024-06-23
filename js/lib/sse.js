export async function initSubscription(moduleId, processId) {
  console.log('Subscribing for processId: ', processId);

  let sse = new EventSource(`${window.warpAO.config.cuAddress}/subscribe/${processId}`);
  const beforeUnloadHandler = (event) => {
    // todo: sent unregister message
    sse.close();
  };
  window.addEventListener('beforeunload', beforeUnloadHandler);

  sse.onerror = (e) => {
    sse.close();
    console.error(e);
    sse = new EventSource(`${window.warpAO.config.cuAddress}/subscribe/${processId}`);
  };

  window.warpAO.subscribed = true;

  return {
    unsubscribe: () => {
      sse.onmessage = () => {};
      sse.close();
      window.warpAO.server = false;
    },
    subscribe: (target) => {
      sse.onmessage = messageListener(target, processId);
    },
    send: window.warpAO.send.bind(null, moduleId, processId),
  };
}

function messageListener(target, processId) {
  return (event) => {
    try {
      const now = Date.now();
      const message = JSON.parse(event.data);
      console.log(`\n ==== new message ${processId}:${message.nonce} ==== `, message);
      if (message.tags) {
        const salt = message.tags.find((t) => t.name === 'Salt');
        if (salt) {
          const saltInt = parseInt(salt.value);
          const diff = now - saltInt;
          console.log(`===== Lag: ${diff} ms`);
        }
      }

      if (target.handleTx) {
        target.handleTx(message.txId);
      }
      if (message.output && message.output.cmd) {
        message.output.txId = message.txId; // FIXME: well..., no the best approach
        if (target.handleMessage) {
          target.handleMessage(message.output);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
}
