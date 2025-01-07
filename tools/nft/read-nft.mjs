import { dryrun } from '@permaweb/aoconnect';

const TOKEN_PROCESS = 'WL6YQ4POtP7xQxP3QCylYcxzYzlkwCctK4_6L_w53zo';

async function doIt() {
  return dryrun({
    process: TOKEN_PROCESS,
    tags: [{ name: 'Action', value: 'Info' }],
    data: '1984',
  });
}

doIt().then(console.log).catch(console.error);
