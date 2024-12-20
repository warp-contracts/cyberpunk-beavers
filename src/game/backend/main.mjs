import { WebSocket, WebSocketServer } from 'ws';
import { QuickJsPlugin } from 'warp-contracts-plugin-quickjs';
import ids from '../config/warp-ao-ids.js';
import fs from 'fs';
import { mockDataItem } from '../../../tools/common.mjs';
import { GAME_MODES, GAMEPLAY_MODES } from '../common/const.mjs';
import { readMapFromArweave } from '../../../tools/deploy/deploy-spawn-common.js';
import { DEV_MAP, maps } from '../common/mapsLayersConst.mjs';
import { Respawned } from '../common/gameObject.mjs';
import { TEAM_BONUS } from '../common/teams.mjs';

const WS_PORT = 8097;

// Create a WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });
const quickJSPlugin = new QuickJsPlugin({
  interruptCycles: 100000,
});

// GAME MODE
const modeIdx = process.argv.indexOf('--gameMode');
const mode = modeIdx == -1 ? GAME_MODES.default.type : process.argv[modeIdx + 1];

const processEnv = {
  Process: {
    Id: 'x'.repeat(43),
    Owner: 'stefan',
    Tags: [],
  },
  Module: {
    Id: 'y'.repeat(43),
    Owner: 'zenon',
    Tags: [],
  },
};

let txId = null;
let ongoingProcesses = await spawnGameHub();
const hub = ongoingProcesses[ids.hub_processId_dev];
Object.assign(ongoingProcesses, await spawnGame('N8b2aPBXFhtZXbygq3wveXukUCTKKSFEu5qxB4CL-zU'));
Object.assign(
  ongoingProcesses,
  await spawnGame('Ysm9Icl6MPtvS8Si2YaEiINyimUiBog3AxY4Tv2aUVA', Date.now() + 1000 * 1000)
);

// Event listener for WebSocket connections
wss.on('connection', (ws, request) => {
  console.log('A new client connected', request.url);
  ws.processId = request.url.substring(1);

  // Event listener for messages from the client
  ws.on('message', async (req) => {
    const message = JSON.parse(req);
    if (message.get) {
      const requestId = message.requestId;
      switch (message.request) {
        case 'state': {
          const processId = message.data.processId;
          const process = ongoingProcesses[processId];
          broadcast(process.state, processId, requestId);
          break;
        }
        default:
          console.log(`Get request: ${message.request} not found.`);
      }
      return;
    }
    const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;
    const processTagValue = message.Tags.find((t) => t.name === 'From-Process')?.value;
    console.log(`-------------------------------------------`);
    console.log('WS REQ: %s', processTagValue, actionTagValue);
    txId = message.Id;

    const process = ongoingProcesses[processTagValue];
    if (!process) {
      console.error(`Process not found ${processTagValue} among `, Object.keys(ongoingProcesses));
    } else {
      const result = await process.quickJS.handle(message, processEnv, process.state);
      process.state = result.State;
      if (result.Error) {
        console.error(result.Error);
      }
      if (result.Output) {
        logAndBroadcast(result.Output, processTagValue);
      }
      if (result.Messages.length) {
        const msg = result.Messages[0];
        const addresseeProcess = ongoingProcesses[msg.Target];
        if (addresseeProcess) {
          if (msg?.Tags?.find((t) => t.name === 'From-Process')) {
            msg.Tags.find((t) => t.name === 'From-Process').value = processTagValue;
          } else {
            msg?.Tags?.push({ name: 'From-Process', value: processTagValue });
          }
          // console.log(`-- Sending message to ${msg.Target} `, msg);
          const addresseeResult = await sendMessage(addresseeProcess.quickJS, addresseeProcess.state, msg);
          addresseeProcess.state = addresseeResult.State;
          if (addresseeResult.Output) {
            logAndBroadcast(addresseeResult.Output, msg.Target);
          }
        } else {
          // no process spawned in dev, probably aimed for AO, like transfer action
          console.log(`-- No process, sending debit notice back to ${msg.Target} `, msg);
          process.state = await sendDebitNotice(process.quickJS, process.state, msg);
        }
      }
    }
  });

  // Event listener for WebSocket disconnections
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function logAndBroadcast(message, processId) {
  message.txId = txId;
  console.log('WS RES:', message.txId, message.cmd, message[message.cmd], message.scoreToDisplay);
  broadcast(message, processId);
}

function broadcast(message, processId, requestId) {
  if (requestId) {
    message = { ...message, requestId };
  }
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.processId === processId) {
      setTimeout(() => {
        client.send(JSON.stringify(message));
      }, 150);
    }
  });
}

async function sendMessage(quickJs, state, message) {
  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(await quickJs.handle(message, processEnv, state));
    }, 10);
  });
}

async function sendDebitNotice(quickJs, state, message) {
  console.log(message);
  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      const result = await quickJs.handle(
        {
          Tags: [
            { name: 'Action', value: 'Debit-Notice' },
            { name: 'Message', value: '123123' },
            { name: 'Quantity', value: message.Quantity },
            { name: 'Recipient', value: message.Recipient },
          ],
        },
        processEnv,
        state
      );
      resolve(result.State);
    }, 600);
  });
}

async function spawnGameHub() {
  return {
    [ids.hub_processId_dev]: {
      quickJS: await quickJSPlugin.process({
        contractSource: fs.readFileSync('./dist/output-hub.js', 'utf-8'),
        binaryType: 'release_sync',
      }),
      state: {},
    },
  };
}

async function spawnGame(processId, start, end) {
  const quickJS = await quickJSPlugin.process({
    contractSource: fs.readFileSync('./dist/output-game.js', 'utf-8'),
    binaryType: 'release_sync',
  });

  const processRandomId = processId;
  const effectiveStart = start || Date.now() + 5 * 1000;
  const setupMessage = mockDataItem(
    {
      cmd: 'setup',
      type: 'custom',
      start: effectiveStart,
      end: end || effectiveStart + 5 * 60 * 1000,
      playersLimit: 30,
      hubProcessId: ids.hub_processId_dev,
      gameplayConfig: {
        mode: GAMEPLAY_MODES.horde,
      },
      roundInterval: 10000,
      startDelay: 5000,
      walletsWhitelist: [],
      gameObjectsConfig: {
        respawned: Respawned.random,
        items: [
          { type: 'shield', value: 300, rarity: 20, roundsToRespawn: 20 },
          { type: 'quad_damage', value: 500, rarity: 50, roundsToRespawn: 5 },
          { type: 'hazard', value: 500, rarity: 20, roundsToRespawn: 5 },
          { type: 'drill', rarity: 0 },
          { type: 'scanner_device', rarity: 0 },
        ],
      },
      teamsConfig: {
        amount: 2,
        weight: {
          frags: 2,
        },
        teams: [],
        bonus: TEAM_BONUS,
      },
    },
    processEnv.Process.Owner
  );
  const { mapTxId, mapJson } = await readMapFromArweave(maps[DEV_MAP].txId);

  console.log(mapTxId);

  const result = await quickJS.handle(setupMessage, processEnv, {
    rawMap: mapJson,
    mapTxId,
  });
  if (result.Error) {
    console.error(result.Error);
  }
  if (result.Messages.length) {
    const message = result.Messages[0];
    message.Tags.find((t) => t.name === 'From-Process').value = processRandomId;
    console.log(result.Messages[0]);
    hub.state = (await hub.quickJS.handle(result.Messages[0], processEnv, hub.state)).State;
  }
  return {
    [processRandomId]: {
      quickJS: quickJS,
      state: result.State,
    },
  };
}

console.log(`WebSocket server is running on port ${WS_PORT}`);
