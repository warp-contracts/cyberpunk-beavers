import { WebSocketServer, WebSocket } from 'ws';
import Const from '../common/const.mjs';
import gameContract from "./game-contract.mjs";

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function registerPlayer() {
    return {
        cmd: Const.Command.registered,
        level1: gameContract.state.level1,
        level2: gameContract.state.level2,
        player: gameContract.registerPlayer(getRandomNumber(0, gameContract.names.length-1))
    }
}

function getPlayer(id) {
    if (!id) {
        console.log(`Cannot getPlayer, id is undefined`);
    }
    const player = gameContract.state.players[id];
    if (!player) {
        console.log(`No player registered under id`, id);
        return registerPlayer();
    }
    return {
        cmd: Const.Command.registered,
        level1: gameContract.state.level1,
        level2: gameContract.state.level2,
        player: player
    }
}


// Event listener for WebSocket connections
wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    // Event listener for messages from the client
    ws.on('message', function incoming(message) {
        console.log('Received message from client: %s', message);
        const req = JSON.parse(message);

        switch (req.cmd) {
            case Const.Command.attack: {
                const fightResult = gameContract.attack(req);
                const response = {
                    cmd: Const.Command.stats,
                    pid: req.pid,
                    stats: fightResult.player.stats
                }
                console.log('Response: ', JSON.stringify(response));
                broadcast(JSON.stringify(response))
                if (fightResult.opponent) {
                    const response = {
                        cmd: Const.Command.stats,
                        pid: fightResult.opponent.name,
                        stats: fightResult.opponent.stats
                    }
                    console.log('Response: ', JSON.stringify(response));
                    broadcast(JSON.stringify(response))
                }
            }
            break;
            case Const.Command.register: {
                const response = registerPlayer();
                console.log('Response: ', JSON.stringify(response));
                ws.send(JSON.stringify(response));
            }
            break;
            case Const.Command.join: {
                const response = getPlayer(req.playerId);
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

                broadcast(JSON.stringify(response));
            }

        }
    });

    // Event listener for WebSocket disconnections
    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            setTimeout(() => {
                client.send(message);
            }, 150)
        }
    });
}

console.log('WebSocket server is running on port 8080');
