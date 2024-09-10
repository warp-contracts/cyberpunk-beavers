import { createDataItemSigner, message } from '@permaweb/aoconnect';
import fs from 'node:fs';

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

async function checkPending() {
  const processId = '92LR-AJmDPuy6DhpgppvkXZ2C_4bWF9uGqajxeW9yRU';
  const signer = createDataItemSigner(WALLET);

  return await message({
    process: processId,
    tags: [
      { name: 'Action', value: 'ScheduleTransfer' },
      { name: 'From-Process', value: '92LR-AJmDPuy6DhpgppvkXZ2C_4bWF9uGqajxeW9yRU' },
      { name: 'HubProcessId', value: '123123125' },
    ],
    data: JSON.stringify({
      tio: {
        '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8': '44',
        Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: '998',
        assd: '9989',
      },
      trunk: {
        Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: '545',
      },
    }),
    signer,
  });
}

checkPending().then((r) => console.log(`Finished`, `https://www.ao.link/#/message/${r}`));
