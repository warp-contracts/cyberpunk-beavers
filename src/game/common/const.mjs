const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const NO_AP_COST = 0;
const LOW_AP_COST = 1;
const MED_AP_COST = 2;
const HIGH_AP_COST = 3;

export const MAX_MSG_LENGTH = 280; // twitter..
export const MIN_MSG_LENGTH = 2; // Hi

export const MAX_LAST_TXS = 20;

export const GAME_MODES = {
  default: { type: 'ao', token: 'cbcoin', tokenLink: (id) => `https://www.ao.link/#/token/${id}` },
  ao: { type: 'ao', token: 'cbcoin', tokenLink: (id) => `https://www.ao.link/#/token/${id}` },
  rsg: {
    type: 'rsg',
    token: 'rsg',
    tokenLink: (id) => `https://sonar.warp.cc/#/app/contract/${id}?network=mainnet&dre=dreWarpy`,
  },
};
export const GAMEPLAY_MODES = {
  deathmatch: 'deathmatch',
  battleRoyale: 'battleRoyale',
  horde: 'horde',
};

const DEATH_SOUND_OPTIONS = 3;

export const Kills = {
  headshot: 'headshot',
  slice: 'slice',
  tankshot: 'tankshot',
};

export const AP_COSTS = {
  scanner: 4,
  teleport: 4,
  landmine: 4,
  hp: 1,
  attack: 3,
  dig: 2,
  drill: 3,
};

export const DEFAULT_ROUND_INTERVAL_MS = 10_000;

export const GAMEPLAY_MODE_LABEL = {
  [GAMEPLAY_MODES.deathmatch]: 'Deathmatch',
  [GAMEPLAY_MODES.battleRoyale]: 'Battle Royale',
  [GAMEPLAY_MODES.horde]: 'Horde',
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
  tokensSent: 'tokensSent',
  hubRemoveGame: 'hubRemoveGame',
  hubRemovedGame: 'hubRemovedGame',
  hubRegisterGame: 'hubRegisterGame',
  hubGamePlayers: 'hubGamePlayers',
  hubInfo: 'hubInfo',
  hubStats: 'hubStats',
  registerSpectator: 'registerSpectator',
  registeredSpectator: 'registeredSpectator',
  respawned: 'respawned',
  tick: 'tick',
  drilled: 'drilled',
  useDrill: 'useDrill',
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

/*
  Tokens data is sent to leaderboard process and bridge process.
  Adding new entries requires updating tokens dictionary in the bridge
  and adding columns in the leaderboard process.
 */
export const GameTreasure = {
  hole: { type: 'hole', label: 'hole', tile: 0, value: 0 },
  cbcoin: { type: 'cbcoin', label: 'CyberBeaversToken', tile: 1, value: 500, denomination: 0 },
  tio: { type: 'tio', label: 'ar.io (tIO)', tile: 2, value: 100, baseVal: 300_000, denomination: 6 },
  war: { type: 'war', label: 'Wrapped AR', tile: 3, value: 300, baseVal: 10_000_000_000, denomination: 12 },
  trunk: { type: 'trunk', label: 'TRUNK', tile: 4, value: 100, baseVal: 30, denomination: 3 },
  gun: { type: 'gun', label: 'GUN', tile: 5, value: 300, baseVal: 1, denomination: 0 },
  rsg: { type: 'rsg', label: 'RSG', tile: 6, value: 200, baseVal: 1, denomination: 0 },
};

const DEFAULT_GAME_TOKENS = {
  [GameTreasure.cbcoin.type]: {
    id: `DefaultProcessId${GameTreasure.cbcoin.type}`,
    amount: 50,
  },
  [GameTreasure.tio.type]: {
    id: `DefaultProcessId${GameTreasure.tio.type}`,
    amount: 50,
  },
  [GameTreasure.war.type]: {
    id: `DefaultProcessId${GameTreasure.war.type}`,
    amount: 50,
  },
  [GameTreasure.trunk.type]: {
    id: `DefaultProcessId${GameTreasure.trunk.type}`,
    amount: 50,
  },
  [GameTreasure.rsg.type]: {
    id: `DefaultProcessId${GameTreasure.rsg.type}`,
    amount: 50,
  },
  [GameTreasure.gun.type]: {
    id: `DefaultProcessId${GameTreasure.gun.type}`,
    amount: 1,
  },
};

export const TreasureLimit = {
  PerGame: {
    [GAME_MODES.rsg.type]: {
      [GameTreasure.rsg.type]: {
        value: 20_000,
      },
    },
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
  DefaultLoot: 1000, // Tokens that will be taken after defeating the opponent.
  DefaultAttack: 100, // Tokens that will be taken after attacking the opponent.
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
    attack_recovery_ms: 800,
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
    attack_recovery_ms: 600,
  },
  katana_basic: {
    type: 'katana_basic',
    name: 'Katana',
    img: null,
    attack_range: 1,
    damage: [40],
    hit_chance: [0.95],
    critical_hit_chance: [0.35],
    critical_hit_multiplier: [2.0],
    attack_recovery_ms: 500,
  },
};

export const BEAVER_TYPES = {
  hacker_beaver: {
    name: 'hacker_beaver',
    stats: {
      battleRoyale: {
        hp: {
          current: 260,
          max: 260,
        },
      },
      horde: {
        hp: {
          current: 260,
          max: 260,
        },
        ap: {
          current: 30,
          max: 30,
        },
      },
      scannerRadius: 3,
      drillRadius: 1,
      fov: 6,
      fovExtended: 6,
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
        [GAME_MODES.ao.type]: {
          [BonusType.KillBonus]: 200,
          [GameTreasure.cbcoin.type]: 100,
        },
        [GAME_MODES.rsg.type]: {
          [BonusType.KillBonus]: 100,
          [GameTreasure.rsg.type]: 100,
        },
      },
      kill: Kills.headshot,
      shield: 0.2,
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
      drills: {
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
      battleRoyale: {
        hp: {
          current: 400,
          max: 400,
        },
      },
      horde: {
        hp: {
          current: 400,
          max: 400,
        },
        ap: {
          current: 28,
          max: 28,
        },
      },
      scannerRadius: 2,
      drillRadius: 1,
      fov: 5,
      fovExtended: 7,
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
        [GAME_MODES.ao.type]: {
          [BonusType.KillBonus]: 220,
          [GameTreasure.cbcoin.type]: 0,
        },
        [GAME_MODES.rsg.type]: {
          [BonusType.KillBonus]: 220,
          [GameTreasure.rsg.type]: 0,
        },
      },
      kill: Kills.tankshot,
      shield: 0.1,
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
      drills: {
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
      battleRoyale: {
        hp: {
          current: 200,
          max: 200,
        },
      },
      horde: {
        hp: {
          current: 200,
          max: 200,
        },
        ap: {
          current: 33,
          max: 33,
        },
      },
      scannerRadius: 1,
      drillRadius: 1,
      fov: 4,
      fovExtended: 6,
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
        [GAME_MODES.ao.type]: {
          [BonusType.KillBonus]: 180,
          [GameTreasure.cbcoin.type]: 20,
        },
        [GAME_MODES.rsg.type]: {
          [BonusType.KillBonus]: 180,
          [GameTreasure.rsg.type]: 20,
        },
      },
      kill: Kills.slice,
      shield: 0.2,
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
      drills: {
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

export const PRIZES = {
  [GAMEPLAY_MODES.deathmatch]: null,
  [GAMEPLAY_MODES.battleRoyale]: {
    [GAME_MODES.ao.type]: 20_000,
    [GAME_MODES.rsg.type]: 20_000,
  },
  [GAMEPLAY_MODES.horde]: {
    [GAME_MODES.ao.type]: 20_000,
    [GAME_MODES.rsg.type]: 20_000,
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
  GameTreasure,
  Queue,
  Scores,
  Tile,
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
