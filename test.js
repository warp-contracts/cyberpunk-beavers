import { readFileSync } from 'node:fs';
import { createDataItemSigner, result, message } from '@permaweb/aoconnect';

const process = 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8';

const wallet = JSON.parse(readFileSync('.secrets/wallet.json').toString());

await message({
  process,
  tags: [
    { name: 'Action', value: 'Balances' },
    // { name: 'Recipient', value: 'mbc5UBNapq2bNjeoq_WDtrXiGpqf4iSUbX8VYDQqOe4' },
  ],
  signer: createDataItemSigner(wallet),
  data: 'any data',
})
  .then((id) =>
    result({
      message: id,
      process,
    })
  )
  .then(console.log)
  .catch(console.error);

// let res = await result({
//   // the arweave TXID of the message
//   message: 'mNSmmHEoZ0zE7zqLlJL5BxmiwfTu2bOlyIaoaDcYxjo',
//   // the arweave TXID of the process
//   process,
// });

// console.log(res, { depth: null });
