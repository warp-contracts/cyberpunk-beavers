import { dryrun } from '@permaweb/aoconnect';

const leaderboardProcessId = 'lCviigwaPHbR8pUr8H6tbOHP_Syyu1cP4mY9ayrodF0';

async function checkGlobalScores() {
  const scoresRes = await dryrun({
    Owner: 'cqAN4gl-KoeUECP-coyxAA01SJKrZF5UfNT0KMjDNCY',
    process: leaderboardProcessId,
    tags: [
      { name: 'Action', value: 'GlobalScores' },
      { name: 'Limit', value: '4' },
      { name: 'Offset', value: '0' },
    ],
    data: '1984',
  });
  const res = JSON.parse(scoresRes.Output.data);
  console.log(res);
  console.log(res.length);
  return scoresRes;
}

checkGlobalScores().then(() => console.log(`THE END`));
