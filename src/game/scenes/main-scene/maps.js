import Const from '../../common/const.mjs';
import { GameObject } from '../../common/gameObject.mjs';
import {
  COLLISIONS_LAYER,
  FRONT_LAYER_DEPTH,
  FRONT_LAYER_PREFIX,
  OBJECTS_DEPTH,
  OBSTACLES_DEPTH,
} from '../../common/mapsLayersConst.mjs';

const gameObjectsTextureKey = `cyberpunk_game_objects`;
const gameObjectsToAdd = {
  [GameObject.ap.type]: { x: 0, y: 0 },
  [GameObject.hp.type]: { x: 48, y: 0 },
  [GameObject.equipment_mine.type]: { x: 96, y: 0 },
  [GameObject.teleport_device.type]: { x: 144, y: 0 },
  [GameObject.scanner_device.type]: { x: 0, y: 48 },
  [GameObject.quad_damage.type]: { x: 48, y: 48 },
  [GameObject.show_map.type]: { x: 96, y: 48 },
  [GameObject.hazard.type]: { x: 144, y: 48 },
  [GameObject.drill.type]: { x: 0, y: 96 },
  [GameObject.shield.type]: { x: 48, y: 96 },
  [GameObject.xray.type]: { x: 96, y: 96 },
};
let spriteSyncedTime = null;
const baseTileUnit = 48;

export function doCreateTileMap(mainScene) {
  const gameObjectsTexture = mainScene.textures.get(gameObjectsTextureKey);
  for (let [type, { x, y }] of Object.entries(gameObjectsToAdd)) {
    gameObjectsTexture.add(type, 0, x, y, 48, 48);
  }

  mainScene.tileMap = mainScene.make.tilemap({ key: `map_${mainScene.mapTxId}` });
  const tilesets = [
    // desert tilesets
    mainScene.tileMap.addTilesetImage('Sprite_Map_Sheet', 'map_sheet_desert'),

    // city tilesets
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_A2', 'map_sheet_city_1'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_A2_expanded', 'map_sheet_city_1_exp'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior__A4', 'map_sheet_city_2'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior__A4_expanded', 'map_sheet_city_2_exp'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_B', 'map_sheet_city_3'),
    mainScene.tileMap.addTilesetImage('CC_City_Exterior_C', 'map_sheet_city_4'),

    // haunted tilesets
    mainScene.tileMap.addTilesetImage('hauntedhouse_E_destroyed_dark', 'hauntedhouse_E_destroyed_dark'),
    mainScene.tileMap.addTilesetImage('hauntedhouse_D_dark', 'hauntedhouse_D_dark'),
    mainScene.tileMap.addTilesetImage('hauntedhouse_A4_dark_expanded', 'hauntedhouse_A4_dark_expanded'),
    mainScene.tileMap.addTilesetImage('$!Asylum_Door_Large_dark', '$!Asylum_Door_Large_dark'),
    mainScene.tileMap.addTilesetImage('!$mouse_holes', '!$mouse_holes'),
    mainScene.tileMap.addTilesetImage('!$rat_gray_dark', '!$rat_gray_dark'),
    mainScene.tileMap.addTilesetImage('$!Asylum_Door_Large_noframe_dark', '$!Asylum_Door_Large_noframe_dark'),
    mainScene.tileMap.addTilesetImage('$!curtains_destroyed_dark', '$!curtains_destroyed_dark'),
    mainScene.tileMap.addTilesetImage('$!Haunted_Painting_dark', '$!Haunted_Painting_dark'),
    mainScene.tileMap.addTilesetImage('$lightning_window_small_dark', '$lightning_window_small_dark'),
    mainScene.tileMap.addTilesetImage('floating_couch_dark', 'floating_couch_dark'),
    mainScene.tileMap.addTilesetImage('$!sliding_bookshelf_door_dark', '$!sliding_bookshelf_door_dark'),
    mainScene.tileMap.addTilesetImage('drip_dark', 'drip_dark'),
    mainScene.tileMap.addTilesetImage('hauntedhouse_B_dark', 'hauntedhouse_B_dark'),
    mainScene.tileMap.addTilesetImage('hauntedhouse_C_destroyed_dark', 'hauntedhouse_C_destroyed_dark'),
    mainScene.tileMap.addTilesetImage('!$door', '!$door'),
    mainScene.tileMap.addTilesetImage('!$lighthouseani', '!$lighthouseani'),
    mainScene.tileMap.addTilesetImage('non-rm-a1-square', 'non-rm-a1-square'),
    mainScene.tileMap.addTilesetImage('non-rm-a2-square', 'non-rm-a2-square'),
    mainScene.tileMap.addTilesetImage('non-rm-a3', 'non-rm-a3'),
    mainScene.tileMap.addTilesetImage('non-rm-a4-square', 'non-rm-a4-square'),
    mainScene.tileMap.addTilesetImage('Snow_A1', 'Snow_A1'),
    mainScene.tileMap.addTilesetImage('Snow_A2', 'Snow_A2'),
    mainScene.tileMap.addTilesetImage('Snow_A3', 'Snow_A3'),
    mainScene.tileMap.addTilesetImage('Snow_A4', 'Snow_A4'),
    mainScene.tileMap.addTilesetImage('Snow_A5', 'Snow_A5'),
    mainScene.tileMap.addTilesetImage('Snow_B', 'Snow_B'),
    mainScene.tileMap.addTilesetImage('Snow_C', 'Snow_C'),
    mainScene.tileMap.addTilesetImage('Snow_D', 'Snow_D'),
    mainScene.tileMap.addTilesetImage('Snow_E', 'Snow_E'),
    mainScene.tileMap.addTilesetImage('$oldtruck_tree', '$oldtruck_tree'),
    mainScene.tileMap.addTilesetImage('$oldtruck', '$oldtruck'),
    mainScene.tileMap.addTilesetImage('$snowglobe', '$snowglobe'),
    mainScene.tileMap.addTilesetImage('$sleigh', '$sleigh'),
    mainScene.tileMap.addTilesetImage('Chr_A2', 'Chr_A2'),
    mainScene.tileMap.addTilesetImage('Chr_B', 'Chr_B'),
    mainScene.tileMap.addTilesetImage('Chr_non-rm-a2-square', 'Chr_non-rm-a2-square'),
  ];
  const layers = mainScene.tileMap.getTileLayerNames();
  let frontLayerDepth = FRONT_LAYER_DEPTH;
  let layerDepth = 1;
  for (const layer of layers) {
    console.log('creating layer', layer);
    if (layer === COLLISIONS_LAYER) {
      const obstaclesLayer = mainScene.tileMap.createLayer(layer, tilesets);
      obstaclesLayer.setDepth(OBSTACLES_DEPTH);
      mainScene.tileMap.obstaclesLayer = obstaclesLayer;
    } else {
      const mapLayer = mainScene.tileMap.createLayer(layer, tilesets);
      if (layer.startsWith(FRONT_LAYER_PREFIX)) {
        mapLayer.setDepth(frontLayerDepth++);
      } else {
        mapLayer.setDepth(layerDepth++);
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
        sprite.setDepth(OBJECTS_DEPTH);
      }

      mainScene.gameObjectsSpritesArray = sprites;

      mainScene.tweens.add({
        targets: sprites,
        y: '+=3',
        duration: 200,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        onUpdate: (tween) => {
          spriteSyncedTime = tween.progress;
        },
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
  if (!mainScene.gameObjectsSprites[y]) mainScene.gameObjectsSprites[y] = {};
  mainScene.gameObjectsSprites[y][x] = sprite;
  sprite.setDepth(OBJECTS_DEPTH);
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
