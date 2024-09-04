import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

console.info(`Eval AOS Oracle Lua process`);

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/wallet.json', 'utf-8'));

const CODE = fs.readFileSync('../lua/main.lua', 'utf-8');

async function evalIt() {
  const signer = createDataItemSigner(WALLET);
  const processId = '7QJydVitORyOuKW3vm50CDITiJql5wUAwhnM4XvNpYU';

  try {
    const r = await backOff(() =>
      message({
        process: processId,
        data: CODE,
        tags: [{ name: 'Action', value: 'Eval' }],
        signer,
      })
    );
    console.log(`Successfully sent 'eval' action for process '${processId}'.`, r);
    console.log(`https://www.ao.link/#/message/${r}`);

    fs.writeFileSync('./aos_processId.txt', r, 'utf-8');
  } catch (e) {
    console.error(e);
  }

  return '7QJydVitORyOuKW3vm50CDITiJql5wUAwhnM4XvNpYU';
}

evalIt().then(console.log).catch(console.error);
