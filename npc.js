import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, createData } from 'warp-arbundles/build/node/esm/index.js';
import Const from './src/game/common/const.mjs';

const direction = Object.values(Const.Direction);
const characters = ['hacker_beaver', 'speedy_beaver', 'heavy_beaver'];
const moduleId = 'iZWVADl_rjTu2FQA7jN6zyQYWa3dUbvxztNnCL2gWKM';
const processIds = [
  '-H8l8nmg1bwKCG5Cnz_vGLgGhRqahecqYfPPa7M7qQ0',
  /*'oKolyRBKWf5Y8rdlXh9rd8F4R7Nk0HMnmxS5-WMZ_KM'*/
];

async function runNpc() {
  for (let i = 0; i < 5; i++) {
    const warp = WarpFactory.forMainnet();
    const { address, jwk } = await warp.generateWallet();
    const signer = new ArweaveSigner(jwk);

    for (const processId of processIds) {
      await sendDataItem(
        {
          cmd: Const.Command.register,
          walletAddress: address,
          beaverId: characters[Math.floor(Math.random() * characters.length)],
        },
        signer,
        moduleId,
        processId
      );
      console.log(`NPC ${address} in the game ${processId}.`);
      setInterval(async () => {
        const randomDirection = Math.floor(Math.random() * direction.length);
        try {
          await sendDataItem({ cmd: 'dig', dir: direction[randomDirection] }, signer, moduleId, processId);
        } catch (err) {
          console.error(err);
        }
      }, 100);
    }
  }
}

const sendDataItem = async (message, signer, moduleId, processId) => {
  const { data, target, tags } = createMessageWithTags(message, processId, moduleId);
  const dataItem = createData(data, signer, {
    tags,
    target,
  });
  await dataItem.sign(signer);

  const response = await fetch('http://localhost:8080', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: dataItem.getRaw(),
  });
  return await response.json();
};

const createMessageWithTags = (message, processId, moduleId) => {
  return {
    tags: [
      new Tag('Action', JSON.stringify(message)),
      new Tag('Data-Protocol', 'ao'),
      new Tag('Type', 'Message'),
      new Tag('Variant', 'ao.TN.1'),
      { name: 'SDK', value: 'ao' },
      new Tag('From-Process', processId),
      new Tag('From-Module', moduleId),
      new Tag('Sent', '' + performance.now()),
    ],
    data: '1234',
    target: processId,
  };
};

await runNpc().catch((e) => console.error(e));
