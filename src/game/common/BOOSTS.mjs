import { FOG_ALPHA } from './const.mjs';

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
  shield: {
    type: 'shield',
    effect: (baseDmg, player) => baseDmg * player.stats.shield,
    duration_rounds: 2,
  },
  xray: {
    type: 'xray',
    effect: (fov) => fov.setXRay(),
    duration_rounds: 2,
  },
};
