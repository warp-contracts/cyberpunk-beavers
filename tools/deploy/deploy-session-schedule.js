import Const, { maps } from '../../src/game/common/const.mjs';
import ids from '../../src/game/config/warp-ao-ids.js';
import fs from 'fs';
import { addTokenProcessIds } from './token-keeper.js';

export function gameSetup(env, gameConfig, overrideConfig = {}) {
  const hubProcessId = ids[`hub_processId_${env}`];
  return {
    cmd: Const.Command.setup,
    type: 'custom',
    hubProcessId,
    ...gameConfig,
    ...overrideConfig,
  };
}

/**
 * Returns set of game settings based on file: session-config-{env}-{config}.json
 *
 * Game start is set based on first not null:
 *  - game start
 *  - previous game end + game break
 *  - execDate param
 *  - game session start
 *
 * @param env
 * @param sessionConfig
 * @param execDate overrides game session start from file config
 * @return {{setups: *[], mu: any, tokens: *}}
 */
export function schedulesForEnv(env, sessionConfig, execDate) {
  const setups = [];
  const { sessions, commonSetup, tokensShipment } = readConfigFile(env, sessionConfig);

  for (const gameSession of sessions) {
    console.log(`--- Game session `, gameSession);
    let gameStart = (execDate || dateFromStartObject(gameSession.start)).getTime();
    for (const game of gameSession.games) {
      if (!game.map) {
        throw new Error('Game map not set (e.g. "b1m1")');
      }
      if (!maps[game.map]) {
        throw new Error(`Unknown map ${game.map}`);
      }
      gameStart = dateFromStartObject(game.start)?.getTime() || gameStart;
      const gameDuration = game.gameDuration || gameSession.gameDuration || 300000; // default 5 minutes
      const gameEnd = gameStart + gameDuration;
      const setup = {
        ...commonSetup,
        ...gameSession.commonSetup,
        ...gameSetup(env, game),
        start: gameStart,
        end: gameEnd,
        mapTxId: maps[game.map].txId,
      };
      setup.gameTokens = addTokenProcessIds(tokensShipment, setup.gameTokens);
      displaySetup(setup);
      setups.push(setup);

      // next game setup
      const gameBreak = game.gameBreak || gameSession.gameBreak || 60000; // default 1 minute
      gameStart = gameEnd + gameBreak;
    }
  }

  return {
    tokensShipment,
    commonSetup,
    setups,
  };
}

function readConfigFile(env, sessionConfig = 'ao') {
  const file = `./tools/deploy/config/session-${env}-${sessionConfig}.json`;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error) {
    console.error(`Error reading and parsing config for ${env}. Expecting valid config: ${file}`, error);
  }
}

function dateFromStartObject(startInfo) {
  if (!startInfo) {
    return null;
  }
  let now = new Date();

  if (startInfo.secondsFromNow) {
    return new Date(now.getTime() + startInfo.secondsFromNow * 1_000);
  }

  const addDays =
    startInfo.dayOfTheWeek >= now.getDay()
      ? startInfo.dayOfTheWeek - now.getDay()
      : startInfo.dayOfTheWeek - now.getDay() + 7;
  let scheduleDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays);

  const timeArr = startInfo.time.split(':');
  if (timeArr.length) {
    scheduleDate.setHours(timeArr.shift());
  }
  if (timeArr.length) {
    scheduleDate.setMinutes(timeArr.shift());
  }
  if (timeArr.length) {
    scheduleDate.setSeconds(timeArr.shift());
  }
  return scheduleDate;
}

function displaySetup(setup) {
  console.log(`--- Game Setup `);
  const { start, end, gameplayConfig, gameTokens, walletsWhitelist, gameObjectsConfig } = setup;
  console.table({
    ...setup,
    start: new Date(start).toLocaleString(),
    end: new Date(end).toLocaleString(),
    gameplayConfig: JSON.stringify(gameplayConfig || {}),
    gameTokens: formatTokens(gameTokens),
    walletsWhitelist: upTo(JSON.stringify(walletsWhitelist || []), 200),
    gameObjectsConfig: JSON.stringify(gameObjectsConfig || {}),
  });
}

function formatTokens(gameTokens) {
  let smallerTokens = Object.fromEntries(
    Object.entries(gameTokens || {})
      .filter(([k, v]) => v.amount > 0)
      .map(([k, v]) => [k, { amount: v.amount, id: upTo(v.id, 8) }])
  );
  return upTo(JSON.stringify(smallerTokens), 200);
}

function upTo(str, size) {
  if (str.length > size) {
    return str.substring(0, size - 3) + '...';
  }
  return str;
}
