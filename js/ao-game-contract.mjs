import Const from './common/const.mjs';
import { attack } from './ao-game-contract-attack.mjs';
import { step, scoreToDisplay } from './common/tools.mjs';
const { GameObject, Scores } = Const;

// ------- Token Contract Config
const TOKEN_CONTRACT_ID = 'Iny8fK0S1FCSVVOIWubg2L9EXV1RFaxgRJwv5-mwEYk';
const TOKEN_CONTRACT_METHOD = 'Transfer';
const TOKEN_ACTIONS = ['Credit-Notice', 'Debit-Notice', 'Transfer-Error'];

// ------- Beaver Config
const BEAVER_TYPES = {
  hacker_beaver: {
    ap: {
      current: 10,
      max: 10,
    },
    hp: {
      current: 100,
      max: 100,
    },
    damage: 10,
    bonus: {
      [GameObject.treasure.type]: 200,
    },
  },
  heavy_beaver: {
    ap: {
      current: 10,
      max: 10,
    },
    hp: {
      current: 200,
      max: 200,
    },
    damage: 20,
    bonus: {
      [GameObject.treasure.type]: 0,
    },
  },
  speedy_beaver: {
    ap: {
      current: 20,
      max: 20,
    },
    hp: {
      current: 100,
      max: 100,
    },
    damage: 10,
    bonus: {
      [GameObject.treasure.type]: 40,
    },
  },
};

function sendToken(recipient, qty) {
  ao.send({
    Target: TOKEN_CONTRACT_ID,
    Data: '1234',
    Action: TOKEN_CONTRACT_METHOD,
    Recipient: recipient,
    Quantity: qty.toString(),
  });
}

function handleMessageFromToken(state, action, message) {
  const qty = message.Tags.find((t) => t.name === 'Quantity').value;
  const recipient = message.Tags.find((t) => t.name === 'Recipient').value;
  const txId = message.Tags.find((t) => t.name === 'Message').value;
  const player = state.players[recipient];
  player.stats.coins += Number(qty);
  return ao.result({
    action,
    cmd: Const.Command.token,
    data: message.Data,
    tags: message.Tags,
    stats: player.stats,
    player: {
      walletAddress: recipient,
    },
    scoreToDisplay: scoreToDisplay([{ value: qty, type: Scores.coin, txId }]),
  });
}

export function handle(state, message) {
  console.log("We're in");
  state.randomCounter = 0;
  if (!state.hasOwnProperty('map')) {
    state = Object.assign(state, initState(message, state));
    setVisibleGameObjects(state);
    setInvisibleGameObjects(state);
  }

  const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;

  if (TOKEN_ACTIONS.includes(actionTagValue)) {
    return handleMessageFromToken(state, actionTagValue, message);
  }

  const action = JSON.parse(actionTagValue);
  action.walletAddress = message.Owner;
  gameRoundTick(state, message);
  gamePlayerTick(state, action);

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
      if (pickRes.picked && pickRes.picked.token > 0) {
        sendToken(message.Owner, pickRes.picked.token);
      }
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
      if (attackRes.damage > 0) {
        sendToken(message.Owner, attackRes.damage);
      }
      ao.result({
        cmd: Const.Command.attacked,
        pos: attackRes.attackPos,
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
      if (moveRes.moved) {
        sendToken(message.Owner, 1);
      }
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

const SIZE = 30;
let i = -1;
let j = 0;
const groundTiles = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 3];

function initState(message, state) {
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
            if (j == 1 || j == SIZE) {
              return 1;
            }
            state.randomCounter++;
            const randomValue = getRandomNumber(0, groundTiles.length - 1, state.randomCounter);
            return groundTiles[randomValue];
          });
      }),
  };

  return result;
}

function setVisibleGameObjects(state) {
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(state, state.gameObjectsTiles, state.gameObjectsRarity);
}

function setInvisibleGameObjects(state) {
  const gameTreasuresTilesToPropagate = state.gameTreasuresTiles.filter((t) => t != GameObject.hole);
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
      if (b == 2) {
        state.randomCounter++;
        const randomValue = getRandomNumber(0, tilesToPropagate.length - 1, state.randomCounter);
        return tilesToPropagate[randomValue].tile;
      } else {
        return 2;
      }
    });
  });
}

function getRandomNumber(min, max, randomCounter) {
  const randomValue = Math.random(randomCounter);
  return Math.floor(randomValue * (max - min + 1)) + min;
}

function gameRoundTick(state, message) {
  const tsNow = message.Timestamp; //ms
  const tsChange = tsNow - state.round.start;
  const round = ~~(tsChange / state.round.interval);
  console.log('Last round ', state.round);
  state.round.current = round;
  console.log(`new ts ${tsNow}  change ${tsChange}  round up to ${state.round.current}`);
}

function gamePlayerTick(state, action) {
  const player = state.players[action.walletAddress];
  console.log(`Player tick - ${player?.walletAddress}`);
  if (player && player.stats.round.last < state.round.current) {
    player.stats.ap.current = player.stats.ap.max;
    player.stats.round.last = state.round.current;
  }
}

function dig(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];
  if (player.stats.ap.current < 2) {
    console.log(`Cannot perform dig ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return { player, digged: false };
  }

  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  let { type: objectTile } = gameObjectTile;
  console.log(objectTile);
  if (objectTile != GameObject.none.type) {
    console.log(`Cannot perform dig ${player.walletAddress}. Player stands on a game object.`);
    return { player, digged: false };
  }

  const tile = state.gameTreasuresTiles.find(
    (t) => t.tile === state.gameTreasuresTilemap[player.pos[1]][player.pos[0]]
  );
  const { type } = tile;

  if (type === GameObject.hole.type) {
    console.log(`Player ${player.walletAddress} tried to dig already existing hole.`);
    return { player, digged: false };
  }

  player.stats.ap.current -= 2;

  if (type === GameObject.none.type) {
    console.log(`Player ${player.walletAddress} digged nothing.`);
    state.gameTreasuresTilemap[player.pos[1]][player.pos[0]] = GameObject.hole.tile;
    return {
      player,
      digged: { type },
      scoreToDisplay: scoreToDisplay([{ value: -2, type: Scores.ap }]),
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
      scoreToDisplay: scoreToDisplay([{ value: -2, type: Scores.ap }]),
    };
  }

  return { player, digged: false };
}

function pick(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];

  if (player.stats.ap.current < 1) {
    console.log(`Cannot perform pick ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return { player, picked: false };
  }

  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos[1]][player.pos[0]]
  );
  const { type, value } = gameObjectTile;

  if (type === GameObject.hp.type) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}.`);
    player.stats.hp.current += value;
    state.gameObjectsTilemap[player.pos[1]][player.pos[0]] = GameObject.none.tile;
    return {
      player,
      picked: { type, token: value },
      scoreToDisplay: scoreToDisplay([
        { value: value, type: Scores.hp },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else if (type === GameObject.ap.type) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}. `);
    player.stats.ap.current += value;
    state.gameObjectsTilemap[player.pos[1]][player.pos[0]] = GameObject.none.tile;
    return {
      player,
      picked: { type, token: value },
      scoreToDisplay: scoreToDisplay([
        { value: value, type: Scores.ap },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else if (type === GameObject.none.type) {
    const gameTreasureTile = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[player.pos[1]][player.pos[0]]
    );
    const { type, value } = gameTreasureTile;
    if (type === GameObject.none.type) {
      console.log(`Cannot perform pick ${player.walletAddress}. Player does not stand on a game object`);
      return { player, picked: false };
    } else if (type === GameObject.treasure.type) {
      player.stats.ap.current -= 1;
      const diggedTreasure = state.digged.find(
        (d) => d.player == walletAddress && d.pos.x == player.pos[1] && d.pos.y == player.pos[0]
      );
      if (!diggedTreasure) {
        console.log(`Player ${walletAddress} does not stand on the treasure digged by them.`);
        return { player, picked: false };
      }
      state.digged.splice(state.digged.indexOf(diggedTreasure), 1);

      state.gameTreasuresTilemap[player.pos[1]][player.pos[0]] = GameObject.hole.tile;
      const valueWithBonus = value + player.stats.bonus[GameObject.treasure.type];
      return {
        player,
        picked: { type, token: valueWithBonus },
        scoreToDisplay: scoreToDisplay([
          { value: valueWithBonus, type: Scores.coin },
          { value: -1, type: Scores.ap },
        ]),
      };
    }
  }

  return { player, picked: false };
}

function movePlayer(state, action) {
  const walletAddress = action.walletAddress;
  const dir = action.dir;
  const player = state.players[walletAddress];
  if (player.stats.ap.current < 1) {
    console.log(`Cannot move ${player.walletAddress}. Not enough ap`);
    return { player, moved: false };
  }

  const newPos = step(player.pos, dir);

  if (newPos[0] < 0 || newPos[0] >= SIZE || newPos[1] < 0 || newPos[1] >= SIZE) {
    console.log(`Cannot move ${player.walletAddress}. Reached edge of the universe ${newPos}`);
    return { player, moved: false };
  } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
    console.log(
      `Cannot move ${player.walletAddress}. Tile ${newPos} occupied by ${state.playersOnTiles[newPos[1]][newPos[0]]}`
    );
    return { player, moved: false };
  } else if ([1, 3].includes(state.groundTilemap[newPos[1]][newPos[0]])) {
    console.log(`Cannot move ${player.walletAddress}. Tile ${newPos} has obstacle`);
    return { player, moved: false };
  } else {
    player.onGameObject = state.gameObjectsTiles.find((t) => t.tile === state.gameObjectsTilemap[newPos[1]][newPos[0]]);

    player.onGameTreasure = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[newPos[1]][newPos[0]]
    );

    state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
    state.playersOnTiles[newPos[1]][newPos[0]] = player.walletAddress;
    player.pos = newPos;
    player.stats.ap.current -= 1;
    return {
      player,
      moved: true,
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
  if (!BEAVER_TYPES[beaverId]) {
    const errorMsg = `No beaver of type ${beaverId}`;
    console.error(errorMsg);
    return {
      error: errorMsg,
    };
  }
  let newPlayer = {
    walletAddress,
    beaverId,
    stats: {
      ...BEAVER_TYPES[beaverId],
      round: {
        last: 0,
      },
      coins: 0,
    },
    pos: calculatePlayerRandomPos(state),
  };
  state.players[newPlayer.walletAddress] = newPlayer;
  return newPlayer;
}

function calculatePlayerRandomPos(state) {
  let randomCounter = 0;
  let onObstacle = true;
  let pos;

  while (onObstacle) {
    const posVertical = Math.floor(Math.random(randomCounter) * SIZE);
    randomCounter++;
    const posHorizontal = Math.floor(Math.random(randomCounter) * SIZE);
    pos = [posVertical, posHorizontal];

    if ([1, 3].includes(state.groundTilemap[pos[1]][pos[0]])) {
      randomCounter++;
    } else {
      onObstacle = false;
    }
  }

  return pos;
}
