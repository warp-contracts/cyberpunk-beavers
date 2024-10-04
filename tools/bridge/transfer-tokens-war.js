import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

const wallet = JSON.parse(readFileSync('../.secrets/general/jwk.json').toString());

const result = await message({
  process: '2_O3UNKze6Yuy1oaNzRAGQjqbXJyd8AprlR90QFDp98',
  tags: [
    { name: 'From-Process', value: '2_O3UNKze6Yuy1oaNzRAGQjqbXJyd8AprlR90QFDp98' },
    { name: 'Recipient', value: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE' },
    { name: 'Action', value: 'Transfer' },
    { name: 'Quantity', value: `${900_000_000_000_000}` },
  ],
  signer: createDataItemSigner(wallet),
  data: 'any data',
});

console.log(`Result`, result);
