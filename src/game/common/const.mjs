const EVENTS_NAME = {
  currentMove: 'currentMove',
};

export const maps = [
  'GdAsRCknjjudRxmIvGvNCtM3JLxUDW2B6cCF_Tvd7g8', // b1m1
  'YNFa9YBS_M4GtRF4BF2-aiy-JuX0CqO5nuclaE1yIDQ', // b1m2
];

const EMPTY_TILE = 0;

export const COLLISIONS_LAYER = 'collisions';

const NO_AP_COST = 1; // because fuck logic and naming :)
const LOW_AP_COST = 1;
const MED_AP_COST = 2;
const HIGH_AP_COST = 3;

export const MAX_MSG_LENGTH = 280; // twitter..
export const MIN_MSG_LENGTH = 2; // Hi

export const MAX_LAST_TXS = 20;

const DEATH_SOUND_OPTIONS = 3;

const Kills = {
  headshot: 'headshot',
  slice: 'slice',
  tankshot: 'tankshot',
};

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
  useLandmine: 'useLandmine',
  landmineActivated: 'landmineActivated',
  useTeleport: 'useTeleport',
  teleported: 'teleported',
  msg: 'msg',
  setNextProcess: 'setNextProcess',
  nextProcessSet: 'nextProcessSet',
  end: 'end',
  hubRegisterGame: 'hubRegisterGame',
  hubGamePlayers: 'hubGamePlayers',
  hubInfo: 'hubInfo',
  hubStats: 'hubStats',
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
  ap: { type: 'ap', tile: 0, value: 5, rarity: 30 },
  hp: { type: 'hp', tile: 1, value: 25, rarity: 30 },
  equipment_mine: { type: 'equipment_mine', tile: 2, value: 20, rarity: 10 },
  teleport_device: { type: 'teleport_device', tile: 3, value: 50, rarity: 20 },
  none: { type: 'none', tile: 4, value: 0 },

  // invisible
  active_mine: { type: 'active_mine', tile: 0, value: 0, damage: 100 },
};

export const GameTreasure = {
  hole: { type: 'hole', tile: 0, value: 0 },
  cbcoin: { type: 'cbcoin', tile: 1, value: 500 },
  tlo: { type: 'tlo', tile: 2, value: 40 },
  war: { type: 'war', tile: 3, value: 26 },
  trunk: { type: 'trunk', tile: 4, value: 80 },
};

const TREASURES_RARITY = {
  [GameTreasure.cbcoin.type]: 50,
  [GameTreasure.tlo.type]: 50,
  [GameTreasure.war.type]: 50,
  [GameTreasure.trunk.type]: 50,
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
  DefaultLoot: 1000, // Tokens that will be taken after the defeating the opponent.
};

// ------- Beaver Config
export const BonusType = {
  KillBonus: 'KillBonus',
};

export const WEAPONS = {
  sniper_rifle_basic: {
    type: 'sniper_rifle_basic',
    name: 'Sniper Rifle',
    img: null,
    attack_range: 5,
    damage: [20, 19, 18, 17, 16],
    hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
    critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
    critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2.0],
    attack_recovery_ms: 750,
  },
  shotgun_basic: {
    type: 'shotgun_basic',
    name: 'Shotgun',
    img: null,
    attack_range: 3,
    damage: [25, 19, 15],
    hit_chance: [0.9, 0.8, 0.7],
    critical_hit_chance: [0.25, 0.1, 0.05],
    critical_hit_multiplier: [2.5, 1.8, 1.6],
    attack_recovery_ms: 500,
  },
  katana_basic: {
    type: 'katana_basic',
    name: 'Katana',
    img: null,
    attack_range: 1,
    damage: [25],
    hit_chance: [0.95],
    critical_hit_chance: [0.1],
    critical_hit_multiplier: [2.0],
    attack_recovery_ms: 400,
  },
};

export const BEAVER_TYPES = {
  hacker_beaver: {
    name: 'hacker_beaver',
    stats: {
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: WEAPONS.sniper_rifle_basic,
      bonus: {
        [GameTreasure.cbcoin.type]: 100,
        [BonusType.KillBonus]: 200,
      },
      kill: Kills.headshot,
    },
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
  },
  heavy_beaver: {
    name: 'heavy_beaver',
    stats: {
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: WEAPONS.shotgun_basic,
      bonus: {
        [GameTreasure.cbcoin.type]: 0,
        [BonusType.KillBonus]: 220,
      },
      kill: Kills.tankshot,
    },
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
  },
  speedy_beaver: {
    name: 'speedy_beaver',
    stats: {
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: WEAPONS.katana_basic,
      bonus: {
        [GameTreasure.cbcoin.type]: 20,
        [BonusType.KillBonus]: 180,
      },
      kill: Kills.slice,
    },
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
  },
};

// ------- Queue Config
const Queue = {
  defaultLimit: 15,
};

export default {
  BEAVER_TYPES,
  BonusType,
  Combat,
  Command,
  Direction,
  EVENTS_NAME,
  Errors,
  GameObject,
  GameTreasure,
  Map,
  Queue,
  Scores,
  Tile,
  EMPTY_TILE,
  NO_AP_COST,
  LOW_AP_COST,
  MED_AP_COST,
  HIGH_AP_COST,
  Kills,
  DEATH_SOUND_OPTIONS,
  TREASURES_RARITY,
};
