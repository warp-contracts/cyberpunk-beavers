import { WebSocketServer, WebSocket } from 'ws';
import {QuickJsPlugin} from "warp-contracts-plugin-quickjs";
import fs from "fs";

const WS_PORT = 8097;

// Create a WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

const quickJSPlugin = new QuickJsPlugin({});

const contractSource = fs.readFileSync('./dist/output.js', 'utf-8');
const quickJs = await quickJSPlugin.process({
  contractSource,
  binaryType: "release_sync"
});

const processEnv = {
  Process: {
    Id: 'x'.repeat(43),
    Owner: "stefan",
    Tags: []
  },
  Module: {
    Id: 'y'.repeat(43),
    Owner: "zenon",
    Tags: []
  }
}

let state = {};
let txId = null;

// Event listener for WebSocket connections
wss.on('connection', (ws) => {
  console.log('A new client connected');

  // Event listener for messages from the client
  ws.on('message', async (req) => {
    // console.log('WS REQ: %s', message);
    const message = JSON.parse(req);
    txId = message.Id;
    const result = await quickJs.handle(message, processEnv, state);
    state = result.State;
    if (result.Error) {
      console.error(result.Error);
    }
    if (result.Output) {
      logAndBroadcast(result.Output);
    }
    if (result.Messages.length) {
      sendResponse(result.Messages[0]);
    }
  });

  // Event listener for WebSocket disconnections
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function logAndBroadcast(message) {
  message.txId = txId;
  console.log('WS RES:', message.txId, message.cmd, message[message.cmd], message.scoreToDisplay);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        client.send(JSON.stringify(message));
      }, 150);
    }
  });
}

function sendResponse(message) {
  console.log(message);
  setTimeout(async () => {
    const result = await quickJs.handle({
      Tags: [
        {name: 'Action', value: 'Debit-Notice'},
        {name: 'Message', value: '123123'},
        {name: 'Quantity', value: message.Quantity},
        {name: 'Recipient', value: message.Recipient},
      ]
    }, processEnv, state);
    state = result.State;
  }, 600);
}

console.log(`WebSocket server is running on port ${WS_PORT}`);
