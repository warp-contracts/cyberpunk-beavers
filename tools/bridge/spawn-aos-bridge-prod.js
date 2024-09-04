import { doSpawn } from './spawn-aos.js';

doSpawn('cb-bridge-prod.lua').then(console.log).catch(console.error);
