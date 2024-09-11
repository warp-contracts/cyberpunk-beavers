import { createDataItemSigner, message } from '@permaweb/aoconnect';
import fs from 'node:fs';

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
// const WALLET = JSON.parse(fs.readFileSync('.secrets/jnio.json', 'utf-8'));

async function checkPending() {
  const processId = '92LR-AJmDPuy6DhpgppvkXZ2C_4bWF9uGqajxeW9yRU';
  const signer = createDataItemSigner(WALLET);

  return await message({
    process: processId,
    tags: [
      { name: 'Action', value: 'ReleasePending' },
      { name: 'HubProcessId', value: 'eQ8RVUlTN43c5rs3qXRLCkPjRRvGdPVt5BPb3L8UQE4' },
      // { name: 'GameProcessId', value: 'UNA3jM3zUsOcneorFnE_j4huNsKU2ewkTXiF5X4N880' },
    ],
    signer,
  });
}

checkPending().then((r) => console.log(`Finished`, `https://www.ao.link/#/message/${r}`));