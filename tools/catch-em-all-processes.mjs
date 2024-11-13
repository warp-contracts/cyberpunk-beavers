import { arGql, GQLUrls } from 'ar-gql';
import fs from 'fs';

const allProcess = [];

const pageCallback = async (pageEdges) => {
  console.log('new page');
  pageEdges.forEach((edge) => allProcess.push(edge.node.id));
};

const gameProcessQuery = `query($cursor: String) {
  transactions(
		tags: [
			{ name: "Name", values: ["spawn game"] }
		]

    after: $cursor
    first: 100
  ) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
				id
      }
    }
  }
}`;

const goldsky = arGql({ endpointUrl: GQLUrls.goldsky }); // 'https://arweave-search.goldsky.com/graphql'
// and use it at the same time
const edges = await goldsky.all(gameProcessQuery, null, pageCallback);

fs.writeFileSync('gameProcess.json', JSON.stringify(allProcess));
