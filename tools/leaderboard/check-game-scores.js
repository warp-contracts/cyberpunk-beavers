import { createDataItemSigner, dryrun, message, result } from '@permaweb/aoconnect';
import fs from 'node:fs';

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

const leaderboardProcessId = '4X2o4Kw9_-lc8I8SaMQaUOIMEooNyTvlMdjZ5Bv6tO8';

async function checkGlobalScores() {
  const signer = createDataItemSigner(WALLET);

  const scoresRes = await dryrun({
    process: leaderboardProcessId,
    tags: [
      { name: 'Action', value: 'GameScores' },
      { name: 'GameProcessId', value: 'GohbVx7iMV6n2H96JA30gj6BVc8yWvWspSCNQr5FQbE' },
    ],
    signer,
    data: '1984',
  });
  console.log(JSON.parse(scoresRes.Output.data));
  return scoresRes;
}

checkGlobalScores().then(() => console.log(`THE END`));
