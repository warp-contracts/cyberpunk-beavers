import {
  TurboFactory,
  developmentTurboConfiguration,
} from "@ardrive/turbo-sdk/node";
import fs from "fs";

const file = "./../../assets/maps/map_g_1.json";
const mapName = "map_g_1.json";


(async () => {
  /**
   * Generate a key from the arweave wallet.
   */
  const jwk = JSON.parse(fs.readFileSync('.secrets/wallet.json', "utf-8"));
  /**
   * Use the arweave key to create an authenticated turbo client
   */
  const turboAuthClient = TurboFactory.authenticated({
    privateKey: jwk,
    ...developmentTurboConfiguration,
  });

  /**
   * Fetch the balance for the private key.
   */
  const balance = await turboAuthClient.getBalance();
  console.log("Balance:", balance);

  /**
   * Post local files to the Turbo service.
   */
  console.log("Posting raw file to Turbo service...");
  const filePath = new URL(file, import.meta.url).pathname;
  const fileSize = fs.statSync(filePath).size;
  const uploadResult = await turboAuthClient.uploadFile({
    fileStreamFactory: () => fs.createReadStream(filePath),
    fileSizeFactory: () => fileSize,
    signal: AbortSignal.timeout(10_000), // cancel the upload after 10 seconds
    dataItemOpts: {
      tags: [
        {
          "name": "Data-Protocol",
          "value": "warp-beavers-map"
        },
        {
          "name": "Name",
          "value": mapName
        },
        {
          "name": "Map-Api-Version",
          "value": "v1"
        },
        {
          "name": "Terrain",
          "value": "desert"
        },
      ],
    }
  });
  console.log(JSON.stringify(uploadResult, null, 2));

  const transactionId = uploadResult.id;

  /**
   * Tops up a wallet with Credits using tokens.
   * Default token is AR, using Winston as the unit.
   */
  /*  const topUpResult = await turboAuthClient.topUpWithTokens({
      tokenAmount: WinstonToTokenAmount(100_000_000_000), // 0.0001 AR
    });
    console.log(JSON.stringify(topUpResult, null, 2));*/
})();