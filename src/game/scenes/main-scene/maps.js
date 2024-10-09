import Const, { COLLISIONS_LAYER, FRONT_LAYER_DEPTH, FRONT_LAYER_PREFIX, GameObject } from '../../common/const.mjs';

const gameObjectsTextureKey = `cyberpunk_game_objects`;
const gameObjectsToAdd = {
  [GameObject.ap.type]: { x: 0, y: 0 },
  [GameObject.hp.type]: { x: 48, y: 0 },
  [GameObject.equipment_mine.type]: { x: 96, y: 0 },
  [GameObject.teleport_device.type]: { x: 144, y: 0 },
  [GameObject.scanner_device.type]: { x: 0, y: 48 },
};

export function doCreateTileMap(mainScene) {
  const gameObjectsTexture = mainScene.textures.get(gameObjectsTextureKey);
  for (let [type, { x, y }] of Object.entries(gameObjectsToAdd)) {
    gameObjectsTexture.add(type, 0, x, y, 48, 48);
  }

  mainScene.tileMap = mainScene.make.tilemap({ key: `map_${mainScene.mapTxId}` });
  const tilesets = [
    mainScene.tileMap.addTilesetImage('Sprite_Map_Sheet', 'map_sheet_desert'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_A2', 'map_sheet_city_1'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior__A4', 'map_sheet_city_2'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_B', 'map_sheet_city_3'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_C', 'map_sheet_city_4'),
  ];
  const layers = mainScene.tileMap.getTileLayerNames();
  let frontLayerDepth = FRONT_LAYER_DEPTH;
  for (const layer of layers) {
    console.log('creating layer', layer);
    if (layer === COLLISIONS_LAYER) {
      const obstaclesLayer = mainScene.tileMap.createLayer(layer, tilesets);
      obstaclesLayer.setDepth(-100);
      mainScene.tileMap.obstaclesLayer = obstaclesLayer;
    } else {
      const mapLayer = mainScene.tileMap.createLayer(layer, tilesets);
      if (layer.startsWith(FRONT_LAYER_PREFIX)) {
        mapLayer.setDepth(frontLayerDepth++);
      }
      //.setPipeline('Light2D');
    }
  }
}

export function initMapObjects({ treasuresLayer, objectsLayer, mainScene }) {
  if (mainScene.gameTreasuresLayer && mainScene.gameObjectsLayer) {
    return;
  }
  mainScene.gameTreasuresLayer = createLayer(treasuresLayer, 'cyberpunk_game_treasures', 3);
  mainScene.gameObjectsLayer = createLayer(objectsLayer, 'cyberpunk_game_objects', 4, true);

  function createLayer(data, image, depth, asSprites) {
    const map = mainScene.make.tilemap({
      data,
      tileWidth: Const.Tile.size,
      tileHeight: Const.Tile.size,
    });

    const tiles = map.addTilesetImage(image);
    const layer = map.createLayer(0, tiles, 0, 0);
    if (asSprites) {
      const sprites = [];
      Object.keys(gameObjectsToAdd).forEach((objectType, index) => {
        sprites.push(
          ...map.createFromTiles(index, -1 /* removes the original tile */, {
            key: 'cyberpunk_game_objects',
            frame: objectType,
            origin: 0,
          })
        );
      });

      for (const sprite of sprites) {
        const { x, y } = mainScene.tileMap.worldToTileXY(sprite.x, sprite.y);
        if (!mainScene.gameObjectsSprites[y]) mainScene.gameObjectsSprites[y] = {};
        mainScene.gameObjectsSprites[y][x] = sprite;
        sprite.setDepth(4);
      }

      mainScene.tweens.add({
        targets: sprites,
        y: '-=5',
        duration: 250,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
      });
    }

    if (depth) {
      layer.setDepth(depth);
    }

    return layer;
  }
}

export function createSpriteOnTilemap(mainScene, type, { x, y }) {
  const { x: worldX, y: worldY } = mainScene.tileMap.tileToWorldXY(x, y);

  const sprite = mainScene.add.sprite(
    worldX + baseTileUnit / 2,
    worldY + baseTileUnit / 2,
    gameObjectsTextureKey,
    type
  );
  mainScene.gameObjectsSprites[y][x] = sprite;

  mainScene.tweens.add({
    targets: sprite,
    y: '-=5',
    duration: 250,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1,
    onStart: (tween) => {
      if (spriteSyncedTime !== null) {
        tween.progress = spriteSyncedTime;
      }
    },
  });
}
