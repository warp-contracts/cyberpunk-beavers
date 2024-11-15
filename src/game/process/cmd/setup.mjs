import Const, { DEFAULT_ROUND_INTERVAL_MS, GAMEPLAY_MODES, PRIZES } from '../../common/const.mjs';
import { allGameObjectTiles, overwriteGameObjectParams, setVisibleGameObjects } from './__init.js';
import { setTeams } from './teams.js';

export const SetupType = {
  custom: 'custom', // primary setup, run after game creation
  simple: 'simple', // for simple updates
};

export function setup(state, action, message) {
  console.log(`Setup`, action);
  if (ao.env.Process.Owner !== message.Owner) {
    console.log(`Unauthorized setup attempt by`, message.Owner);
    return {
      playWindow: state.playWindow,
    };
  }

  state.gameObjectsConfig = action.gameObjectsConfig || state.gameObjectsConfig;
  if (action.gameObjectsConfig?.items?.length > 0) {
    state.gameObjectsTiles = allGameObjectTiles();
    overwriteGameObjectParams(state.gameObjectsTiles, action.gameObjectsConfig.items);
    setVisibleGameObjects(state);
  }
  state.teamsConfig = action.teamsConfig || state.teamsConfig;
  if (state.teamsConfig?.amount > 0) setTeams(state);

  const changed = {
    ...updateProperty(state, action, 'bridgeProcessId'),
    ...updateProperty(state, action, 'hubProcessId'),
    ...updateProperty(state, action, 'leaderboardProcessId'),
    ...updateProperty(state, action, 'mode', Const.GAME_MODES.default.type),
    ...updateProperty(state, action, 'playersLimit'),
    ...updateProperty(state, action, 'scoresSent'),
    ...updateProperty(state, action, 'tokensTransferred'),
    ...updateProperty(state, action, 'walletsWhitelist'),
  };

  console.log(`Setup changed`, changed);

  state.gameplayMode = action.gameplayConfig?.mode || state.gameplayMode || GAMEPLAY_MODES.deathmatch;
  state.gameplayPrizes =
    action.gameplayConfig?.prizes || state.gameplayPrizes || PRIZES[state.gameplayMode]?.[state.mode];

  switch (action.type) {
    case SetupType.custom:
      const delay = action.startDelay || Const.GAME_ENTER_DELAY;
      state.playWindow.begin = action.start;
      state.playWindow.enter = action.start + delay;
      state.round.start = state.playWindow.enter;
      state.round.interval = action.roundInterval || DEFAULT_ROUND_INTERVAL_MS;

      if (
        state.gameplayMode === GAMEPLAY_MODES.deathmatch ||
        state.gameplayMode === GAMEPLAY_MODES.battleRoyale ||
        state.gameplayMode === GAMEPLAY_MODES.horde
      ) {
        state.playWindow.end = action.end + delay;
        state.playWindow.roundsTotal = calculateTotalRounds(state);
      }

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

      console.log(`Setup custom finished`);
      break;

    case SetupType.simple:
      console.log(`Setup simple finished`);
      break;

    default:
      console.log(`Unknown setup type`, action.type);
      break;
  }

  sendHubNotification(state);
  return {
    playWindow: state.playWindow,
    gameplayMode: state.gameplayMode,
    ...changed,
  };
}

function updateProperty(state, action, name, defaultValue) {
  // 1. Update state based on action config
  if (action.hasOwnProperty(name) && state[name] !== action[name]) {
    state[name] = action[name];
    return {
      [name]: state[name],
    };
  }

  // 2. Otherwise, set default if not already set
  if (defaultValue && !state[name]) {
    state[name] = defaultValue;
    return {
      [name]: state[name],
    };
  }
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
        teams: state.teamsConfig.amount > 0,
      },
    }),
  });
}
