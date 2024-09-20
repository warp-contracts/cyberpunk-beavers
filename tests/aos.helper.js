import AoLoader from '@permaweb/ao-loader';
import fs from 'fs';

const aos = fs.readFileSync('./tests/resources/CJ-iZL7RKNA43UZr3l6J5M8JegMP9RldoCoVge_vRuI.wasm');
const format = 'wasm64-unknown-emscripten-draft_2024_02_15';
let memory = null;

export async function Send(DataItem) {
  const msg = Object.keys(DataItem).reduce(function (di, k) {
    if (di[k]) {
      di[k] = DataItem[k];
    } else {
      di.Tags = di.Tags.concat([{ name: k, value: DataItem[k] }]);
    }
    return di;
  }, createMsg());

  const handle = await AoLoader(aos, { format });
  const env = createEnv();

  const result = await handle(memory, msg, env);
  if (result.Error) {
    return 'ERROR: ' + JSON.stringify(result.Error);
  }
  memory = result.Memory;

  return { Messages: result.Messages, Spawns: result.Spawns, Output: result.Output, Assignments: result.Assignments };
}

function createMsg() {
  return {
    Id: '1234',
    Target: 'AOS',
    Owner: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE',
    From: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE',
    Data: '1984',
    Tags: [],
    'Block-Height': '1000',
    Timestamp: Date.now(),
    Module: '4567',
  };
}

function createEnv() {
  return {
    Process: {
      Id: 'AOS',
      Owner: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE',
      Tags: [
        { name: 'Data-Protocol', value: 'ao' },
        { name: 'Variant', value: 'ao.TN.1' },
        { name: 'Type', value: 'Process' },
      ],
    },
    Module: {
      Id: 'MODULE',
      Tags: [
        { name: 'Data-Protocol', value: 'ao' },
        { name: 'Variant', value: 'ao.TN.1' },
        { name: 'Type', value: 'Module' },
      ],
    },
  };
}
