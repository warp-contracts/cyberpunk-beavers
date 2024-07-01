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
    reload: true,
  },
  generatedSigner: null,
  nonce: -1,
  processId: () => {
    return window.warpAO.config[`processId_${env}`];
  },
  moduleId: () => {
    return window.warpAO.config[`moduleId_${env}`];
  },
  chatProcessId: () => {
    return window.warpAO.config[`chat_processId_${env}`];
  },
  chatModuleId: () => {
    return window.warpAO.config[`chat_moduleId_${env}`];
  },
  tokenProcessId: () => {
    return window.warpAO.config[`token_processId_${env}`];
  },
  messageTags: (moduleId, processId, message) => [
    new Tag('Action', JSON.stringify(message)),
    new Tag('Data-Protocol', 'ao'),
    new Tag('Type', 'Message'),
    new Tag('Variant', 'ao.TN.1'),
    { name: 'SDK', value: 'ao' },
    new Tag('From-Module', moduleId),
    new Tag('From-Process', processId),
    new Tag('Salt', '' + Date.now()),
  ],
  data: (moduleId, processId, message) => ({
    tags: window.warpAO.messageTags(moduleId, processId, message),
    data: '1234',
    target: processId,
  }),
  send: async (moduleId, processId, message) => {
    if (!moduleId) {
      throw new Error('moduleId not set');
    }
    if (!processId) {
      throw new Error('processId not set');
    }
    if (window.warpAO.generatedSigner) {
      return sendUsingGeneratedWallet(moduleId, processId, message, window.warpAO.generatedSigner);
    } else {
      return sendUsingConnectedWallet(moduleId, processId, message);
    }
  },
};

async function sendUsingGeneratedWallet(moduleId, processId, message, signer) {
  const now = Date.now();
  const dataItem = createData('1234', signer, {
    tags: window.warpAO.messageTags(moduleId, processId, message),
    target: processId,
  });
  await dataItem.sign(signer);
  console.log(`Signing with raw ${Date.now() - now}ms`);
  return sendRawDataItem(dataItem.getRaw());
}

async function sendRawDataItem(rawData) {
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

async function sendUsingConnectedWallet(moduleId, processId, message) {
  const dataItem = window.warpAO.data(moduleId, processId, message);
  const now = Date.now();
  const signedDataItem = await window.arweaveWallet.signDataItem(dataItem);
  console.log(`Signing with ArConnect ${Date.now() - now}ms`);
  return sendRawDataItem(signedDataItem);
}
