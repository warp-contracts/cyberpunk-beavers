import { arGql, GQLUrls } from 'ar-gql';
import fs from 'fs';

const interactions = JSON.parse(fs.readFileSync('gameInteractions.json'));

const gameProcessQuery = (processId) => `query {
      transactions (
        tags: {
          name: "From-Process",
          values: ["${processId}"]
        }
      ) {
        count
      }
    }`;

let total = parseInt(interactions['__TOTAL']);
let realGames = parseInt(interactions['__REAL_GAMES']);
const result = interactions;

const goldsky = arGql({ endpointUrl: GQLUrls.goldsky }); // 'https://arweave-search.goldsky.com/graphql'
// and use it at the same time

const processes = JSON.parse(fs.readFileSync('gameProcess.json'));

let i = 0;
let shouldContinue = false;
try {
  for (const p of processes) {
    if (p === 'Ck8ZNyio3aJporVkXnIAfAcBP8JgxRPfZitSUmnwLUs') {
      shouldContinue = true;
    } else if (shouldContinue) {
      const edges = await goldsky.run(gameProcessQuery(p), null);
      const count = parseInt(edges.data.transactions.count);
      if (count > 500) {
        result[p] = count;
        total += count;
        realGames++;
      }
      console.log(`${++i}. ${p}: ${count}, realGames: ${realGames}`);
    }
  }
} catch (e) {
  console.error('Total', total);
  result['__TOTAL'] = total;
  result['__REAL_GAMES'] = realGames;
  fs.writeFileSync('gameInteractions.json', JSON.stringify(result));
} finally {
  console.log('Total', total);
  result['__TOTAL'] = total;
  result['__REAL_GAMES'] = realGames;
  fs.writeFileSync('gameInteractions.json', JSON.stringify(result));
}

//fs.writeFileSync('gameProcess.json', JSON.stringify(allProcess));
