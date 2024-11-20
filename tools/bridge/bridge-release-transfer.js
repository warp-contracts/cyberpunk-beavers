import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

/*
 * Step 3.
 *
 * Release transfers from bridge to users
 * */

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';
const euPendingHubId = 'Qgf-0stZcN_I5U0cG1uOtXBSf9YDSYMvjcVH_xtM994';
const asiaPendingHubId = 'HoW8vslmgHgo5slT_2dw4yJg4EWyp0GUV8UzOlmb1Tg';

async function checkPending() {
  const signer = createDataItemSigner(WALLET);

  return await message({
    process: bridgeProcessId,
    tags: [
      { name: 'Action', value: 'ReleasePending' },
      { name: 'HubProcessId', value: `${asiaPendingHubId}` },
      // { name: 'GameProcessId', value: 'UNA3jM3zUsOcneorFnE_j4huNsKU2ewkTXiF5X4N880' },
    ],
    signer,
  });
}

checkPending()
  .then((messageId) => {
    console.log(`Released message`, `https://www.ao.link/#/message/${messageId}`);
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

// EU:   Released message https://www.ao.link/#/message/4t5iOJOLkVCl9b1HwdfN9XVNBdNDaRVft78lhXGWJEo
// ASIA: Released message https://www.ao.link/#/message/wTKOozJWS4O89DZIPgEvHe_w0Xq4f_W7ZhCEmdOKwbM
