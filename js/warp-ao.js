import { Tag } from 'warp-contracts';
import { DataItem } from 'warp-arbundles';

window.warpAO = {
  config: {
    processId: 'np2KWujAtoof17XF6aDc7LmRem-h2ff5iQ-1evcv2_Q',
    moduleId: '_iQjNdnfsInsWVrW7brxTpsNbilzE6a1b1SFMqFQ_p4',
    muAddress: 'http://34.89.142.6:3004',
  },
  messageTags: (message) => [
    new Tag('Action', JSON.stringify(message)),
    new Tag('Data-Protocol', 'ao'),
    new Tag('Type', 'Message'),
    new Tag('Variant', 'ao.TN.1'),
    { name: 'SDK', value: 'ao' },
    new Tag('From-Process', window.warpAO.config.processId),
    new Tag('From-Module', window.warpAO.config.moduleId),
    new Tag('Salt', '' + Date.now()),
  ],
  data: (message) => ({
    tags: window.warpAO.messageTags(message),
    data: '1234',
    target: window.warpAO.config.processId,
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
        }))
      .then(async (res) => res.json()),
};
