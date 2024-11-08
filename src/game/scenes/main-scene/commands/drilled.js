import { GameTreasure } from '../../../common/const.mjs';
import { GameObject } from '../../../common/gameObject.mjs';

export function executeDrill(response, self) {
  if (response.player.walletAddress !== self.mainPlayer?.walletAddress) {
    return;
  }
  self.drillSound.play();
  for (let field of response.drilled) {
    if (field.type == GameObject.none.type) {
      continue;
    } else if (field.tile > 0) {
      self.mainPlayer.diggedTreasures[`${field.pos?.x}, ${field.pos?.y}`] = field.treasure?.tile;
      self.gameTreasuresLayer?.putTileAt(field.tile, field.pos?.x, field.pos?.y);
    } else {
      self.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, field.pos?.x, field.pos?.y);
    }
  }
  self.updateStats(response.player, response.gameStats);
  self.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress);
}
