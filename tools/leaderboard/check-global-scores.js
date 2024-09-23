import { createDataItemSigner, dryrun, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

const leaderboardProcessId = 'lCviigwaPHbR8pUr8H6tbOHP_Syyu1cP4mY9ayrodF0';

async function checkGlobalScores() {
  const signer = createDataItemSigner(WALLET);

  const scoresRes = await dryrun({
    process: leaderboardProcessId,
    tags: [{ name: 'Action', value: 'GlobalScores' }],
    signer,
    data: '1984',
  });
  console.log(JSON.parse(scoresRes.Output.data));
  return scoresRes;
}

checkGlobalScores().then(() => console.log(`THE END`));
