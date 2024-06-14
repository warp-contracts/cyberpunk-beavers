import Const from '../../common/const.mjs';

const { BEAVER_TYPES, Map } = Const;

export function registerPlayer(state, action) {
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
      coins: {
        available: 0, // tokens available for slashing
        transferred: 0, // info of tokens received through transfer
      },
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
