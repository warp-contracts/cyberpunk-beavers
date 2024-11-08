export const HORDE_GAME_STATUS = {
  LOOSE: 'LOOSE',
  WIN: 'WIN',
  CONTINUE_WAVE: 'CONTINUE_WAVE',
  WAITING_FOR_WAVE: 'WAITING_FOR_WAVE',
  NEW_WAVE: 'NEW_WAVE',
};

export const MONSTER_TYPES = {
  private: {
    type: 'private',
    color: 0xfc99c4,
    hp: {
      current: 75,
      max: 75,
    },
    weapon: {
      attack_range: 2,
      damage: [20, 15],
      hit_chance: [0.8, 0.6],
      critical_hit_chance: [0.2, 0.1],
      critical_hit_multiplier: [1.5, 1.2],
    },
    move_recovery_ms: 1000,
    points_multiplier: 1,
  },
  sergeant: {
    type: 'sergeant',
    color: 0xdb73b7,
    hp: {
      current: 100,
      max: 100,
    },
    weapon: {
      attack_range: 3,
      damage: [22, 19, 15],
      hit_chance: [0.9, 0.8, 0.7],
      critical_hit_chance: [0.2, 0.15, 0.1],
      critical_hit_multiplier: [1.8, 1.5, 1.2],
    },
    move_recovery_ms: 900,
    points_multiplier: 1.2,
  },
  lieutenant: {
    type: 'lieutenant',
    color: 0xba52ad,
    hp: {
      current: 150,
      max: 150,
    },
    weapon: {
      attack_range: 3,
      damage: [25, 20, 18],
      hit_chance: [0.9, 0.85, 0.8],
      critical_hit_chance: [0.2, 0.15, 0.12],
      critical_hit_multiplier: [2.0, 1.8, 1.5],
    },
    move_recovery_ms: 800,
    points_multiplier: 1.4,
  },
  captain: {
    type: 'captain',
    color: 0x903799,
    hp: {
      current: 200,
      max: 200,
    },
    weapon: {
      attack_range: 4,
      damage: [30, 25, 20, 15],
      hit_chance: [0.85, 0.8, 0.75, 0.7],
      critical_hit_chance: [0.18, 0.16, 0.14, 0.1],
      critical_hit_multiplier: [1.8, 1.6, 1.4, 1.2],
    },
    move_recovery_ms: 700,
    points_multiplier: 1.6,
  },
  major: {
    type: 'major',
    color: 0x5c2179,
    hp: {
      current: 275,
      max: 275,
    },
    weapon: {
      attack_range: 4,
      damage: [35, 30, 25, 20],
      hit_chance: [0.9, 0.9, 0.8, 0.7],
      critical_hit_chance: [0.2, 0.19, 0.17, 0.16],
      critical_hit_multiplier: [1.9, 1.7, 1.4, 1.2],
    },
    move_recovery_ms: 600,
    points_multiplier: 1.8,
  },
  colonel: {
    type: 'colonel',
    color: 0x311058,
    hp: {
      current: 400,
      max: 400,
    },
    weapon: {
      attack_range: 5,
      damage: [45, 40, 35, 30, 25],
      hit_chance: [0.9, 0.85, 0.8, 0.75, 0.7],
      critical_hit_chance: [0.2, 0.18, 0.16, 0.14, 0.12],
      critical_hit_multiplier: [2.0, 1.8, 1.6, 1.4, 1.2],
    },
    move_recovery_ms: 500,
    points_multiplier: 2.0,
  },
};

export const MONSTERS_HIERARCHY = [
  MONSTER_TYPES.private.type,
  MONSTER_TYPES.sergeant.type,
  MONSTER_TYPES.lieutenant.type,
  MONSTER_TYPES.captain.type,
  MONSTER_TYPES.major.type,
  MONSTER_TYPES.colonel.type,
];
