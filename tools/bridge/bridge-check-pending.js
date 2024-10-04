import { createDataItemSigner, dryrun, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { GameTreasure } from '../../src/game/common/const.mjs';
import { TOKEN_CONTRACT } from '../deploy/token-keeper.js';

/*
 * Step 1.
 *
 * Checks pending hub transfers and checks jmGG balance.
 * Doesn't do anything.
 * */

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';

const euPendingHubId = 'KmUEL2p52o3f-UAr9LBfZ1Oho8dldYD0Fdk7kPz4CBs';
const asiaPendingHubId = 'vIxC06nes2V6ioWgED7vC9pqNUYLWYrEhvY2nre0Cq4';

async function checkPending() {
  const signer = createDataItemSigner(WALLET);

  return await message({
    process: bridgeProcessId,
    tags: [
      { name: 'Action', value: 'PendingTransfers' },
      // { name: 'HubProcessId', value: 'eQ8RVUlTN43c5rs3qXRLCkPjRRvGdPVt5BPb3L8UQE4' },
    ],
    signer,
  });
}

function sumPending(pending, tokenType) {
  return Object.values(pending)
    .map((v) => Object.values(v[tokenType]))
    .flat(1)
    .map(Number)
    .reduce((a, b) => a + b, 0);
}

function logPendingTotal(info, total) {
  if (total > 0) {
    console.log(`${info} pending total`, total);
  }
}

function sumAndLogPending(prefix, pending) {
  const trunkTotal = sumPending(pending, GameTreasure.trunk.type);
  logPendingTotal(`${prefix} trunk`, trunkTotal);
  const tioTotal = sumPending(pending, GameTreasure.tio.type);
  logPendingTotal(`${prefix} tio`, tioTotal);
  const warTotal = sumPending(pending, GameTreasure.war.type);
  logPendingTotal(`${prefix} war`, warTotal);
}

async function checkBalance(wallet, tokenType) {
  console.log(`Checking ${TOKEN_CONTRACT[tokenType].id}`);
  const result = await dryrun({
    process: `${TOKEN_CONTRACT[tokenType].id}`,
    data: '',
    tags: [
      { name: 'Action', value: 'Balance' },
      { name: 'Target', value: `${wallet}` },
    ],
  });

  // console.log(result);
  console.log(`Wallet ${wallet} got ${tokenType} `, result.Messages[0].Data);
}

checkPending()
  .then((messageId) => {
    console.log(`Finished`, `https://www.ao.link/#/message/${messageId}`);
    return messageId;
  })
  .then(async (messageId) => {
    return await result({
      // the arweave TXID of the message
      message: messageId,
      // the arweave TXID of the process
      process: bridgeProcessId,
    });
  })
  .then((result) => {
    // console.log(`Result of the pending check `, result);
    if (result.Messages.length) {
      const pending = JSON.parse(result.Messages[0].Data);
      console.log(`Number of pending hubs`, Object.keys(pending).length);
      const euPending = pending[euPendingHubId];
      console.log(`EU pending transfers`, euPending);
      const asiaPending = pending[asiaPendingHubId];
      console.log(`Asia pending transfers`, asiaPending);

      sumAndLogPending('EU', euPending);
      sumAndLogPending('ASIA', asiaPending);
    } else {
      console.log(`Messages are empty`);
    }
  })
  .then(async () => {
    await checkBalance(bridgeProcessId, 'tio');
    await checkBalance(bridgeProcessId, 'war');
    // await checkBalance(bridgeProcessId, 'trunk');
  })
  .then(() => console.log(`THE END`));
