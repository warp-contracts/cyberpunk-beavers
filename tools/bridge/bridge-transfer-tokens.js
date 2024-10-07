import { readFileSync } from 'node:fs';
import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import { TOKEN_CONTRACT } from '../deploy-spawn-session-config.js';

/*
 * Step 2.
 *
 * Transfer tokens to the bridge if needed
 * */

const wallet = JSON.parse(readFileSync('../.secrets/general/jwk.json').toString());
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';

const eu_trunk = 54;
const eu_tio = 426000000;
const eu_war = 124200000000;
const asia_trunk = 70;
const asia_tio = 474000000;
const asia_war = 162000000000;

const trunk_total = eu_trunk + asia_trunk;
const tio_total = eu_tio + asia_tio;
const war_total = eu_war + asia_war;

async function main(token, total) {
  console.log(`Transferring ${total} ${token} to ${bridgeProcessId}`);
  return await message({
    process: `${TOKEN_CONTRACT[token].id}`,
    tags: [
      { name: 'Recipient', value: `${bridgeProcessId}` },
      { name: 'Action', value: 'Transfer' },
      { name: 'Quantity', value: `${total}` },
    ],
    signer: createDataItemSigner(wallet),
    data: 'any data',
  });
}

main('trunk', trunk_total)
  .then((messageId) => {
    console.log(`Transfer message`, `https://www.ao.link/#/message/${messageId}`);
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

main('tio', tio_total)
  .then((messageId) => {
    console.log(`Transfer message`, `https://www.ao.link/#/message/${messageId}`);
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

main('war', war_total)
  .then((messageId) => {
    console.log(`Transfer message`, `https://www.ao.link/#/message/${messageId}`);
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

// Transferring 124 trunk to 89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c
// Transferring 900000000 tio to 89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c
// Transferring 286200000000 war to 89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c
// Transfer message https://www.ao.link/#/message/G7lvKVNt3rlokaojG_kyAskSXlVpSsmP9UoUIiFrVhQ
// Transfer message https://www.ao.link/#/message/_dcilFb8Kj35Eq2ZFbxNsRAjmB7xj0UmZ-2apc5biFk
// Transfer message https://www.ao.link/#/message/boF72dONdHG1Ui6t1YZhd3h-lhMbZ_md1ifO0CfrXwo
