import { readFileSync } from 'node:fs';
import { TOKEN_CONTRACT } from '../../deploy-spawn-session-config.js';
import { GameTreasure } from '../../../src/game/common/const.mjs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

const wallet = JSON.parse(readFileSync('../../../.secrets/wallet.json').toString());
const warToken = `${TOKEN_CONTRACT[GameTreasure.war.type].id}`;

export async function transferWar(recipient, qty) {
  const tag = 'CyberBeaverTestingSession11';
  console.log(`${tag}: Transferring ${warToken} ${qty / Math.pow(10, 12)} to ${recipient}`);

  // await message({
  //   /*
  //       The arweave TXID of the process, this will become the "target".
  //       This is the process the message is ultimately sent to.
  //     */
  //   process: warToken,
  //   tags: [
  //     { name: 'Recipient', value: `${recipient}` },
  //     { name: 'Action', value: 'Transfer' },
  //     { name: 'Quantity', value: `${qty}` },
  //     { name: 'Reward', value: `${tag}` },
  //   ],
  //   // A signer function used to build the message "signature"
  //   signer: createDataItemSigner(wallet),
  //   /*
  //       The "data" portion of the message
  //       If not specified a random string will be generated
  //     */
  //   data: 'any data',
  // })
  //   .then((id) => console.log(`Id: ${id}   Transferred ${qty / Math.pow(10, 12)} to ${recipient} `))
  //   .catch(console.error);
}
