import { GAMEPLAY_MODES } from './const.mjs';

export const GameObject = {
  ap: { type: 'ap', tile: 0, value: 1, rarity: 10, roundsToRespawn: 5 },
  hp: {
    type: 'hp',
    tile: 1,
    value: {
      [GAMEPLAY_MODES.deathmatch]: 5,
      [GAMEPLAY_MODES.horde]: 15,
      [GAMEPLAY_MODES.battleRoyale]: 10,
    },
    rarity: 10,
    roundsToRespawn: 5,
  },
  equipment_mine: { type: 'equipment_mine', tile: 2, value: 4, rarity: 40, roundsToRespawn: 10 },
  teleport_device: { type: 'teleport_device', tile: 3, value: 10, rarity: 10, roundsToRespawn: 20 },
  scanner_device: { type: 'scanner_device', tile: 4, value: 10, rarity: 10, roundsToRespawn: 20 },
  quad_damage: { type: 'quad_damage', tile: 5, value: 100, rarity: 3, roundsToRespawn: 5 },
  show_map: { type: 'show_map', tile: 6, value: 40, rarity: 2, roundsToRespawn: 10 },
  hazard: { type: 'hazard', tile: 7, value: 200, rarity: 0, roundsToRespawn: 100 },
  drill: { type: 'drill', tile: 8, value: 20, rarity: 10, roundsToRespawn: 20 },
  shield: { type: 'shield', tile: 9, value: 60, rarity: 5, roundsToRespawn: 20 },
  xray: { type: 'xray', tile: 10, value: 60, rarity: 5, roundsToRespawn: 10 },
  none: { type: 'none', tile: 11, value: 0 },

  // invisible
  active_mine: { type: 'active_mine', tile: 0, value: 0, damage: 75 },
};

export const Respawned = {
  random: 'random',
  constant: 'constant',
};

export const DEFAULT_GAME_OBJECTS_CONFIG = {
  respawned: Respawned.random,
};
