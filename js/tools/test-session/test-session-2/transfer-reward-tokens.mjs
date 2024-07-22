import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { rewardTokens2 } from './reward-tokens.js';

const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

for (const [key, value] of Object.entries(rewardTokens2)) {
  console.log(`${key}  ${value}`);
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
      { name: 'Recipient', value: `${recipient}` },
      { name: 'Action', value: 'Transfer' },
      { name: 'Quantity', value: `${qty}` },
      { name: 'Reward', value: 'FeedbackTestingSession2' },
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

// Token transfer id: gO0LepLqLdP2IUQ_zpfgOUB6obV7dfUoRusPRkJBYyE
// Transferred LMe-iRDfgMj1KY0M06P3PeiB2CZJSAIUYp-ZrTUmpSY 2500
// Token transfer id: 9gtEaFPSSYH1mnqZgQXUTFo-bPIJCYmz0RSUwEjiUsI
// Transferred 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA 1000
// Token transfer id: 3PUNZgE2YlggZmxRHTiH0IcrA4Z-DcgTgzkd78bBOOQ
// Transferred 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M 1000
// Token transfer id: Ugovjw97ZrAkFCxneeP2RmEWvEIFy4x5fT54ziQP2Jc
// Transferred HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o 1000
// Token transfer id: X0Ag6-8uZQ6QjslAEOKAdWhziXePQxEr1siLEL0tKcQ
// Transferred GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE 1000
// Token transfer id: 6rldxn9BeV36uX9yf31mAvz7nZ8SgYp6CnJvdnbAHxI
// Transferred B1-7-fId_pqaMUszSoC3jsy6MGCbYgGOeOHCsNQEolA 1000
// Token transfer id: 96141be0rvZAG6Oe9AMtaPYYnKYYxqituE5PFBH7orA
// Transferred P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY 1000
// Token transfer id: PuCpLspvD66iLfJX1i6gkhXoHFalWwYaGXeQIs9BGoc
// Transferred TNkafVSrvXZ6s0mUMnhrBBkhD9-I5rqs9_Qa-W2P6Ng 1000
// Token transfer id: tEXVFVyFuCww8_irSO6EWHjcQWylljtU5u2lMR9pTmY
// Transferred A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A 1000
