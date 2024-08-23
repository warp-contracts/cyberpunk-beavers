const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const EMPTY_TILE = -1;

// road tiles
const NO_AP_GROUND_TILES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

// light sand tiles
const LOW_AP_GROUND_TILES = [26, 27];

// dark sand tiles
const MED_AP_GROUND_TILES = [12, 13];

// "stones"
const HIGH_AP_DECO_TILES = [5];

const NO_AP_COST = 1; // because fuck logic and naming :)
const LOW_AP_COST = 1;
const MED_AP_COST = 2;
const HIGH_AP_COST = 3;

export const MAX_MSG_LENGTH = 280; // twitter..
export const MIN_MSG_LENGTH = 2; // Hi

export const MAX_LAST_TXS = 20;

const DEATH_SOUND_OPTIONS = 3;

const TREASURES_RARITY = 50;

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
  hp: { type: 'hp', tile: 1, value: 25 },
  ap: { type: 'ap', tile: 0, value: 5 },
  treasure: { type: 'treasure', tile: 0, value: 500 },
  equipment_mine: { type: 'equipment_mine', tile: 2, value: 20 },
  active_mine: { type: 'active_mine', tile: 0, value: 0, damage: 100 },
  teleport_device: { type: 'teleport_device', tile: 3, value: 50 },
  hole: { type: 'hole', tile: 1, value: 0 },
  none: { type: 'none', tile: 4, value: 0 },
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
const BonusType = {
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
    attack_recovery_ms: 600,
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
    attack_recovery_ms: 400,
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
    attack_recovery_ms: 250,
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
        [GameObject.treasure.type]: 100,
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
        [GameObject.treasure.type]: 0,
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
        [GameObject.treasure.type]: 20,
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
  HIGH_AP_COST,
  Kills,
  DEATH_SOUND_OPTIONS,
  TREASURES_RARITY,
};
