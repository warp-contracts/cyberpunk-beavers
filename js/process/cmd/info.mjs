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


