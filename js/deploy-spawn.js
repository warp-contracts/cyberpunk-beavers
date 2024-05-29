import {WarpFactory, Tag} from "warp-contracts";
import {DeployPlugin, ArweaveSigner} from "warp-contracts-plugin-deploy";
import {createData} from "warp-arbundles";
import {readFileSync} from "fs";

const jwk = JSON.parse(readFileSync('../.secrets/wallet.json', 'utf-8'));
const signer = new ArweaveSigner(jwk);
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

async function deploy() {
    const module = readFileSync('../dist/output.js', 'utf-8');
    const moduleTags = [
        new Tag('Data-Protocol', 'ao'),
        new Tag('Variant', 'ao.TN.1'),
        new Tag('Type', 'Module'),
        new Tag('Module-Format', 'wasm32-unknown-emscripten'),
        new Tag('Input-Encoding', 'JSON-1'),
        new Tag('Output-Encoding', 'JSON-1'),
        new Tag('Memory-Limit', '500-mb'),
        new Tag('Compute-Limit', '9000000000000'),
        new Tag('Salt', '' + Date.now())
    ];
    const srcTx = await warp.createSource({src: module, tags: moduleTags}, signer);
    const srcTxId = await warp.saveSource(srcTx);
    console.log('MODULE_ID=', srcTxId);
    return srcTxId;
}

async function spawn(moduleId) {
    const processTags = [
        new Tag('Data-Protocol', 'ao'),
        new Tag('Variant', 'ao.TN.1'),
        new Tag('Type', 'Process'),
        new Tag('Module', moduleId),
        new Tag('Scheduler', '_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA'),
        new Tag('SDK', 'ao'),
        new Tag('Content-Type', 'text/plain'),
        new Tag('Name', 'asia')
    ];

    const data = JSON.stringify({counter: {}});
    const processDataItem = createData(data, signer, {tags: processTags});
    await processDataItem.sign(signer);

    const processResponse = await fetch('http://34.89.142.6:3004', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            Accept: 'application/json'
        },
        body: processDataItem.getRaw()
    }).then((res) => res.json());

    console.log('PROCESS_ID=', processResponse.id);
};


deploy()
  .then(spawn)
  .then(() => console.log(``));