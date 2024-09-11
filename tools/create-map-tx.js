import { TurboFactory, defaultTurboConfiguration } from '@ardrive/turbo-sdk/node';
import fs from 'fs';

const mapName = 'b1m6.json';
const file = `../public/assets/maps/v2/${mapName}`;

(async () => {
  /**
   * Generate a key from the arweave wallet.
   */
  const jwk = JSON.parse(fs.readFileSync('.secrets/wallet.json', 'utf-8'));
  /**
   * Use the arweave key to create an authenticated turbo client
   */
  const turboAuthClient = TurboFactory.authenticated({
    privateKey: jwk,
    ...defaultTurboConfiguration,
  });

  /**
   * Fetch the balance for the private key.
   */
  const balance = await turboAuthClient.getBalance();
  console.log('Balance:', balance);

  /**
   * Post local files to the Turbo service.
   */
  console.log('Posting raw file to Turbo service...');
  const filePath = new URL(file, import.meta.url).pathname;
  const fileSize = fs.statSync(filePath).size;
  const uploadResult = await turboAuthClient.uploadFile({
    fileStreamFactory: () => fs.createReadStream(filePath),
    fileSizeFactory: () => fileSize,
    signal: AbortSignal.timeout(10_000), // cancel the upload after 10 seconds
    dataItemOpts: {
      tags: [
        {
          name: 'Data-Protocol',
          value: 'warp-beavers-map',
        },
        {
          name: 'Name',
          value: mapName,
        },
        {
          name: 'Map-Api-Version',
          value: 'v2',
        },
        {
          name: 'Terrain',
          value: 'desert',
        },
      ],
    },
  });
  console.log(JSON.stringify(uploadResult, null, 2));

  const transactionId = uploadResult.id;
  console.log(transactionId);

  /**
   * Tops up a wallet with Credits using tokens.
   * Default token is AR, using Winston as the unit.
   */
  /*  const topUpResult = await turboAuthClient.topUpWithTokens({
      tokenAmount: WinstonToTokenAmount(100_000_000_000), // 0.0001 AR
    });
    console.log(JSON.stringify(topUpResult, null, 2));*/
})();
