import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

const AOS_MODULE_2_0_0_RC_1_1_NO_SQLITE = 'zx6_08gJzKNXxLCplINj6TPv9-ElRgeRqr9F6riRBK8';
const AO_TESTNET_SU = '_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA';

const { spawn, message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

export async function doSpawn(fileName) {
  const CODE = fs.readFileSync(`./lua/${fileName}`, 'utf-8');
  const signer = createDataItemSigner(WALLET);

  console.info(`Spawning AOS ${fileName} Lua process`);
  const processId = await spawn({
    module: AOS_MODULE_2_0_0_RC_1_1_NO_SQLITE,
    scheduler: AO_TESTNET_SU,
    signer,
    tags: [
      { name: 'Authority', value: 'fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY' },
      { name: 'Authority', value: 'f70fYdp_r-oJ_EApckTYQ6d66KaEScQLGTllu98QgXg' },
      { name: 'Authority', value: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE' },
    ],
    data: '1984',
  });

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

    fs.writeFileSync(`./${fileName}_aos_processId.txt`, processId, 'utf-8');
  } catch (e) {
    console.error(e);
  }

  return processId;
}
