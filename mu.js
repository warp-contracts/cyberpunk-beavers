import { open } from 'node:fs/promises';

fileReader().finally();

const values = [];
let currentMax = 0;

async function fileReader() {
  const file = await open('mu-out.log');
  for await (const line of file.readLines()) {
    if (line.startsWith('Processing Data Item')) {
      const onlyValue = parseInt(line.replace('Processing Data Item took ', ''));
      //console.log(onlyValue);
      values.push(onlyValue);
      if (onlyValue > currentMax) {
        currentMax = onlyValue;
      }
    }
  }

  values.sort((a, b) => b - a);
  console.log(values);
  const now = new Date();
  console.log(`${now.toISOString()}`, now.getTime());
  console.log('max', currentMax);
}
