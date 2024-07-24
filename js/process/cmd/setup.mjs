import Const from '../../common/const.mjs';

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
      state.chatProcessId = action.chatProcessId;
      state.chatModuleId = action.chatModuleId;
      state.hubProcessId = action.hubProcessId;
      console.log(`Setup ${action.type}`, action);
      sendHubNotification(state);
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
      state.chatProcessId = action.chatProcessId;
      state.chatModuleId = action.chatModuleId;
      state.hubProcessId = action.hubProcessId;
      console.log(`Setup ${action.type}`, action);
      sendHubNotification(state);
      break;

    case SetupTimes.custom:
      state.playWindow.begin = action.start;
      state.playWindow.end = action.end;
      state.playWindow.roundsTotal = calculateTotalRounds(state);
      console.log(`Setup custom`, state.playWindow);
      state.chatProcessId = action.chatProcessId;
      state.chatModuleId = action.chatModuleId;
      state.hubProcessId = action.hubProcessId;
      console.log(`Setup custom`, action);
      sendHubNotification(state);
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

function sendHubNotification(state) {
  console.log(`---- GAME -- registering game in hub`, state.hubProcessId);
  ao.send({
    Target: state.hubProcessId,
    Data: '1234',
    Action: JSON.stringify({
      cmd: Const.Command.hubRegisterGame,
      game: {
        playWindow: state.playWindow,
        playersLimit: Const.Queue.limit,
        players: state.walletsQueue,
        chatProcessId: state.chatProcessId,
        chatModuleId: state.chatModuleId,
      },
    }),
  });
}
