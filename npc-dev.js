import { WebSocket } from 'ws';
import Const from './js/common/const.mjs';
import { Tag, WarpFactory } from 'warp-contracts';
import ids from './js/config/warp-ao-ids.js';

const direction = Object.values(Const.Direction);
const characters = ['hacker_beaver', 'speedy_beaver', 'heavy_beaver'];

export default async function runNpc() {
  const ws = new WebSocket('ws://localhost:8097');
  const mockDataItem = (data, owner) => {
    const withTags = {
      tags: [
        new Tag('Action', JSON.stringify(data)),
        new Tag('Data-Protocol', 'ao'),
        new Tag('Type', 'Message'),
        new Tag('Variant', 'ao.TN.1'),
        { name: 'SDK', value: 'ao' },
        new Tag('From-Process', ids.processId_dev),
        new Tag('From-Module', ids.moduleId_dev),
        new Tag('Salt', '' + Date.now()),
      ],
      data: '1234',
      target: ids.processId_dev,
    };
    return {
      ...withTags,
      Owner: owner,
      Id: Math.random().toString(36).substring(2),
      Tags: withTags.tags,
      Timestamp: Date.now(),
    };
  };

  ws.addEventListener('open', async () => {
    for (let i = 0; i < 1; i++) {
      const warp = WarpFactory.forMainnet();
      const { address } = await warp.generateWallet();
      ws.send(
        JSON.stringify(
          mockDataItem(
            {
              cmd: Const.Command.register,
              beaverId: characters[Math.floor(Math.random() * characters.length)],
            },
            address
          )
        )
      );

      setTimeout(() => {
        // setInterval(() => {
        const randomDirection = Math.floor(Math.random() * direction.length);
        const di = mockDataItem({ cmd: 'move', dir: direction[randomDirection] }, address);
        ws.send(JSON.stringify(di));
        // }, 2000);
      }, i * 1000);

      console.log(`NPC ${address} in the game.`);
    }
  });
}

runNpc().catch((e) => console.error(e));
