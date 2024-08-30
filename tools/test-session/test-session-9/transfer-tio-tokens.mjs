import { readFileSync } from 'node:fs';
import { TOKEN_CONTRACT } from '../../deploy-spawn-session-config.js';
import { GameTreasure } from '../../../src/game/common/const.mjs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';

const wallet = JSON.parse(readFileSync('./.secrets/jwk.json').toString());
const tioToken = `${TOKEN_CONTRACT[GameTreasure.tio.type].id}`;

export async function transferTio(recipient, qty) {
  const tag = 'CyberBeaverTestingSession9';
  console.log(`${tag}: Transferring ${tioToken} ${qty} to ${recipient}`);

  // await message({
  //   /*
  //       The arweave TXID of the process, this will become the "target".
  //       This is the process the message is ultimately sent to.
  //     */
  //   process: tioToken,
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
  //   .then((id) => console.log(`Id: ${id}   Transferred ${qty} to ${recipient} `))
  //   .catch(console.error);
}
