import { readFileSync } from 'node:fs';
import { createDataItemSigner, message } from '@permaweb/aoconnect';
import { missingTokens } from "./missing-tokens.js";


const wallet = JSON.parse(readFileSync('./.secrets/wallet.json').toString());

for (const [key, value] of Object.entries(missingTokens)) {
  console.log(`${key}  ${value}`)
  // transferToken(key, value).then(r => console.log(`Transferred ${key} ${value}`, r));
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
      { name: 'Reward', value: 'TestingSession2' },
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



// Token transfer id: 0ASna_lJGvo_QIGn86EvHsV5ByCNANOUMsfZVt820-s
// Transferred dAewPZFNJulHmJgobwn4UoNRpStcB1yS7UlygQn_z6U 10
// Token transfer id: 9fyvg9BpFSlnc3Vz0IPkt8M7XfjPEQR1oDF3DjP28Ss
// Transferred g5XFAWqaDYSTWhwVLgTSSwGEPsjrVkr81RC_vGm1IQw 40
// Token transfer id: d2jPfSieXS71w2348001VQtU8kgcEAKoGL7w1yZM6S0
// Transferred A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A 10585
// Token transfer id: Ll0xnB2y93BaGVNtElSukgt3gEBK2AgmXTenyFj6-dM
// Transferred GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE 3545
// Token transfer id: sv93EtOGYzsHIwtxMv-xNSZlMA0EsZbQUuB3gSf4cQ8
// Transferred 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M 10730
// Token transfer id: yuZXzTmLs5Oztp5shTsyJe0SeYEAti0wmL0MGvx0GBE
// Transferred ciQ7RQ8QPPv3bGoMfN2SlYIr0n8ZDLZ7_aDW-hM9pLQ 360
// Token transfer id: V5rUSM5ucsWfLg9aV66-zNuM4YeTbLUBdMfh2ZdY9No
// Transferred TNkafVSrvXZ6s0mUMnhrBBkhD9-I5rqs9_Qa-W2P6Ng 5225
// Token transfer id: 4tJ0ckdHfZKbbop4Yr7h1mA-hQbFS0esxDwewtUjR34
// Transferred Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g 5845
// Token transfer id: dV_9m8xSSpLeOuhQZGzyvEtfY6Lpmt5lApm5eqNsNkM
// Transferred P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY 6685
// Token transfer id: bFJy5axm_bPBLqKoQj-6SWKElZlJu5oROxRjkfqgn8M
// Transferred YYosXQmkGX2hJSGNy0RQ1qV8QHi5DAcP-YknjQ03o1g 4250
// Token transfer id: F6HLFgxGs3anTA7UI7ViBasOpfXF-gbbpV0OXlPAVSA
// Transferred 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA 12190
// Token transfer id: shYSecVXxyUFdr8ZuXynOZyV4U39XF_4Zl0ogscbSR4
// Transferred HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o 5380
// Token transfer id: mZdA_YWpVdmei2uVs4s6FmrdImP3kRk0vBqSsQya5Rs
// Transferred YcPEBPK-oS5IUxtVgICcl3DdfhfVJfui5LkBss805SQ 3640
// Token transfer id: OnVysn29UverrGl5OLg_9TZyUCZ6UV_aqQIvsvMZBgY
// Transferred LMe-iRDfgMj1KY0M06P3PeiB2CZJSAIUYp-ZrTUmpSY 3570
// Token transfer id: n1WHoLXHOJPB6raUVXQad61yGTZ641yvCZUNN14igwk
// Transferred 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58 2000
// Token transfer id: E_TzL5DhWrhJbKfXwiT_J5ecmiZwg3GcMmTihkGEVEg
// Transferred KFBXH_n2CvWvq7r_f1HTFzxn0hFOhvGLEEsogjmyns0 200
// Token transfer id: 1I2n9fiM5pIOvxlAjsefrHzYXigN0VfmqZvyWl5NT70
// Transferred apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ 4775
// Token transfer id: AzSt3K-GSH1ouPjlAtsvc8xr3CC3MZZ920jxyU1iwX8
// Transferred Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY 6470
// Token transfer id: NI1FL5yIE5kiGbxMG4zYHML_HXP88cZ4u0cjG5nuqw8
// Transferred wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o 6245

