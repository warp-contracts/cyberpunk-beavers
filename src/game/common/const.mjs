const EVENTS_NAME = {
  currentMove: 'currentMove',
};

export const maps = [
  'z0rycDjxuLsrP_I6hKbm7lXPQ1wsLwkKkDfvIk5EiQA', // ch1j1
  'fcH7-DtyZk3sCJzN9qUUIVVFagV6rf5RdYR7zpQD5d4', // b1m5
  'Cbdwm_6JDDmtllVzmtrsDqK2fULK9A8YRqivCAjzDV0', // ch1j2
  'XuxDKD4nXTxCB7UeKKgIjhOGkbvcEUl93Qz4lsowGoM', // b1m6
  'v9vRtTZJfdX2cyZ_KG96cUKpvQjXz7KHJlPrJgS0Adc', // b1m3
  'GdAsRCknjjudRxmIvGvNCtM3JLxUDW2B6cCF_Tvd7g8', // b1m1
  'YNFa9YBS_M4GtRF4BF2-aiy-JuX0CqO5nuclaE1yIDQ', // b1m2
];

const EMPTY_TILE = 0;

export const FOV_DEPTH = 100;

export const FOG_ALPHA = 0.8;

export const MINIMAP_SIZE_PX = 250;

export const COLLISIONS_LAYER = 'collisions';

const NO_AP_COST = 0;
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

export const AP_COSTS = {
  scanner: 4,
  teleport: 4,
  landmine: 4,
  hp: 1,
};

const Command = {
  attack: 'attack',
  attacked: 'attacked',
  enqueue: 'enqueue',
  activate: 'activate',
  activated: 'activated',
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
  useScanner: 'useScanner',
  scanned: 'scanned',
  useHp: 'useHp',
  hpApplied: 'hpApplied',
  msg: 'msg',
  nextProcessSet: 'nextProcessSet',
  tokensSent: 'tokensSent',
  hubRegisterGame: 'hubRegisterGame',
  hubGamePlayers: 'hubGamePlayers',
  hubInfo: 'hubInfo',
  hubStats: 'hubStats',
  registerSpectator: 'registerSpectator',
  registeredSpectator: 'registeredSpectator',
  respawned: 'respawned',
};

const Direction = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
};

const Tile = {
  size: 48,
};

export const GameObject = {
  ap: { type: 'ap', tile: 0, value: 5, rarity: 30, roundsToRespawn: 15 },
  hp: { type: 'hp', tile: 1, value: 25, rarity: 30, roundsToRespawn: 20 },
  equipment_mine: { type: 'equipment_mine', tile: 2, value: 20, rarity: 15, roundsToRespawn: 20 },
  teleport_device: { type: 'teleport_device', tile: 3, value: 50, rarity: 15, roundsToRespawn: 0 },
  scanner_device: { type: 'scanner_device', tile: 4, value: 50, rarity: 15, roundsToRespawn: 0 },
  none: { type: 'none', tile: 5, value: 0 },

  // invisible
  active_mine: { type: 'active_mine', tile: 0, value: 0, damage: 100 },
};

/*
  Tokens data is sent to leaderboard process and bridge process.
  Adding new entries requires updating tokens dictionary in the bridge
  and adding columns in the leaderboard process.
 */
export const GameTreasure = {
  hole: { type: 'hole', label: 'hole', tile: 0, value: 0 },
  cbcoin: { type: 'cbcoin', label: 'CyberBeaversToken', tile: 1, value: 500, denomination: 0 },
  tio: { type: 'tio', label: 'ar.io (tIO)', tile: 2, value: 100, baseVal: 15_000_000, denomination: 6 },
  war: { type: 'war', label: 'Wrapped AR', tile: 3, value: 300, baseVal: 3_000_000_000, denomination: 12 },
  trunk: { type: 'trunk', label: 'TRUNK', tile: 4, value: 100, baseVal: 9, denomination: 3 },
  gun: { type: 'gun', label: 'GUN', tile: 5, value: 300, baseVal: 1, denomination: 0 },
  rsg: { type: 'rsg', label: 'RSG', tile: 6, value: 100, baseVal: 1, denomination: 0 },
};

const DEFAULT_GAME_TOKENS = {
  [GameTreasure.cbcoin.type]: {
    id: `${GameTreasure.cbcoin.type}`,
    amount: 50,
  },
  [GameTreasure.tio.type]: {
    id: `${GameTreasure.tio.type}`,
    amount: 50,
  },
  [GameTreasure.war.type]: {
    id: `${GameTreasure.war.type}`,
    amount: 50,
  },
  [GameTreasure.trunk.type]: {
    id: `${GameTreasure.trunk.type}`,
    amount: 50,
  },
  [GameTreasure.rsg.type]: {
    id: `${GameTreasure.rsg.type}`,
    amount: 50,
  },
  [GameTreasure.gun.type]: {
    id: `${GameTreasure.gun.type}`,
    amount: 1,
  },
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
    damage: [30, 28, 27, 25, 24],
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
    damage: [37, 28, 22],
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
    damage: [50],
    hit_chance: [0.95],
    critical_hit_chance: [0.35],
    critical_hit_multiplier: [2.0],
    attack_recovery_ms: 400,
  },
};

export const BEAVER_TYPES = {
  hacker_beaver: {
    name: 'hacker_beaver',
    stats: {
      scannerRadius: 3,
      fov: 6,
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
        [GameTreasure.rsg.type]: 100,
        [BonusType.KillBonus]: 200,
      },
      kill: Kills.headshot,
    },
    equipment: {
      teleports: {
        current: 0,
        max: 3,
      },
      landmines: {
        current: 0,
        max: 5,
      },
      scanners: {
        current: 0,
        max: 3,
      },
      hp: {
        current: 0,
        max: 5,
      },
    },
  },
  heavy_beaver: {
    name: 'heavy_beaver',
    stats: {
      scannerRadius: 2,
      fov: 5,
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
        [GameTreasure.rsg.type]: 0,
        [BonusType.KillBonus]: 220,
      },
      kill: Kills.tankshot,
    },
    equipment: {
      teleports: {
        current: 0,
        max: 3,
      },
      landmines: {
        current: 0,
        max: 5,
      },
      scanners: {
        current: 0,
        max: 3,
      },
      hp: {
        current: 0,
        max: 5,
      },
    },
  },
  speedy_beaver: {
    name: 'speedy_beaver',
    stats: {
      scannerRadius: 1,
      fov: 4,
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
        [GameTreasure.rsg.type]: 20,
        [BonusType.KillBonus]: 180,
      },
      kill: Kills.slice,
    },
    equipment: {
      teleports: {
        current: 0,
        max: 3,
      },
      landmines: {
        current: 0,
        max: 5,
      },
      scanners: {
        current: 0,
        max: 3,
      },
      hp: {
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

export const GAME_MODES = {
  default: { type: 'ao', token: 'cbcoin', tokenLink: (id) => `https://www.ao.link/#/token/${id}` },
  ao: { type: 'ao', token: 'cbcoin', tokenLink: (id) => `https://www.ao.link/#/token/${id}` },
  rsg: {
    type: 'rsg',
    token: 'rsg',
    tokenLink: (id) => `https://sonar.warp.cc/#/app/contract/${id}?network=mainnet&dre=dreWarpy`,
  },
};

const GAME_ENTER_DELAY = 30000;

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
  DEFAULT_GAME_TOKENS,
  GAME_ENTER_DELAY,
  AP_COSTS,
  GAME_MODES,
};
