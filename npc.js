import { Tag, WarpFactory } from 'warp-contracts';
import { ArweaveSigner, createData } from 'warp-arbundles/build/node/esm/index.js';
import Const from './src/game/common/const.mjs';
import ids from './src/game/config/warp-ao-ids.js';

const direction = Object.values(Const.Direction);
const characters = ['hacker_beaver', 'speedy_beaver', 'heavy_beaver'];

async function fetchAvailableGames() {
  let hubState = await (await fetch(`http://localhost:8090/current-state/${ids.hub_processId_local}`)).json();
  return Object.fromEntries(
    Object.entries(hubState.result.Output.games).filter(
      ([_, game]) => Date.now() >= game.playWindow.begin && Date.now() < game.playWindow.end
    )
  ); // filter only currently active games
}

async function runNpc(processes) {
  console.log(`Processes`, Object.keys(processes));
  for (let i = 0; i < 19; i++) {
    const warp = WarpFactory.forMainnet();
    const { address, jwk } = await warp.generateWallet();
    const signer = new ArweaveSigner(jwk);

    for (const [processId, game] of Object.entries(processes)) {
      const {
        module: moduleId,
        playWindow: { end },
      } = game;
      await registerNpc(signer, address, moduleId, processId);

      (function loop() {
        setTimeout(async () => {
          await randomMove(signer, moduleId, processId);

          if (Date.now() < end) {
            loop();
          } else {
            console.log(`Game ${processId} finished. Player ${address} steps down.`);
          }
        }, 2000);
      })();
    }
  }
}

async function registerNpc(signer, address, moduleId, processId) {
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
}

async function randomMove(signer, moduleId, processId) {
  const randomDirection = Math.floor(Math.random() * direction.length);
  try {
    await sendDataItem({ cmd: 'move', dir: direction[randomDirection] }, signer, moduleId, processId);
  } catch (err) {
    console.error(err);
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

await fetchAvailableGames()
  .then(runNpc)
  .catch((e) => console.error(e));
