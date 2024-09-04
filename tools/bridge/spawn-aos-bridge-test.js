import { doSpawn } from './spawn-aos.js';

doSpawn('cb-bridge-test.lua').then(console.log).catch(console.error);
