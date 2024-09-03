import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import fs from 'node:fs';
import Arweave from 'arweave';

const { message } = connect();
const OLD_WALLET = JSON.parse(fs.readFileSync('../warp-internal/wallet/arweave/warp-wallet-jwk.json', 'utf-8'));
const WALLET = JSON.parse(fs.readFileSync('../warp-internal/wallet/arweave/general/jwk.json', 'utf-8'));
const TOKEN_PROCESS = 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

async function doIt() {
  const signer = createDataItemSigner(OLD_WALLET);

  // jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE
  const newOwnerAddress = await arweave.wallets.jwkToAddress(WALLET);
  console.log(`Setting ${newOwnerAddress} as owner for ${TOKEN_PROCESS} process`);

  const id = await message({
    process: TOKEN_PROCESS,
    data: `Owner = ${newOwnerAddress}`,
    tags: [{ name: 'Action', value: 'Eval' }],
    signer,
  });

  return id;
}

doIt().then(console.log).catch(console.error);
