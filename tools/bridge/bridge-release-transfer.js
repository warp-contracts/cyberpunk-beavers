import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

/*
 * Step 3.
 *
 * Release transfers from bridge to users
 * */

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';
const euPendingHubId = 'SK0XsmT2VkWcScquFqNpNtrkblspJXFBsyvDmWPq834';
const asiaPendingHubId = 'qNeveS8RtTAMr2O1ay4kiuKVBMf8U4MslZbVEE_3Mg4';

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

// EU:   Released message https://www.ao.link/#/message/oB83Kg1MTSwaEzmOtjsl1RYYXD0ZmYJ9vYnL4dDy6GQ
// ASIA: Released message https://www.ao.link/#/message/Be0U-eG62osYnzA4UuZnwZ5ksB2LX6GeVXw5-ofXFxc
