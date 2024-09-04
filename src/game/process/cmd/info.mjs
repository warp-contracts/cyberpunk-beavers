import Const from '../../common/const.mjs';

/*
 * walletsQueue will join the game
 * */

export function standInQueue(state, action) {
  const { walletAddress } = action;
  const { walletsQueue } = state;

  if (walletsQueue.includes(walletAddress)) {
    return { walletsQueue };
  }

  if (walletsQueue.length < state.playersLimit) {
    walletsQueue.push(walletAddress);
    sendHubNotification(state);
  }
  return { walletsQueue };
}

export function activate(state) {
  if (!state.activated) {
    const { walletsQueue, players } = state;
    const walletsDequeued = walletsQueue.filter((w) => players.hasOwnProperty(w));
    state.walletsQueue = walletsDequeued;
    sendHubNotification(state);
    state.activated = true;
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
  const { walletsQueue, players, playWindow } = state;
  return {
    player: players[owner],
    active: isGameActive(state, ts),
    walletsQueue,
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
