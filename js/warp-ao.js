import { Tag } from 'warp-contracts';
import { DataItem } from 'warp-arbundles';

window.warpAO = {
  config: {
    processId: "g5Kgi-Af5P_wnFXT9aafva46Z-m9vEv7D8GnZ9r8ibg",
    moduleId: "Q1Z5yM25WeNpAKZ8XyGhdJOQrm2LNgiMb3nul9cmAQA",
    muAddress: "http://localhost:3004"
  },
  messageTags: (message) => [
    new Tag('Action', JSON.stringify(message)),
    new Tag('Data-Protocol', 'ao'),
    new Tag('Type', 'Message'),
    new Tag('Variant', 'ao.TN.1'),
    {name: 'SDK', value: 'ao'},
    new Tag('From-Process', window.warpAO.config.processId),
    new Tag('From-Module', window.warpAO.config.moduleId),
    new Tag('Salt', '' + Date.now())
  ],
  send: async (message) => {
    window.arweaveWallet.signDataItem({
      tags: window.warpAO.messageTags(message),
      data: '1234',
      target: window.warpAO.config.processId,
    })
      .then((signed) => {
        const dataItem  = new DataItem(signed);
        const messageResponse = fetch(window.warpAO.config.muAddress, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            Accept: 'application/json'
          },
          body: dataItem.getRaw()
        }).then((res) => res.json().then((parsed) => {
          console.log(parsed);
        }));
      });
  }
}
