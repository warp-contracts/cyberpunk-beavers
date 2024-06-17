export async function initSubscription() {
  if (window.warpAO.subscribed) {
    return;
  }

  console.log('Subscribing for processId: ', window.warpAO.processId());

  let sse = new EventSource(`${window.warpAO.config.cuAddress}/subscribe/${window.warpAO.processId()}`);
  const beforeUnloadHandler = (event) => {
    // todo: sent unregister message
    sse.close();
  };
  window.addEventListener('beforeunload', beforeUnloadHandler);

  sse.onerror = (e) => {
    sse.close();
    console.error(e);
    sse = new EventSource(`${window.warpAO.config.cuAddress}/subscribe/${window.warpAO.processId()}`);
  };

  return {
    unsubscribe: () => {
      sse.onmessage = () => {}
    },
    subscribe: (target) => {
      sse.onmessage = messageListener(target);
    },
    send: window.warpAO.send
  };
}

function messageListener(target) {
  return (event) => {
    try {
      const now = Date.now();
      const message = JSON.parse(event.data);
      console.log(`\n ==== new message nonce ${message.nonce} ==== `, message);
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
      console.log(event);
    }
  }
}


