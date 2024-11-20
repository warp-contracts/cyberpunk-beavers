import { dryrun } from '@permaweb/aoconnect';
import { TOKEN_CONTRACT } from '../deploy/token-keeper.js';

const bridgeProcessId = '89_4zUaRp7RAIz4wZ7n5VgW548i6L2n__-McQzqLn4c';
const wallet = 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE';

async function checkBalance(wallet, tokenType) {
  console.log(`Checking ${TOKEN_CONTRACT[tokenType].id}`);
  const result = await dryrun({
    process: `${TOKEN_CONTRACT[tokenType].id}`,
    data: '',
    tags: [
      { name: 'Action', value: 'Balance' },
      { name: 'Target', value: `${wallet}` },
    ],
  });

  console.log(`Wallet ${wallet} got ${tokenType} `, result.Messages[0].Data);
  return Number(result.Messages[0].Data);
}

console.log(`TIO`, (await checkBalance(bridgeProcessId, 'tio')) + (await checkBalance(wallet, 'tio')));
console.log(`TRUNK`, (await checkBalance(bridgeProcessId, 'trunk')) + (await checkBalance(wallet, 'trunk')));
console.log(`WAR`, (await checkBalance(bridgeProcessId, 'war')) + (await checkBalance(wallet, 'war')));
