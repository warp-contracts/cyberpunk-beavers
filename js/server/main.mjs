import { WebSocketServer, WebSocket } from 'ws';
import Const from '../common/const.mjs';
import level from "./level.mjs";

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });
let names = [
    'Byteblade',
    'Cyberclaw Assassin',
    'Techshredder',
    'Nanofang Fury',
    'Blitzgnawer',
    'Machbyte Marauder',
    'Cyberblade Berserker',
    'Circuitcarver',
    'Byteburst Butcher',
    'Razorbyte Ravager',
    'Cyberfury Fangs',
    'Blitzgnasher',
    'Megabyte Mauler',
    'Byteblitz Bruiser',
    'Circuitcrusher',
    'Nanoblade Ninja',
    'Datastream Slayer',
    'Cyberstorm Striker',
    'Bytebreaker Banshee',
    'Techterror Tusk'];



const gameState = {
    players: {
    },
    playersOnTiles: Array(level.height).fill([]).map(() => Array(level.width))
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPlayer() {
    let random = getRandomNumber(0, names.length -1);

    let newPlayer = {
        name: names[random].replace(/\s/g, ''),
        pos: [random, random]
    }
    gameState.players[newPlayer.name] = newPlayer;
    gameState.playersOnTiles[newPlayer.pos[1]][newPlayer.pos[0]] = newPlayer.name;
    names.splice(random, 1);
    return {
        cmd: Const.Command.registered,
        player: newPlayer
    };
}

function move(player, dir) {
    const newPos = [...player.pos];
    switch (dir) {
        case Const.Direction.left :
            newPos[0] -= 1
            break;
        case Const.Direction.right :
            newPos[0] += 1
            break;
        case Const.Direction.up :
            newPos[1] -= 1
            break;
        case Const.Direction.down :
            newPos[1] += 1
            break;
    }
    if (gameState.playersOnTiles[newPos[1]][newPos[0]]) {
        console.log(`Cannot move ${player.name}. Tile ${newPos} occupied by ${gameState.playersOnTiles[newPos[1]][newPos[0]]}`);
        return player.pos;
    } else {
        gameState.playersOnTiles[player.pos[1]][player.pos[0]] = null;
        gameState.playersOnTiles[newPos[1]][newPos[0]] = player.name;
        return player.pos = newPos;
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
            case Const.Command.register: {
                const response = randomPlayer();
                console.log('Response: ', JSON.stringify(response));
                ws.send(JSON.stringify(response));
            }
            break;
            case Const.Command.move: {
                const response = {
                    cmd: Const.Command.moved,
                    pid: req.pid,
                    pos: move(gameState.players[req.pid], req.dir)
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
