import { WebSocket } from 'ws';
import { WarpFactory } from 'warp-contracts';
import Const from './src/game/common/const.mjs';
import { mockDataItem } from './tools/common.mjs';

const direction = Object.values(Const.Direction);
const characters = ['hacker_beaver', 'speedy_beaver', 'heavy_beaver'];

export default async function runNpc() {
  const ws = new WebSocket('ws://localhost:8097');
  ws.addEventListener('open', async () => {
    for (let i = 0; i < 29; i++) {
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
      }, i * 100);

      console.log(`NPC ${address} in the game.`);
    }
  });
}

runNpc().catch((e) => console.error(e));
