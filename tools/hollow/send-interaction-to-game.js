import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { createData } from 'warp-arbundles';
import { Tag } from 'warp-contracts';
import { ArweaveSigner } from 'warp-contracts-plugin-deploy';

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('.secrets/general/jwk.json', 'utf-8'));
const signer = new ArweaveSigner(WALLET);

async function createOrder() {
  try {
    const processTags = [
      new Tag('Data-Protocol', 'ao'),
      new Tag('Variant', 'ao.TN.1'),
      new Tag('Type', 'Message'),
      new Tag('From-Process', '8rIkbRxf64wSTpm5zJ91d4qneJZ4cdBzqGXXuDkClV0'),
      new Tag('From-Module', 'xvI2Mak44Wf_OtNJFh11ZUopPXVqxg-g6A075nMcdTw'),
      new Tag('Action', JSON.stringify({ cmd: 'pick' })),
      new Tag('SDK', 'ao'),
      new Tag('Name', 'pick'),
    ];

    const data = JSON.stringify('{}');
    const processDataItem = createData(data, signer, {
      tags: processTags,
      target: '8rIkbRxf64wSTpm5zJ91d4qneJZ4cdBzqGXXuDkClV0',
    });
    await processDataItem.sign(signer);

    const test = await fetch('http://localhost:8081', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        Accept: 'application/json',
      },
      body: processDataItem.getRaw(),
    }).then((res) => res.json());
    console.log(test);
  } catch (e) {
    console.error(e);
  }
}

createOrder().then(() => console.log(`Order created.`));
