import Const, { COLLISIONS_LAYER } from '../../common/const.mjs';

export function doCreateTileMap(mainScene) {
  const gameObjectsTexture = mainScene.textures.get('cyberpunk_game_objects');
  gameObjectsTexture.add('ap', 0, 0, 0, 48, 48);
  gameObjectsTexture.add('hp', 0, 48, 0, 48, 48);
  gameObjectsTexture.add('mine', 0, 96, 0, 48, 48);
  gameObjectsTexture.add('teleport', 0, 144, 0, 48, 48);

  mainScene.tileMap = mainScene.make.tilemap({ key: `map_${mainScene.mapTxId}` });
  const tileset = mainScene.tileMap.addTilesetImage('Sprite_Map_Sheet', 'map_sheet');
  const layers = mainScene.tileMap.getTileLayerNames();
  for (const layer of layers) {
    console.log('creating layer', layer);
    if (layer === COLLISIONS_LAYER) {
      const obstaclesLayer = mainScene.tileMap.createLayer(layer, tileset);
      obstaclesLayer.setDepth(-100);
      mainScene.tileMap.obstaclesLayer = obstaclesLayer;
    } else {
      mainScene.tileMap.createLayer(layer, tileset);
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
      ['ap', 'hp', 'mine', 'teleport'].forEach((objectType, index) => {
        sprites.push(
          ...map.createFromTiles(index, -1 /* removes the original tile */, {
            key: 'cyberpunk_game_objects',
            frame: objectType,
            origin: 0,
          })
        );
      });

      for (const sprite of sprites) {
        // those motherfuckers have some non-integral x,y positions, mostly for 'y'.
        // we need to find nearest multiplies of 48 to be able to remove them
        // when the object is picked.
        sprite.tilePosition = {
          x: Math.ceil(sprite.x / 48.0),
          y: Math.ceil(sprite.y / 48.0),
        };
      }

      mainScene.gameObjectSprites = sprites;
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
