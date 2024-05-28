import Const from './common/const.mjs';

export function handle(state, message) {
  console.log("We're in");
  if (!state.hasOwnProperty('map')) {
    state = Object.assign(state, initState(message));
    setVisibleGameObjects(state);
    setInvisibleGameObjects(state);
  }

  const action = JSON.parse(
    message.Tags.find((t) => t.name === 'Action').value
  );
  action.walletAddress = message.Owner;
  gameRoundTick(state, message);

  switch (action.cmd) {
    case 'increment':
      state.counter++;
      ao.result({
        counter: state.counter,
        player: state.players[message.Owner],
      });
      break;
    case Const.Command.pick:
      const pickRes = pick(state, action);
      ao.result({
        cmd: Const.Command.picked,
        player: pickRes.player,
        picked: pickRes.picked,
      });
      ao.result({
        cmd: Const.Command.stats,
        walletAddress: pickRes.player.name,
        stats: pickRes.player.stats,
        player: pickRes.player,
      });
      break;
    case Const.Command.dig:
      const digRes = dig(state, action);
      ao.result({
        cmd: Const.Command.digged,
        player: digRes.player,
        digged: digRes.digged,
      });
      break;
    case Const.Command.attack:
      const attackRes = attack(state, action);
      ao.result({
        cmd: Const.Command.stats,
        walletAddress: attackRes.player.name,
        stats: attackRes.player.stats,
        player: attackRes.player,
      });
      if (attackRes.opponent) {
        ao.result({
          cmd: Const.Command.stats,
          walletAddress: attackRes.opponent.name,
          stats: attackRes.opponent.stats,
          player: attackRes.opponent,
        });
      }
      break;
    case Const.Command.move:
      const moveRes = movePlayer(state, action);
      ao.result({
        cmd: Const.Command.moved,
        player: moveRes,
      });
      ao.result({
        cmd: Const.Command.stats,
        walletAddress: moveRes.name,
        stats: moveRes.stats,
        player: moveRes,
      });
      break;
    case Const.Command.register:
      ao.result({
        cmd: Const.Command.registered,
        player: registerPlayer(state, action),
        state,
      });
      break;
    case Const.Command.join:
      ao.result({
        cmd: Const.Command.registered,
        player: state.players[message.Owner],
        state,
      });
      break;
    default:
      throw new ProcessError(`Unknown action: ${action.cmd}`);
  }
}

const { GameObject, Direction } = Const;
const SIZE = 30;
let i = -1;
let j = 0;
const groundTiles = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6];

function initState(message) {
  const result = {
    counter: 0,
    pos: 1,
    map: {
      width: SIZE,
      height: SIZE,
    },
    gameObjectsTiles: [
      { tile: 0, type: GameObject.ap },
      { tile: 1, type: GameObject.hp },
      { tile: 2, type: GameObject.none },
    ],
    gameTreasuresTiles: [
      { tile: 0, type: GameObject.treasure },
      { tile: 1, type: GameObject.hole },
      { tile: 2, type: GameObject.none },
    ],
    digged: [],
    round: {
      current: 0,
      start: message.Timestamp * 1000,
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

  return result;
}

function setVisibleGameObjects(state) {
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(
    state,
    state.gameObjectsTiles,
    11
  );
}

function setInvisibleGameObjects(state) {
  const gameTreasuresTilesWthoutHole = state.gameTreasuresTiles.filter(
    (t) => t.type != 'hole'
  );
  state.gameTreasuresTilemap = setGameObjectsTilesOnMap(
    state,
    gameTreasuresTilesWthoutHole,
    11
  );
}

function setGameObjectsTilesOnMap(state, tiles, noneTileFrequency) {
  const gameObjectsTilesToPropagate = tiles;
  for (let i = 0; i < noneTileFrequency; i++) {
    gameObjectsTilesToPropagate.push({ tile: 2, type: GameObject.none });
  }

  return state.groundTilemap.map((a) => {
    return a.map((b) => {
      if ([1, 3, 5].includes(b)) {
        return gameObjectsTilesToPropagate[
          getRandomNumber(0, gameObjectsTilesToPropagate.length - 1)
        ].tile;
      } else {
        return 2;
      }
    });
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameRoundTick(state, message) {
  const tsNow = message.Timestamp * 1000;
  const tsChange = tsNow - state.round.start;
  const round = ~~(tsChange / state.round.interval);
  console.log('Last round ', state.round);
  state.round.current = round;
  console.log(
    `new ts ${tsNow}  change ${tsChange}  round up to ${state.round.current}`
  );
}

function gamePlayerTick(state, player) {
  console.log(player);
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

function dig(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];

  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform dig ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player, digged: false };
  }

  player.stats.ap.current -= 1;

  const tile = state.gameTreasuresTiles.find(
    (t) => t.tile === state.gameTreasuresTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = tile;
  if (type === GameObject.none || type === GameObject.hole) {
    console.log(`Player ${player.walletAddress} digged nothing.`);
    return { player, digged: false };
  }

  if (type !== GameObject.none) {
    console.log(`Player stands on a game treasure: ${type}.`);
    state.digged.push({
      player: walletAddress,
      pos: { x: player.pos[1], y: player.pos[0] },
    });
    return { player, digged: { type } };
  }

  return { player, digged: false };
}

function pick(state, action) {
  const walletAddress = action.walletAddress;

  const player = state.players[walletAddress];

  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform pick ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player, picked: false };
  }

  player.stats.ap.current -= 1;

  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = gameObjectTile;

  if (type === GameObject.hp) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}.`);
    player.stats.hp.current += 5;
    // TODO: do sth with this 2, currently it represent tile number for GameObject.none
    state.gameObjectsTilemap[player.pos[1]][player.pos[0]] = 2;
  } else if (type === GameObject.ap) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}. `);
    player.stats.ap.current += 5;
    // TODO: do sth with this 2, currently it represent tile number for GameObject.none
    state.gameObjectsTilemap[player.pos[1]][player.pos[0]] = 2;
  } else if (type === GameObject.none) {
    const gameTreasureTile = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[player.pos[1]][player.pos[0]]
    );
    const { type } = gameTreasureTile;
    if (type === GameObject.none) {
      console.log(
        `Cannot perform pick ${player.walletAddress}. Player does not stand on a game object`
      );
      return { player, picked: false };
    } else if (type === GameObject.treasure) {
      const diggedTreasure = state.digged.find(
        (d) =>
          d.player == walletAddress &&
          d.pos.x == player.pos[1] &&
          d.pos.y == player.pos[0]
      );
      if (!diggedTreasure) {
        console.log(
          `Player ${walletAddress} does not stand on the treasure digged by them.`
        );
        return { player, picked: false };
      }
      player.stats.coins += 10;
      state.digged.splice(state.digged.indexOf(diggedTreasure), 1);

      // TODO: do sth with this 2, currently it represent tile number for GameObject.none
      state.gameTreasuresTilemap[player.pos[1]][player.pos[0]] = 1;
    }
  }

  return { player, picked: true };
}

function attack(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];
  gamePlayerTick(state, player);
  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform attak ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player };
  }
  const attackPos = step(player.pos, action.dir);

  if (state.playersOnTiles[attackPos[1]][attackPos[0]]) {
    const opponent =
      state.players[state.playersOnTiles[attackPos[1]][attackPos[0]]];
    console.log(`Player ${player.walletAddress} attacked ${opponent.name}`);
    opponent.stats.hp.current -= 10;
    player.stats.score += 10;
    player.stats.ap.current -= 1;
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

function movePlayer(state, action) {
  const walletAddress = action.walletAddress;
  const dir = action.dir;
  const player = state.players[walletAddress];
  gamePlayerTick(state, player);
  if (player.stats.ap.current < 1) {
    console.log(`Cannot move ${player.walletAddress}. Not enough ap`);
    return player;
  }

  const newPos = step(player.pos, dir);

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
    player.onGameObject = state.gameObjectsTiles.find(
      (t) => t.tile === state.gameObjectsTilemap[newPos[1]][newPos[0]]
    );

    player.onGameTreasure = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[newPos[1]][newPos[0]]
    );

    state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
    state.playersOnTiles[newPos[1]][newPos[0]] = player.walletAddress;
    player.pos = newPos;
    player.stats.ap.current -= 1;
    return player;
  }
}

function registerPlayer(state, action) {
  const walletAddress = action.walletAddress;
  const beaverId = action.beaverId;
  if (state.players[walletAddress]) {
    return state.players[walletAddress];
  }
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
      coins: 0,
    },
    pos: [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)],
  };
  state.players[newPlayer.walletAddress] = newPlayer;
  return newPlayer;
}
