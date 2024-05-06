import { WebSocketServer, WebSocket } from 'ws';
import Const from '../common/const.mjs';
import gameContract from './game-contract.mjs';
import registerPlayer from './commands/register.mjs';
import getPlayer from './commands/join.mjs';

const WS_PORT = 8080;

// Create a WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

// Event listener for WebSocket connections
wss.on('connection', (ws) => {
  console.log('A new client connected');

  // Event listener for messages from the client
  ws.on('message', (message) => {
    console.log('------');
    console.log('WS REQ: %s', message);
    const req = JSON.parse(message);

    switch (req.cmd) {
      case Const.Command.pick: {
        const pickResult = gameContract.pick(req);
        logAndBroadcast(
          JSON.stringify({
            cmd: Const.Command.stats,
            walletAddress: req.walletAddress,
            stats: pickResult.player.stats,
          }),
        );

        if (pickResult.picked) {
          logAndBroadcast(
            JSON.stringify({
              cmd: Const.Command.picked,
              walletAddress: req.walletAddress,
              pos: pickResult.player.pos,
            }),
          );
        }
      }
        break;
      case Const.Command.attack: {
        const fightResult = gameContract.attack(req);
        logAndBroadcast(
          JSON.stringify({
            cmd: Const.Command.stats,
            walletAddress: req.walletAddress,
            stats: fightResult.player.stats,
          }));

        if (fightResult.opponent) {
          logAndBroadcast(JSON.stringify({
            cmd: Const.Command.stats,
            walletAddress: fightResult.opponent.name,
            stats: fightResult.opponent.stats,
          }));
        }
      }
        break;
      case Const.Command.register: {
        logAndReply(ws, JSON.stringify(registerPlayer(req.walletAddress, req.beaverId)));
      }
        break;
      case Const.Command.join: {
        logAndReply(ws, JSON.stringify(getPlayer(req.walletAddress)));
      }
        break;
      case Const.Command.move: {
        const player = gameContract.movePlayer(req);
        logAndBroadcast(JSON.stringify({
          cmd: Const.Command.moved,
          walletAddress: req.walletAddress,
          pos: player.pos,
          beaverId: player.beaverId,
          onGameObject: player.onGameObject,
        }));
        logAndReply(ws, JSON.stringify({
          cmd: Const.Command.stats,
          walletAddress: req.walletAddress,
          stats: player.stats,
        }));
      }
    }
  });

  // Event listener for WebSocket disconnections
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function logAndReply(ws, message) {
  console.log('WS RES:', message);
  ws.send(message);
}

function logAndBroadcast(message) {
  console.log('WS RES:', message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        client.send(message);
      }, 150);
    }
  });
}

console.log(`WebSocket server is running on port ${WS_PORT}`);
