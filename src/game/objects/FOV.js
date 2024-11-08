import { Mrpas } from 'mrpas';
import Phaser from 'phaser';
import Const from '../common/const.mjs';
import { EMPTY_TILE, FOG_ALPHA, FOV_DEPTH } from '../common/mapsLayersConst.mjs';

const lightDropoff = [/*0.35, 0.3, 0.25, */ 0.15, 0.1, 0.05];

export class FOV {
  fovLayer;
  mrpas;
  lastPos;
  fovTileMap;
  mainScene;
  radius;
  xray = false;

  constructor(mainScene, beaverChoice) {
    console.log('adding FOV layer');
    this.beaverChoice = beaverChoice;
    this.radius = Const.BEAVER_TYPES[beaverChoice].stats.fov;

    const data = Array(mainScene.tileMap.width)
      .fill([])
      .map(() => Array(mainScene.tileMap.width).fill(1));

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
    this.mainScene = mainScene;
  }

  setXRay() {
    this.mainScene.xraySound.play();
    this.radius = Const.BEAVER_TYPES[this.beaverChoice].stats.fovExtended;
    this.xray = true;
    this.mainScene.update();
  }

  removeXRay() {
    this.radius = Const.BEAVER_TYPES[this.beaverChoice].stats.fov;
    this.xray = false;
    this.mainScene.update();
  }

  recalculate() {
    const self = this;
    this.mrpas = new Mrpas(this.fovTileMap.width, this.fovTileMap.height, (x, y) => {
      const tile = self.obstaclesLayer.getTileAt(x, y, true);
      return self.xray || (tile && tile.index <= EMPTY_TILE); // no obstacle - visible
    });
  }

  update(pos, bounds) {
    if (this.xray || !this.lastPos.equals(pos)) {
      this.updateMRPAS(pos);
      this.lastPos = pos.clone();
      for (let y = bounds.y; y < bounds.y + bounds.height; y++) {
        for (let x = bounds.x; x < bounds.x + bounds.width; x++) {
          if (y < 0 || y >= this.fovTileMap.height || x < 0 || x >= this.fovTileMap.width) {
            continue;
          }
          const tile = this.fovLayer.getTileAt(x, y, true);
          tile?.setAlpha(tile.desiredAlpha);
        }
      }
    }

    for (const walletAddress of Object.keys(this.mainScene.allPlayers)) {
      const player = this.mainScene.allPlayers[walletAddress];
      if (player === this.mainScene.mainPlayer) {
        continue;
      }
      player.setVisible(this.isObjectVisible(player));
    }

    const monsters = this.mainScene.hordeManager?.monsters;
    if (monsters) {
      for (const walletAddress of Object.keys(monsters)) {
        const monster = monsters[walletAddress];
        monster.setVisible(this.isObjectVisible(monster));
      }
    }

    for (const gameObjectSprite of this.mainScene.gameObjectsSpritesArray) {
      gameObjectSprite.setVisible(gameObjectSprite.picked !== true && this.isObjectVisible(gameObjectSprite));
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

  isObjectVisible(object) {
    const objectTilePos = new Phaser.Math.Vector2({
      x: this.mainScene.tileMap.worldToTileX(object.x),
      y: this.mainScene.tileMap.worldToTileY(object.y),
    });
    const fovTile = this.fovLayer.getTileAt(objectTilePos.x, objectTilePos.y, true);
    return fovTile && fovTile.alpha < FOG_ALPHA;
  }
}
