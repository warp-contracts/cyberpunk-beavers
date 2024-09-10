import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

const { spawn, message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

async function doSpawn(fileName) {
  const CODE = fs.readFileSync(`./lua/bridge/${fileName}`, 'utf-8');
  const signer = createDataItemSigner(WALLET);

  console.info(`Spawning AOS ${fileName} Lua process`);
  const processId = '92LR-AJmDPuy6DhpgppvkXZ2C_4bWF9uGqajxeW9yRU';

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

    fs.writeFileSync(`./${fileName}_aos_${processId}.txt`, processId, 'utf-8');
  } catch (e) {
    console.error(e);
  }

  return processId;
}

doSpawn('cb-bridge-schedule-transfer.lua').then(() => console.log(`Finished`));
