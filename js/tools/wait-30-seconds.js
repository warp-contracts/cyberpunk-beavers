
/* Cron doesn't allow to specify seconds... so... */

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
await delay(30_000);
