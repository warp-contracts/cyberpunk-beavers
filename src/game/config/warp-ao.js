import { Tag } from 'warp-contracts';
import { createData } from 'warp-arbundles';
import ids from './warp-ao-ids.js';
import { getUrlParam } from '../utils/utils.js';
import Const from '../common/const.mjs';

const env = getUrlParam('env') || 'prod';
const mode = getUrlParam('mode') || import.meta.env.VITE_GAME_MODE || 'ao';

console.log(`running in ${env} mode`);

window.warpAO = {
  config: {
    ...ids,
    env,
    mode,
    aoMode: mode == Const.GAME_MODES.ao.type,
    muAddress: env === 'local' ? 'http://34.118.3.184:8080' : 'https://mu.warp.cc',
    cuAddress: env === 'local' ? 'http://34.118.3.184:8090' : 'https://cu.warp.cc',
    reload: true,
  },
  spectatorMode: false,
  generatedSigner: null,
  signingMode: null, // generated | arconnect
  nonce: -1,
  gameHubProcessId: () => {
    return window.warpAO.config[`hub_processId_${env}`];
  },
  gameHubModuleId: () => {
    return window.warpAO.config[`hub_moduleId_${env}`];
  },
  processId: () => {
    return window.warpAO.config[`processId_${env}`];
  },
  moduleId: () => {
    return window.warpAO.config[`moduleId_${env}`];
  },
  tokenProcessId: () => {
    return window.warpAO.config[`token_processId_${env}`];
  },
  leaderboardProcessId: () => {
    return window.warpAO.config[`leaderboard_processId_${env}`];
  },
  messageTags: (moduleId, processId, message) => [
    new Tag('Action', JSON.stringify(message)),
    new Tag('Data-Protocol', 'ao'),
    new Tag('Type', 'Message'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag(
      'Lag',
      `${JSON.stringify({
        total: window.warpAO?.lag?.total,
        cuCalc: window.warpAO?.lag?.cuCalc,
      })}`
    ),
    { name: 'SDK', value: 'ao' },
    new Tag('From-Module', moduleId),
    new Tag('From-Process', processId),
    new Tag('Sent', '' + performance.now()),
  ],
  data: (moduleId, processId, message) => ({
    tags: window.warpAO.messageTags(moduleId, processId, message),
    data: '1234',
    target: processId,
  }),
  send: async (moduleId, processId, message, useConnectedWallet) => {
    if (!moduleId) {
      throw new Error('moduleId not set');
    }
    if (!processId) {
      throw new Error('processId not set');
    }

    if (
      window.warpAO.signingMode == 'generated' ||
      window.warpAO.signingMode == 'metamask' ||
      (window.warpAO.signingMode == 'arconnect' && !useConnectedWallet)
    ) {
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
  sendRawDataItem(dataItem.getRaw()).catch(console.error);
  //return id immediately to lock on this id before message has been effectively sent
  return { id: await dataItem.id };
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
    return null;
  }
}

async function sendUsingConnectedWallet(moduleId, processId, message) {
  const dataItem = window.warpAO.data(moduleId, processId, message);
  const now = performance.now();
  const signedDataItem = await window.arweaveWallet.signDataItem(dataItem);
  console.log(`Signing with ArConnect ${Math.floor(performance.now() - now)}ms`);
  return sendRawDataItem(signedDataItem);
}
