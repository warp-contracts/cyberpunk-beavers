import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

/*
 * Step 3.
 *
 * Release transfers from bridge to users
 * */

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';
const euPendingHubId = 'a6-5oLFyaeNTFxioc6bEvtpgCnt4ZDwgCCECo7bF3XY';
const asiaPendingHubId = '0NHveDmVa_CVx1oDCOYUtM0qiJAGLRh9PI8UZjh2f8Y';

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

// EU:   Released message https://www.ao.link/#/message/yB6caclPDIqxfzxPEprUKJnt9oIHAC_CIRLe8I39_wk
// ASIA: Released message https://www.ao.link/#/message/qVVcWPETws5ezG92wq5M-p6Gkpwodh9Ecb6EPWUyxnw
