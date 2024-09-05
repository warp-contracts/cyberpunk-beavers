import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

const wallet = JSON.parse(readFileSync('../.secrets/wallet.json').toString());

const result = await message({
  process: 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
  tags: [
    { name: 'From-Process', value: '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c' },
    { name: 'Recipient', value: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE' },
    { name: 'Action', value: 'Transfer' },
    { name: 'Quantity', value: '1200' },
  ],
  signer: createDataItemSigner(wallet),
  data: 'any data',
});

console.log(`Result`, result);
