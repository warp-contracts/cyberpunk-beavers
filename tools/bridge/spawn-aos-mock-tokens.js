import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

const AOS_MODULE_2_0_0_RC_1_1_NO_SQLITE = 'zx6_08gJzKNXxLCplINj6TPv9-ElRgeRqr9F6riRBK8';
const AO_TESTNET_SU = '_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA';

const { spawn, message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));
const CODE = fs.readFileSync(`./lua/mock-token.lua`, 'utf-8');

async function spawnToken(tokenName) {
  const signer = createDataItemSigner(WALLET);

  console.info(`Spawning AOS ${tokenName} Lua process`);
  const processId = await spawn({
    module: AOS_MODULE_2_0_0_RC_1_1_NO_SQLITE,
    scheduler: AO_TESTNET_SU,
    signer,
    data: '1984',
  });

  console.log(`Successfully spawned token process ${tokenName} '${processId}'.`);
  console.log(`https://www.ao.link/#/entity/${processId}`);

  try {
    const r = await backOff(() =>
      message({
        process: processId,
        data: CODE,
        tags: [{ name: 'Action', value: 'Eval' }],
        signer,
      })
    );
    console.log(`Successfully sent 'eval' action for process '${processId}'.`);
    console.log(`https://www.ao.link/#/message/${r}`);

    fs.writeFileSync(`./${tokenName}_aos_processId.txt`, processId, 'utf-8');
  } catch (e) {
    console.error(e);
  }

  try {
    const id = await backOff(() =>
      message({
        process: processId,
        data: `Name = "${tokenName}"`,
        tags: [{ name: 'Action', value: 'Eval' }],
        signer,
      })
    );
    console.log(`Successfully sent 'eval' for process '${processId}'.`);
    console.log(`https://www.ao.link/#/message/${id}`);
  } catch (e) {
    console.error(e);
  }

  return processId;
}

spawnToken('MockTi').then(console.log).catch(console.error);

spawnToken('MockTr').then(console.log).catch(console.error);

spawnToken('MockWa').then(console.log).catch(console.error);
