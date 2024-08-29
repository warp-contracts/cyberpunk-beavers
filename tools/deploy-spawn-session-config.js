import Const from '../src/game/common/const.mjs';
const { GameTreasure } = Const;

const hourSessionDelayMS = [
  0, // first game will be active at the specified hour, without any delay
  6 * 60 * 1_000, // second game will start 6 minutes later
  12 * 60 * 1_000, //...
  18 * 60 * 1_000,
  24 * 60 * 1_000,
  30 * 60 * 1_000,
];
const gameDurationMS = 5 * 60 * 1_000; // 5 minutes

export const TOKEN_CONTRACT_MOCK = {
  [GameTreasure.cbcoin.type]: {
    id: '_ThTRfZDNAV1Y-yX2h_9PNe5oGHh4q0eRhv6Y1tRVR0',
    transfer: 'Transfer',
    amount: 50,
  },
  [GameTreasure.trunk.type]: {
    id: 'gqJPxrG2CPuaYDsnZNXCimJdAJw9QEEBtC8OEaUWR7E',
    transfer: 'Transfer',
    amount: 0,
  },
  [GameTreasure.tlo.type]: {
    id: '7QJydVitORyOuKW3vm50CDITiJql5wUAwhnM4XvNpYU',
    transfer: 'Transfer',
    amount: 20,
  },
  [GameTreasure.war.type]: {
    id: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
    transfer: 'Transfer',
    amount: 0,
  },
};

export const TOKEN_CONTRACT = {
  [GameTreasure.cbcoin.type]: {
    id: 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8',
    transfer: 'Transfer',
    amount: 50,
  },
  [GameTreasure.trunk.type]: {
    id: 'OT9qTE2467gcozb2g8R6D6N3nQS94ENcaAIJfUzHCww',
    transfer: 'Transfer',
    amount: 0,
  },
  [GameTreasure.tlo.type]: {
    id: 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
    transfer: 'Transfer',
    amount: 20,
  },
  [GameTreasure.war.type]: {
    id: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
    transfer: 'Transfer',
    amount: 0,
  },
};

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
