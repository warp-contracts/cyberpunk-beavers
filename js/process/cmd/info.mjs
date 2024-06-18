
export function standInQueue(state, action) {
  if (!state.walletsQueue) {
    state.walletsQueue = [];
  }
  if (!state.walletsQueue.includes(action.walletAddress)) {
    state.walletsQueue.push(action.walletAddress);
    console.log(`Added wallet ${action.walletAddress} to queue, size ${state.walletsQueue.length}`)
  }
  return state.walletsQueue;
}

export function gameInfo(state, owner) {
  const player = state.players[owner];
  return {
    active: true,
    beaverId: player?.beaverId,
    stats: player?.stats || {}
  }
}

export function gameInfoBeforeStart(state) {
  return {
    stats: {},
    active: false,
    start: state.playWindow.begin,
    end: state.playWindow.end
  }
}
export function gameInfoAfterEnd(state, owner) {
  const player = state.players[owner];
  return {
    active: false,
    beaverId: player?.beaverId,
    stats: player?.stats || {}
  }
}


