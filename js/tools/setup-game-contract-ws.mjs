/*
 * In order to setup game start in 10 seconds for 70 seconds run
 *
 * `node js/tools/setup-game-contract-ws.mjs`
 *
 * */

import { WebSocket } from 'ws';
import { mockDataItem } from './common.mjs';
import Const from '../common/const.mjs';

// const halfHourConfig = {
//   cmd: 'setup',
//   type: 'nextHalfHour',
//   duration: 15 * 60 * 1000
// };

const customConfig = {
  cmd: 'setup',
  type: 'custom',
  start: Date.now() + 10 * 1000,
  end: Date.now() + 70 * 1000,
};

const ws = new WebSocket('ws://localhost:8097');

ws.addEventListener('message', async (event) => {
  const response = JSON.parse(event.data);
  if (response.cmd === Const.Command.info && response.playWindow) {
    console.log(`Game play set up to `, response.playWindow);
    ws.close();
  }
});

ws.addEventListener('open', async () => {
  ws.send(JSON.stringify(mockDataItem(customConfig, 'stefan')));
});
