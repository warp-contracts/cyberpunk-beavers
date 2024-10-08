import { readFileSync } from 'node:fs';
import { createDataItemSigner, message, result } from '@permaweb/aoconnect';
import { TOKEN_CONTRACT } from '../deploy/token-keeper.js';

/*
 * Step 2.
 *
 * Transfer tokens to the bridge if needed
 * */

const wallet = JSON.parse(readFileSync('../.secrets/general/jwk.json').toString());
const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';

const eu_trunk = 74;
const eu_tio = 462000000;
const eu_war = 126000000000;
const asia_trunk = 82;
const asia_tio = 510000000;
const asia_war = 151200000000;

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

// Transferring 156 trunk to 89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c
// Transferring 972000000 tio to 89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c
// Transferring 277200000000 war to 89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c
// Transfer message https://www.ao.link/#/message/ZnmMfzShJxlmHH9AIi-NZ2KewNL81HhCl4Kc8bndQ2U
// Transfer message https://www.ao.link/#/message/2Kf2PXa_ebKzLuUNo1w36orzoKsmpyMg1ppQ6iSDmrU
// Transfer message https://www.ao.link/#/message/Oxz0bxiwww3so179RO0lFcM-MPREyjRuRFX4NME2OHs
