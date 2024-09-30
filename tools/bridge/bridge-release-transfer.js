import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

/*
 * Step 3.
 *
 * Release transfers from bridge to users
 * */

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';
const euPendingHubId = 'W6_qKGzHs9u4-EBURokBPeBt2vzvsPbGOJhfV5kuRC4'; // https://www.ao.link/#/message/xGmqLTna_AY9TYLTbz09nVhjCvSxhpGgpFtSbsXxmBM
const asiaPendingHubId = 'B92hrXTVcqgpQSj6fdkdfbLO9cTxd1rPWJkyAjXy4O4'; // https://www.ao.link/#/message/CPN101UbCBA9j0GwSv1ls4gAOt40w_EfxBGz7ALyesg

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
