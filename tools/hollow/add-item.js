import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';
import { getHollowId } from './utils.js';

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('.secrets/general/jwk.json', 'utf-8'));
const hollowId = getHollowId();
async function addItem() {
  const signer = createDataItemSigner(WALLET);
  try {
    const r = await backOff(() =>
      message({
        process: hollowId,
        data: '1234',
        tags: [
          { name: 'Action', value: 'Add-Item' },
          { name: 'Item', value: 'ap' },
          { name: 'Quantity', value: '50' },
          { name: 'Price', value: '100' },
        ],
        signer,
      })
    );
    console.log(`Successfully sent 'Add-Item' action for process '${hollowId}'.`);
    console.log(`https://www.ao.link/#/message/${r}`);
  } catch (e) {
    console.error(e);
  }
}

addItem().then(() => console.log(`Message sent.`));
