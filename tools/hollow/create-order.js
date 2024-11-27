import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';
import { getHollowId } from './utils.js';

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('.secrets/general/jwk.json', 'utf-8'));
const hollowId = getHollowId();
const tokenId = 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8';

async function createOrder() {
  const signer = createDataItemSigner(WALLET);
  try {
    const transferId = await backOff(() =>
      message({
        process: tokenId,
        data: '1234',
        tags: [
          { name: 'Action', value: 'Transfer' },
          { name: 'Quantity', value: '100' },
          { name: 'Recipient', value: hollowId },
          { name: 'X-Order-Action', value: 'Create-Order' },
          { name: 'X-Item-Quantity', value: '1' },
          { name: 'X-Item', value: 'ap' },
        ],
        signer,
      })
    );
    console.log(`Successfully sent 'Transfer' action for process '${tokenId}'.`);
    console.log(`https://www.ao.link/#/message/${transferId}`);
  } catch (e) {
    console.error(e);
  }
}

createOrder().then(() => console.log(`Order created.`));
