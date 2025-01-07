import { readFileSync } from 'node:fs';
import { createDataItemSigner, result, message } from '@permaweb/aoconnect';

const process = 'hqdL4AZaFZ0huQHbAsYxdTwG6vpibK7ALWKNzmWaD4Q';
const nft = 'WL6YQ4POtP7xQxP3QCylYcxzYzlkwCctK4_6L_w53zo';

const wallet = JSON.parse(readFileSync('.secrets/wallet.json').toString());

await message({
  process,
  tags: [
    { name: 'Action', value: 'Read-Pair' },
    { name: 'DominantToken', value: nft },
    { name: 'SwapToken', value: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10' },
  ],
  signer: createDataItemSigner(wallet),
  data: 'any data',
})
  .then((id) => {
    console.log(id);
    return result({
      message: id,
      process,
    });
  })
  .then((result) => {
    const data = JSON.parse(result?.Messages[0]?.Data);
    console.log(`NFT ${nft} orderbook`, data.Orderbook);
    let quantity = data.Orderbook.Orders.map((o) => Number(o.Quantity)).reduce((a, b) => a + b, 0);
    console.log(`Orderbook of ${nft} consists of ${quantity} orders`);
  })
  .catch(console.error);
