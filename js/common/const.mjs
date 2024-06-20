const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const EMPTY_TILE = -1;

// road tiles
const NO_AP_GROUND_TILES = [
  0, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11,
  14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25
]

// light sand tiles
const LOW_AP_GROUND_TILES = [
  26, 27
];

// dark sand tiles
const MED_AP_GROUND_TILES = [
  12, 13
];

// "stones"
const HIGH_AP_DECO_TILES = [
  5
]

const NO_AP_COST = 0;
const LOW_AP_COST = 1;
const MED_AP_COST = 2;
const HIGH_AP_COST = 3;


const Command = {
  attack: 'attack',
  attacked: 'attacked',
  enqueue: 'enqueue',
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
  down: 'down'
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


// ------- Queue Config
const Queue = {
  limit: 15
}

export default {
  BEAVER_TYPES,
  Combat,
  Command,
  Direction,
  EVENTS_NAME,
  Errors,
  GameObject,
  Map,
  Queue,
  Scores,
  Tile,
  EMPTY_TILE,
  NO_AP_GROUND_TILES,
  LOW_AP_GROUND_TILES,
  MED_AP_GROUND_TILES,
  HIGH_AP_DECO_TILES,
  NO_AP_COST,
  LOW_AP_COST,
  MED_AP_COST,
  HIGH_AP_COST
};
