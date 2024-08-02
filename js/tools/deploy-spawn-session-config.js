const hourSessionDelayMS = [
  0, // first game will be active at the specified hour, without any delay
  6 * 60 * 1_000, // second game will start 6 minutes later
  12 * 60 * 1_000, //...
  18 * 60 * 1_000,
  24 * 60 * 1_000,
  30 * 60 * 1_000,
  36 * 60 * 1_000,
  42 * 60 * 1_000,
  48 * 60 * 1_000,
  54 * 60 * 1_000,
];
const gameDurationMS = 5 * 60 * 1_000; // 5 minutes

export function hourSessionGamesConfig(hubProcessId, dateOfFirstGame, playersLimit) {
  return hourSessionDelayMS.map((delay) => {
    return gameCustomConfig(hubProcessId, dateOfFirstGame.getTime() + delay, playersLimit);
  });
}

export function gameCustomConfig(hubProcessId, date, playersLimit) {
  if (date) {
    return {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      start: date,
      end: date + gameDurationMS,
      playersLimit,
    };
  } else {
    return {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      playersLimit,
    };
  }
}

export function activeGamesConfig(hubProcessId, playersLimit) {
  return [
    {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      playersLimit,
    },
    {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      playersLimit,
    },
  ];
}
