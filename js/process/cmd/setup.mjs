const MilisecondsOf = {
  nextFullHour: 60 * 60 * 1000,
  nextHalfHour: 30 * 60 * 1000,
};

const SetupTimes = {
  nextFullHour: 'nextFullHour',
  nextHalfHour: 'nextHalfHour',
  nextSlot: 'nextSlot',
  custom: 'custom',
};

export function setup(state, action, message) {
  console.log(`Setup`, action);
  if (ao.env.Process.Owner !== message.Owner) {
    console.log(`Unauthorized setup attempt by`, message.Owner);
    return {
      playWindow: state.playWindow,
    };
  }

  switch (action.type) {
    case SetupTimes.nextSlot: {
      const nextMS = action.slotMinutes * 60 * 1000;
      const nextFull = (Math.floor(message.Timestamp / nextMS) + 1) * nextMS;
      const duration = action.playMinutes * 60 * 1000 || 5 * 60 * 1000;
      state.playWindow = {
        begin: nextFull,
        end: nextFull + duration,
      };
      state.playWindow.roundsTotal = calculateTotalRounds(state);
      console.log(`Setup ${action.type}`, state.playWindow);
      break;
    }

    case SetupTimes.nextFullHour:
    case SetupTimes.nextHalfHour:
      const ms = MilisecondsOf[action.type];
      const nextFullHour = (Math.floor(message.Timestamp / ms) + 1) * ms;
      const duration = action.duration || 5 * 60 * 1000;
      state.playWindow = {
        begin: nextFullHour,
        end: nextFullHour + duration,
      };
      state.playWindow.roundsTotal = calculateTotalRounds(state);
      console.log(`Setup ${action.type}`, state.playWindow);
      break;

    case SetupTimes.custom:
      state.playWindow.begin = action.start;
      state.playWindow.end = action.end;
      state.playWindow.roundsTotal = calculateTotalRounds(state);
      console.log(`Setup custom`, state.playWindow);
      break;

    default:
      console.log(`Unknown setup type`, action.type, state.playWindow);
      break;
  }
  return {
    playWindow: state.playWindow,
  };
}

function calculateTotalRounds(state) {
  return ~~((state.playWindow.end - state.playWindow.begin) / state.round.interval);
}
