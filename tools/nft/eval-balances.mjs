import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';

const { message } = connect();
const WALLET = JSON.parse(fs.readFileSync('./nft/jwk.json', 'utf-8'));
const TOKEN_PROCESS = 'WL6YQ4POtP7xQxP3QCylYcxzYzlkwCctK4_6L_w53zo';

async function doIt() {
  const signer = createDataItemSigner(WALLET);

  console.log(`Changing balances for nft ${TOKEN_PROCESS}`);

  const id = await message({
    process: TOKEN_PROCESS,
    data: `Balances['hqdL4AZaFZ0huQHbAsYxdTwG6vpibK7ALWKNzmWaD4Q'] = '11'`,
    tags: [{ name: 'Action', value: 'Eval' }],
    signer,
  });

  console.log(`Successfully sent 'eval' action for process '${TOKEN_PROCESS}'.`);
  console.log(`https://www.ao.link/#/message/${id}`);

  return id;
}

doIt().then(console.log).catch(console.error);
