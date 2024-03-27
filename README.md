

# CYBERPUNK BEAVERS


### In order to run the game

1. Start backend node.js server
``node js/server/main.mjs ``

2. Start local static http server, e.g.
`` python3 -m http.server 9000 ``

3. Open the game at `http://localhost:9000/`


### 

The game cun be run in single mode, using web socket mock.
Just switch the flag `window.game.config.useWebSocket` in `config.js` and skip first point the previous instruction.
