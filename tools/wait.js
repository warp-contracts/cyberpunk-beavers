/* Cron doesn't allow to specify seconds... so... */
const msIdx = process.argv.indexOf('--ms');
if (msIdx < 0) {
  throw new Error("Specify 'ms' flash waiting time value in miliseconds");
}
const ms = parseInt(process.argv[msIdx + 1]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await delay(ms);
