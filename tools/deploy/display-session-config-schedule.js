import { schedulesForEnv } from './deploy-session-schedule.js';

function doIt() {
  const env = process.argv[2] || 'local';
  console.log(`----- Session Full Schedule -----`, env);

  schedulesForEnv(env);
}

doIt();
