import { Tag } from 'warp-contracts';
import { DataItem } from 'warp-arbundles';

window.warpAO = {
  config: {
    processId: 'kwb7QceAPTYbnL8Aiq5BcZJ_UOQxp00VxbPBcZRMGfc',
    moduleId: 'jJpoLiX6AqfQomyObbH2djvwpuNvZxLG3BqhWqTIl-Y',
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
  send: async (message) => {
    window.arweaveWallet.signDataItem(window.warpAO.data(message))
      .then((signed) => {
        const dataItem = new DataItem(signed);
        const messageResponse = fetch(window.warpAO.config.muAddress, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            Accept: 'application/json',
          },
          body: dataItem.getRaw(),
        }).then((res) =>
          res.json().then((parsed) => {
            console.log(parsed);
          })
        );
      });
  },
};
