export function gameStats(state) {
  const { gameTokens, gameTreasuresCounter, lastTxs, gameObjectsToRespawnInRound } = state;
  return {
    gameStats: { gameTokens, gameTreasuresCounter, lastTxs, gameObjectsToRespawnInRound },
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
