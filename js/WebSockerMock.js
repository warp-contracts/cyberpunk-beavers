import Const from "./common/const.mjs";
import move from "./common/move.js";

const gameState = {
    singlePlayer: {
        name: 'LocalPlayer',
        pos: [0, 0]
    }
}

const response = (request) => {
    switch (request.cmd) {
        case Const.Command.register: {
            return {
                cmd: Const.Command.registered,
                player: gameState.singlePlayer
            }
        }
        case Const.Command.move: {
            return {
                cmd: Const.Command.moved,
                pid: gameState.singlePlayer.name,
                pos: move(gameState.singlePlayer.pos, request.dir)
            }
        }
    }
}

export default function webSocketMock() {
    const listeners = {
        message: []
    };
    return {
        addEventListener: (event, callback) => {
            if (!listeners[event]) {
                listeners[event] = [];
            }
            listeners[event].push(callback);
            setTimeout(() => {
                callback({data: JSON.stringify({})});
            }, 100);
        },
        send: (data) => {
            console.log('WebSocketMock received req: ', data);
            const req = JSON.parse(data);
            console.log('WebSocketMock responding: ', response(req));
            listeners['message'].forEach((callback) => {
                callback({
                    data: JSON.stringify(response(req))
                });
            })
        }
    };
}


