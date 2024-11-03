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
      attack_range: 4,
      damage: [40, 30, 25, 20],
      hit_chance: [0.95, 0.95, 0.9, 0.85],
      critical_hit_chance: [0.3, 0.25, 0.2, 0.15],
      critical_hit_multiplier: [3.0, 3.0, 2.5, 2.0],
    },
    move_recovery_ms: 1000,
    points_multiplier: 1,
  },
  sergeant: {
    type: 'sergeant',
    color: 0xdb73b7,
    hp: {
      current: 150,
      max: 150,
    },
    weapon: {
      attack_range: 4,
      damage: [40, 30, 25, 20],
      hit_chance: [0.95, 0.95, 0.9, 0.85],
      critical_hit_chance: [0.3, 0.25, 0.2, 0.15],
      critical_hit_multiplier: [3.0, 3.0, 2.5, 2.0],
    },
    move_recovery_ms: 900,
    points_multiplier: 1.2,
  },
  lieutenant: {
    type: 'lieutenant',
    color: 0xba52ad,
    hp: {
      current: 250,
      max: 250,
    },
    weapon: {
      attack_range: 5,
      damage: [40, 30, 25, 20, 15],
      hit_chance: [0.95, 0.95, 0.95, 0.95, 0.9],
      critical_hit_chance: [0.3, 0.3, 0.3, 0.25, 0.2],
      critical_hit_multiplier: [3.0, 3.0, 3.0, 3.0, 2.5],
    },
    move_recovery_ms: 800,
    points_multiplier: 1.4,
  },
  captain: {
    type: 'captain',
    color: 0x903799,
    hp: {
      current: 400,
      max: 400,
    },
    weapon: {
      attack_range: 5,
      damage: [40, 30, 25, 20, 15],
      hit_chance: [0.95, 0.95, 0.95, 0.95, 0.9],
      critical_hit_chance: [0.3, 0.3, 0.3, 0.25, 0.2],
      critical_hit_multiplier: [3.0, 3.0, 3.0, 3.0, 2.5],
    },
    move_recovery_ms: 700,
    points_multiplier: 1.6,
  },
  major: {
    type: 'major',
    color: 0x5c2179,
    hp: {
      current: 600,
      max: 600,
    },
    weapon: {
      attack_range: 6,
      damage: [40, 30, 25, 20, 20, 20],
      hit_chance: [0.95, 0.95, 0.95, 0.95, 0.9, 0.85],
      critical_hit_chance: [0.3, 0.3, 0.3, 0.25, 0.2, 0.15],
      critical_hit_multiplier: [3.0, 3.0, 3.0, 3.0, 2.5, 2.0],
    },
    move_recovery_ms: 600,
    points_multiplier: 1.8,
  },
  colonel: {
    type: 'colonel',
    color: 0x311058,
    hp: {
      current: 1000,
      max: 1000,
    },
    weapon: {
      attack_range: 8,
      damage: [60, 55, 50, 45, 40, 35, 30, 25],
      hit_chance: [0.95, 0.95, 0.95, 0.95, 0.95, 0.9, 0.85],
      critical_hit_chance: [0.3, 0.3, 0.3, 0.3, 0.3, 0.25, 0.2, 0.15],
      critical_hit_multiplier: [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.5, 2.0],
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
