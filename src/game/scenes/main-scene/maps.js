import Const, { COLLISIONS_LAYER } from '../../common/const.mjs';
export function doCreateTileMap(mainScene) {
  mainScene.tileMap = mainScene.make.tilemap({ key: `map_${mainScene.mapTxId}` });
  const tileset = mainScene.tileMap.addTilesetImage('Sprite_Map_Sheet', 'map_sheet');
  const layers = mainScene.tileMap.getTileLayerNames();
  for (const layer of layers) {
    console.log('creating layer', layer);
    if (layer === COLLISIONS_LAYER) {
      continue;
    }
    mainScene.tileMap.createLayer(layer, tileset);
  }
}

export function initMapObjects({ treasuresLayer, objectsLayer, mainScene }) {
  if (mainScene.gameTreasuresLayer && mainScene.gameObjectsLayer) {
    return;
  }
  mainScene.gameTreasuresLayer = createLayer(treasuresLayer, 'cyberpunk_game_treasures', 3);
  mainScene.gameObjectsLayer = createLayer(objectsLayer, 'cyberpunk_game_objects', 4);

  function createLayer(data, image, depth) {
    const map = mainScene.make.tilemap({
      data,
      tileWidth: Const.Tile.size,
      tileHeight: Const.Tile.size,
    });

    const tiles = map.addTilesetImage(image);
    const layer = map.createLayer(0, tiles, 0, 0);

    if (depth) {
      layer.setDepth(depth);
    }

    return layer;
  }
}
