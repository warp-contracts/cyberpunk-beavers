import { transferTio } from './transfer-tio-tokens.mjs';

const result = {};

const players1 = {
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
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
        current: 24,
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
        last: 428,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 7,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725026683805,
      coins: {
        balance: 12220,
        gained: 180,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 21,
      y: 26,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 26,
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
        last: 424,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725026650685,
      coins: {
        balance: 12125,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 3,
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
      x: 20,
      y: 21,
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
        current: 4,
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
        last: 428,
      },
      kills: {
        frags: 9,
        fragsInRow: 9,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725026683478,
      coins: {
        balance: 133225,
        gained: 7468,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 12,
      y: 29,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 12,
      y: 29,
    },
  },
  Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: {
    walletAddress: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
    userName: 'tadeuchi',
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
        current: 275,
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
        last: 428,
      },
      kills: {
        frags: 8,
        fragsInRow: 8,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725026632406,
      coins: {
        balance: 78278,
        gained: 9363,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 3,
      y: 1,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 3,
      y: 1,
    },
  },
  'SOn1RtUVd8ad0HnqF-r0_04uSAu2RkZr8YMfYT3YqKs': {
    walletAddress: 'SOn1RtUVd8ad0HnqF-r0_04uSAu2RkZr8YMfYT3YqKs',
    userName: '333',
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
        last: 0,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
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
      x: 22,
      y: 26,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
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
        current: 24,
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
        last: 428,
      },
      kills: {
        frags: 3,
        fragsInRow: 2,
        deaths: 4,
        killedBy: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
      },
      previousAttackTs: 1725026698560,
      coins: {
        balance: 63205,
        gained: 1011,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 13,
      y: 29,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 13,
      y: 29,
    },
  },
};

const players2 = {
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 4,
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
        current: 325,
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
        last: 463,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725027016183,
      coins: {
        balance: 64216,
        gained: 5884,
      },
      additionalTokens: {
        tio: {
          gained: 2,
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
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
    beaverId: 'speedy_beaver',
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
      name: 'speedy_beaver',
      ap: {
        current: 24,
        max: 25,
      },
      hp: {
        current: 150,
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
        last: 463,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 12400,
        gained: 4718,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 12,
      y: 14,
    },
    onGameObject: {
      type: 'teleport_device',
      tile: 3,
      value: 50,
      rarity: 20,
    },
    movedPos: {
      x: 12,
      y: 14,
    },
  },
  'SOn1RtUVd8ad0HnqF-r0_04uSAu2RkZr8YMfYT3YqKs': {
    walletAddress: 'SOn1RtUVd8ad0HnqF-r0_04uSAu2RkZr8YMfYT3YqKs',
    userName: '333',
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
        last: 0,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: null,
      coins: {
        balance: 1440,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 19,
      y: 23,
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
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 20,
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
        last: 460,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725026868606,
      coins: {
        balance: 12125,
        gained: 4052,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 2,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 2,
      y: 23,
    },
  },
  KeoVy_3zAP1xI4U4W0dR23YHC1p2PL33g2KUnIM7gvM: {
    walletAddress: 'KeoVy_3zAP1xI4U4W0dR23YHC1p2PL33g2KUnIM7gvM',
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
        last: 0,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: null,
      coins: {
        balance: 1160,
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
      y: 27,
    },
  },
};

const players3 = {
  Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: {
    walletAddress: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
    userName: 'tadeuchi',
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
        current: 3,
        max: 20,
      },
      hp: {
        current: 325,
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
        last: 493,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 87641,
        gained: 2259,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 19,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 19,
      y: 20,
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
        current: 23,
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
        last: 499,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 70100,
        gained: 50,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 22,
    },
  },
};

const players4 = {
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
        current: 0,
        max: 5,
      },
    },
    stats: {
      name: 'speedy_beaver',
      ap: {
        current: 23,
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
        last: 532,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 16177,
        gained: 6617,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 15,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 23,
    },
  },
  '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': {
    walletAddress: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
    userName: 'haili',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 4,
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
        current: 200,
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
        last: 535,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725027556844,
      coins: {
        balance: 70150,
        gained: 2673,
      },
      additionalTokens: {
        tio: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 15,
      y: 13,
    },
    onGameObject: {
      type: 'hp',
      tile: 1,
      value: 25,
      rarity: 30,
    },
    movedPos: {
      x: 12,
      y: 13,
    },
  },
  'SOn1RtUVd8ad0HnqF-r0_04uSAu2RkZr8YMfYT3YqKs': {
    walletAddress: 'SOn1RtUVd8ad0HnqF-r0_04uSAu2RkZr8YMfYT3YqKs',
    userName: '333',
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
        current: 100,
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
        last: 0,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
      },
      previousAttackTs: null,
      coins: {
        balance: 1440,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 27,
      y: 22,
    },
  },
  F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: {
    walletAddress: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
    userName: 'gl53',
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
        current: 24,
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
        last: 535,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725027776349,
      coins: {
        balance: 17068,
        gained: 1377,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 26,
      y: 22,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 26,
      y: 22,
    },
  },
};

const players5 = {
  Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: {
    walletAddress: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
    userName: 'tadeuchi',
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
        current: 12,
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
        last: 27,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: null,
      coins: {
        balance: 89900,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 17,
      y: 23,
    },
    onGameObject: {
      type: 'ap',
      tile: 0,
      value: 5,
      rarity: 30,
    },
    movedPos: {
      x: 7,
      y: 22,
    },
  },
  'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': {
    walletAddress: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
    userName: 'asia',
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
        last: 33,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725028117767,
      coins: {
        balance: 140693,
        gained: 3530,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 11,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 11,
      y: 15,
    },
  },
  iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU: {
    walletAddress: 'iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU',
    userName: 'wareep',
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
        last: 33,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725028079328,
      coins: {
        balance: 1180,
        gained: 1828,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 9,
      y: 0,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 9,
      y: 0,
    },
  },
  wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o: {
    walletAddress: 'wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o',
    userName: 'MattS',
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
        last: 33,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725028113928,
      coins: {
        balance: 88755,
        gained: 856,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 22,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 15,
    },
  },
  'lKjRho7f0ejWDTKQdc1tElqF2RV-jlVp3JPR1vqLqmw': {
    walletAddress: 'lKjRho7f0ejWDTKQdc1tElqF2RV-jlVp3JPR1vqLqmw',
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
        last: 33,
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
        gained: 50,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 20,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 20,
      y: 20,
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
        current: 150,
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
        last: 33,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725028089428,
      coins: {
        balance: 81770,
        gained: 2108,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 5,
      y: 14,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 14,
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
        last: 33,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 94550,
        gained: 1527,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 5,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 10,
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
        current: 22,
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
        last: 33,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o',
      },
      previousAttackTs: null,
      coins: {
        balance: 71630,
        gained: 0,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 5,
      y: 2,
    },
    onGameObject: {
      type: 'teleport_device',
      tile: 3,
      value: 50,
      rarity: 20,
    },
    movedPos: {
      x: 5,
      y: 2,
    },
  },
  nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU: {
    walletAddress: 'nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU',
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
        current: 6,
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
        last: 32,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 31480,
        gained: 30,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 29,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 29,
    },
    onGameTreasure: {
      type: 'tio',
      label: 'ar.io (tIO)',
      tile: 2,
      value: 100,
      baseVal: 33.1,
    },
  },
};

const players6 = {
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
        current: 22,
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
        last: 66,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: null,
      coins: {
        balance: 27832,
        gained: 4224,
      },
      additionalTokens: {
        tio: {
          gained: 4,
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
      x: 4,
      y: 14,
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
        current: 18,
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
        last: 69,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725028448840,
      coins: {
        balance: 96077,
        gained: 6827,
      },
      additionalTokens: {
        tio: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 8,
      y: 2,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 2,
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
        current: 10,
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
        last: 69,
      },
      kills: {
        frags: 5,
        fragsInRow: 5,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725028462860,
      coins: {
        balance: 83878,
        gained: 8098,
      },
      additionalTokens: {
        tio: {
          gained: 3,
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
        last: 69,
      },
      kills: {
        frags: 7,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY',
      },
      previousAttackTs: 1725028494449,
      coins: {
        balance: 144223,
        gained: 721,
      },
      additionalTokens: {
        tio: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 27,
      y: 21,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 13,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU: {
    walletAddress: 'nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU',
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
        current: 6,
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
        last: 68,
      },
      kills: {
        frags: 3,
        fragsInRow: 2,
        deaths: 1,
        killedBy: '',
      },
      previousAttackTs: 1725028472385,
      coins: {
        balance: 31510,
        gained: 7323,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 3,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 3,
      y: 28,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'lKjRho7f0ejWDTKQdc1tElqF2RV-jlVp3JPR1vqLqmw': {
    walletAddress: 'lKjRho7f0ejWDTKQdc1tElqF2RV-jlVp3JPR1vqLqmw',
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
        current: 18,
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
        last: 69,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725028484053,
      coins: {
        balance: 50,
        gained: 2,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 0,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 0,
      y: 10,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU: {
    walletAddress: 'iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU',
    userName: 'wareep',
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
        last: 69,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725028492979,
      coins: {
        balance: 3008,
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
      y: 29,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 17,
      y: 13,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  QAUKiuTTpVQ0Ozk4bUG69GdAY1mQP2xpGChQr68clWY: {
    walletAddress: 'QAUKiuTTpVQ0Ozk4bUG69GdAY1mQP2xpGChQr68clWY',
    userName: 'Plutopheliar',
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
        last: 69,
      },
      kills: {
        frags: 2,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725028477587,
      coins: {
        balance: 8250,
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
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 6,
      y: 4,
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
        current: 15,
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
        last: 69,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 1,
        killedBy: '',
      },
      previousAttackTs: 1725028498989,
      coins: {
        balance: 71630,
        gained: 3090,
      },
      additionalTokens: {
        tio: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 19,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 19,
      y: 13,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o: {
    walletAddress: 'wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o',
    userName: 'MattS',
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
        last: 69,
      },
      kills: {
        frags: 3,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU',
      },
      previousAttackTs: 1725028439447,
      coins: {
        balance: 89611,
        gained: 2845,
      },
      additionalTokens: {
        tio: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 19,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 19,
      y: 28,
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
        current: 83,
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
        last: 69,
      },
      kills: {
        frags: 4,
        fragsInRow: 3,
        deaths: 3,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725028489365,
      coins: {
        balance: 78091,
        gained: 2720,
      },
      additionalTokens: {
        tio: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 5,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 18,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
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
        current: 20,
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
        last: 69,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725028491396,
      coins: {
        balance: 1000,
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
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 1,
      y: 4,
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
    const tio = p.stats.additionalTokens.tio.gained * 33;
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

//  -- Getting 6 players --
// Player 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58 got 99 tio
// Player qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM got 132 tio
// Player Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g got 66 tio
// Player 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA got 66 tio
//  -- Getting 5 players --
// Player 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA got 66 tio
// Player F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs got 99 tio
// Player 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58 got 33 tio
//  -- Getting 4 players --
// Player 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58 got 99 tio
// Player 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA got 165 tio
//  -- Getting 9 players --
// Player iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU got 66 tio
// Player 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw got 33 tio
// Player 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M got 99 tio
//  -- Getting 12 players --
// Player 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58 got 132 tio
// Player 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M got 132 tio
// Player 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw got 99 tio
// Player qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM got 33 tio
// Player nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU got 99 tio
// Player P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY got 66 tio
// Player wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o got 99 tio
// {
//   '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58': 363,
//   'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM': 165,
//   Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: 66,
//   '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA': 297,
//   F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs: 99,
//   iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU: 66,
//   '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': 132,
//   '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M': 231,
//   nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU: 99,
//   P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY: 66,
//   wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o: 99
// }
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 363 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 165 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 66 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 297 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 99 to F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 66 to iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 132 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 231 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 99 to nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 66 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// CyberBeaverTestingSession9: Transferring agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA 99 to wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o
// Id: z8Ag6hBYlj1yv_m7kXG4Urbo7Q8fpLs6zQjRoriR9uw   Transferred 363 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// Id: G7DNFqKFA2QaXK-AnZlEVYcbGO6OuRhWJgAVHQMvTGs   Transferred 132 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: a3YNYLm7Qq9VqFMPqMFYrRHRFc1YoFBJRd6lfKowip0   Transferred 231 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// Id: Xum_6fHX81dbnbFdti6YS0Gt1I24BmZWH2cpAN4M0VQ   Transferred 165 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: g3cz3phb-pT2mm-zZQw40dl4hVCk11myLAHC2gb76Jc   Transferred 297 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// Id: wTOQG3yZCG-vsBVNcP8yEze1WBl-y845G70E-BDOCfs   Transferred 66 to iDEtPVzVtcqZSbevmZKUkUQ2Bg0SgoVc_Ll1bRl91YU
// Id: yFXKPLzMw4RF0zBTGxDlLAW0UN6lVCbzl2zGWjKd8-g   Transferred 66 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
// Id: Z78R8aR3TqrdUEnDmqbZi2cLfncAjGMOXn9x7PAQwU4   Transferred 99 to nD3aoQq9QpEumcSGpxbnx9RWPRnL5c7SwnUFRDjXbJU
// Id: kntMl0pRroYpvjPKGGpDak93gOx5lxUM6azXbALONn8   Transferred 66 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: 3pKcVeQEyqXhbDYIB699S4OKw27dk0KHPypBNXLeI7E   Transferred 99 to F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs
// Id: CFgG7voR7A1mHgjja3hLtx_vInPJtsLBPB95xqasYHY   Transferred 99 to wF_7BbSj8Yzlt7T44nMGXwJHmqn8t2Sv45LfxILNu_o
