import { readFileSync } from 'node:fs';
import ids from '../config/warp-ao-ids.js';
import { createData } from 'warp-arbundles';
import { ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { Tag } from 'warp-contracts';
import Const from '../common/const.mjs';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);

const envIdx = process.argv.indexOf('--env');
if (envIdx < 0) {
  throw new Error("Specify 'env' flash with either 'local' or 'prod' value");
}
const env = process.argv[envIdx + 1];

const muUrl = env === 'local' ? 'http://localhost:8080' : 'https://mu.warp.cc';

async function setNexProcessId() {
  const previousProcessId = ids[`previousProcessId_${env}`];
  const previousModuleId = ids[`previousModuleId_${env}`];
  const currentProcessId = ids[`processId_${env}`];
  const currentModuleId = ids[`moduleId_${env}`];
  const currentChatProcessId = ids[`chat_processId_${env}`];
  const currentChatModuleId = ids[`chat_moduleId_${env}`];

  const messageTags = [
    new Tag(
      'Action',
      JSON.stringify({
        cmd: Const.Command.setNextProcess,
        processId: currentProcessId,
        moduleId: currentModuleId,
        chatProcessId: currentChatProcessId,
        chatModuleId: currentChatModuleId,
      })
    ),
    new Tag('Data-Protocol', 'ao'),
    new Tag('Type', 'Message'),
    new Tag('Variant', 'ao.TN.1'),
    { name: 'SDK', value: 'ao' },
    new Tag('From-Process', previousProcessId),
    new Tag('From-Module', previousModuleId),
    new Tag('Salt', '' + Date.now()),
  ];

  const messageDataItem = createData(JSON.stringify('1234'), signer, {
    tags: messageTags,
    target: previousProcessId,
  });
  await messageDataItem.sign(signer);

  const messageResponse = await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: messageDataItem.getRaw(),
  }).then((res) => res.json());

  return messageResponse;
}

await setNexProcessId()
  .then((res) => console.log(`Next process set up.`, res))
  .catch(console.error);
