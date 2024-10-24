import { Monsters } from '../src/game/process/monsters/Monsters.js';

const state = {
  randomCounter: 0,
  round: {
    current: 2,
  },
  map: {
    width: 30,
  },
  playersOnTiles: Array(30)
    .fill([])
    .map(() => Array(30)),
  obstaclesTilemap: Array(30)
    .fill([])
    .map(() => Array(30)),
};

const monsters = new Monsters(state, Date.now());

console.table(monsters.waves);
