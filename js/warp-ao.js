import { Tag } from 'warp-contracts';
import { DataItem } from 'warp-arbundles';
import ids from './warp-ao-ids.js';

const urlParams = new URLSearchParams(window.location.search);
const env = urlParams.get('env') || 'dev';

console.log(`running in ${env} mode`);

window.warpAO = {
  config: {
    ...ids,
    env,
    muAddress: env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc',
    cuAddress: env === 'local' ? 'http://localhost:8090' : 'https://cu.warp.cc',
  },
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
  send: async (message) =>
    await window.arweaveWallet
      .signDataItem(window.warpAO.data(message))
      .then(async (signed) =>
        fetch(window.warpAO.config.muAddress, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            Accept: 'application/json',
          },
          body: new DataItem(signed).getRaw(),
        })
      )
      .then(async (res) => res.json()),
  npc: env == 'dev' ? true : false,
};
