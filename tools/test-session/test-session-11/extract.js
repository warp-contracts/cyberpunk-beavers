import { transferWar } from './transfer-war-tokens.mjs';
import { GameTreasure } from '../../../src/game/common/const.mjs';

const result = {};

const players1 = {
  '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8': {
    walletAddress: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
    userName: 'randy',
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
        current: 21,
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
        last: 220,
      },
      kills: {
        frags: 9,
        fragsInRow: 3,
        deaths: 5,
        killedBy: '6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58',
      },
      previousAttackTs: 1725631489864,
      coins: {
        balance: 30914,
        gained: 4483,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 18,
      y: 9,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
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
        current: 45,
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
        last: 220,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631377513,
      coins: {
        balance: 111053,
        gained: 5826,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 6,
      y: 22,
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
        last: 220,
      },
      kills: {
        frags: 6,
        fragsInRow: 2,
        deaths: 4,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725631497594,
      coins: {
        balance: 216830,
        gained: 1376,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 16,
      y: 21,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 21,
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
    userName: 'aoc',
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
        last: 220,
      },
      kills: {
        frags: 4,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631457400,
      coins: {
        balance: 11140,
        gained: 1991,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 13,
      y: 27,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 13,
      y: 27,
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
        current: 18,
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
        last: 219,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725631470887,
      coins: {
        balance: 31932,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 24,
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 4,
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
        current: 15,
        max: 25,
      },
      hp: {
        current: 38,
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
        last: 219,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 4,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631486597,
      coins: {
        balance: 2571,
        gained: 180,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 5,
      y: 1,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 1,
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
        current: 2,
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
        current: 64,
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
        last: 219,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 2,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725631484845,
      coins: {
        balance: 2253,
        gained: 5820,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 19,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 19,
      y: 3,
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
        last: 219,
      },
      kills: {
        frags: 4,
        fragsInRow: 1,
        deaths: 9,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631498728,
      coins: {
        balance: 95048,
        gained: 180,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 24,
      y: 24,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 24,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'VBNG_bQ9zQVejiG6kRm-jqYNMuY_3X-RneRRnPq6K80': {
    walletAddress: 'VBNG_bQ9zQVejiG6kRm-jqYNMuY_3X-RneRRnPq6K80',
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
        last: 220,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
      },
      previousAttackTs: 1725631498059,
      coins: {
        balance: 44235,
        gained: 1633,
      },
      additionalTokens: {
        war: {
          gained: 2,
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
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g: {
    walletAddress: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
    userName: 'tadeuchi',
    beaverId: 'heavy_beaver',
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
        last: 220,
      },
      kills: {
        frags: 3,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725631499843,
      coins: {
        balance: 109385,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 25,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 15,
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
        current: 6,
        max: 22,
      },
      hp: {
        current: 116,
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
        last: 219,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631471634,
      coins: {
        balance: 6898,
        gained: 4876,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 9,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 9,
      y: 28,
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
        current: 92,
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
        last: 220,
      },
      kills: {
        frags: 13,
        fragsInRow: 13,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631473479,
      coins: {
        balance: 138502,
        gained: 11090,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 29,
      y: 11,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 29,
      y: 11,
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
        current: 0,
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
        current: 13,
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
        last: 219,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725631493281,
      coins: {
        balance: 37844,
        gained: 875,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 14,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 14,
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
        current: 14,
        max: 25,
      },
      hp: {
        current: 81,
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
        last: 219,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 1,
        killedBy: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
      },
      previousAttackTs: 1725631494991,
      coins: {
        balance: 85096,
        gained: 2011,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 20,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 20,
      y: 3,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  qGjMngUJsOOVVlYBdU2ZugwUIq6ELURSJ_2L2pmqCEU: {
    walletAddress: 'qGjMngUJsOOVVlYBdU2ZugwUIq6ELURSJ_2L2pmqCEU',
    userName: 'oj8k',
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
        last: 212,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
      },
      previousAttackTs: null,
      coins: {
        balance: 6095,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 3,
      y: 15,
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
        current: 0,
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
        last: 219,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 1,
        killedBy: 'GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE',
      },
      previousAttackTs: 1725631498943,
      coins: {
        balance: 95642,
        gained: 4568,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 11,
      y: 12,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 11,
      y: 12,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  cJZNo30TJPhY4zXLK9IzZaXgN2eKOgbMe0Jg9eVpxfE: {
    walletAddress: 'cJZNo30TJPhY4zXLK9IzZaXgN2eKOgbMe0Jg9eVpxfE',
    userName: 'kprimice',
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
        current: 10,
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
        last: 213,
      },
      kills: {
        frags: 2,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725631378461,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
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
      y: 16,
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
        current: 7,
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
        last: 219,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 1,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631489299,
      coins: {
        balance: 18498,
        gained: 941,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 12,
      y: 8,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 12,
      y: 8,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o: {
    walletAddress: 'HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o',
    userName: 'zg99',
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
        current: 152,
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
        last: 220,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631480993,
      coins: {
        balance: 77200,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 19,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 19,
      y: 10,
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
        last: 255,
      },
      kills: {
        frags: 3,
        fragsInRow: 0,
        deaths: 2,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631853198,
      coins: {
        balance: 218206,
        gained: 4623,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 5,
      y: 12,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 12,
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
        current: 24,
        max: 25,
      },
      hp: {
        current: 300,
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
        last: 255,
      },
      kills: {
        frags: 9,
        fragsInRow: 9,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631849851,
      coins: {
        balance: 116879,
        gained: 10007,
      },
      additionalTokens: {
        war: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 14,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 6,
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
        current: 50,
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
        last: 255,
      },
      kills: {
        frags: 9,
        fragsInRow: 9,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631850536,
      coins: {
        balance: 149592,
        gained: 11873,
      },
      additionalTokens: {
        war: {
          gained: 4,
        },
      },
    },
    pos: {
      x: 17,
      y: 19,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 13,
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
        current: 9,
        max: 22,
      },
      hp: {
        current: 85,
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
        last: 254,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
      },
      previousAttackTs: 1725631824125,
      coins: {
        balance: 8073,
        gained: 626,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 13,
    },
  },
  HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o: {
    walletAddress: 'HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o',
    userName: 'zg99',
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
        current: 206,
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
        last: 255,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: null,
      coins: {
        balance: 77200,
        gained: 1186,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 14,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8': {
    walletAddress: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
    userName: 'randy',
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
        last: 255,
      },
      kills: {
        frags: 4,
        fragsInRow: 3,
        deaths: 5,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725631852871,
      coins: {
        balance: 35397,
        gained: 1540,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 18,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
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
        last: 255,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 7,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631849377,
      coins: {
        balance: 2751,
        gained: 0,
      },
      additionalTokens: {
        war: {
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
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
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
        last: 255,
      },
      kills: {
        frags: 6,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725631812011,
      coins: {
        balance: 109385,
        gained: 1524,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 17,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 26,
      y: 21,
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
        current: 3,
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
        current: 115,
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
        last: 255,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 2,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725631852351,
      coins: {
        balance: 100210,
        gained: 3783,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 25,
      y: 16,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 16,
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
        current: 16,
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
        last: 255,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725631751528,
      coins: {
        balance: 11774,
        gained: 4762,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 5,
      y: 16,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 16,
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
        current: 18,
        max: 20,
      },
      hp: {
        current: 111,
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
        last: 255,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
      },
      previousAttackTs: 1725631851728,
      coins: {
        balance: 19439,
        gained: 984,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 27,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 27,
      y: 20,
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
    userName: 'aoc',
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
        last: 255,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725631843767,
      coins: {
        balance: 13131,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 1,
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
        last: 255,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: '1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8',
      },
      previousAttackTs: 1725631854050,
      coins: {
        balance: 87107,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 22,
      y: 12,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 12,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU': {
    walletAddress: '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU',
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
        current: 15,
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
        last: 255,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        war: {
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
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 18,
    },
  },
};

const players3 = {
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
        last: 291,
      },
      kills: {
        frags: 6,
        fragsInRow: 0,
        deaths: 11,
        killedBy: 'GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE',
      },
      previousAttackTs: 1725632212207,
      coins: {
        balance: 161465,
        gained: 1080,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 2,
      y: 5,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 2,
      y: 5,
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
        current: 18,
        max: 25,
      },
      hp: {
        current: 81,
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
        last: 291,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A',
      },
      previousAttackTs: 1725632195637,
      coins: {
        balance: 87107,
        gained: 214,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 14,
      y: 26,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 26,
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
        last: 291,
      },
      kills: {
        frags: 4,
        fragsInRow: 1,
        deaths: 3,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725632217540,
      coins: {
        balance: 103993,
        gained: 2800,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 21,
      y: 14,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 14,
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
        current: 13,
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
        last: 290,
      },
      kills: {
        frags: 3,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725632178954,
      coins: {
        balance: 8699,
        gained: 3577,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 20,
      y: 21,
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
        current: 86,
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
        last: 291,
      },
      kills: {
        frags: 7,
        fragsInRow: 1,
        deaths: 2,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725632217277,
      coins: {
        balance: 110909,
        gained: 4837,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 8,
      y: 8,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 8,
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
        current: 35,
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
        last: 291,
      },
      kills: {
        frags: 9,
        fragsInRow: 0,
        deaths: 12,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632215877,
      coins: {
        balance: 16536,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 8,
      y: 7,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 7,
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
        current: 0,
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
        current: 48,
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
        last: 290,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632212432,
      coins: {
        balance: 38719,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 12,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 12,
      y: 20,
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
        current: 11,
        max: 25,
      },
      hp: {
        current: 65,
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
        last: 290,
      },
      kills: {
        frags: 3,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632215125,
      coins: {
        balance: 95228,
        gained: 2794,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 21,
      y: 17,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 17,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A: {
    walletAddress: 'A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A',
    userName: 'MrNeverYouMind',
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
        last: 291,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725632217131,
      coins: {
        balance: 83130,
        gained: 6194,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 18,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 3,
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
        last: 290,
      },
      kills: {
        frags: 3,
        fragsInRow: 0,
        deaths: 4,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725632200026,
      coins: {
        balance: 31932,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 22,
      y: 7,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 7,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o: {
    walletAddress: 'HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o',
    userName: 'zg99',
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
        last: 291,
      },
      kills: {
        frags: 2,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A',
      },
      previousAttackTs: 1725632133180,
      coins: {
        balance: 78386,
        gained: 2456,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 5,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 15,
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
        current: 7,
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
        last: 291,
      },
      kills: {
        frags: 6,
        fragsInRow: 6,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725632184774,
      coins: {
        balance: 126886,
        gained: 9108,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 25,
      y: 1,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 1,
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
        last: 291,
      },
      kills: {
        frags: 6,
        fragsInRow: 3,
        deaths: 2,
        killedBy: 'qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk',
      },
      previousAttackTs: 1725632210959,
      coins: {
        balance: 222829,
        gained: 10429,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 22,
      y: 25,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 25,
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
        current: 5,
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
        last: 289,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: null,
      coins: {
        balance: 20423,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 23,
      y: 17,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 29,
      y: 12,
    },
  },
  QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo: {
    walletAddress: 'QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo',
    userName: 'aahcreativeid',
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
        last: 291,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g',
      },
      previousAttackTs: 1725632219968,
      coins: {
        balance: 2751,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 16,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 20,
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
    userName: 'aoc',
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
        current: 63,
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
        last: 291,
      },
      kills: {
        frags: 2,
        fragsInRow: 2,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725632062554,
      coins: {
        balance: 13131,
        gained: 2441,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 13,
      y: 26,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 13,
      y: 26,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU': {
    walletAddress: '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU',
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
        current: 30,
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
        last: 291,
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
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 18,
      y: 2,
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
      x: 18,
      y: 2,
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
        last: 325,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 5,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725632559812,
      coins: {
        balance: 38719,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 5,
      y: 0,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 0,
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
        last: 326,
      },
      kills: {
        frags: 5,
        fragsInRow: 1,
        deaths: 2,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725632569741,
      coins: {
        balance: 135994,
        gained: 2072,
      },
      additionalTokens: {
        war: {
          gained: 1,
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
        last: 325,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 3,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725632555942,
      coins: {
        balance: 31932,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 9,
      y: 3,
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
  '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw': {
    walletAddress: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
    beaverId: 'speedy_beaver',
    equipment: {
      teleports: {
        current: 3,
        max: 5,
      },
      landmines: {
        current: 5,
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
        current: 59,
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
        last: 326,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725632548106,
      coins: {
        balance: 162545,
        gained: 5518,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 12,
      y: 12,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 12,
      y: 12,
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
        last: 326,
      },
      kills: {
        frags: 3,
        fragsInRow: 2,
        deaths: 2,
        killedBy: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
      },
      previousAttackTs: 1725632561859,
      coins: {
        balance: 16536,
        gained: 3397,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 18,
      y: 29,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 29,
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
        current: 81,
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
        last: 326,
      },
      kills: {
        frags: 7,
        fragsInRow: 1,
        deaths: 3,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725632564248,
      coins: {
        balance: 98022,
        gained: 3085,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 15,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
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
        last: 326,
      },
      kills: {
        frags: 2,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632570754,
      coins: {
        balance: 106793,
        gained: 3207,
      },
      additionalTokens: {
        war: {
          gained: 5,
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
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE: {
    walletAddress: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
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
        last: 326,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 7,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725632563285,
      coins: {
        balance: 20423,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 1,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 1,
      y: 6,
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
        current: 11,
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
        last: 325,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725632544709,
      coins: {
        balance: 12276,
        gained: 2939,
      },
      additionalTokens: {
        war: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 16,
      y: 5,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 5,
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
    userName: 'aoc',
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
        last: 326,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725632563005,
      coins: {
        balance: 15572,
        gained: 2779,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 16,
      y: 14,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 16,
      y: 14,
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
        current: 20,
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
        last: 326,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
      },
      previousAttackTs: 1725632534845,
      coins: {
        balance: 2751,
        gained: 3714,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 29,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 29,
      y: 23,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o: {
    walletAddress: 'HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o',
    userName: 'zg99',
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
        current: 175,
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
        last: 326,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 4,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725632566518,
      coins: {
        balance: 80842,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 2,
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 2,
      y: 4,
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
        last: 326,
      },
      kills: {
        frags: 6,
        fragsInRow: 1,
        deaths: 2,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: 1725632562728,
      coins: {
        balance: 233258,
        gained: 5462,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 23,
      y: 9,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 23,
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
        current: 0,
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
        last: 326,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725632578172,
      coins: {
        balance: 87321,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 15,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY': {
    walletAddress: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
    userName: 'just_ppe',
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
        current: 86,
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
        last: 326,
      },
      kills: {
        frags: 6,
        fragsInRow: 6,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725632563100,
      coins: {
        balance: 118772,
        gained: 9877,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 21,
      y: 4,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
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

const players5 = {
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
        last: 361,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '50nnZqN3jlfKQmPNwBKpiMURzq7I4hGSRSXFXnRH6k8',
      },
      previousAttackTs: 1725632787988,
      coins: {
        balance: 31932,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 4,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 4,
      y: 23,
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
        current: 26,
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
        last: 362,
      },
      kills: {
        frags: 8,
        fragsInRow: 2,
        deaths: 1,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725632857470,
      coins: {
        balance: 168063,
        gained: 5153,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 6,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 6,
      y: 15,
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
        last: 362,
      },
      kills: {
        frags: 7,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632930511,
      coins: {
        balance: 138066,
        gained: 4351,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 21,
      y: 25,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 25,
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
        current: 104,
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
        last: 361,
      },
      kills: {
        frags: 6,
        fragsInRow: 6,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725632906382,
      coins: {
        balance: 0,
        gained: 4662,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 6,
      y: 20,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 6,
      y: 20,
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
        current: 81,
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
        last: 361,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725632850376,
      coins: {
        balance: 15215,
        gained: 4888,
      },
      additionalTokens: {
        war: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 24,
      y: 27,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 27,
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
        last: 362,
      },
      kills: {
        frags: 4,
        fragsInRow: 1,
        deaths: 5,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725632933924,
      coins: {
        balance: 238720,
        gained: 2000,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 15,
      y: 0,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 0,
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
        current: 1,
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
        last: 362,
      },
      kills: {
        frags: 2,
        fragsInRow: 1,
        deaths: 2,
        killedBy: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
      },
      previousAttackTs: 1725632934550,
      coins: {
        balance: 19933,
        gained: 4486,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 10,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 10,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'gCTcD7dq-mlvY6EYoZXXkX7T9CEt6cGXBx8j6J3eDI0': {
    walletAddress: 'gCTcD7dq-mlvY6EYoZXXkX7T9CEt6cGXBx8j6J3eDI0',
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
        last: 338,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 10,
        killedBy: '6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA',
      },
      previousAttackTs: null,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 3,
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
        current: 0,
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
        current: 50,
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
        last: 361,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
      },
      previousAttackTs: 1725632913867,
      coins: {
        balance: 38719,
        gained: 123,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 24,
      y: 7,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 7,
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
    userName: 'aoc',
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
        current: 27,
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
        last: 362,
      },
      kills: {
        frags: 3,
        fragsInRow: 1,
        deaths: 3,
        killedBy: '6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M',
      },
      previousAttackTs: 1725632935230,
      coins: {
        balance: 18351,
        gained: 200,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 18,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 18,
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
        last: 362,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
      },
      previousAttackTs: 1725632937542,
      coins: {
        balance: 6465,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 24,
      y: 8,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 24,
      y: 8,
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
        current: 21,
        max: 22,
      },
      hp: {
        current: 10,
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
        last: 362,
      },
      kills: {
        frags: 4,
        fragsInRow: 2,
        deaths: 1,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725632933827,
      coins: {
        balance: 110000,
        gained: 4905,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 18,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 18,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o: {
    walletAddress: 'HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o',
    userName: 'zg99',
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
        last: 338,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: 'GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE',
      },
      previousAttackTs: null,
      coins: {
        balance: 80842,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 18,
      y: 13,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 1,
      y: 19,
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
        current: 20,
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
        last: 362,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632917197,
      coins: {
        balance: 87321,
        gained: 1235,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 5,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 5,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY': {
    walletAddress: 'Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY',
    userName: 'just_ppe',
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
        current: 52,
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
        last: 362,
      },
      kills: {
        frags: 9,
        fragsInRow: 3,
        deaths: 1,
        killedBy: '',
      },
      previousAttackTs: 1725632912867,
      coins: {
        balance: 128649,
        gained: 10711,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 15,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 3,
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
        current: 8,
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
        last: 362,
      },
      kills: {
        frags: 1,
        fragsInRow: 1,
        deaths: 3,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632922343,
      coins: {
        balance: 20423,
        gained: 180,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 26,
      y: 5,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 26,
      y: 5,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '50nnZqN3jlfKQmPNwBKpiMURzq7I4hGSRSXFXnRH6k8': {
    walletAddress: '50nnZqN3jlfKQmPNwBKpiMURzq7I4hGSRSXFXnRH6k8',
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
        last: 362,
      },
      kills: {
        frags: 4,
        fragsInRow: 2,
        deaths: 2,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725632930602,
      coins: {
        balance: 0,
        gained: 2276,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 25,
      y: 0,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 25,
      y: 0,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU': {
    walletAddress: '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU',
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
        current: 17,
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
        last: 362,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: '50nnZqN3jlfKQmPNwBKpiMURzq7I4hGSRSXFXnRH6k8',
      },
      previousAttackTs: 1725632934829,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 19,
      y: 26,
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
      x: 19,
      y: 26,
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
        last: 397,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs',
      },
      previousAttackTs: 1725633286579,
      coins: {
        balance: 38842,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 1,
      y: 6,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
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
        current: 0,
        max: 5,
      },
      landmines: {
        current: 5,
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
        current: 121,
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
        last: 398,
      },
      kills: {
        frags: 4,
        fragsInRow: 4,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725633294946,
      coins: {
        balance: 114905,
        gained: 6514,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 4,
      y: 1,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 4,
      y: 1,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  s4JPHqCNvdVspEYm_BGd8SIRzVvsj9e4bMFcSnnRG5Q: {
    walletAddress: 's4JPHqCNvdVspEYm_BGd8SIRzVvsj9e4bMFcSnnRG5Q',
    userName: 'trash.ar',
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
        last: 398,
      },
      kills: {
        frags: 6,
        fragsInRow: 0,
        deaths: 3,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725633297042,
      coins: {
        balance: 0,
        gained: 3005,
      },
      additionalTokens: {
        war: {
          gained: 0,
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
        current: 10,
        max: 25,
      },
      hp: {
        current: 64,
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
        last: 397,
      },
      kills: {
        frags: 5,
        fragsInRow: 2,
        deaths: 1,
        killedBy: 's4JPHqCNvdVspEYm_BGd8SIRzVvsj9e4bMFcSnnRG5Q',
      },
      previousAttackTs: 1725633294464,
      coins: {
        balance: 105769,
        gained: 6151,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 14,
      y: 7,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 7,
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
        current: 21,
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
        last: 398,
      },
      kills: {
        frags: 3,
        fragsInRow: 3,
        deaths: 3,
        killedBy: '',
      },
      previousAttackTs: 1725633298315,
      coins: {
        balance: 24419,
        gained: 4662,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 27,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 27,
      y: 3,
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
        last: 397,
      },
      kills: {
        frags: 2,
        fragsInRow: 1,
        deaths: 5,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725633287413,
      coins: {
        balance: 20103,
        gained: 180,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 21,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 3,
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
        current: 18,
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
        last: 397,
      },
      kills: {
        frags: 2,
        fragsInRow: 1,
        deaths: 3,
        killedBy: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
      },
      previousAttackTs: 1725633294606,
      coins: {
        balance: 31932,
        gained: 180,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 15,
      y: 10,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 15,
      y: 10,
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
        current: 22,
        max: 25,
      },
      hp: {
        current: 27,
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
        last: 398,
      },
      kills: {
        frags: 1,
        fragsInRow: 0,
        deaths: 4,
        killedBy: 'pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE',
      },
      previousAttackTs: 1725633204183,
      coins: {
        balance: 6465,
        gained: 1609,
      },
      additionalTokens: {
        war: {
          gained: 2,
        },
      },
    },
    pos: {
      x: 6,
      y: 0,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 6,
      y: 0,
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
        last: 398,
      },
      kills: {
        frags: 5,
        fragsInRow: 0,
        deaths: 2,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725633294977,
      coins: {
        balance: 142417,
        gained: 3744,
      },
      additionalTokens: {
        war: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 19,
      y: 24,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 19,
      y: 24,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU': {
    walletAddress: '59KjEzOT4NXwMCL1Aq3lvOFwzDAi8qmM3NJreZ7EzPU',
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
        last: 398,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 6,
        killedBy: '8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw',
      },
      previousAttackTs: 1725633264965,
      coins: {
        balance: 0,
        gained: 0,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 3,
      y: 23,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 3,
      y: 23,
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
        current: 84,
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
        last: 398,
      },
      kills: {
        frags: 2,
        fragsInRow: 0,
        deaths: 3,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725633299530,
      coins: {
        balance: 20603,
        gained: 1878,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 22,
      y: 3,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 22,
      y: 3,
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
        current: 27,
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
        last: 398,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 0,
        killedBy: '',
      },
      previousAttackTs: 1725633277472,
      coins: {
        balance: 88556,
        gained: 4170,
      },
      additionalTokens: {
        war: {
          gained: 5,
        },
      },
    },
    pos: {
      x: 0,
      y: 11,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 0,
      y: 11,
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
        current: 56,
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
        last: 398,
      },
      kills: {
        frags: 3,
        fragsInRow: 2,
        deaths: 5,
        killedBy: 'apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ',
      },
      previousAttackTs: 1725633280464,
      coins: {
        balance: 173216,
        gained: 360,
      },
      additionalTokens: {
        war: {
          gained: 3,
        },
      },
    },
    pos: {
      x: 8,
      y: 28,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 8,
      y: 28,
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
        last: 398,
      },
      kills: {
        frags: 6,
        fragsInRow: 0,
        deaths: 5,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725633296706,
      coins: {
        balance: 240720,
        gained: 3104,
      },
      additionalTokens: {
        war: {
          gained: 1,
        },
      },
    },
    pos: {
      x: 21,
      y: 24,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 21,
      y: 24,
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
    userName: 'aoc',
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
        last: 398,
      },
      kills: {
        frags: 7,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA',
      },
      previousAttackTs: 1725633287315,
      coins: {
        balance: 18551,
        gained: 7172,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 1,
      y: 18,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 1,
      y: 18,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
  HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o: {
    walletAddress: 'HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o',
    userName: 'zg99',
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
        last: 398,
      },
      kills: {
        frags: 0,
        fragsInRow: 0,
        deaths: 1,
        killedBy: 'qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM',
      },
      previousAttackTs: 1725633205453,
      coins: {
        balance: 80842,
        gained: 501,
      },
      additionalTokens: {
        war: {
          gained: 0,
        },
      },
    },
    pos: {
      x: 14,
      y: 15,
    },
    onGameObject: {
      type: 'none',
      tile: 4,
      value: 0,
    },
    movedPos: {
      x: 14,
      y: 15,
    },
    onGameTreasure: {
      type: 'hole',
      label: 'hole',
      tile: 0,
      value: 0,
    },
  },
};

warTokens(players1);
warTokens(players2);
warTokens(players3);
warTokens(players4);
warTokens(players5);
warTokens(players6);

console.log(result);
Object.entries(result).forEach(([k, v]) => {
  transferWar(k, v).then((r) => console.log(r));
});

function warTokens(players) {
  console.log(` -- Getting ${Object.values(players).length} players --`);
  Object.values(players).forEach((p) => {
    const war = p.stats.additionalTokens.war.gained * GameTreasure.war.baseVal;
    if (war > 0) {
      console.log(`Player ${p.walletAddress} got ${war} war`);
      if (!result[p.walletAddress]) {
        result[p.walletAddress] = war;
      } else {
        result[p.walletAddress] += war;
      }
    }
  });
}

// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.006 to 1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.006 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to VBNG_bQ9zQVejiG6kRm-jqYNMuY_3X-RneRRnPq6K80
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.018 to XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: dNYQzabrsrPSn8WOFip6tiPs1cRt2kZ__9PVz86eERI   Transferred 0.006 to 1bDUsm3L4EJOm3JZTItaXkvJAxxi8zrsRZ4KJN8HI_8
// Id: LdAecKCGmePpx0lCxvc7BipgUY0h7uP3v0gBUOg4snA   Transferred 0.012 to QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo
// Id: 04CP-vVgl2xdkdMZEVxmoP4f41526FllTLDv_6ENOXc   Transferred 0.012 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: KI1Wo5qgWTAq4C2HcpYZXMWen2WaAkcUchNcXUVLj4U   Transferred 0.018 to XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA
// Id: T3213DY_Dhxn3OdxdMQWX1sluU9K72q70pg2cDvFjag   Transferred 0.012 to VBNG_bQ9zQVejiG6kRm-jqYNMuY_3X-RneRRnPq6K80
// Id: Fs3MVKFO1Lv2CbcOejqUjtW2NQuuuBefJCKX8-oK52A   Transferred 0.012 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
// Id: GDlxxb1-HBs1TSadtWQHBY1UXRjdQE40NP3sqNKVt4k   Transferred 0.012 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: y-9cr2J8ZfG3w83YrNO-as8-eMIRx_2fQ7bHZk3Hpqs   Transferred 0.012 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// Id: PX3DBBB0IC6vCC17zvT4oYIbIcbMGAytLVMEkGtxdnU   Transferred 0.006 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// Id: VbcrbpJFq9nY1mzHudpi1ahOKwpzeZ9V3pVBvcFhL9s   Transferred 0.012 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.066 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.096 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.066 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.03 to HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.03 to QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.048 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.018 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.078 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.03 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.006 to A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.03 to XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.054 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.012 to Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.006 to F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs
// CyberBeaverTestingSession11: Transferring xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10 0.006 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// Id: Bnv3idbEZLrwjRVCHTEtuRuefuqtJ5jpqoP-_W_mLzk   Transferred 0.066 to qCtnbl5rsbF-1qRhawIQArCbO4_2TUOtnFv5oEun9gM
// Id: 6ACoUaKPHUSDoFmb-wsuXVH08lQvImX7EGRIuP9L4XI   Transferred 0.03 to HWrFDRSxZLpzHYk7qLVfmugE9Am57evwiQW4qXj4V7o
// Id: lkKahRq-NvB1KBemYvwybwTmFKVxj6P05_tNowYjq7o   Transferred 0.03 to XduN4aZ4Q6h7Dc_qJyHQXUTRH11CppCxoe5T63P-lWA
// Id: FISzvV4A78lPg1UIQcVeRq2XlNAl72BOcB4PZM-3fbY   Transferred 0.078 to qD5VLaMYyIHlT6vH59TgYIs6g3EFlVjlPqljo6kqVxk
// Id: t6qPZRwwSiV8-QaXibmRN7k2FNaqaOQVS6D9zBe7PbA   Transferred 0.048 to apdNvQsfU80Mg-w8xtUP7gTXho41vWVCeRaB2IGwQwQ
// Id: yZDkAuE3470jXM_hJ_kyL1N5Xvx3ozAwwhfGW07Cwh4   Transferred 0.012 to Dj2ud7ui_rKtYwc_2cpGtNdlx6ifnX8w8VIksqIw42g
// Id: 8xlrVWHCizgYeoiO6z5MA9qQjqia5d3V8OcSee8OQP4   Transferred 0.054 to P3Ye2U1fmEmmSTqQ0zhurfZ4hrL2v21vWtPP62T_MoY
// Id: 2qxGMBFSDrVBsf57fIvmAXTmrgOrhayIgUWXLjH5WEw   Transferred 0.03 to 6sRPE3la2hXA1d6mucIJ2ajR-4XxDCjte-2MnP4rEeA
// Id: zBHYXXkvVzbm3v6pWhBfgSNTdtYbuQzoepu74fQgyxw   Transferred 0.006 to A3adyiCd3VI7schOR4oX8qXfAP_HDF12ikWBP_CBl5A
// Id: ljq3KDASIY0VyJ7PdVCqxc2f-z2s6aUw5ffVCmG1H4A   Transferred 0.006 to 6wflRNySzV0D2S9ocgw-sodVsryjuPpMkaA5Zj1Ba58
// Id: loLCLxq--0VJTKwO0Af38tMmav-jGh12gwBxkYp54CU   Transferred 0.012 to GdtQquK867988DikyrJBnmJPcIItIXh5GuCX_MmhkQE
// Id: 9H3mVRQhdoYLyQm6F8rsbJVvDNvSkDb7lgxDLCMyee8   Transferred 0.018 to pNT5esHnPYMPh05h_m6zaQJoUnkPOSf_Mr_5jBQIIeE
// Id: gBczpwPoaQPvYsIU-s0thtcVCvxBv0FamjlJb-a4ju4   Transferred 0.012 to Wu7uDPxsxTT4sm--rqJDIIJcfLrJQmX086GoPMXGVeY
// Id: Uqb4QAC9OK0BMt6mxo_RbnySaEWiggZz6YkGxWJIZMs   Transferred 0.006 to F41xaHrXCllWFCQTi_qX6fphsJOU4wCqIltn14PWQVs
// Id: uvtQG7RaAkov-zdpn3gPUvl2ihrfKznPD1YGRD9adm8   Transferred 0.066 to 8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw
// Id: 7PkZ8r8p1zP_Ci_zuzH4g-7U-Jok5KPEkdXoDaB3MZ0   Transferred 0.096 to 6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M
// Id: xENyeLZJ4qrxMSThERr4_s0b-PpMDPSOae-avpabLwk   Transferred 0.03 to QLZP8SvS_rCADLdxNQeZDQcxSEtjk1R0O5LKmU37yqo
