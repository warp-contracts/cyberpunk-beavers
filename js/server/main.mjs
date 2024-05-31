import { WebSocketServer, WebSocket } from 'ws';
import { handle } from '../ao-game-contract.mjs';

const WS_PORT = 8080;

// Create a WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

const state = {};
global.ao = { result: logAndBroadcast, send: console.log };
let txId = null;

// Event listener for WebSocket connections
wss.on('connection', (ws) => {
  console.log('A new client connected');

  // Event listener for messages from the client
  ws.on('message', (message) => {
    console.log('------');
    console.log('WS REQ: %s', message);
    const req = JSON.parse(message);
    txId = req.Id;
    handle(state, req);
  });

  // Event listener for WebSocket disconnections
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function logAndBroadcast(message) {
  message.txId = txId;
  console.log('WS RES:', message.txId, message.cmd);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        client.send(JSON.stringify(message));
      }, 150);
    }
  });
}

console.log(`WebSocket server is running on port ${WS_PORT}`);
