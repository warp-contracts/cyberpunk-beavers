import { Tag } from 'warp-contracts';
import { DataItem } from 'warp-arbundles';

const urlParams = new URLSearchParams(window.location.search);
const env = urlParams.get('env') || 'dev';

console.log(`running in ${env} mode`);

window.warpAO = {
  config: {
    env,
    processId_prod:'MJkOKURs9mgjuaJ86sIshLsK40whkYImQm6uA0SELFQ',
    moduleId_prod: '97LVMZWbkumV17x9SmTSjWIlxjpmUDt1I_jjnF6Dvrg',
    processId_local: 'N8b2aPBXFhtZXbygq3wveXukUCTKKSFEu5qxB4CL-zU',
    moduleId_local: 'ZGU4Q6U_XBOVRxkTz7cxYKC7-iWdYg7TVHWihel7z9I',
    processId_dev: 'N8b2aPBXFhtZXbygq3wveXukUCTKKSFEu5qxB4CL-zU',
    moduleId_dev: 'ZGU4Q6U_XBOVRxkTz7cxYKC7-iWdYg7TVHWihel7z9I',
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
};
