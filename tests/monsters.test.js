import { Horde } from '../src/game/process/monsters/Horde.js';

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

const monsters = new Horde(state, Date.now());

console.table(monsters.waves);
