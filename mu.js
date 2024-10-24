import { open } from 'node:fs/promises';
import fs from 'node:fs';

fileReader().finally();

let values = [];
let currentMax = 0;

async function fileReader() {
  const file = await open('mu-out.log');
  let process = false;
  for await (let line of file.readLines()) {
    if (!process) {
      process = line.includes('START');
    }
    if (line.includes('Processing Data Item')) {
      line = line.slice('[2024-10-29T19:00:00.770Z] '.length);
      //console.log(process);
      if (process) {
        const onlyValue = parseInt(line.replace('Processing Data Item took ', ''));
        //console.log(onlyValue);
        values.push(onlyValue);
        if (onlyValue > currentMax) {
          currentMax = onlyValue;
        }
      }
    }
  }

  values = values.sort((a, b) => b - a).filter((v) => v > 1000);
  console.log(values.length);
  const now = new Date();
  console.log(`${now.toISOString()}`, now.getTime());
  console.log('max', currentMax);

  fs.writeFileSync('mu-lag.csv', values.join(','));
}
