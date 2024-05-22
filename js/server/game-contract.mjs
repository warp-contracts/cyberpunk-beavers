import Const from '../common/const.mjs';

const { GameObject, Direction } = Const;
const SIZE = 60;
let i = -1;
let j = 0;
const groundTiles = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6];
const gameObjectsTiles = [
  { tile: 0, type: GameObject.ap },
  { tile: 1, type: GameObject.hp },
];
for (let i = 0; i < 11; i++) {
  gameObjectsTiles.push({ tile: 2, type: GameObject.none });
}
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

const digged = [];

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

/**
 * Updates current game round
 */
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
  const player = state.players[message.walletAddress];

  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform pick ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player, picked: false };
  }

  player.stats.ap.current -= 1;

  const tile = gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = tile;
  if (type === GameObject.none) {
    console.log(
      `Cannot perform pick ${player.walletAddress}. Player does not stand on a game object`
    );
    return { player, picked: false };
  }

  const diggedObject = digged.find(
    (d) =>
      d.player == message.walletAddress &&
      d.pos.x == player.pos[1] &&
      d.pos.y == player.pos[0]
  );
  if (!diggedObject) {
    console.log(
      `Player ${message.walletAddress} does not stand on the object digged by them.`
    );
    return { player, picked: false };
  }

  console.log(type);
  if (type === GameObject.hp) {
    console.log(`Player stands on a game object, increasing ${type}.`);
    player.stats.hp.current += 5;
  } else if (type === GameObject.ap) {
    console.log(`Player stands on a game object, increasing ${type}. `);
    player.stats.ap.current += 5;
  }

  digged.splice(digged.indexOf(diggedObject), 1);
  return { player, picked: true };
}

function dig(message) {
  const player = state.players[message.walletAddress];

  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform dig ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player, digged: false };
  }

  player.stats.ap.current -= 1;

  const tile = gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = tile;
  if (type === GameObject.none) {
    console.log(`Player ${player.walletAddress} digged nothing.`);
    return { player, digged: false };
  }

  if (type !== GameObject.none) {
    console.log(`Player stands on a game object: ${type}.`);
    digged.push({
      player: message.walletAddress,
      pos: { x: player.pos[1], y: player.pos[0] },
    });
    return { player, digged: { type } };
  }

  return { player, picked: false };
}

function attack(message) {
  gameRoundTick();
  const player = state.players[message.walletAddress];
  gamePlayerTick(player);
  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform attak ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player };
  }
  const attackPos = step(player.pos, message.dir);

  if (state.playersOnTiles[attackPos[1]][attackPos[0]]) {
    const opponent =
      state.players[state.playersOnTiles[attackPos[1]][attackPos[0]]];
    console.log(`Player ${player.walletAddress} attacked ${opponent.name}`);
    opponent.stats.hp -= 10;
    player.stats.score += 10;
    return { player, opponent };
  } else if (
    [2, 4, 6].includes(state.groundTilemap[attackPos[1]][attackPos[0]])
  ) {
    console.log(
      `Attack found obstacle ${player.walletAddress}. Tile ${attackPos} has obstacle`
    );
  }
  return { player };
}

function movePlayer(message) {
  gameRoundTick();
  const player = state.players[message.walletAddress];
  gamePlayerTick(player);
  if (player.stats.ap.current < 1) {
    console.log(`Cannot move ${player.walletAddress}. Not enough ap`);
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
      `Cannot move ${player.walletAddress}. Reached edge of the universe ${newPos}`
    );
    return player;
  } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
    console.log(
      `Cannot move ${player.walletAddress}. Tile ${newPos} occupied by ${
        state.playersOnTiles[newPos[1]][newPos[0]]
      }`
    );
    return player;
  } else if ([2, 4, 6].includes(state.groundTilemap[newPos[1]][newPos[0]])) {
    console.log(
      `Cannot move ${player.walletAddress}. Tile ${newPos} has obstacle`
    );
    return player;
  } else {
    player.onGameObject = gameObjectsTiles.find(
      (t) => t.tile === state.gameObjectsTilemap[newPos[1]][newPos[0]]
    );

    state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
    state.playersOnTiles[newPos[1]][newPos[0]] = player.walletAddress;
    player.pos = newPos;
    player.stats.ap.current -= 1;
    return player;
  }
}

function registerPlayer(walletAddress, beaverId) {
  gameRoundTick();
  let newPlayer = {
    walletAddress,
    beaverId,
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
    pos: [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)],
  };
  return (state.players[newPlayer.walletAddress] = newPlayer);
}

export default {
  pick,
  dig,
  attack,
  state,
  movePlayer,
  registerPlayer,
};
