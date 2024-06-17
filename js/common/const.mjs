const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const Command = {
  attack: 'attack',
  attacked: 'attacked',
  join: 'join',
  move: 'move',
  moved: 'moved',
  register: 'register',
  registered: 'registered',
  info: 'info',
  setup: 'setup',
  stats: 'stats',
  pick: 'pick',
  picked: 'picked',
  dig: 'dig',
  digged: 'digged',
  token: 'token',
};

const Direction = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
};

const Map = {
  size: 30,
};
const Tile = {
  size: 48,
};

const GameObject = {
  hp: { type: 'hp', tile: 1, value: 5 },
  ap: { type: 'ap', tile: 0, value: 5 },
  treasure: { type: 'treasure', tile: 0, value: 1000 },
  hole: { type: 'hole', tile: 1, value: 0 },
  none: { type: 'none', tile: 2, value: 0 },
};

const Scores = {
  hp: 'hp',
  ap: 'ap',
  coin: '$',
};

const Errors = {
  notRegistered: 'Player not registered',
  invalidWallet: 'Wallet address is invalid',
};

// ------- Combat
const Combat = {
  DefaultLoot: 100, // Tokens that will be taken after the defeating the opponent.
};

// ------- Beaver Config
export const BEAVER_TYPES = {
  hacker_beaver: {
    name: 'hacker_beaver',
    ap: {
      current: 10,
      max: 10,
    },
    hp: {
      current: 100,
      max: 100,
    },
    damage: 10,
    bonus: {
      [GameObject.treasure.type]: 200,
    },
  },
  heavy_beaver: {
    name: 'heavy_beaver',
    ap: {
      current: 10,
      max: 10,
    },
    hp: {
      current: 200,
      max: 200,
    },
    damage: 20,
    bonus: {
      [GameObject.treasure.type]: 0,
    },
  },
  speedy_beaver: {
    name: 'speedy_beaver',
    ap: {
      current: 20,
      max: 20,
    },
    hp: {
      current: 100,
      max: 100,
    },
    damage: 10,
    bonus: {
      [GameObject.treasure.type]: 40,
    },
  },
};

export default {
  BEAVER_TYPES,
  Combat,
  Command,
  Direction,
  EVENTS_NAME,
  Errors,
  GameObject,
  Map,
  Scores,
  Tile,
};
