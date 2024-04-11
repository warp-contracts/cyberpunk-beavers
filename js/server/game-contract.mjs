import Const from '../common/const.mjs';

const { GameObject, Direction } = Const;
const SIZE = 30;
let i = -1;
let j = 0;
const groundTiles = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6];
const gameObjectsTiles = [
  { tile: 0, type: GameObject.ap },
  { tile: 1, type: GameObject.hp },
  { tile: 2, type: GameObject.none },
  { tile: 2, type: GameObject.none },
  { tile: 2, type: GameObject.none },
  { tile: 2, type: GameObject.none },
  { tile: 2, type: GameObject.none },
  { tile: 2, type: GameObject.none },
  { tile: 2, type: GameObject.none },
];
const state = {
  map: {
    width: SIZE,
    height: SIZE,
  },
  round: {
    current: 0,
    start: Date.now(),
    interval: 50000,
  },
  players: {},
  playersOnTiles: Array(SIZE)
    .fill([])
    .map(() => Array(SIZE)),
  groundTilemap: Array(SIZE)
    .fill([])
    .map(() => {
      i++;
      j = 0;
      if (i === 0) {
        return Array(SIZE).fill(7);
      }
      if (i === SIZE - 1) {
        return Array(SIZE).fill(8);
      }
      return Array(SIZE)
        .fill(0)
        .map(() => {
          j++;
          if (j === 3 || j === 10 || j === 15) {
            return 0;
          }
          return groundTiles[getRandomNumber(0, groundTiles.length - 1)];
        });
    }),
};

state.gameObjectsTilemap = state.groundTilemap.map((a) => {
  return a.map((b) => {
    if ([1, 3, 5].includes(b)) {
      return gameObjectsTiles[getRandomNumber(0, gameObjectsTiles.length - 1)]
        .tile;
    } else {
      return 2;
    }
  });
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameRoundTick() {
  const tsNow = Date.now();
  const tsChange = tsNow - state.round.start;
  const round = ~~(tsChange / state.round.interval);
  console.log('Last round ', state.round);
  state.round.current = round;
  console.log(
    `new ts ${tsNow}  change ${tsChange}  round up to ${state.round.current}`
  );
}

function gamePlayerTick(player) {
  if (player.stats.round.last < state.round.current) {
    player.stats.ap.current = player.stats.ap.max;
    player.stats.round.last = state.round.current;
  }
}

function step(pos, dir) {
  switch (dir) {
    case Direction.left:
      return [pos[0] - 1, pos[1]];
    case Direction.right:
      return [pos[0] + 1, pos[1]];
    case Direction.up:
      return [pos[0], pos[1] - 1];
    case Direction.down:
      return [pos[0], pos[1] + 1];
  }
}

function pick(message) {
  const player = state.players[message.pid];

  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform pick ${player.name}. Not enough ap ${player.stats.ap.current}`
    );
    return { player, picked: false };
  }

  player.stats.ap.current -= 1;

  const tile = gameObjectsTiles.find(
    (t) => t.tile == state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = tile;
  if (type == GameObject.none) {
    console.log(
      `Cannot perform pick ${player.name}. Player does not stand on a game object`
    );
    return { player, picked: false };
  }

  player.stats.ap.current -= 1;
  console.log(type);
  if (type == GameObject.hp) {
    console.log(`Player stands on a game object, increasing ${type}.`);
    player.stats.hp.current += 5;
  } else if (type == GameObject.ap) {
    console.log(`Player stands on a game object, increasing ${type}. `);
    player.stats.ap.current += 5;
  }

  return { player, picked: true };
}

function attack(message) {
  gameRoundTick();
  const player = state.players[message.pid];
  gamePlayerTick(player);
  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform attak ${player.name}. Not enough ap ${player.stats.ap.current}`
    );
    return { player };
  }
  const attackPos = step(player.pos, message.dir);

  if (state.playersOnTiles[attackPos[1]][attackPos[0]]) {
    const opponent =
      state.players[state.playersOnTiles[attackPos[1]][attackPos[0]]];
    console.log(`Player ${player.name} attacked ${opponent.name}`);
    opponent.stats.hp -= 10;
    player.stats.score += 10;
    return { player, opponent };
  } else if (
    [2, 4, 6].includes(state.groundTilemap[attackPos[1]][attackPos[0]])
  ) {
    console.log(
      `Attack found obstacle ${player.name}. Tile ${attackPos} has obstacle`
    );
  }
  return { player };
}

function movePlayer(message) {
  gameRoundTick();
  const player = state.players[message.pid];
  gamePlayerTick(player);
  if (player.stats.ap.current < 1) {
    console.log(`Cannot move ${player.name}. Not enough ap`);
    return player;
  }

  const newPos = step(player.pos, message.dir);

  if (
    newPos[0] < 0 ||
    newPos[0] >= SIZE ||
    newPos[1] < 0 ||
    newPos[1] >= SIZE
  ) {
    console.log(
      `Cannot move ${player.name}. Reached edge of the universe ${newPos}`
    );
    return player;
  } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
    console.log(
      `Cannot move ${player.name}. Tile ${newPos} occupied by ${
        state.playersOnTiles[newPos[1]][newPos[0]]
      }`
    );
    return player;
  } else if ([2, 4, 6].includes(state.groundTilemap[newPos[1]][newPos[0]])) {
    console.log(`Cannot move ${player.name}. Tile ${newPos} has obstacle`);
    return player;
  } else {
    player.onGameObject = gameObjectsTiles.find(
      (t) => t.tile == state.gameObjectsTilemap[newPos[1]][newPos[0]]
    );

    state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
    state.playersOnTiles[newPos[1]][newPos[0]] = player.name;
    player.pos = newPos;
    player.stats.ap.current -= 1;
    return player;
  }
}

function registerPlayer(randomId) {
  gameRoundTick();
  let newPlayer = {
    name: names[randomId].replace(/\s/g, ''),
    stats: {
      ap: {
        current: 100,
        max: 100,
      },
      hp: {
        current: 100,
        max: 100,
      },
      round: {
        last: 0,
      },
      score: 0,
    },
    pos: [randomId, randomId],
  };
  names.splice(randomId, 1);
  return (state.players[newPlayer.name] = newPlayer);
}

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
  'Techterror Tusk',
];

export default {
  pick,
  attack,
  state,
  movePlayer,
  names,
  registerPlayer,
};
