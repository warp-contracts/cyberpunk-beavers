import Const from './common/const.mjs';

const TOKEN_CONTRACT_ID = 'cYHhrCJ4drNrL1HPR2LiahPcKn_ZfYLtxUy7CO-becM';
const TOKEN_CONTRACT_METHOD = 'Transfer';

function sendToken(recipient, qty) {
  ao.send({
    Target: TOKEN_CONTRACT_ID,
    Data: '1234',
    Action: TOKEN_CONTRACT_METHOD,
    Recipient: recipient,
    Quantity: qty.toString(),
  });
}

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
      sendToken(message.Owner, 1);
      ao.result({
        counter: state.counter,
        player: state.players[message.Owner],
      });
      break;
    case Const.Command.pick:
      const pickRes = pick(state, action);
      sendToken(message.Owner, 10);
      ao.result({
        cmd: Const.Command.picked,
        player: pickRes.player,
        picked: pickRes.picked,
        stats: pickRes.player.stats,
        scoreToDisplay: pickRes.scoreToDisplay,
      });
      break;
    case Const.Command.dig:
      const digRes = dig(state, action);
      if (digRes.digged) {
        sendToken(message.Owner, 1000);
      }
      ao.result({
        cmd: Const.Command.digged,
        player: digRes.player,
        stats: digRes.player.stats,
        digged: digRes.digged,
        scoreToDisplay: digRes.scoreToDisplay,
      });
      break;
    case Const.Command.attack:
      const attackRes = attack(state, action);
      sendToken(message.Owner, attackRes.damage);
      ao.result({
        cmd: Const.Command.moved,
        walletAddress: attackRes.player.name,
        stats: attackRes.player.stats,
        player: attackRes.player,
        opponentWalletAddress: attackRes.opponent?.name,
        opponentStats: attackRes.opponent?.stats,
        opponentPlayer: attackRes.opponent,
        scoreToDisplay: attackRes.scoreToDisplay,
        opponentScoreToDisplay: attackRes.opponentScoreToDisplay,
      });
      break;
    case Const.Command.move:
      const moveRes = movePlayer(state, action);
      sendToken(message.Owner, 1);
      ao.result({
        cmd: Const.Command.moved,
        stats: moveRes.player.stats,
        player: moveRes.player,
        scoreToDisplay: moveRes.scoreToDisplay,
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

const { GameObject, Direction, Scores } = Const;
const SIZE = 30;
let i = -1;
let j = 0;
const groundTiles = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2];

function initState(message) {
  const result = {
    counter: 0,
    pos: 1,
    map: {
      width: SIZE,
      height: SIZE,
    },
    gameObjectsTiles: [GameObject.ap, GameObject.hp, GameObject.none],
    gameObjectsRarity: 10,
    gameTreasuresTiles: [GameObject.treasure, GameObject.hole, GameObject.none],
    gameTreasuresRarity: 50,
    digged: [],
    round: {
      current: 0,
      start: message.Timestamp, //ms
      interval: 10_000, //ms
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
          return Array(SIZE).fill(1);
        }
        if (i === SIZE - 1) {
          return Array(SIZE).fill(1);
        }
        return Array(SIZE)
          .fill(0)
          .map(() => {
            j++;
            if (j === 3 || j === 10 || j === 15) {
              return 1;
            }
            return 0;
          });
      }),
  };

  return result;
}

function setVisibleGameObjects(state) {
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(
    state,
    state.gameObjectsTiles,
    state.gameObjectsRarity
  );
}

function setInvisibleGameObjects(state) {
  const gameTreasuresTilesToPropagate = state.gameTreasuresTiles.filter(
    (t) => t != GameObject.hole
  );
  state.gameTreasuresTilemap = setGameObjectsTilesOnMap(
    state,
    gameTreasuresTilesToPropagate,
    state.gameTreasuresRarity
  );
}

function setGameObjectsTilesOnMap(state, tilesToPropagate, noneTileFrequency) {
  for (let i = 0; i < noneTileFrequency; i++) {
    tilesToPropagate.push(GameObject.none);
  }

  return state.groundTilemap.map((a) => {
    return a.map((b) => {
      if (b == 0) {
        return tilesToPropagate[getRandomNumber(0, tilesToPropagate.length - 1)]
          .tile;
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
  const tsNow = message.Timestamp; //ms
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

  const tile = state.gameTreasuresTiles.find(
    (t) => t.tile === state.gameTreasuresTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = tile;

  if (type === GameObject.hole.type) {
    console.log(
      `Player ${player.walletAddress} tried to dig already existing hole.`
    );
    return { player, digged: false };
  }

  player.stats.ap.current -= 1;

  if (type === GameObject.none.type) {
    console.log(`Player ${player.walletAddress} digged nothing.`);
    state.gameTreasuresTilemap[player.pos[1]][player.pos[0]] =
      GameObject.hole.tile;
    return {
      player,
      digged: false,
      scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
    };
  }

  if (type == GameObject.treasure.type) {
    console.log(`Player stands on a game treasure: ${type}.`);
    state.digged.push({
      player: walletAddress,
      pos: { x: player.pos[1], y: player.pos[0] },
    });
    return {
      player,
      digged: { type },
      scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
    };
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

  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = gameObjectTile;

  if (type === GameObject.hp.type) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}.`);
    player.stats.hp.current += 5;
    state.gameObjectsTilemap[player.pos[1]][player.pos[0]] =
      GameObject.none.tile;
    return {
      player,
      picked: { type },
      scoreToDisplay: scoreToDisplay([
        { value: 5, type: Scores.hp },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else if (type === GameObject.ap.type) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}. `);
    player.stats.ap.current += 5;
    state.gameObjectsTilemap[player.pos[1]][player.pos[0]] =
      GameObject.none.tile;
    return {
      player,
      picked: { type },
      scoreToDisplay: scoreToDisplay([
        { value: 5, type: Scores.ap },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else if (type === GameObject.none.type) {
    const gameTreasureTile = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[player.pos[1]][player.pos[0]]
    );
    const { type } = gameTreasureTile;
    if (type === GameObject.none.type) {
      console.log(
        `Cannot perform pick ${player.walletAddress}. Player does not stand on a game object`
      );
      return { player, picked: false };
    } else if (type === GameObject.treasure.type) {
      player.stats.ap.current -= 1;
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

      state.gameTreasuresTilemap[player.pos[1]][player.pos[0]] =
        GameObject.hole.tile;
      return {
        player,
        picked: { type },
        scoreToDisplay: scoreToDisplay([
          { value: 10, type: Scores.coin },
          { value: -1, type: Scores.ap },
        ]),
      };
    }
  }

  return { player, picked: false };
}

function attack(state, action) {
  const damage = 10;
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];
  gamePlayerTick(state, player);
  if (player.stats.ap.current < 1) {
    console.log(
      `Cannot perform attak ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`
    );
    return { player, damage: 0 };
  }
  player.stats.ap.current -= 1;
  const attackPos = step(player.pos, action.dir);

  if (state.playersOnTiles[attackPos[1]][attackPos[0]]) {
    const opponent =
      state.players[state.playersOnTiles[attackPos[1]][attackPos[0]]];
    console.log(
      `Player ${player.walletAddress} attacked ${opponent.walletAddress}`
    );
    opponent.stats.hp.current -= damage;
    player.stats.score += damage;
    player.stats.ap.current -= 1;
    return {
      player,
      damage,
      opponent,
      scoreToDisplay: scoreToDisplay([
        { value: -1, type: GameObject.ap.type },
        { value: damage, type: null },
      ]),
      opponentScoreToDisplay: scoreToDisplay([
        { value: -damage, type: GameObject.hp.type },
      ]),
    };
  } else if (
    [2, 4, 6].includes(state.groundTilemap[attackPos[1]][attackPos[0]])
  ) {
    console.log(
      `Attack found obstacle ${player.walletAddress}. Tile ${attackPos} has obstacle`
    );
  }
  return { player, damage: 0 };
}

function movePlayer(state, action) {
  const walletAddress = action.walletAddress;
  const dir = action.dir;
  const player = state.players[walletAddress];
  gamePlayerTick(state, player);
  if (player.stats.ap.current < 1) {
    console.log(`Cannot move ${player.walletAddress}. Not enough ap`);
    return { player };
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
    return { player };
  } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
    console.log(
      `Cannot move ${player.walletAddress}. Tile ${newPos} occupied by ${
        state.playersOnTiles[newPos[1]][newPos[0]]
      }`
    );
    return { player };
  } else if ([2, 4, 6].includes(state.groundTilemap[newPos[1]][newPos[0]])) {
    console.log(
      `Cannot move ${player.walletAddress}. Tile ${newPos} has obstacle`
    );
    return { player };
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
    return {
      player,
      scoreToDisplay: scoreToDisplay([{ value: -1, type: GameObject.ap.type }]),
    };
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
        current: 10,
        max: 10,
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

function scoreToDisplay(scoreValues) {
  return scoreValues.map((v) => {
    const isValuePositive = v.value > 0;
    return {
      value: `${isValuePositive ? '+' : ''}${v.value}`,
      type: v.type?.toUpperCase() || '',
      sign: isValuePositive ? 'positive' : 'negative',
    };
  });
}
