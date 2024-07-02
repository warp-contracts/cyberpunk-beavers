import Const from './js/common/const.mjs';
import { Tag, WarpFactory } from 'warp-contracts';
import ids from './js/config/warp-ao-ids.js';
import { ArweaveSigner, createData } from 'warp-arbundles/build/node/esm/index.js';

const direction = Object.values(Const.Direction);
const characters = ['hacker_beaver', 'speedy_beaver', 'heavy_beaver'];

export default async function runNpc() {
  for (let i = 0; i < 15; i++) {
    const warp = WarpFactory.forMainnet();
    const { address, jwk } = await warp.generateWallet();
    const signer = new ArweaveSigner(jwk);

    await sendDataItem(
      {
        cmd: Const.Command.register,
        walletAddress: address,
        beaverId: characters[Math.floor(Math.random() * characters.length)],
      },
      signer
    );

    setTimeout(() => {
      setInterval(async () => {
        const randomDirection = Math.floor(Math.random() * direction.length);
        await sendDataItem({ cmd: 'move', dir: direction[randomDirection] }, signer);
      }, 1000);
    }, i * 1000);

    console.log(`NPC ${address} in the game.`);
  }
}

const sendDataItem = async (message, signer) => {
  const { data, target, tags } = createMessageWithTags(message, ids.processId_prod, ids.moduleId_prod);
  const dataItem = createData(data, signer, {
    tags,
    target,
  });
  await dataItem.sign(signer);

  const messageResponse = await fetch('https://mu.warp.cc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json',
    },
    body: dataItem.getRaw(),
  }).then((res) => res.json());

  return messageResponse;
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
