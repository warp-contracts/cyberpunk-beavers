import Const, { FOV_DEPTH } from '../common/const.mjs';

export class Shrink {
  shrinkMap;
  currentShrinkSize = 0;
  roundsToShrink = 0;
  warnMap;
  mainScene;

  constructor(mainScene, initialSize) {
    this.mainScene = mainScene;
    if (initialSize > 0) {
      this.createShrinkMap(initialSize);
    }
  }

  createShrinkMap(size) {
    if (this.shrinkMap) {
      this.shrinkMap.destroy();
      this.shrinkMap = null;
    }
    if (this.warnMap) {
      this.warnMap.destroy();
      this.warnMap = null;
    }
    console.log('Creating shrink map');
    const { map, fx, layer, tween } = this.createMap(0, size, 0xff0000, 3);
    this.shrinkMap = map;
    setTimeout(() => {
      layer.postFX.remove(fx);
      fx.destroy();
      layer.setDepth(1000);
      this.mainScene.tweens.remove(tween);
      this.mainScene.tweens.add({
        targets: layer,
        alpha: 1,
        depth: 1000,
        duration: 1500,
        yoyo: false,
        loop: 0,
        ease: Phaser.Math.Easing.Sine.InOut,
      });
      //layer.setAlpha(1);
    }, 6000);
    this.currentShrinkSize = size;
    this.roundsToShrink = 0;
  }

  createWarningMap(offset, size) {
    if (this.warnMap) {
      this.warnMap.destroy();
      this.warnMap = null;
    }
    const { map } = this.createMap(offset, size, 0xffac1c, -1);
    this.warnMap = map;
  }

  createMap(offset, size, color, loops) {
    const mapSize = this.mainScene.tileMap.width;
    const data = Array(mapSize)
      .fill([])
      .map(() => Array(mapSize).fill(-1));

    // fixme: tiny c/p from info.mjs
    for (let y = offset; y < mapSize - offset; y++) {
      for (let x = offset; x < mapSize - offset; x++) {
        if (
          y - offset < size ||
          x - offset < size ||
          y > mapSize - offset - size - 1 ||
          x > mapSize - offset - size - 1
        ) {
          data[y][x] = 0;
        }
      }
    }

    const map = this.mainScene.make.tilemap({
      data,
      tileWidth: Const.Tile.size,
      tileHeight: Const.Tile.size,
    });

    const tiles = map.addTilesetImage('cyberpunk_game_fov');
    const layer = map.createLayer(0, tiles, 0, 0);
    layer.alpha = 0.1;
    layer.setDepth(FOV_DEPTH + 20);
    const fx = layer.postFX.addGlow(color, 0, 0, false, 0.1, 1);
    const self = this;
    const tween = this.mainScene.tweens.add({
      targets: fx,
      outerStrength: 8,
      duration: 1500,
      yoyo: true,
      loop: loops,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    return { map, fx, layer, tween };
  }
}
