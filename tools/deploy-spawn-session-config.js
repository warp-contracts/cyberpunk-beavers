import Const from '../src/game/common/const.mjs';
const { GameTreasure } = Const;

const hourSessionDelayMS = [
  0, // first game will be active at the specified hour, without any delay
  6 * 60 * 1_000, // second game will start 6 minutes later
  12 * 60 * 1_000, //...
  18 * 60 * 1_000,
  24 * 60 * 1_000,
  //30 * 60 * 1_000,
];
const gameDurationMS = 5 * 60 * 1_000; // 5 minutes
const walletsWhitelist = [
  // 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
  // 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
  // '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
  // 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
  // 'wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o',
  // '8ByvIowIXWOvEaOhpTeFUQQ_ArTiXAYzxwUSHr_R7P8', // ppe's generated wallet for the fucking Opera, fuck
  // '0x50Ff383E6b308069fD525B0ABa1474d9fe086743',
];

export const TOKEN_CONTRACT_MOCK = {
  [GameTreasure.cbcoin.type]: {
    id: '_ThTRfZDNAV1Y-yX2h_9PNe5oGHh4q0eRhv6Y1tRVR0',
    transfer: 'Transfer',
    amount: 50,
  },
  [GameTreasure.trunk.type]: {
    id: '2_O3UNKze6Yuy1oaNzRAGQjqbXJyd8AprlR90QFDp98',
    transfer: 'Transfer',
    amount: 20,
  },
  [GameTreasure.tio.type]: {
    id: 'h3FqYG9AVze-JFH-MQS3Rvv5golBhjnDuPDpJFEpdwE',
    transfer: 'Transfer',
    amount: 20,
  },
  [GameTreasure.war.type]: {
    id: 'Q7-XYIgAKiatIGuez3dM7eu4miqH5_USvKt6uY4bw9Y',
    transfer: 'Transfer',
    amount: 0,
  },
  [GameTreasure.rsg.type]: {
    id: 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU',
    transfer: 'Transfer',
    amount: 0,
  },
  [GameTreasure.gun.type]: {
    id: 'BzwAEjvM2XgUPBhV5l97QR6wJkfcuIXhkCewG7GNbzc',
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
    id: 'wOrb8b_V8QixWyXZub48Ki5B6OIDyf_p1ngoonsaRpQ',
    transfer: 'Transfer',
    amount: 20,
  },
  [GameTreasure.tio.type]: {
    id: 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
    transfer: 'Transfer',
    amount: 20,
  },
  [GameTreasure.war.type]: {
    id: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
    transfer: 'Transfer',
    amount: 0,
  },
  [GameTreasure.rsg.type]: {
    id: 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU',
    transfer: 'Transfer',
    amount: 0,
  },
  [GameTreasure.gun.type]: {
    id: 'O-566VlALuKNrSQBdLOgHyYIcqT0oqeattaBk2gNS70',
    transfer: 'Transfer',
    amount: 0,
  },
};

export function hourSessionGamesConfig(hubProcessId, bridgeProcessId, dateOfFirstGame, playersLimit, mode) {
  return hourSessionDelayMS.map((delay) => {
    return gameCustomConfig(hubProcessId, bridgeProcessId, dateOfFirstGame.getTime() + delay, playersLimit, mode);
  });
}

export function gameCustomConfig(hubProcessId, bridgeProcessId, date, playersLimit, mode) {
  if (date) {
    return {
      cmd: Const.Command.setup,
      type: 'custom',
      hubProcessId,
      bridgeProcessId,
      start: date,
      end: date + gameDurationMS,
      walletsWhitelist,
      playersLimit,
      mode,
    };
  } else {
    return {
      cmd: Const.Command.setup,
      type: 'custom',
      hubProcessId,
      bridgeProcessId,
      walletsWhitelist,
      playersLimit,
      mode,
    };
  }
}

export function activeGamesConfig(hubProcessId, bridgeProcessId, playersLimit, mode) {
  return [
    {
      cmd: Const.Command.setup,
      type: 'custom',
      hubProcessId,
      playersLimit,
      mode,
    },
    {
      cmd: Const.Command.setup,
      type: 'custom',
      hubProcessId,
      playersLimit,
    },
  ];
}
