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

export function hourSessionGamesConfig(hubProcessId, dateOfFirstGame) {
  return hourSessionDelayMS.map((delay) => {
    return gameCustomConfig(hubProcessId, dateOfFirstGame.getTime() + delay);
  });
}

export function gameCustomConfig(hubProcessId, date) {
  if (date) {
    return {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      start: date,
      end: date + gameDurationMS,
    };
  } else {
    return {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
    };
  }
}

export function activeGamesConfig(hubProcessId) {
  return [
    {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
    },
    {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
    },
  ];
}
