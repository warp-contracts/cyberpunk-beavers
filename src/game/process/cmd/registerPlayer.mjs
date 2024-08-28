import Const from '../../common/const.mjs';
import { calculateRandomPos } from './__init';

const { BEAVER_TYPES, Map, EMPTY_TILE, GameTreasure } = Const;

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
    if (walletsQueue.length >= state.playersLimit) {
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

  const additionalTokens = Object.fromEntries(
    Object.entries(state.gameTreasuresRarity)
      .filter(([key]) => key !== GameTreasure.cbcoin.type)
      .filter(([, value]) => value > 0)
      .map(([key, value]) => [key, { gained: 0, total: value }])
  );
  console.log(`additional tokens`, additionalTokens);

  let newPlayer = {
    walletAddress,
    userName,
    beaverId,
    equipment: {
      ...BEAVER_TYPES[beaverId].equipment,
    },
    stats: {
      name: BEAVER_TYPES[beaverId].name,
      ...BEAVER_TYPES[beaverId].stats,
      round: {
        last: 0,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: balance || 0,
        gained: 0, // info of tokens gained in the game
      },
      additionalTokens,
    },
    pos: calculatePlayerRandomPos(state),
  };
  playersOnTiles[newPlayer.pos.y][newPlayer.pos.x] = newPlayer.walletAddress;
  players[walletAddress] = newPlayer;
  if (generatedWalletAddress) {
    state.generatedWalletsMapping[generatedWalletAddress] = walletAddress;
  }
  sendHubNotification(state);
  return { player: newPlayer };
}

export function calculatePlayerRandomPos(state) {
  let isAllowedPosition = false;
  let pos;

  while (!isAllowedPosition) {
    pos = calculateRandomPos(state, Map.size);

    isAllowedPosition = !(state.playersOnTiles[pos.y][pos.x] || state.obstaclesTilemap[pos.y][pos.x] > EMPTY_TILE);
  }
  /*console.log(
    `random pos ${pos.x} ${pos.y} ${state.playersOnTiles[pos.y][pos.x]} ${state.obstaclesTilemap[pos.y][pos.x]} ${isAllowedPosition}`
  );*/

  return pos;
}

function sendHubNotification(state) {
  console.log(`---- GAME -- updating players`, state.hubProcessId);
  ao.send({
    Target: state.hubProcessId,
    Data: '1234',
    Action: JSON.stringify({
      cmd: Const.Command.hubGamePlayers,
      walletsQueue: state.walletsQueue,
    }),
  });
}
