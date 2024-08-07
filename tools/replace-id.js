import warpAoIds from '../src/game/config/warp-ao-ids.js';
import fs from 'node:fs';

const filePath = './src/game/config/warp-ao-ids.js';

export function replaceId(key, txId) {
  const currentConfig = warpAoIds;
  if (!currentConfig.hasOwnProperty(key)) {
    throw new Error(`Unknown config key ${key}`);
  }
  currentConfig[key] = txId;
  fs.writeFileSync(filePath, generateTemplate(currentConfig), 'utf8');
}

function generateTemplate(json) {
  const configAsString = JSON.stringify(json, null, 2);
  return `export default ${configAsString};`;
}
