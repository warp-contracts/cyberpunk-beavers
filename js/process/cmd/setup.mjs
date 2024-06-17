export function setup(state, action, message) {
  console.log(`setup`, action);
  console.log(`ao`, ao.env.Process);
  if (ao.env.Process.Owner !== message.Owner) {
    console.log(`Unauthorized setup attempt by`, message.Owner);
    return {
      playWindow: state.playWindow
    }
  }

  if (action.type === 'nextFullHour') {
    const nextFullHour = (Math.floor(message.Timestamp/3600000) + 1) * 3600000;
    state.playWindow = {
      begin: nextFullHour,
      end: nextFullHour + (5 * 60 * 1000)
    }
    console.log(`Setup nextFullHour`, state.playWindow);
  } else {
    if (!state.playWindow.begin) {
      state.playWindow.begin = action.start;
    }
    if (!state.playWindow.end) {
      state.playWindow.end = action.end;
    }
  }
  return {
    playWindow: state.playWindow
  }
}
