import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

async function main() {
  const WALLET = JSON.parse(fs.readFileSync('.secrets/nft-wallet.json', 'utf-8'));
  const links = [];
  const collectionProcessId = 'iLqXKTX1cwANalufrIU01CO3B-IG2Ht6uWvit5tR0Dk';

  fs.createReadStream(path.resolve('./tools/nft/links.csv'), { encoding: 'utf-8' })
    .pipe(csvParser())
    .on('data', (chunk) => {
      links.push(chunk.ID);
    })
    .on('error', (e) => {
      throw new Error(`Error while reading CSV stream. ${e}`);
    })
    .on('end', async () => {
      const signer = createDataItemSigner(WALLET);
      const scoresRes = await message({
        process: collectionProcessId,
        tags: [{ name: 'Action', value: 'Update-Assets' }],
        signer,
        data: JSON.stringify({
          AssetIds: links,
          UpdateType: 'Add',
        }),
      });
      console.log(scoresRes);
    });
}

main().catch((e) => console.error(e));
