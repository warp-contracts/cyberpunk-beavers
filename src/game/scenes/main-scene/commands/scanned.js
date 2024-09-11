import { FOV_DEPTH } from '../../../common/const.mjs';
import { SCANNED_COLOR } from '../../../utils/style';

export function executeScan(response, mainScene) {
  if (response.player?.walletAddress == mainScene.mainPlayer?.walletAddress) {
    if (!mainScene.scanSound.isPlaying) {
      mainScene.scanSound.play();
    }
    const grid = addScannedGrid(response.player.stats.scannerRadius, mainScene, () => {
      for (let field of response.area) {
        if (field.treasure == null) continue;
        const treasureTile = mainScene.gameTreasuresLayer.putTileAt(field.treasure, field.tile[0], field.tile[1]);

        setTimeout(() => {
          if (!mainScene.mainPlayer.diggedTreasures[`${field.tile[0]}, ${field.tile[1]}`]) {
            mainScene.gameTreasuresLayer.removeTileAt(field.tile[0], field.tile[1]);
          }
          mainScene.tweens.add({
            targets: grid,
            alpha: { from: 1, to: 0 },
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
              grid.destroy();
            },
          });
        }, 5000);
      }
    });
  }
}

export function addScannedGrid(range, mainScene, onComplete) {
  const grid = mainScene.add
    .grid(
      mainScene.mainPlayer.x,
      mainScene.mainPlayer.y,
      (range * 2 + 1) * 48,
      (range * 2 + 1) * 48,
      48,
      48,
      SCANNED_COLOR,
      0.4
    )
    .setDepth(FOV_DEPTH + 10)
    .setAlpha(0);

  mainScene.tweens.add({
    targets: grid,
    alpha: { from: 0, to: 1 },
    duration: 500,
    ease: 'Power2',
    onComplete,
  });

  return grid;
}
