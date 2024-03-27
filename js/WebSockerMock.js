import Const from "./const.mjs";

const response = (request) => {
    switch (request.cmd) {
        case Const.Command.register: {
            return {
                cmd: 'registered',
                player: {
                    name: 'LocalPlayer',
                    pos: [0, 0]
                }
            }
        }
        case Const.Command.move: {
            return {
                cmd: Const.Command.move,
                dir: request.dir
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
            listeners['message'].forEach((callback) => {
                callback({
                    data: JSON.stringify(response(req))
                });
            })
        }
    };
}


