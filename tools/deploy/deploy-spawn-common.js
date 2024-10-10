import { readFileSync } from 'fs';
import { Tag } from 'warp-contracts';
import { createData } from 'warp-arbundles';
import { ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { maps } from '../../src/game/common/const.mjs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

const jwk = JSON.parse(readFileSync('./.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);

export async function deployModule(processName) {
  const module = readFileSync(`./dist/output-${processName}.js`, 'utf-8');
  const moduleTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Module'),
    new Tag('Module-Format', 'wasm32-unknown-emscripten'),
    new Tag('Input-Encoding', 'JSON-1'),
    new Tag('Output-Encoding', 'JSON-1'),
    new Tag('Memory-Limit', '500-mb'),
    new Tag('Compute-Limit', '9000000000000'),
    new Tag('Salt', '' + Date.now()),
  ];
  const moduleDataItem = createData(module, signer, { tags: moduleTags });
  await moduleDataItem.sign(signer);
  const moduleResponse = await fetch('https://up.arweave.net/tx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: moduleDataItem.getRaw(),
  }).then((res) => res.json());

  console.log(`-- Deployed ${processName} module with id ${moduleResponse.id}`);
  return moduleResponse.id;
}

export async function spawnProcess({ muUrl, processName, moduleId }) {
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Process'),
    new Tag('Name', `spawn ${processName}`),
    new Tag('Module', moduleId),
    new Tag('Scheduler', 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M'),
    new Tag('SDK', 'ao'),
    new Tag('Content-Type', 'text/plain'),
  ];

  const processDataItem = createData('{}', signer, { tags: processTags });
  await processDataItem.sign(signer);

  const processResponse = await fetch(muUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: processDataItem.getRaw(),
  }).then((res) => res.json());
  console.log(`-- Spawned ${processName} with id ${processResponse.id}`);
  return processResponse.id;
}

const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function randomMapTxId() {
  return maps[randomIntegerInRange(0, maps.length - 1)];
}

export async function readMapFromArweave(mapTxId) {
  if (!mapTxId) mapTxId = randomMapTxId();
  console.log(`Loading map ${mapTxId}`);
  const response = await fetch(`https://arweave.net/${mapTxId}`);
  if (response.ok) {
    return { mapTxId, mapJson: await response.json() };
  }
  throw new Error('could not load map tx from Arweave');
}

export async function spawnGame({ muUrl, moduleId, additionalTags = [], gameTokens = null, requestedMapTxId = null }) {
  const { mapTxId, mapJson } = await readMapFromArweave(requestedMapTxId);
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

  const data = JSON.stringify({ rawMap: mapJson, gameTokens, mapTxId });
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

export async function transferToken(tokenProcessId, gameProcessId, fromProcess, qty = 1000000) {
  const tags = [
    { name: 'Recipient', value: gameProcessId }, // game contract
    { name: 'Action', value: 'Transfer' },
    { name: 'Quantity', value: `${qty}` },
  ];
  if (fromProcess) {
    tags.push({ name: 'From-Process', value: fromProcess });
  }

  return message({
    process: tokenProcessId,
    tags,
    signer: createDataItemSigner(jwk),
    data: 'any data',
  });
}

export async function sendAction(moduleId, processId, action, muUrl) {
  const processTags = [
    new Tag('Data-Protocol', 'ao'),
    new Tag('Variant', 'ao.TN.1'),
    new Tag('Type', 'Message'),
    new Tag('From-Process', processId),
    new Tag('From-Module', moduleId),
    new Tag('Action', JSON.stringify(action)),
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

/**
 * Registers newly created game in the ao testnet bridge process
 * in order to forward game token transfer to ao testnet tokens.
 * This will succeed only if the owner of the bridge is the same as the message.
 */
export async function registerGameInBridge(gameProcessId, bridgeProcessId) {
  console.log(`Registering ${gameProcessId}`);
  return message({
    process: bridgeProcessId,
    tags: [
      { name: 'Recipient', value: gameProcessId }, // game contract
      { name: 'Action', value: 'Deployed' },
      { name: 'Process', value: `${gameProcessId}` },
    ],
    signer: createDataItemSigner(jwk),
    data: 'any data',
  });
}
