import Const from '../../common/const.mjs';
import { calculateRandomPos } from './__init';

const { BEAVER_TYPES, Map } = Const;

export function registerPlayer(state, action) {
  const { beaverId, walletAddress, userName, balance, generatedWalletAddress } = action;
  const { players, playersOnTiles, walletsQueue } = state;

  // Player already registered, move along
  if (players[walletAddress]) {
    if (balance) {
      players[walletAddress].stats.coins.balance = balance;
    }
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
    userName,
    beaverId,
    stats: {
      ...BEAVER_TYPES[beaverId],
      round: {
        last: 0,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      coins: {
        balance: balance || 0,
        gained: 0, // info of tokens gained in the game
      },
    },
    pos: calculatePlayerRandomPos(state),
  };
  playersOnTiles[newPlayer.pos.y][newPlayer.pos.x] = newPlayer.walletAddress;
  players[walletAddress] = newPlayer;
  if (generatedWalletAddress) {
    state.generatedWalletsMapping[generatedWalletAddress] = walletAddress;
  }
  return { player: newPlayer };
}

export function calculatePlayerRandomPos(state) {
  let isAllowedPosition = false;
  let pos;

  while (!isAllowedPosition) {
    pos = calculateRandomPos(state, Map.size);

    isAllowedPosition = !(state.playersOnTiles[pos.y][pos.x] || state.obstaclesTilemap[pos.y][pos.x] >= 0);
  }
  console.log(
    `random pos ${pos.x} ${pos.y} ${state.playersOnTiles[pos.y][pos.x]} ${state.obstaclesTilemap[pos.y][pos.x]} ${isAllowedPosition}`
  );

  return pos;
}
