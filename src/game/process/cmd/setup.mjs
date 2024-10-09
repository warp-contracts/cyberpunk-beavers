import Const, { DEFAULT_ROUND_INTERVAL_MS, GAMEPLAY_MODES } from '../../common/const.mjs';

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
  state.tokensTransferred = action.tokensTransferred || state.tokensTransferred;
  state.mode = action.mode || state.mode || Const.GAME_MODES.default.type;

  state.gameplayMode = action.gameplayConfig?.mode || GAMEPLAY_MODES.deathmatch;

  switch (action.type) {
    case SetupTimes.custom:
      const delay = action.startDelay || Const.GAME_ENTER_DELAY;
      state.playWindow.begin = action.start;
      state.playWindow.enter = action.start + delay;
      state.playWindow.end = action.end + delay;
      state.round.start = state.playWindow.enter;
      state.round.interval = action.roundInterval || DEFAULT_ROUND_INTERVAL_MS;

      state.playWindow.roundsTotal = calculateTotalRounds(state);
      if (state.gameplayMode === GAMEPLAY_MODES.battleRoyale) {
        /*
        example shrinkSchedule: [
          { round: 10, size: 3 }, { round: 20, size: 5}, {round: 30, size: 8} ... etc
        ]
         */
        state.battleRoyale = {
          shrinkSchedule: calculateShrinkSchedule(state.playWindow.roundsTotal, state.map.width),
          shrinkCount: 0,
          totalShrinkSize: 0,
        };
      }

      console.log(`Setup custom`, action, state.playWindow);
      sendHubNotification(state);
      break;

    default:
      console.log(`Unknown setup type`, action.type, state.playWindow);
      break;
  }
  return {
    playWindow: state.playWindow,
    gameplayMode: state.gameplayMode,
  };
}

function calculateTotalRounds(state) {
  return ~~((state.playWindow.end - state.round.start) / state.round.interval);
}

const shrinkSizes = [1, 2, 2, 3, 3, 3];
// note: 'export' just to test this shit
export function calculateShrinkSchedule(roundsTotal, width) {
  console.log('calculateShrinkSchedule params', { roundsTotal, mapWidth: width });

  const minWidth = 15; // not to small?

  const shrinks = [];
  let currentWidth = width;
  let shrinkIndex = 0;
  while (currentWidth > minWidth) {
    console.log({ currentWidth, minWidth });
    const size = shrinkSizes[Math.min(shrinkIndex++, shrinkSizes.length - 1)];
    shrinks.push({ size });
    currentWidth -= size * 2;
  }

  const iterations = shrinks.length;

  // let's force all shrinks in first part of the game
  const effectiveRounds = Math.ceil(roundsTotal * 0.75);
  // console.log('effectiveRounds', effectiveRounds);

  // TODO: it would be better if shrinks were not evenly spaced (in time - or rounds), e.g. the
  // shrinks should happen more often in the later part of the game
  const roundsDistance = Math.floor(effectiveRounds / iterations);
  let nextRound = roundsDistance;
  for (const shrink of shrinks) {
    shrink.round = nextRound;
    nextRound += roundsDistance;
  }

  console.log(shrinks);

  return shrinks;
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
        gameplayMode: state.gameplayMode,
        mode: state.mode,
      },
    }),
  });
}
