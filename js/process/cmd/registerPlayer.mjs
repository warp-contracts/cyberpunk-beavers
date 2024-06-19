import Const from '../../common/const.mjs';

const { BEAVER_TYPES, Map } = Const;

export function registerPlayer(state, action) {
  const { beaverId, walletAddress } = action;
  const { players, walletsQueue } = state;

  // Player already registered, move along
  if (players[walletAddress]) {
    return players[walletAddress];
  }

  if (!walletsQueue.includes(walletAddress)) {
    // List is full, forget about it
    if (walletsQueue.length >= Const.Queue.limit) {
      const error = `Failed to register ${action.walletAddress}. Not on the list amd the list reached its limit ${walletsQueue.length}`;
      console.log(error);
      return { error };
    }
    // Register on the list after the game started
    walletsQueue.push(walletAddress);
  }


  if (!BEAVER_TYPES[beaverId]) {
    const error = `No beaver of type ${beaverId}`;
    console.error(error);
    return { error, };
  }

  let newPlayer = {
    walletAddress,
    beaverId,
    stats: {
      ...BEAVER_TYPES[beaverId],
      round: {
        last: 0,
      },
      coins: {
        available: 0, // tokens available for slashing
        transferred: 0, // info of tokens received through transfer
      },
    },
    pos: calculatePlayerRandomPos(state),
  };
  players[walletAddress] = newPlayer;
  return { player: newPlayer };
}

function calculatePlayerRandomPos(state) {
  let randomCounter = 0;
  let onObstacle = true;
  let pos;

  while (onObstacle) {
    const x = Math.floor(Math.random(randomCounter) * Map.size);
    randomCounter++;
    const y = Math.floor(Math.random(randomCounter) * Map.size);
    pos = { x, y };

    if ([1, 3].includes(state.groundTilemap[pos.y][pos.x])) {
      randomCounter++;
    } else {
      onObstacle = false;
    }
  }

  return pos;
}
