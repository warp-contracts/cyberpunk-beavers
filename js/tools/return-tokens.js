import { readFileSync } from 'node:fs';
import { createDataItemSigner, message, dryrun } from '@permaweb/aoconnect';
import ids from '../config/warp-ao-ids.js';

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];
const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

await dryrun({
  process: ids[`token_processId_${env}`],
  tags: [
    { name: 'Action', value: 'Balance' },
    { name: 'Target', value: ids[`previousProcessId_${env}`] },
  ],
  signer: createDataItemSigner(wallet),
  data: '1234',
})
  .then((balance) =>
    message({
      process: ids[`token_processId_${env}`],
      tags: [
        { name: 'From-Process', value: ids[`previousProcessId_${env}`] },
        { name: 'Recipient', value: ids[`token_processId_${env}`] },
        { name: 'Action', value: 'Transfer' },
        { name: 'Quantity', value: balance.Messages[0].Tags.find((t) => t.name === 'Balance').value },
      ],
      signer: createDataItemSigner(wallet),
      data: 'any data',
    })
  )
  .then((s) => console.log(`Token return transfer id: ${s}`))
  .catch(console.error);
