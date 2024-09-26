import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

async function evalProcess(processId, fileName) {
  const CODE = fs.readFileSync(`./lua/leaderboard/${fileName}`, 'utf-8');
  const signer = createDataItemSigner(WALLET);

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

// evalProcess('lCviigwaPHbR8pUr8H6tbOHP_Syyu1cP4mY9ayrodF0', 'leaderboard-caller-and-name.lua') // local
evalProcess('5qzT9T2xH7sfnE66gtICnI_71c4dc9mSl0uOqYnX2o0', 'leaderboard-caller-and-name.lua') //prod
  .then((processId) => console.log(`https://www.ao.link/#/entity/${processId}`));
