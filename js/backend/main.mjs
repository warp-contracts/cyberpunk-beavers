import { WebSocketServer, WebSocket } from 'ws';
import {QuickJsPlugin} from "warp-contracts-plugin-quickjs";
import ids from '../config/warp-ao-ids.js';
import fs from "fs";

const WS_PORT = 8097;

// Create a WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

const quickJSPlugin = new QuickJsPlugin({});

/* ------ GAME ------*/
const gameSource = fs.readFileSync('./dist/output-game.js', 'utf-8');
const gameQuickJS = await quickJSPlugin.process({
  contractSource: gameSource,
  binaryType: "release_sync"
});
const map = JSON.parse(fs.readFileSync('./assets/maps/map-2-30x30.json', 'utf-8'));
let gameState = { rawMap: map };


/* ------ CHAT ------*/
const chatSource = fs.readFileSync('./dist/output-chat.js', 'utf-8');
const chatQuickJs = await quickJSPlugin.process({
  contractSource: chatSource,
  binaryType: "release_sync"
});
let chatState = {};

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

let txId = null;


// Event listener for WebSocket connections
wss.on('connection', (ws, request) => {
  console.log('A new client connected', request.url);
  ws.processId = request.url.substring(1);

  // Event listener for messages from the client
  ws.on('message', async (req) => {
    const message = JSON.parse(req);
    const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;
    const processTagValue = message.Tags.find((t) => t.name === 'From-Process').value;
    console.log(`-------------------------------------------`)
    console.log('WS REQ: %s', processTagValue, actionTagValue);
    txId = message.Id;

    if (ids['chat_processId_dev'] === processTagValue) {
      const result = await chatQuickJs.handle(message, processEnv, chatState);
      chatState = result.State;
      if (result.Error) {
        console.error(result.Error);
      }
      if (result.Output) {
        logAndBroadcast(result.Output, processTagValue);
      }
      if (result.Messages.length) {
        chatState = await sendResponse(chatQuickJs, chatState, result.Messages[0]);
      }
    } else {
      const result = await gameQuickJS.handle(message, processEnv, gameState);
      gameState = result.State;
      if (result.Error) {
        console.error(result.Error);
      }
      if (result.Output) {
        logAndBroadcast(result.Output, processTagValue);
      }
      if (result.Messages?.length) {
        gameState = await sendResponse(gameQuickJS, gameState, result.Messages[0]);
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
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.processId === processId) {
      setTimeout(() => {
        client.send(JSON.stringify(message));
      }, 150);
    }
  });
}

async function sendResponse(quickJs, state, message) {
  console.log(message);
  return await (new Promise((resolve, reject) => {
    setTimeout(async () => {
      const result = await quickJs.handle({
        Tags: [
          {name: 'Action', value: 'Debit-Notice'},
          {name: 'Message', value: '123123'},
          {name: 'Quantity', value: message.Quantity},
          {name: 'Recipient', value: message.Recipient},
        ]
      }, processEnv, state);
      resolve(result.State);
    }, 600);
  }));

}

console.log(`WebSocket server is running on port ${WS_PORT}`);
