import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';


const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

await message({
  /*
      The arweave TXID of the process, this will become the "target".
      This is the process the message is ultimately sent to.
    */
  process: `rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8`,
  // Tags that the process will use as input.
  tags: [
    { name: 'From-Process', value: 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8' }, // ;)
    // { name: 'Recipient', value:  },     // <<<-------------------------------------------- SET THE RECIPIENT
    { name: 'Action', value: 'Transfer' },
    { name: 'Quantity', value: '1000' },
    { name: 'Reward', value: 'Feedback' },
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
