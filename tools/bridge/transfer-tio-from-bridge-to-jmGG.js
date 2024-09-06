import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import { backOff } from 'exponential-backoff';

const { message } = connect();

const WALLET = JSON.parse(fs.readFileSync('../.secrets/general/jwk.json', 'utf-8'));

async function tranfer() {
  const signer = createDataItemSigner(WALLET);

  let id;
  try {
    id = await backOff(() =>
      message({
        process: '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c',
        data: `
            ao.send({
      Target = 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
      Recipient = 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE',
      Action = 'Transfer',
      Quantity = '800000000'
    })`,
        tags: [{ name: 'Action', value: 'Eval' }],
        signer,
      })
    );
    console.log(`Successfully sent 'eval' for process '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c'.`);
    console.log(`https://www.ao.link/#/message/${id}`);
  } catch (e) {
    console.error(e);
  }

  return id;
}

tranfer().then(console.log).catch(console.error);
