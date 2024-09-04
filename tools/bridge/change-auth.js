import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

async function changeAuth(token) {
  const signer = createDataItemSigner(WALLET);

  try {
    const r = await backOff(() =>
      message({
        process: token,
        data: `ao.authorities = {"f70fYdp_r-oJ_EApckTYQ6d66KaEScQLGTllu98QgXg", "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY", "jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE"}`,
        tags: [{ name: 'Action', value: 'Eval' }],
        signer,
      })
    );
    console.log(`Successfully sent 'eval' action for process '${token}'.`);
    console.log(`https://www.ao.link/#/message/${r}`);

    fs.writeFileSync(`./${token}_aos_processId.txt`, token, 'utf-8');
  } catch (e) {
    console.error(e);
  }

  return token;
}

changeAuth('_ThTRfZDNAV1Y-yX2h_9PNe5oGHh4q0eRhv6Y1tRVR0').then(console.log).catch(console.error);
