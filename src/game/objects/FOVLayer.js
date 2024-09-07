import { Mrpas } from 'mrpas';
import Phaser from 'phaser';
import Const, { FOG_ALPHA, FOV_DEPTH } from '../common/const.mjs';

const lightDropoff = [/*0.35, 0.3, 0.25, */ 0.15, 0.1, 0.05];

export class FOVLayer {
  fovLayer;
  mrpas;
  lastPos;
  fovTileMap;
  mainScene;
  radius;

  constructor(mainScene, radius) {
    console.log('adding FOV layer');
    this.radius = radius;

    const data = Array(Const.Map.size)
      .fill([])
      .map(() => Array(Const.Map.size).fill(0));

    const fovMap = mainScene.make.tilemap({
      data,
      tileWidth: Const.Tile.size,
      tileHeight: Const.Tile.size,
    });

    const utilTiles = fovMap.addTilesetImage('cyberpunk_game_fov');

    this.fovLayer = fovMap.createBlankLayer('Dark', utilTiles, 0, 0).fill(0);
    this.fovLayer.setDepth(FOV_DEPTH);

    this.fovTileMap = fovMap;
    this.recalculate();
    console.log('FOV layer added');
    this.obstaclesLayer = mainScene.tileMap.obstaclesLayer;

    this.lastPos = new Phaser.Math.Vector2({ x: -1, y: -1 });
    this.initialCalc = false;
    this.mainScene = mainScene;
  }

  recalculate() {
    this.mrpas = new Mrpas(this.fovTileMap.width, this.fovTileMap.height, (x, y) => {
      const tile = this.obstaclesLayer.getTileAt(x, y, true);
      return tile && tile.index <= Const.EMPTY_TILE; // no obstacle - visible
      // obstacle next to other obstacle
      /*|| (tile && tile.index > Const.EMPTY_TILE
        && (
          this.obstaclesLayer.getTileAt(x, y + 1, true)?.index > Const.EMPTY_TILE
          || this.obstaclesLayer.getTileAt(x, y - 1, true)  ?.index > Const.EMPTY_TILE
          || this.obstaclesLayer.getTileAt(x + 1, y, true)?.index > Const.EMPTY_TILE
          || this.obstaclesLayer.getTileAt(x - 1, y, true)?.index > Const.EMPTY_TILE
        ));*/
    });
  }

  update(pos, bounds) {
    if (!this.lastPos.equals(pos) /*|| !this.initialCalc*/) {
      this.updateMRPAS(pos);
      this.lastPos = pos.clone();
      // this.initialCalc = true;
    }
    // TODO: fix - only if position changes
    for (let y = bounds.y; y < bounds.y + bounds.height; y++) {
      for (let x = bounds.x; x < bounds.x + bounds.width; x++) {
        if (y < 0 || y >= this.fovTileMap.height || x < 0 || x >= this.fovTileMap.width) {
          continue;
        }
        const tile = this.fovLayer.getTileAt(x, y, true);
        tile.setAlpha(tile.desiredAlpha);
      }
    }

    for (const walletAddress of Object.keys(this.mainScene.allPlayers)) {
      const player = this.mainScene.allPlayers[walletAddress];
      if (player == this.mainScene.mainPlayer) {
        continue;
      }
      player.setVisible(this.isPlayerVisible(player));
    }
  }

  updateMRPAS(pos) {
    // TODO: performance?
    for (let y = 0; y < this.fovTileMap.height; y++) {
      for (let x = 0; x < this.fovTileMap.width; x++) {
        const tile = this.fovLayer.getTileAt(x, y, true);
        tile.desiredAlpha = tile.seen ? FOG_ALPHA : 1;
      }
    }

    this.mrpas.compute(
      pos.x,
      pos.y,
      this.radius,
      (x, y) => true,
      (x, y) => {
        const distance = Math.floor(new Phaser.Math.Vector2(x, y).distance(new Phaser.Math.Vector2(pos.x, pos.y)));

        const rolloffIdx = distance <= this.radius ? this.radius - distance : 0;
        const alpha = rolloffIdx < lightDropoff.length ? lightDropoff[rolloffIdx] : 0;
        const tile = this.fovLayer.getTileAt(x, y, true);
        tile.desiredAlpha = alpha;
        tile.seen = true;
      }
    );
  }

  isPlayerVisible(player) {
    const playerTilePos = new Phaser.Math.Vector2({
      x: this.mainScene.tileMap.worldToTileX(player.x),
      y: this.mainScene.tileMap.worldToTileY(player.y),
    });
    const fovTile = this.fovLayer.getTileAt(playerTilePos.x, playerTilePos.y, true);
    return fovTile && fovTile.alpha < FOG_ALPHA;
  }
}
