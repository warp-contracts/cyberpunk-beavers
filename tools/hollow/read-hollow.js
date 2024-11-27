import { dryrun } from '@permaweb/aoconnect';
import { getHollowId } from './utils.js';

const hollowId = getHollowId();

async function readHollow() {
  const readRes = await dryrun({
    process: hollowId,
    tags: [{ name: 'Action', value: 'Read-Hollow' }],
    data: '1234',
  });
  const res = JSON.parse(readRes.Messages[0].Data);
  console.log(res);
}

readHollow().then(() => console.log(`THE END`));
