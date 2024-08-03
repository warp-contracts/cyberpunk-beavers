import Const from '../../common/const.mjs';

/*
 * walletsQueue will join the game
 * walletsBench will be moved to the next game
 * */

export function standInQueue(state, action) {
  const { walletAddress } = action;
  const { walletsQueue, walletsBench } = state;

  if (walletsQueue.includes(walletAddress) || walletsBench.includes(walletAddress)) {
    return { walletsQueue, walletsBench };
  }

  if (walletsQueue.length >= Const.Queue.limit) {
    walletsBench.push(walletAddress);
  } else {
    walletsQueue.push(walletAddress);
  }
  return { walletsQueue, walletsBench };
}

export function gameStats(state) {
  const { gameTreasuresCounter, lastTxs } = state;
  return {
    gameStats: { gameTreasuresCounter, lastTxs },
  };
}

export function gameInfo(state, owner, ts) {
  const { walletsQueue, walletsBench, players, playWindow } = state;
  return {
    player: players[owner],
    active: isGameActive(state, ts),
    walletsQueue,
    walletsBench,
    start: playWindow.begin,
    end: playWindow.end,
    players,
  };
}

export function isGameActive(state, ts) {
  console.log(ts, state.playWindow);
  return !gameNotStarted(state, ts) && !gameFinished(state, ts);
}

export function gameNotStarted(state, ts) {
  return state.playWindow.begin && ts < state.playWindow.begin;
}

export function gameFinished(state, ts) {
  return state.playWindow.end && ts > state.playWindow.end;
}
