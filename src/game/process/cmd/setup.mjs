import Const from '../../common/const.mjs';

const SetupTimes = {
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

  state.hubProcessId = action.hubProcessId || state.hubProcessId;
  state.bridgeProcessId = action.bridgeProcessId || state.bridgeProcessId;
  state.leaderboardProcessId = action.leaderboardProcessId || state.leaderboardProcessId;
  state.playersLimit = action.playersLimit || state.playersLimit || Const.Queue.defaultLimit;
  state.walletsWhitelist = action.walletsWhitelist || state.walletsWhitelist;
  state.mode = action.mode || state.mode || Const.GAME_MODES.default.type;

  switch (action.type) {
    case SetupTimes.custom:
      state.playWindow.begin = action.start;
      state.playWindow.enter = action.start + Const.GAME_ENTER_DELAY;
      state.playWindow.end = action.end;
      state.playWindow.roundsTotal = calculateTotalRounds(state);
      console.log(`Setup custom`, action, state.playWindow);
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
  return ~~((state.playWindow.end - state.round.start) / state.round.interval);
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
        playersLimit: state.playersLimit,
        walletsQueue: state.walletsQueue,
        mapTxId: state.mapTxId,
      },
    }),
  });
}
