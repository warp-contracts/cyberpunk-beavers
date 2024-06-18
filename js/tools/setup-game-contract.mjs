import { readFileSync } from 'node:fs';
import ids from '../config/warp-ao-ids.js';
import { createData } from 'warp-arbundles';
import { ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { Tag } from 'warp-contracts';


const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];


async function setupGameContract() {
  const processId = ids[`processId_${env}`];
  const moduleId = ids[`moduleId_${env}`];
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Message'),
    new Tag('From-Process', processId),
    new Tag('From-Module', moduleId),
    new Tag('Action', JSON.stringify({cmd: 'setup', type: 'nextHalfHour'})),
    new Tag('SDK', 'ao'),
    new Tag('Name', 'setup'),
  ];

  const data = JSON.stringify('1234');
  const processDataItem = createData(data, signer, { tags: processTags, target: processId });
  await processDataItem.sign(signer);

  const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

  const processResponse = await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: processDataItem.getRaw(),
  }).then((res) => res.json());
  console.log(processResponse);
}

await setupGameContract()
  .then(console.log)
  .catch(console.error);
