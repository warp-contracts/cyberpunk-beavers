import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import ids from '../config/warp-ao-ids.js';

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];
const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

await message({
  /*
      The arweave TXID of the process, this will become the "target".
      This is the process the message is ultimately sent to.
    */
  process: ids[`token_processId_${env}`],
  // Tags that the process will use as input.
  tags: [
    { name: 'From-Process', value: ids[`token_processId_${env}`] }, // ;)
    { name: 'Recipient', value: ids[`processId_${env}`] }, // game contract
    { name: 'Action', value: 'Transfer' },
    { name: 'Quantity', value: '1000000' },
  ],
  // A signer function used to build the message "signature"
  signer: createDataItemSigner(wallet),
  /*
      The "data" portion of the message
      If not specified a random string will be generated
    */
  data: 'any data',
})
  .then((s) => console.log(`Token transfer id: ${s}`))
  .catch(console.error);
