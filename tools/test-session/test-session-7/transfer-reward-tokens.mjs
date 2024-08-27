import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { feedbackRewardTokens7 } from './reward-tokens.js';

const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

for (const [tag, conf] of Object.entries(feedbackRewardTokens7)) {
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

// --------- FeedbackTestingSession7
// Id: vEGqQQUzUrH1BwB-5-fs5_aOntIjfkAMKmTuXUZL8zQ   Transferred 1000 to kNBxDIibOTsUdtkTGs8j8EoFEOvprqgtHglxL7_7yzM
// Id: G4b53PeITN3l9y6DYTAGKSvlBYCR9qa-gUrFzxugmeM   Transferred 1000 to YYosXQmkGX2hJSGNy0RQ1qV8QHi5DAcP-YknjQ03o1g
// Id: c2YMjKKxliHtomRbui3FYxs28NqWs1sz_5UXWlvyQwI   Transferred 2500 to A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A
// Id: Cc9NWAXC1DvhYB59jO-Q3g47wCq2zQDvFIAlxA_dy90   Transferred 1000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: ggRBt0ZGjUoBCN4pePhRlgEkarqkozXiFZygPZxhdfI   Transferred 1000 to TNyZrLpRNpetvhBvpTINQ_D9GLpzk8OiYzHlPjyIYUs
// Id: 86j56xaJoWyRKKoDL-WSIPxjgvRqOyp-ZH8Kn_nChyE   Transferred 1000 to 8CATvBtYkuBqfUcbGgn_NtI1OpZ9t8i_Qy9-SY5sGxE
// Id: Ah_UYD3H_NX_QdvbrO98hVVeTTEv1ItxRditLGC8bi8   Transferred 1000 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: tf7Vl2SGCl_TP9Bla-eRoH4tB8fQmoQ1xHTUTUVYT4w   Transferred 1000 to nXo45ofv39l5XL0iA6pYtbaePppywfLg5xjQG_aC2zw
// Id: 8C16vrwIwv3U3ENsISJ706iuMKLQ-93krhAPgeMSt-o   Transferred 1000 to IjvHP6ds11ruTpCpZ63BwpsqHrTbRi-wYAsNIcI61ls
