import { WebSocketServer, WebSocket } from 'ws';
import Const from '../common/const.mjs';
import gameContract from "./game-contract.mjs";

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listener for WebSocket connections
wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    // Event listener for messages from the client
    ws.on('message', function incoming(message) {
        console.log('Received message from client: %s', message);
        const req = JSON.parse(message);

        switch (req.cmd) {
            case Const.Command.register: {
                const response = {
                    cmd: Const.Command.registered,
                    level1: gameContract.state.level1,
                    level2: gameContract.state.level2,
                    player: gameContract.registerPlayer(getRandomNumber(0, 19))
                }
                console.log('Response: ', JSON.stringify(response));
                ws.send(JSON.stringify(response));
            }
            break;
            case Const.Command.move: {
                const response = {
                    cmd: Const.Command.moved,
                    pid: req.pid,
                    pos: gameContract.movePlayer(req)
                }
                console.log('Response: ', JSON.stringify(response));

                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        setTimeout(() => {
                            client.send(JSON.stringify(response));
                        }, 150)
                    }
                });
            }

        }
    });

    // Event listener for WebSocket disconnections
    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on port 8080');
