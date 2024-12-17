import { createDataItemSigner, message } from '@permaweb/aoconnect';
import fs from 'node:fs';

const WALLET = JSON.parse(fs.readFileSync('.secrets/nft-wallet.json', 'utf-8'));

const collectionProcessId = 'UmO26r-BYaay0BpcXm7BuNSvBvixLUvy8dS9p5I43Iw';

async function addAssetToCollection() {
  const signer = createDataItemSigner(WALLET);
  const scoresRes = await message({
    process: collectionProcessId,
    tags: [{ name: 'Action', value: 'Update-Assets' }],
    signer,
    data: JSON.stringify({ AssetIds: ['nomBSwcYVOHRmktyvkiuq35vByYp7CRwHcCUgGCxVv0'], UpdateType: 'Add' }),
  });
  console.log(scoresRes);
  return scoresRes;
}

addAssetToCollection().then(() => console.log(`THE END`));
