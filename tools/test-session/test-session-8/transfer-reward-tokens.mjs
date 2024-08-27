import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { feedbackRewardTokens8 } from './reward-tokens.js';

const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

for (const [tag, conf] of Object.entries(feedbackRewardTokens8)) {
  console.log(`--------- ${tag}`);
  for (const [wallet, qty] of Object.entries(conf)) {
    console.log(`${wallet}  ${qty}`);
    // transferToken(wallet, tag, qty).then(console.log);
  }
}

async function transferToken(recipient, tag, qty) {
  await message({
    /*
        The arweave TXID of the process, this will become the "target".
        This is the process the message is ultimately sent to.
      */
    process: `rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8`,
    tags: [
      { name: 'From-Process', value: 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8' }, // ;)
      { name: 'Recipient', value: `${recipient}` },
      { name: 'Action', value: 'Transfer' },
      { name: 'Quantity', value: `${qty}` },
      { name: 'Reward', value: `${tag}` },
    ],
    // A signer function used to build the message "signature"
    signer: createDataItemSigner(wallet),
    /*
        The "data" portion of the message
        If not specified a random string will be generated
      */
    data: 'any data',
  })
    .then((id) => console.log(`Id: ${id}   Transferred ${qty} to ${recipient} `))
    .catch(console.error);
}

// --------- FeedbackTestingSession8
// Id: imKtFTf-zFivvRW_e0_cHBPkN1wqiA9tUcfZ08K5oSc   Transferred 1000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: 7KHfH4AP_Xoj4RDYv79bSYNXvrx6zhmC484iTlze_rU   Transferred 1000 to A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A
// Id: Jl7AqF250n6Gigg7iNXEv_nX3kCWTkp5_7Wz69lv7mw   Transferred 1000 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
