import { readFileSync } from 'node:fs';
import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import { TOKEN_CONTRACT } from '../deploy-spawn-session-config.js';

/*
 * Step 2.
 *
 * Transfer tokens to the bridge if needed
 * */

const wallet = JSON.parse(readFileSync('../.secrets/general/jwk.json').toString());
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';

const euTotal = 1335000000;
const asiaTotal = 780000000;
const total = euTotal + asiaTotal;

async function main(token) {
  console.log(`Transferring ${total} ${token} to ${bridgeProcessId}`);
  return await message({
    process: `${TOKEN_CONTRACT[token].id}`,
    tags: [
      { name: 'Recipient', value: `${bridgeProcessId}` },
      { name: 'Action', value: 'Transfer' },
      { name: 'Quantity', value: `${total}` },
    ],
    signer: createDataItemSigner(wallet),
    data: 'any data',
  });
}

main('tio')
  .then((messageId) => {
    console.log(`Transfer message`, `https://www.ao.link/#/message/${messageId}`);
    return messageId;
  })
  .then(async (messageId) => {
    const rr = await result({
      // the arweave TXID of the message
      message: messageId,
      // the arweave TXID of the process
      process: bridgeProcessId,
    });
    console.log(rr);
  })
  .then(() => console.log(`THE END`));
