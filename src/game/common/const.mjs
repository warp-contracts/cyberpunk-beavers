const EVENTS_NAME = {
  currentMove: 'currentMove',
};

export const DEFAULT_BG_MUSIC = 'backgroundMusic';

export const DEV_MAP = 'b3m5';

const maps_desert = {
  b1m1: {
    txId: 'GdAsRCknjjudRxmIvGvNCtM3JLxUDW2B6cCF_Tvd7g8',
    music: 'backgroundMusicMetal',
  },
  b1m2: {
    txId: 'YNFa9YBS_M4GtRF4BF2-aiy-JuX0CqO5nuclaE1yIDQ',
    music: 'backgroundMusic',
  },
  b1m3: {
    txId: 'v9vRtTZJfdX2cyZ_KG96cUKpvQjXz7KHJlPrJgS0Adc',
    music: 'backgroundMusicMetal',
  },
  b1m4: {
    txId: 'Cbdwm_6JDDmtllVzmtrsDqK2fULK9A8YRqivCAjzDV0',
    music: 'backgroundMusic',
  },
  b1m5: {
    txId: 'fcH7-DtyZk3sCJzN9qUUIVVFagV6rf5RdYR7zpQD5d4',
    music: 'backgroundMusicMetal',
  },
  b1m6: {
    txId: 'XuxDKD4nXTxCB7UeKKgIjhOGkbvcEUl93Qz4lsowGoM',
    music: 'backgroundMusic',
  },
  b1m7: {
    txId: 'z0rycDjxuLsrP_I6hKbm7lXPQ1wsLwkKkDfvIk5EiQA',
    music: 'backgroundMusicMetal',
  },
};

const maps_city = {
  b2m1: {
    txId: 'rnq-Mem2T_WjPPkCIBWgnFYXZuGIiPtzo0nHpTOUAxU',
    music: 'backgroundMusic',
  },
  b2m2: {
    txId: '9pupw_-i_5hIN0PrwDiDMAszZRBGLFXjlcPQX7UYye0',
    music: 'backgroundMusicMetal',
  },
  b2m3: {
    txId: 'S1WqprUkSrgnoZmFMS26Ur73hGn3NccHsJT6pq134sY',
    music: 'backgroundMusic',
  },
  b2m4: {
    txId: '5Klvs5p4EsGbMZKXHLcUG0LoYzMqsshdv1guud__lVY',
    music: 'backgroundMusicMetal',
  },
  b2m5: {
    txId: 'MpjJMdxTP4iEE76aIScmSjLY6JGSUxOhWZaHJZNg8aM',
    music: 'backgroundMusic',
  },
};

const maps_haunted = {
  b3m1: {
    txId: 'c0kF0CSoNGLrTBnxFtIq6yRubM5xULnKmvDbuvTv8aM',
    music: 'backgroundMusic',
  },
  b3m2: {
    txId: 'xmbCXBLws-q2yP6crVnm9xDgw0QojxsIje9NO3q0LTU',
    music: 'backgroundMusicMetal',
  },
  b3m3: {
    txId: '_TBpJY3JzCyZtPaXFJ6gG8vLTyUPwyOCuTIKpUmRr8k',
    music: 'backgroundMusic',
  },
  b3m4: {
    txId: 'HsIpwTIIlTRZT1apXSznirc7Z8x-C4vvot9LggbcA00',
    music: 'backgroundMusicMetal',
  },
  b3m5: {
    txId: 'e05NyR9DSGpJC_H9_f17fsTsbh3mtklxn-fK1713ugo',
    music: 'backgroundMusic',
  },
};

export const maps = {
  ...maps_desert,
  ...maps_city,
  ...maps_haunted,
};

const EMPTY_TILE = 0;

export const OBSTACLES_DEPTH = -100;
export const OBJECTS_DEPTH = 80;
export const PLAYER_DEPTH = 100;
export const MAIN_PLAYER_DEPTH = 200;
export const FRONT_LAYER_DEPTH = 1000;
export const FOV_DEPTH = 10000;

export const FOG_ALPHA = 0.4;

export const MINIMAP_SIZE_PX = 250;

export const COLLISIONS_LAYER = 'collisions';
export const FRONT_LAYER_PREFIX = 'front';

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
};

export const DEFAULT_ROUND_INTERVAL_MS = 10_000;

export const GAMEPLAY_MODE_LABEL = {
  [GAMEPLAY_MODES.deathmatch]: 'Deathmatch',
  [GAMEPLAY_MODES.battleRoyale]: 'Battle Royale',
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
  hubRemoveGame: 'hubRemoveGame',
  hubRemovedGame: 'hubRemovedGame',
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
  ap: { type: 'ap', tile: 0, value: 5, rarity: 10, roundsToRespawn: 5 },
  hp: { type: 'hp', tile: 1, value: 25, rarity: 10, roundsToRespawn: 5 },
  equipment_mine: { type: 'equipment_mine', tile: 2, value: 20, rarity: 10, roundsToRespawn: 10 },
  teleport_device: { type: 'teleport_device', tile: 3, value: 50, rarity: 10, roundsToRespawn: 20 },
  scanner_device: { type: 'scanner_device', tile: 4, value: 50, rarity: 10, roundsToRespawn: 20 },
  quad_damage: { type: 'quad_damage', tile: 5, value: 200, rarity: 5, roundsToRespawn: 10 },
  show_map: { type: 'show_map', tile: 6, value: 400, rarity: 30, roundsToRespawn: 20 },
  hazard: { type: 'hazard', tile: 7, value: 1000, rarity: 10, roundsToRespawn: 100 },
  none: { type: 'none', tile: 8, value: 0 },

  // invisible
  active_mine: { type: 'active_mine', tile: 0, value: 0, damage: 75 },
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
  rsg: { type: 'rsg', label: 'RSG', tile: 6, value: 100, baseVal: 1, denomination: 0 },
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
        value: 10_000,
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
  DefaultLoot: 1000, // Tokens that will be taken after the defeating the opponent.
};

// ------- Beaver Config
export const BonusType = {
  KillBonus: 'KillBonus',
};

export const BOOSTS = {
  quad_damage: {
    type: 'quad_damage',
    effect: (baseDmg) => baseDmg * 4,
    duration_rounds: 2,
  },
  show_map: {
    type: 'show_map',
    effect: (fov) => {
      for (let y = 0; y < fov.fovTileMap.height; y++) {
        for (let x = 0; x < fov.fovTileMap.width; x++) {
          const tile = fov.fovLayer.getTileAt(x, y, true);
          if (!tile.seen) {
            tile.seen = true;
            tile.desiredAlpha = FOG_ALPHA;
            tile.setAlpha(tile.desiredAlpha);
          }
        }
      }
    },
    duration_rounds: Number.MAX_SAFE_INTEGER,
  },
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
    damage: [40],
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
      battleRoyale: {
        hp: {
          current: 260,
          max: 260,
        },
      },
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
        [GAME_MODES.ao.type]: {
          [BonusType.KillBonus]: 200,
          [GameTreasure.cbcoin.type]: 100,
        },
        [GAME_MODES.rsg.type]: {
          [BonusType.KillBonus]: 100,
          [GameTreasure.rsg.type]: 50,
        },
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
      battleRoyale: {
        hp: {
          current: 400,
          max: 400,
        },
      },
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
        [GAME_MODES.ao.type]: {
          [BonusType.KillBonus]: 220,
          [GameTreasure.cbcoin.type]: 0,
        },
        [GAME_MODES.rsg.type]: {
          [BonusType.KillBonus]: 110,
          [GameTreasure.rsg.type]: 0,
        },
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
      battleRoyale: {
        hp: {
          current: 200,
          max: 200,
        },
      },
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
        [GAME_MODES.ao.type]: {
          [BonusType.KillBonus]: 180,
          [GameTreasure.cbcoin.type]: 20,
        },
        [GAME_MODES.rsg.type]: {
          [BonusType.KillBonus]: 90,
          [GameTreasure.rsg.type]: 10,
        },
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

export const PRIZES = {
  [GAMEPLAY_MODES.deathmatch]: null,
  [GAMEPLAY_MODES.battleRoyale]: {
    [GAME_MODES.ao.type]: 20000,
    [GAME_MODES.rsg.type]: 10000,
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
