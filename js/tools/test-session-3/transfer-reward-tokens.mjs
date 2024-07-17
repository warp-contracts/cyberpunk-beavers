import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { rewardTokens3 } from "./reward-tokens.js";


const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

for (const [key, value] of Object.entries(rewardTokens3)) {
  console.log(`${key}  ${value}`)
  // transferToken(key, value).then(r => console.log(`Transferred ${key} ${value}`));
}


async function transferToken(recipient, qty) {
  await message({
    /*
        The arweave TXID of the process, this will become the "target".
        This is the process the message is ultimately sent to.
      */
    process: `rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8`,
    tags: [
      { name: 'From-Process', value: 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8' }, // ;)
      { name: 'Recipient', value:  `${recipient}`},
      { name: 'Action', value: 'Transfer' },
      { name: 'Quantity', value: `${qty}` },
      { name: 'Reward', value: 'FeedbackTestingSession3' },
    ],
    // A signer function used to build the message "signature"
    signer: createDataItemSigner(wallet),
    /*
        The "data" portion of the message
        If not specified a random string will be generated
      */
    data: 'any data',
  })
    .then((s) => console.log(`Token transfer id: ${s}`))
    .catch(console.error);
}

// Token transfer id: irWVI5lxQt-CtNgIpRohlQZNf_l2ifTQFN3VHp5hWFM
// Transferred P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY 1000
// Token transfer id: jokZW4_jHOERNo2tF5Toqgf2RthkMIf7pZTE0hJ1tCM
// Transferred fPTnY7Pihw6tPS6j2iO1kDax6sgnvRRCCwDySngb9TM 1000
// Token transfer id: HruIKFjdzkKotbThVnVV75a0HRjLjU8kylD9nxx0gQo
// Transferred 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M 1000
// Token transfer id: 8qfnN-zQkU9XX5y9YgFjvZp0tA6PDm6STSWsPhuJDl0
// Transferred apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ 1000
// Token transfer id: eJRbshGifKQGnu6pdAelK-MoCLHf9bNojPZTUERfn8A
// Transferred A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A 2500
