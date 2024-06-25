import Const from '../../common/const.mjs';

const { BEAVER_TYPES, Map } = Const;

export function registerPlayer(state, action) {
  const { beaverId, walletAddress } = action;
  const { players, walletsQueue } = state;

  // Player already registered, move along
  if (players[walletAddress]) {
    return { player: players[walletAddress] };
  }

  if (!walletsQueue.includes(walletAddress)) {
    // List is full, forget about it
    if (walletsQueue.length >= Const.Queue.limit) {
      const error = `Failed to register ${action.walletAddress}. Players limit exceeded ${walletsQueue.length}`;
      console.log(error);
      return { player: { walletAddress, error } };
    }
    // Register on the list after the game started
    walletsQueue.push(walletAddress);
  }


  if (!BEAVER_TYPES[beaverId]) {
    const error = `No beaver of type ${beaverId}`;
    console.error(error);
    return { player: { walletAddress, error } };
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
  let isAllowedPosition = false;
  let pos;

  while (!isAllowedPosition) {
    state.randomCounter++;
    const x = Math.floor(Math.random(state.randomCounter) * Map.size);
    state.randomCounter++;
    const y = Math.floor(Math.random(state.randomCounter) * Map.size);
    pos = { x, y };

    isAllowedPosition = !(state.playersOnTiles[pos.y][pos.x] || state.obstaclesTilemap[pos.y][pos.x] >= 0);
  }

  return pos;
}
