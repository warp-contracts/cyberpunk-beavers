import { WebSocketServer, WebSocket } from 'ws';
import Const from '../common/const.mjs';
import move from "../common/move.js";

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
    }
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
    names.splice(random, 1);
    return {
        cmd: Const.Command.registered,
        player: newPlayer
    };
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
                    pos: move(gameState.players[req.pid].pos, req.dir)
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
