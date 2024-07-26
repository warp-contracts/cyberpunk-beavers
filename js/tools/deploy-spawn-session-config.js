const hourSessionDelayMS = [
  0, // first game will be active at the specified hour, without any delay
  6 * 60 * 1_000, // second game will start 6 minutes later
  12 * 60 * 1_000, //...
  18 * 60 * 1_000,
  24 * 60 * 1_000,
  // 30 * 60 * 1_000,
  // 36 * 60 * 1_000,
  // 42 * 60 * 1_000,
  // 48 * 60 * 1_000,
  // 54 * 60 * 1_000,
];
const gameDurationMS = 5 * 60 * 1_000; // 5 minutes

export function hourSessionGamesConfig(hubProcessId, dateOfFirstGame, playersLimit, treasures) {
  return hourSessionDelayMS.map((delay) => {
    return gameCustomConfig(hubProcessId, dateOfFirstGame.getTime() + delay, playersLimit, treasures);
  });
}

export function gameCustomConfig(hubProcessId, date, playersLimit, treasures) {
  if (date) {
    return {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      start: date,
      end: date + gameDurationMS,
      playersLimit,
      treasures,
    };
  } else {
    return {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      playersLimit,
      treasures,
    };
  }
}

export function activeGamesConfig(hubProcessId, playersLimit, treasures) {
  return [
    {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      playersLimit,
      treasures,
    },
    {
      cmd: 'setup',
      type: 'custom',
      hubProcessId,
      playersLimit,
      treasures,
    },
  ];
}
