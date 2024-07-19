import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { feedbackRewardTokens3, topPlayersRewardSession3 } from "./reward-tokens.js";


const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

for (const [tag, conf] of Object.entries(topPlayersRewardSession3)) {
  console.log(`--------- ${tag}`)
  for (const [wallet, qty] of Object.entries(conf)) {
    console.log(`${wallet}  ${qty}`)
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
      { name: 'Recipient', value:  `${recipient}`},
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

// --------- DiggerRewardSession3
// Id: 9w-36wwDv8C_bU_FXfQIiIjc5Yd0wy3JOR7lhDSHVoc   Transferred 2500 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
//
// Id: pW2QIowMRmj-Ry3LP4mGRrhU0jgZ8ShXQsbqHVOWDVo   Transferred 1000 to A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A
//
// Id: K5QM-IIhHcj49M75j1Bvkrv8IBJjucxeO9GM-ea5AAQ   Transferred 1000 to L5e5DlSQQBZP87sHBelkakAKjDM0s_L_jTZ8kFtq6fg
//
// Id: YwiqogK2pd2kSlTBnL4EFQpQnZGtLTwnVpQN8jOL54g   Transferred 1000 to HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o
//
// Id: I4QYDCMz5sA2LYj657b0Gs3M9UBdjDG8UuhfnwFZVWI   Transferred 1000 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
//
// --------- FragsRewardSession3
// Id: -4ZIWwWxWhn8f4Y9S-cnn_2pcW56zRCeDHgimgYpEI0   Transferred 2500 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
//
// Id: 6UbHhVzmPgPSwX5vnt2GOt410KfrSdZTM5rgTLtq6fo   Transferred 1000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
//
// Id: xDAb2CZkepeVXBrPzOGe9G8ltj5CeLVqHaWwxTG3BJs   Transferred 1000 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
//
// Id: wS1pCbWTPGf7Uhgun7dwxCw3EkBbTqz84PiuADgqpCI   Transferred 1000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
//
// Id: J3b-oJbXIJ1zav4iQpIxeohm0yE8vP-I4EiQd_vEfPg   Transferred 1000 to wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o
//
// --------- ChatterRewardSession3
// Id: Zp4iE1B4QqyRLMBOR-F5bPvGVbQk9yaSRNHg-UL8x28   Transferred 2500 to fPTnY7Pihw6tPS6j2iO1kDax6sgnvRRCCwDySngb9TM
