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

  if (walletsQueue.length >= state.playersLimit) {
    walletsBench.push(walletAddress);
  } else {
    walletsQueue.push(walletAddress);
    sendHubNotification(state);
  }
  return { walletsQueue, walletsBench };
}

export function removeFromQueue(state) {
  if (!state.dequeued) {
    const { walletsQueue, players } = state;
    const walletsDequeued = walletsQueue.filter((w) => players.hasOwnProperty(w));
    state.walletsQueue = walletsDequeued;
    sendHubNotification(state);
    state.dequeued = true;
  }
}

function sendHubNotification(state) {
  console.log(`---- GAME -- updating wallets queue`, state.hubProcessId);
  ao.send({
    Target: state.hubProcessId,
    Data: '1234',
    Action: JSON.stringify({
      cmd: Const.Command.hubGamePlayers,
      walletsQueue: state.walletsQueue,
    }),
  });
}

export function gameStats(state) {
  const { gameTokens, gameTreasuresCounter, lastTxs } = state;
  return {
    gameStats: { gameTokens, gameTreasuresCounter, lastTxs },
  };
}

export function gameInfo(state, owner, ts) {
  const { walletsQueue, walletsBench, players, playWindow } = state;
  return {
    player: players[owner],
    active: isGameActive(state, ts),
    walletsQueue,
    walletsBench,
    playersLimit: state.playersLimit,
    start: playWindow.begin,
    enter: playWindow.enter,
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
