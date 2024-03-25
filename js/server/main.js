const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.WebSocketServer({ port: 8080 });

// Event listener for WebSocket connections
wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    // Event listener for messages from the client
    ws.on('message', function incoming(message) {
        console.log('Received message from client: %s', message);

        setTimeout(() => {
            // Echo the message back to the client
            ws.send('move ' + message);
        }, 500)
    });

    // Event listener for WebSocket disconnections
    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on port 8080');
