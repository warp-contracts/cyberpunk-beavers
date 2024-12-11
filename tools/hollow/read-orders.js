import { dryrun } from '@permaweb/aoconnect';
import { getHollowId } from './utils.js';

const hollowId = getHollowId();

async function readOrders() {
  const readRes = await dryrun({
    process: hollowId,
    tags: [
      { name: 'Action', value: 'Read-Orders' },
      { name: 'Wallet-Address', value: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE' },
    ],
    data: '1234',
  });
  const res = JSON.parse(readRes.Messages[0].Data);
  console.log(res);
}

readOrders().then(() => console.log(`THE END`));