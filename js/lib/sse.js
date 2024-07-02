export async function initSubscription(moduleId, processId, verifyNonce, verifyLag) {
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

  return {
    unsubscribe: () => {
      sse.onmessage = () => {};
      sse.close();
    },
    subscribe: (target) => {
      sse.onmessage = messageListener(target, processId, verifyNonce, verifyLag);
    },
    send: (message) => {
      return window.warpAO.send(moduleId, processId, message);
    },
    switchProcess: (newProcessId, newModuleId) => {
      processId = newProcessId;
      moduleId = newModuleId;
      sse.onmessage = () => {};
      sse.close();
      console.log('Switching subscription for processId: ', newProcessId);
      sse = new EventSource(`${window.warpAO.config.cuAddress}/subscribe/${newProcessId}`);
    },
  };
}

function messageListener(target, processId, verifyNonce, verifyLag) {
  return (event) => {
    try {
      const now = Date.now();
      const message = JSON.parse(event.data);
      console.log(`\n ==== new message ${processId}:${message.nonce} ==== `, message);
      let lag = null;
      if (target.handleTx && message.output.lastTxs) {
        target.handleTx(message.output.lastTxs);
      }
      if (verifyNonce) {
        if (message.nonce <= window.warpAO.nonce) {
          console.log('New message nonce lower or equal than last', {
            last: window.warpAO.nonce,
            message: message.nonce,
          });
          return;
        } else {
          window.warpAO.nonce = message.nonce;
        }

      }
      if (verifyLag) {
        if (message.tags) {
          const sentTag = message.tags.find((t) => t.name === 'Salt');
          if (sentTag) {
            const sentTs = parseInt(sentTag.value);
            lag = {
              deliveryToCu: message.cuReceived - sentTs,
              deliveryFromCu: now - message.cuSent,
              cuCalc: message.cuSent - message.cuReceived,
              total: now - sentTs
            };
            window.warpAO.lag = lag;
            console.log(`===== Lag:`, window.warpAO.lag);
          }
        }
      }

      if (message.output && message.output.cmd) {
        message.output.txId = message.txId; // FIXME: well..., no the best approach
        if (target.handleMessage) {
          target.handleMessage(message.output, lag);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
}
