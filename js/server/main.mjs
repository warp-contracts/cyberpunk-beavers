import { WebSocketServer, WebSocket } from 'ws';
import gameContract from './game-contract.mjs';
import { handle } from '../ao-game-contract.mjs';

const WS_PORT = 8080;

// Create a WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

gameContract.setGameObjectsTilesOnMap();
const state = {};
global.ao = { result: logAndBroadcast, send: console.log };

// Event listener for WebSocket connections
wss.on('connection', (ws) => {
  console.log('A new client connected');

  // Event listener for messages from the client
  ws.on('message', (message) => {
    console.log('------');
    console.log('WS REQ: %s', message);
    const req = JSON.parse(message);
    handle(state, req);
  });

  // Event listener for WebSocket disconnections
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function logAndBroadcast(message) {
  console.log('WS RES:', message.cmd);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        client.send(JSON.stringify(message));
      }, 150);
    }
  });
}

console.log(`WebSocket server is running on port ${WS_PORT}`);
