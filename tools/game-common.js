import { Tag } from 'warp-contracts';
import { ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { createData } from 'warp-arbundles';
import { readFileSync } from 'fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);

const maps = [
  /*'qtcpzuuGoVKVQGMuq_PMaRHEL071Ja1SV8dvC-gur2Q', // - 'default' map
  'AeSkeoKPIpM71iapW6Onv4681CAXOU9DEr2XcgDZPI0', // - ao 'tutorial' map
  'IOcu1uK7ViJc9OOA2PeUbAh1hAUlibeqOYbV2fmMZ6U', // Greg map 1
  '0ZhvZfjkwDOOfG1ns-afJNHVYysaMsshYdMfIeUb_hM', // Greg map 2*/
  '--YBDNmBAIuT-XstUI795v1DUDdpd8iNZKnYD3Esxzs', // map v2 1
];

const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function readMapFromArweave() {
  const mapTxId = maps[randomIntegerInRange(0, maps.length - 1)];
  console.log(`Loading map ${mapTxId}`);
  const response = await fetch(`https://arweave.net/${mapTxId}`);
  if (response.ok) {
    return { mapTxId, mapJson: await response.json() };
  }
  throw new Error('could not load map tx from Arweave');
}

export async function spawnGame({ muUrl, moduleId, additionalTags = [], treasures = null }) {
  const { mapTxId, mapJson } = await readMapFromArweave();
  console.log(`got me some map`, mapTxId, mapJson.type, mapJson.height);

  console.log(`Spawning Game`);
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Module', moduleId),
    new Tag('Name', 'spawn game'),
    new Tag('Scheduler', 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M'),
    new Tag('SDK', 'ao'),
    new Tag('Content-Type', 'text/plain'),
    new Tag('Map-From-Tx', mapTxId),
  ];

  for (const tag of additionalTags) {
    processTags.push(new Tag(tag.name, tag.value));
  }

  const data = JSON.stringify({ rawMap: mapJson, mapApi: 'v1', gameTreasuresRarity: treasures, mapTxId });
  const processDataItem = createData(data, signer, { tags: processTags });
  await processDataItem.sign(signer);
  const processResponse = await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: processDataItem.getRaw(),
  }).then((res) => res.json());

  return processResponse.id;
}

export async function transferToken(tokenProcessId, gameProcessId) {
  return message({
    process: tokenProcessId,
    tags: [
      { name: 'From-Process', value: tokenProcessId }, // ;)
      { name: 'Recipient', value: gameProcessId }, // game contract
      { name: 'Action', value: 'Transfer' },
      { name: 'Quantity', value: '1000000' },
    ],
    signer: createDataItemSigner(jwk),
    data: 'any data',
  });
}

export async function setupGameContract(signer, moduleId, processId, config, muUrl) {
  // console.log(moduleId, processId, config, env)
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Message'),
    new Tag('From-Process', processId),
    new Tag('From-Module', moduleId),
    new Tag('Action', JSON.stringify(config)),
    new Tag('SDK', 'ao'),
    new Tag('Name', 'setup'),
  ];

  const data = JSON.stringify('{}');
  const processDataItem = createData(data, signer, { tags: processTags, target: processId });
  await processDataItem.sign(signer);

  return await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: processDataItem.getRaw(),
  }).then((res) => res.json());
}
