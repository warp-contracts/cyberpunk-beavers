import { Tag } from 'warp-contracts';
import { createData } from 'warp-arbundles';
import ids from './warp-ao-ids.js';

const urlParams = new URLSearchParams(window.location.search);
const env = urlParams.get('env') || 'prod';

console.log(`running in ${env} mode`);

window.warpAO = {
  config: {
    ...ids,
    env,
    muAddress: env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc',
    cuAddress: env === 'local' ? 'http://localhost:8090' : 'https://cu.warp.cc',
  },
  generatedSigner: null,
  nonce: 0,
  subscribed: false,
  processId: () => {
    return window.warpAO.config[`processId_${env}`];
  },
  moduleId: () => {
    return window.warpAO.config[`moduleId_${env}`];
  },
  messageTags: (message) => [
    new Tag('Action', JSON.stringify(message)),
    new Tag('Data-Protocol', 'ao'),
    new Tag('Type', 'Message'),
    new Tag('Variant', 'ao.TN.1'),
    { name: 'SDK', value: 'ao' },
    new Tag('From-Process', window.warpAO.processId()),
    new Tag('From-Module', window.warpAO.moduleId()),
    new Tag('Salt', '' + Date.now()),
  ],
  data: (message) => ({
    tags: window.warpAO.messageTags(message),
    data: '1234',
    target: window.warpAO.processId(),
  }),
  send: async (message) => {
    if (window.warpAO.generatedSigner) {
      return sendUsingGeneratedWallet(message, window.warpAO.generatedSigner);
    } else {
      return sendUsingConnectedWallet(message);
    }
  },
};

async function sendUsingGeneratedWallet(message, signer) {
  const dataItem = createData('1234', signer, {
    tags: window.warpAO.messageTags(message),
    target: window.warpAO.processId(),
  });
  await dataItem.sign(signer);
  return sendRawDataItem(dataItem.getRaw(), message.beacon);
}

async function sendRawDataItem(rawData, beacon) {
  if (beacon) {
    const arrayBuffer = rawData.buffer.slice(rawData.byteOffset, rawData.byteOffset + rawData.byteLength);
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });

    navigator.sendBeacon(window.warpAO.config.muAddress, blob);
  } else {
    const response = await fetch(window.warpAO.config.muAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        Accept: 'application/json',
      },
      body: rawData,
    });

  if (response.ok) {
    return await response.json();
  } else {
    console.warn('Wrong response', {
      code: response.statusCode,
      message: response.statusText,
    });
  }
}

async function sendUsingConnectedWallet(message) {
  const signedDataItem = await window.arweaveWallet.signDataItem(window.warpAO.data(message));
  return sendRawDataItem(signedDataItem, message.beacon);
}
