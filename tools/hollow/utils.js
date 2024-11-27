import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function getHollowId() {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory
  return fs.readFileSync(path.join(__dirname, 'hollow-id.txt'), 'utf-8');
}
