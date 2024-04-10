
```
 --- >>> Items marked #?? require discussion  <<< ---
``` 

# CYBERPUNK BEAVERS

First of all, survive.
Attack: close combat, range attacks, surprises.
Defend, avoid getting hit, look for items and score points.
After a limited number of rounds, the game ends and a living beaver with the max points wins.


### In order to run the game

1. Start backend node.js server
``node js/server/main.mjs ``

2. Start local static http server, e.g.
`` python3 -m http.server 9000 ``

3. Open the game at `http://localhost:9000/`


# Game details

### Choosing beavers (TODO) - Tadeuchi
After starting the game the user should be able to choose one of 3 beavers:
 - Tank
 - AgileOne
 - Techy

Each of them is skilled in its own way and has a different weapons, different amount of HP and AP.
Beaver is attached to the user wallet address by name service. 

### Starting battle (TODO)
After picking a character (or loading already attached beaver) the player lands in the waiting room #??
- Add waiting room and trigger to start the battle
- Add trigger to end the game and display results

The battle for survival starts when 
- number of players reaches required threshold #??
- and countdown ends #??

Users cannot join the game after its start #??

### Display possible actions and enable mouse control (TODO) - Asia
Display possible actions, after picking one highlight available tiles for performing the action.
Allow to select actions and tiles using mouse.

#### Actions
- Move: up, down, right, left. One tile at a time.
- Attack: close combat or range attack. Attack does not always mean hit. There should be some probability.
  - Tank: Rocket launcher and power glove.
  - AgileOne: Katana and machine gun.
  - Techy: Sniper rifle and taser.
- Defence mode #??
- Use Item #??

### Actions Points (partially implemented)
AP allows to perform actions in each round.
Amount of actions points depend on agility skill.
Do we keep left AP in the next round? #??

### Add items and inventory (TODO) - Asia
There should be some items scattered on the map, like
- coins (increase score)
- keys (loot)
- steam packs (heal)
- mines (attack)

Beaver can pick up yp to 2 items and store them in its inventory

