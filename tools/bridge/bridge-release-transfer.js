import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

/*
 * Step 3.
 *
 * Release transfers from bridge to users
 * */

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';
const euPendingHubId = 'ogIStZPyMFOkiMg1np4L_0ZAaCQZu9lckI8mZwOhnBg';
const asiaPendingHubId = 'gBSogAQl7Iolf5w8cUwN_3R_gMuj_KMCHMXuBt9RQr4';

async function checkPending() {
  const signer = createDataItemSigner(WALLET);

  return await message({
    process: bridgeProcessId,
    tags: [
      { name: 'Action', value: 'ReleasePending' },
      { name: 'HubProcessId', value: `${euPendingHubId}` },
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

// EU:   Released message https://www.ao.link/#/message/yB6caclPDIqxfzxPEprUKJnt9oIHAC_CIRLe8I39_wk
// ASIA: Released message https://www.ao.link/#/message/qVVcWPETws5ezG92wq5M-p6Gkpwodh9Ecb6EPWUyxnw
