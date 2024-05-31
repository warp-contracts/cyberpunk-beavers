# CYBERPUNK BEAVERS

First of all, survive.
Attack: close combat, range attacks, surprises.
Defend, avoid getting hit, look for items and score points.
After a limited number of rounds, the game ends and a living beaver with the max points wins.

### In order to run the game

1. Build the game contract```
   `yarn build`

2. Start backend node.js server (Only if you prefer websockets, otherwise skip it)
   `yarn dev `

3. Start local static http server, e.g.
   `yarn serve`

4. Open the game at `http://localhost:9001/`

# Game details

### Starting battle 

After picking a character (or loading already attached beaver)

- Add waiting room and trigger to start the battle
- Add trigger to end the game and display results

The battle for survival starts when
