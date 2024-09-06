import { transferTio } from './transfer-tio-tokens.mjs';
import { GameTreasure } from '../../../src/game/common/const.mjs';

const result = {};

const players1 = {
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 175,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 98,
      },
      kills: {
        frags: 7,
        fragsInRow: 7,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545076598,
      coins: {
        balance: 91976,
        gained: 6864,
      },
      additionalTokens: {
        tio: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 2,
      y: 16,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 2,
      y: 16,
    },
  },
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 4,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 112,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 98,
      },
      kills: {
        frags: 7,
        fragsInRow: 7,
        deaths: 1,
        killedBy: '',
      },
      previousAttackTs: 1725545092508,
      coins: {
        balance: 155398,
        gained: 7107,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 25,
      y: 24,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 24,
    },
  },
  '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': {
    walletAddress: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
    userName: 'fl23f',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 19,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 97,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725544980400,
      coins: {
        balance: 32056,
        gained: 50,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 29,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 29,
      y: 13,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 7,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 97,
      },
      kills: {
        frags: 4,
        fragsInRow: 1,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725545085135,
      coins: {
        balance: 80811,
        gained: 2277,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 18,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 20,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ': {
    walletAddress: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
    userName: 'ODD@187',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 3,
        max: 22,
      },
      hp: {
        current: 180,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 97,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725544995959,
      coins: {
        balance: 64930,
        gained: 3972,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 3,
      y: 11,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 3,
      y: 11,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
    userName: 'ZQ',
    beaverId: 'heavy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 18,
        max: 20,
      },
      hp: {
        current: 300,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 98,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725545078319,
      coins: {
        balance: 6020,
        gained: 1903,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 20,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 20,
      y: 22,
    },
  },
  P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY: {
    walletAddress: 'P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY',
    userName: 'kedohuso',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 0,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 97,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: null,
      coins: {
        balance: 73540,
        gained: 2820,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 8,
      y: 1,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 1,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA': {
    walletAddress: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
    beaverId: 'heavy_beaver',
    equipment: {
      teleports: {
        current: 5,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 182,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 98,
      },
      kills: {
        frags: 2,
        fragsInRow: 0,
        deaths: 2,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725545051553,
      coins: {
        balance: 0,
        gained: 2228,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 13,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 13,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 98,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725545080008,
      coins: {
        balance: 25907,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 5,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 28,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
};

const players2 = {
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 3,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 180,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 134,
      },
      kills: {
        frags: 11,
        fragsInRow: 5,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725545452076,
      coins: {
        balance: 162505,
        gained: 6953,
      },
      additionalTokens: {
        tio: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 15,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 22,
    },
  },
  '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': {
    walletAddress: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
    userName: 'fl23f',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 5,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 19,
        max: 25,
      },
      hp: {
        current: 125,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 133,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725545451110,
      coins: {
        balance: 32106,
        gained: 1622,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 28,
      y: 16,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 28,
      y: 16,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 21,
        max: 25,
      },
      hp: {
        current: 68,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 133,
      },
      kills: {
        frags: 7,
        fragsInRow: 7,
        deaths: 1,
        killedBy: '',
      },
      previousAttackTs: 1725545451461,
      coins: {
        balance: 83088,
        gained: 3532,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 9,
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 9,
      y: 4,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 3,
        max: 5,
      },
      landmines: {
        current: 3,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 235,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 134,
      },
      kills: {
        frags: 10,
        fragsInRow: 10,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545439226,
      coins: {
        balance: 98840,
        gained: 9292,
      },
      additionalTokens: {
        tio: {
          gained: 7,
        },
      },
    },
    pos: {
      x: 24,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 28,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
    userName: 'ZQ',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 19,
        max: 20,
      },
      hp: {
        current: 250,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 134,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545459790,
      coins: {
        balance: 7923,
        gained: 3120,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 5,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 28,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ': {
    walletAddress: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
    userName: 'ODD@187',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 6,
        max: 22,
      },
      hp: {
        current: 118,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 133,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725545456038,
      coins: {
        balance: 68902,
        gained: 1356,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 11,
      y: 11,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 11,
      y: 11,
    },
  },
  P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY: {
    walletAddress: 'P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY',
    userName: 'kedohuso',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 3,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 134,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545423945,
      coins: {
        balance: 76360,
        gained: 4227,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 16,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 134,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 9,
        killedBy: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
      },
      previousAttackTs: 1725545267744,
      coins: {
        balance: 25907,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 21,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 17,
      y: 7,
    },
  },
  YL0iGZxfiNYlKOxPpgiOHQKBNWKxee_bD_OExsRO844: {
    walletAddress: 'YL0iGZxfiNYlKOxPpgiOHQKBNWKxee_bD_OExsRO844',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 50,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 110,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 10,
      y: 4,
    },
  },
  'qxugw7AfLUo9QS91VPazDLnes7rxhYcwu-bSvLE4skk': {
    walletAddress: 'qxugw7AfLUo9QS91VPazDLnes7rxhYcwu-bSvLE4skk',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 116,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 1,
      y: 22,
    },
  },
  'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA': {
    walletAddress: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 134,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725545405724,
      coins: {
        balance: 2228,
        gained: 651,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 26,
      y: 17,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 26,
      y: 17,
    },
  },
  '62LYMVzAGDoqd_NsBGICaHi9UA8NSZSk_79E4xqjjSM': {
    walletAddress: '62LYMVzAGDoqd_NsBGICaHi9UA8NSZSk_79E4xqjjSM',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 155,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 120,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 8,
      y: 19,
    },
  },
  '_UOLY0aoZAa_VCcy15R-KvaWbGczJD8fjD2WhwheHWw': {
    walletAddress: '_UOLY0aoZAa_VCcy15R-KvaWbGczJD8fjD2WhwheHWw',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 124,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 20,
      y: 18,
    },
  },
  hKibO41ULSd4cbh7rrHSZXy8bwd6t0fRGkihmPkklGY: {
    walletAddress: 'hKibO41ULSd4cbh7rrHSZXy8bwd6t0fRGkihmPkklGY',
    userName: 'ketzalco',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 111,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 134,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 5,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 3,
      y: 28,
    },
    onGameObject: {
      type: 'ap',
      tile: 0,
      value: 5,
      rarity: 30,
    },
    movedPos: {
      x: 3,
      y: 28,
    },
  },
  'i2pWhSv0Nemc7MlyV-EdNl7Pq27bjlOZHEzcBQQ-CWw': {
    walletAddress: 'i2pWhSv0Nemc7MlyV-EdNl7Pq27bjlOZHEzcBQQ-CWw',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 128,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 4,
      y: 0,
    },
  },
  'OyK-Kg6GCZ_Dcj_MriZHQCkbfZXgcMkfOuG1IKiPyqA': {
    walletAddress: 'OyK-Kg6GCZ_Dcj_MriZHQCkbfZXgcMkfOuG1IKiPyqA',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 131,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 24,
      y: 4,
    },
  },
};

const players3 = {
  '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': {
    walletAddress: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
    userName: 'fl23f',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 76,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 156,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: null,
      coins: {
        balance: 33728,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 26,
      y: 9,
    },
  },
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 4,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 180,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 169,
      },
      kills: {
        frags: 6,
        fragsInRow: 6,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545811825,
      coins: {
        balance: 108132,
        gained: 6632,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 1,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 1,
      y: 23,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 230,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 169,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545812963,
      coins: {
        balance: 169458,
        gained: 8327,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 28,
      y: 24,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 28,
      y: 24,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 10,
        max: 25,
      },
      hp: {
        current: 43,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 168,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545744119,
      coins: {
        balance: 86620,
        gained: 3870,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 28,
      y: 21,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 28,
      y: 21,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 16,
        max: 25,
      },
      hp: {
        current: 66,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 168,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725545719062,
      coins: {
        balance: 25907,
        gained: 1740,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 26,
      y: 7,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 26,
      y: 7,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
    userName: 'ZQ',
    beaverId: 'heavy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 131,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 169,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725545780454,
      coins: {
        balance: 11043,
        gained: 1262,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 21,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 22,
    },
    onGameTreasure: {
      type: 'cbcoin',
      label: 'CyberBeaversToken',
      tile: 1,
      value: 500,
      denomination: 0,
    },
  },
  P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY: {
    walletAddress: 'P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY',
    userName: 'kedohuso',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 5,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 0,
        max: 25,
      },
      hp: {
        current: 120,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 168,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725545765013,
      coins: {
        balance: 80587,
        gained: 896,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 22,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 10,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ': {
    walletAddress: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
    userName: 'ODD@187',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 5,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 168,
      },
      kills: {
        frags: 7,
        fragsInRow: 7,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545806981,
      coins: {
        balance: 70258,
        gained: 4329,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 14,
      y: 19,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 19,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  hKibO41ULSd4cbh7rrHSZXy8bwd6t0fRGkihmPkklGY: {
    walletAddress: 'hKibO41ULSd4cbh7rrHSZXy8bwd6t0fRGkihmPkklGY',
    userName: 'ketzalco',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 3,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 15,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 169,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725545793528,
      coins: {
        balance: 5,
        gained: 606,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 22,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 13,
    },
  },
  'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA': {
    walletAddress: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 214,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 169,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725545702312,
      coins: {
        balance: 2879,
        gained: 2659,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 16,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 13,
    },
  },
  'lk5ixWmKEMohXehEw115Yg0pgqulAn1qO6dNqK-8_QQ': {
    walletAddress: 'lk5ixWmKEMohXehEw115Yg0pgqulAn1qO6dNqK-8_QQ',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 154,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 9,
      y: 11,
    },
  },
  '8spnp-IiKuWj67rIPuS2ezaneMWUUo_kqxd9SGrn2ZA': {
    walletAddress: '8spnp-IiKuWj67rIPuS2ezaneMWUUo_kqxd9SGrn2ZA',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 105,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 158,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 0,
      y: 23,
    },
  },
  'EItYHhHo5sFBHE-Ro74x4qBDggoTCfog5AnZ8XxIjMU': {
    walletAddress: 'EItYHhHo5sFBHE-Ro74x4qBDggoTCfog5AnZ8XxIjMU',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 161,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 16,
      y: 21,
    },
  },
  '8n0KEmNG3G7QZiILVjrCRibiX7vVen30UhxphtIOZPY': {
    walletAddress: '8n0KEmNG3G7QZiILVjrCRibiX7vVen30UhxphtIOZPY',
    beaverId: 'heavy_beaver',
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
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 20,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 164,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 12,
      y: 19,
    },
  },
};

const players4 = {
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 31,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 205,
      },
      kills: {
        frags: 4,
        fragsInRow: 4,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725546175896,
      coins: {
        balance: 114764,
        gained: 8137,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 14,
      y: 2,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 2,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 3,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 255,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 205,
      },
      kills: {
        frags: 5,
        fragsInRow: 5,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725546176271,
      coins: {
        balance: 177785,
        gained: 9433,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 24,
      y: 19,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 19,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 8,
        max: 25,
      },
      hp: {
        current: 44,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 204,
      },
      kills: {
        frags: 6,
        fragsInRow: 2,
        deaths: 3,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725546128985,
      coins: {
        balance: 90490,
        gained: 3378,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 13,
      y: 22,
    },
    onGameObject: {
      type: 'hp',
      tile: 1,
      value: 25,
      rarity: 30,
    },
    movedPos: {
      x: 13,
      y: 22,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 204,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546143549,
      coins: {
        balance: 27647,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 2,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
    userName: 'ZQ',
    beaverId: 'heavy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 19,
        max: 20,
      },
      hp: {
        current: 165,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 205,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725546176956,
      coins: {
        balance: 12305,
        gained: 1453,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 27,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 27,
      y: 18,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': {
    walletAddress: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
    userName: 'fl23f',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 17,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 204,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725546101376,
      coins: {
        balance: 33728,
        gained: 402,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 24,
      y: 12,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 12,
    },
  },
  'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA': {
    walletAddress: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 205,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
      },
      previousAttackTs: 1725546087208,
      coins: {
        balance: 5538,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 2,
      y: 1,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 6,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ': {
    walletAddress: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
    userName: 'ODD@187',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 0,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 204,
      },
      kills: {
        frags: 5,
        fragsInRow: 2,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725546134168,
      coins: {
        balance: 74587,
        gained: 6283,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 6,
      y: 25,
    },
    onGameObject: {
      type: 'ap',
      tile: 0,
      value: 5,
      rarity: 30,
    },
    movedPos: {
      x: 6,
      y: 25,
    },
  },
  qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk: {
    walletAddress: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
    userName: '@Crypto_0mega',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 14,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 204,
      },
      kills: {
        frags: 2,
        fragsInRow: 1,
        deaths: 4,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546175849,
      coins: {
        balance: 1000,
        gained: 427,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 4,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 4,
      y: 6,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo: {
    walletAddress: 'QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo',
    userName: 'aahcreativeid',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 205,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: null,
      coins: {
        balance: 2050,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 20,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 20,
      y: 13,
    },
  },
};

const players5 = {
  '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': {
    walletAddress: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
    userName: 'fl23f',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 19,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 239,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725546493843,
      coins: {
        balance: 34130,
        gained: 1425,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 15,
      y: 24,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 24,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 75,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 239,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: null,
      coins: {
        balance: 93868,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 6,
      y: 29,
    },
  },
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 270,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 240,
      },
      kills: {
        frags: 8,
        fragsInRow: 8,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725546524599,
      coins: {
        balance: 122901,
        gained: 9406,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 25,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 18,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 8,
        max: 25,
      },
      hp: {
        current: 80,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 239,
      },
      kills: {
        frags: 8,
        fragsInRow: 2,
        deaths: 1,
        killedBy: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
      },
      previousAttackTs: 1725546529466,
      coins: {
        balance: 27647,
        gained: 4285,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 7,
      y: 29,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 7,
      y: 29,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 55,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 240,
      },
      kills: {
        frags: 6,
        fragsInRow: 2,
        deaths: 1,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546527359,
      coins: {
        balance: 187218,
        gained: 9067,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 17,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 17,
      y: 6,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
    userName: 'ZQ',
    beaverId: 'heavy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 18,
        max: 20,
      },
      hp: {
        current: 97,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 240,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725546508764,
      coins: {
        balance: 13758,
        gained: 1557,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 23,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 23,
      y: 23,
    },
  },
  P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY: {
    walletAddress: 'P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 10,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 240,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
      },
      previousAttackTs: 1725546514252,
      coins: {
        balance: 81483,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 9,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 9,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo: {
    walletAddress: 'QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo',
    userName: 'aahcreativeid',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 24,
        max: 25,
      },
      hp: {
        current: 25,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 240,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
      },
      previousAttackTs: 1725546491245,
      coins: {
        balance: 2050,
        gained: 521,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 1,
      y: 5,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 1,
      y: 5,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA': {
    walletAddress: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 240,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546511812,
      coins: {
        balance: 5538,
        gained: 1360,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 18,
      y: 0,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 0,
    },
  },
  '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M': {
    walletAddress: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
    userName: 'almostgreat',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 240,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725546521616,
      coins: {
        balance: 102904,
        gained: 3744,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 16,
      y: 7,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 7,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ': {
    walletAddress: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
    userName: 'ODD@187',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 8,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 239,
      },
      kills: {
        frags: 4,
        fragsInRow: 0,
        deaths: 2,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546516583,
      coins: {
        balance: 80870,
        gained: 4998,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 0,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 0,
      y: 3,
    },
    onGameTreasure: {
      type: 'cbcoin',
      label: 'CyberBeaversToken',
      tile: 1,
      value: 500,
      denomination: 0,
    },
  },
  qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk: {
    walletAddress: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
    userName: '@Crypto_0mega',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 12,
        max: 22,
      },
      hp: {
        current: 155,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 239,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546518441,
      coins: {
        balance: 1427,
        gained: 826,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 13,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 13,
      y: 10,
    },
  },
};

const players6 = {
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 276,
      },
      kills: {
        frags: 8,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE',
      },
      previousAttackTs: 1725546886270,
      coins: {
        balance: 196285,
        gained: 6850,
      },
      additionalTokens: {
        tio: {
          gained: 6,
        },
      },
    },
    pos: {
      x: 8,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 20,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 12,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 276,
      },
      kills: {
        frags: 16,
        fragsInRow: 16,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725546886378,
      coins: {
        balance: 132307,
        gained: 6195,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 10,
      y: 26,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 10,
      y: 26,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 275,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 14,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: null,
      coins: {
        balance: 31932,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 3,
      y: 3,
    },
    onGameObject: {
      type: 'hp',
      tile: 1,
      value: 25,
      rarity: 30,
    },
    movedPos: {
      x: 19,
      y: 12,
    },
  },
  '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': {
    walletAddress: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
    userName: 'fl23f',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 0,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 18,
        max: 25,
      },
      hp: {
        current: 125,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 275,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 35555,
        gained: 2289,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 20,
      y: 14,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 20,
      y: 14,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
    userName: 'ZQ',
    beaverId: 'heavy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'heavy_beaver',
      ap: {
        current: 19,
        max: 20,
      },
      hp: {
        current: 200,
        max: 200,
      },
      weapon: {
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
      bonus: {
        cbcoin: 0,
        KillBonus: 220,
      },
      kill: 'tankshot',
      round: {
        last: 276,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725546813629,
      coins: {
        balance: 15315,
        gained: 3183,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 10,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 84,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 276,
      },
      kills: {
        frags: 6,
        fragsInRow: 1,
        deaths: 4,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725546888086,
      coins: {
        balance: 93868,
        gained: 1180,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 9,
      y: 11,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 9,
      y: 11,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ': {
    walletAddress: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
    userName: 'ODD@187',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 4,
        max: 5,
      },
      landmines: {
        current: 3,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 3,
        max: 22,
      },
      hp: {
        current: 80,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 275,
      },
      kills: {
        frags: 4,
        fragsInRow: 4,
        deaths: 2,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546889012,
      coins: {
        balance: 85868,
        gained: 9774,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 2,
      y: 9,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 2,
      y: 9,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY: {
    walletAddress: 'P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY',
    userName: 'kedohuso',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 2,
        max: 5,
      },
      landmines: {
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 21,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 276,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725546880144,
      coins: {
        balance: 81483,
        gained: 3613,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 3,
      y: 9,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 3,
      y: 9,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M': {
    walletAddress: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
    userName: 'almostgreat',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 2,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 276,
      },
      kills: {
        frags: 5,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725546892827,
      coins: {
        balance: 111053,
        gained: 4405,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 6,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 6,
      y: 18,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE: {
    walletAddress: 'GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 22,
        max: 22,
      },
      hp: {
        current: 62,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 276,
      },
      kills: {
        frags: 2,
        fragsInRow: 1,
        deaths: 5,
        killedBy: '',
      },
      previousAttackTs: 1725546886502,
      coins: {
        balance: 9940,
        gained: 1200,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 16,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 18,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA': {
    walletAddress: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
    beaverId: 'hacker_beaver',
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
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 21,
        max: 22,
      },
      hp: {
        current: 105,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 276,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725546888943,
      coins: {
        balance: 6898,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 12,
      y: 5,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 12,
      y: 5,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo: {
    walletAddress: 'QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo',
    userName: 'aahcreativeid',
    beaverId: 'speedy_beaver',
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
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 25,
        max: 25,
      },
      hp: {
        current: 100,
        max: 100,
      },
      weapon: {
        type: 'katana_basic',
        name: 'Katana',
        img: null,
        attack_range: 1,
        damage: [25],
        hit_chance: [0.95],
        critical_hit_chance: [0.1],
        critical_hit_multiplier: [2],
        attack_recovery_ms: 400,
      },
      bonus: {
        cbcoin: 20,
        KillBonus: 180,
      },
      kill: 'slice',
      round: {
        last: 276,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725546849367,
      coins: {
        balance: 2571,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 25,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 6,
    },
  },
  qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk: {
    walletAddress: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
    userName: '@Crypto_0mega',
    beaverId: 'hacker_beaver',
    equipment: {
      teleports: {
        current: 1,
        max: 5,
      },
      landmines: {
        current: 1,
        max: 5,
      },
    },
    stats: {
      name: 'hacker_beaver',
      ap: {
        current: 11,
        max: 22,
      },
      hp: {
        current: 130,
        max: 130,
      },
      weapon: {
        type: 'sniper_rifle_basic',
        name: 'Sniper Rifle',
        img: null,
        attack_range: 5,
        damage: [20, 19, 18, 17, 16],
        hit_chance: [0.95, 0.92, 0.9, 0.88, 0.85],
        critical_hit_chance: [0.3, 0.25, 0.22, 0.2, 0.15],
        critical_hit_multiplier: [2.4, 2.3, 2.2, 2.1, 2],
        attack_recovery_ms: 750,
      },
      bonus: {
        cbcoin: 100,
        KillBonus: 200,
      },
      kill: 'headshot',
      round: {
        last: 275,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725546876175,
      coins: {
        balance: 2253,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 4,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 4,
      y: 13,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
};

tioTokens(players1);
tioTokens(players2);
tioTokens(players3);
tioTokens(players4);
tioTokens(players5);
tioTokens(players6);

console.log(result);
Object.entries(result).forEach(([k, v]) => {
  transferTio(k, v).then((r) => console.log(r));
});

function tioTokens(players) {
  console.log(` -- Getting ${Object.values(players).length} players --`);
  Object.values(players).forEach((p) => {
    const tio = p.stats.additionalTokens.tio.gained * GameTreasure.tio.baseVal;
    if (tio > 0) {
      console.log(`Player ${p.walletAddress} got ${tio} tio`);
      if (!result[p.walletAddress]) {
        result[p.walletAddress] = tio;
      } else {
        result[p.walletAddress] += tio;
      }
    }
  });
}

// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 750000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 600000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 300000000 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs
// Id: m9LsqgEfKoWtg0A4joqFl24LKYnaqbzPAY0VnHdlcbo   Transferred 750000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: wGNDTlEHtTolAnDSglCBbdFGgEALNQxmQtqnckAu8l8   Transferred 600000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: ofDoZgdeXVcxlOUABouDsuyYUCyV7UXwcnXZ8E1_P20   Transferred 450000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: uoSJIiU2ypIPFt8D4TtmK45bcIg_FBQhalZ2CQ8ux2w   Transferred 450000000 to F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs
// Id: lufpbNilk6GNt560JHeZiy8iVewe2kNNGItR1qKswso   Transferred 300000000 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE

// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 750000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 1050000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 600000000 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: _JKpz9unHnDCmBQe9GhLplLqij9BSkNxljTugmu2UI0   Transferred 750000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: o75_vb3pnOAPTgU_duOGkWRzuZV_KEss3_j_Nt3MRYE   Transferred 1050 000 000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: Tn8WgsLaF5jj5PUd8WFWDgc6RQidrCBOVx376cKV1H0   Transferred 600000000 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: WQQQWN9P2h0_AretcosPgp3mGUCgfy0GFmV1OYMvLCc   Transferred 150 000 000 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// Id: iBL6L6ZKuf1hh-FFY7tlhfVb9ZSJPVmhaXR_kkJf8WQ   Transferred 150000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// Id: R2qGT99EB2qWwbSXaFtt-bnYhvhY0v5klW4XcvLo1qM   Transferred 150000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ

// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 600000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 300000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to hKibO41ULSd4cbh7rrHSZXy8bwd6t0fRGkihmPkklGY
// Id: 0fUS1QKmhZL3x9ZkD_z84XAnk0Tabls-wcpI0_yzMaA   Transferred 600000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: R9GNPR540hyaGSzE48tL7lQtblzmJTULgSgzLCHWa8Q   Transferred 300000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: ntwdA8dwu_Pz58jUFUaaKIHixYKtm4Bly573GKgosoA   Transferred 150000000 to hKibO41ULSd4cbh7rrHSZXy8bwd6t0fRGkihmPkklGY
// Id: g8aQlhuQQUOh45hGPT8f1OzJut1NM3pGHuHAYMQHeK4   Transferred 450000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// Id: OJUITD2QWhtmslARQxXzotgGu3Tfrh_PIWpJDFYESS0   Transferred 450000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM

// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 600000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// Id: 0DqM0SbGfJ910FGN-yIuXy3ApiUc672Yf2yTfzXmbGo   Transferred 150000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// Id: 9afxnO6ubg8ru2zQeExN8ZDkj1kHm2uMkQmAI1Qo8YU   Transferred 450000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: VaER7ZTAr2nkAyoHw-8rMwvvNaG28Rf-zZbiNvFWvl4   Transferred 150000000 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// Id: Euix-BYoXLNNWUNRITz9bEqv4ksx1neu7_GSN5zB-tg   Transferred 450000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: O3VTn6n4HenIm1BKE8f3IN_jFOA5t9FbX2puWN4M99M   Transferred 600000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: rht6AXAadgUXsdvr1hgFi58dC0cR2D4CoLyqte3Wurw   Transferred 450000000 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE

// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 300000000 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 900000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 600000000 to QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 150000000 to XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 600000000 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 900000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 900000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 300000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 450000000 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// CyberBeaverTestingSession10: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 300000000 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// Id: ROkQ8dhjsDWkgcDXlJ6eR3QZPfwOT8GasZlw4CnEJk0   Transferred 900000000 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: ZSDiVxLDevi3YaFJA2prJGOySik5-4THh_tWpgYy43Y   Transferred 600000000 to QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo
// Id: RVkRple6hxndcoyq8LxBzeNfp_UosBbF82xjzZSIaFk   Transferred 450000000 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE
// Id: fOO1Cls1yjm2_YmmxYSMqyqqXMPVxFqqD7sfW3aoDU8   Transferred 600000000 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// Id: WWPRGgTfBPsi9T3U0p4vmRulnJmQJWhMoJQBW0IQ1Mo   Transferred 900000000 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: lI3JzQqj41ixvA-LLJB0LgUEYNTF-kYxsH37LMGSC_k   Transferred 900000000 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: H9_ilwVWT-uQ8wmCBqRtzS4R0YjmJowyI4B2Yc0DN0w   Transferred 300000000 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// Id: GXKXH8MENap4yhbGuilUee6hglX0Xa5fv3oOGnT2N0k   Transferred 450000000 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: tmkUAaG20q4y5OO5IFwDwwTQ5irUTqa5-DY5vFIdqcE   Transferred 300000000 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// Id: szhP__QShfybw6WZ5Mid-KjNVZZwcqHA0ds15BYPBfo   Transferred 300000000 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// Id: HbbizpkNKPcOcv7RETBZqHQBiqsGs7BqO206wfALLzk   Transferred 150000000 to XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA
