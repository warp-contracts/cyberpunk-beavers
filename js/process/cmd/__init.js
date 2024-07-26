import Const from '../../common/const.mjs';

const { GameObject, Scores, Map, EMPTY_TILE } = Const;

export function __init(state, message) {
  state = Object.assign(state, initState(message, state));
  setVisibleGameObjects(state);
  setInvisibleGameObjects(state);
  setInvisibleGameObjectsForClient(state);
  delete state.rawMap;
}

function tryLoadLayer(type, rawMap) {
  const layer = rawMap.layers.find((l) => l.name == type);
  if (!layer) {
    throw new ProcessError(`No "${type}" found in map data`);
  }

  // note: https://discourse.mapeditor.org/t/option-to-export-tile-data-with-0-based-indexes/2672/4
  // - when using multiple tilesets, Tiles map editor assigns values globally - as if there was one tileset
  // - for whatever the fuck reason
  const tilesetId = type.replace('_layer', '');
  const tileset = rawMap.tilesets.find((t) => t.source.includes(tilesetId));
  if (!tileset) {
    throw new ProcessError(`Tileset containin words "${tilesetId}" not found`);
  }
  let firstgid = tileset.firstgid;
  if (type == 'obstacles_layer') {
    // for some reason the exported data for obstacles have values increased by 3
    // in comparison to what is set in 'firstgid' in the tileset
    firstgid += 3;
  }

  layer.data = layer.data.map((t) => t - firstgid);

  return layer;
}

function initState(message, state) {
  const groundLayer = tryLoadLayer('ground_layer', state.rawMap);
  const decorationLayer = tryLoadLayer('decoration_layer', state.rawMap);
  const obstaclesLayer = tryLoadLayer('obstacles_layer', state.rawMap);

  const result = {
    nextProcessId: null,
    nextModuleId: null,
    nextChatProcessId: null,
    nextChatModuleId: null,
    tokensTransferred: false,
    counter: 0,
    pos: 1,
    playWindow: {},
    map: {
      width: groundLayer.width,
      height: groundLayer.height,
    },
    lastTxs: [],
    gameObjectsTiles: [GameObject.ap, GameObject.hp, GameObject.none],
    gameObjectsRarity: 10,
    gameTreasuresTiles: [GameObject.treasure, GameObject.hole, GameObject.none],
    gameTreasuresTilesForClient: [GameObject.none],
    gameTreasuresRarity: Const.TREASURES_RARITY,
    gameTreasuresCounter: 0,
    round: {
      current: 0,
      start: message.Timestamp, //ms
      interval: 10_000, //ms
    },
    walletsQueue: [],
    walletsBench: [],
    generatedWalletsMapping: {},
    players: {},
    playersOnTiles: Array(Map.size)
      .fill([])
      .map(() => Array(Map.size)),
    groundTilemap: generateTilemap(groundLayer.data, groundLayer.width),
    decorationTilemap: generateTilemap(decorationLayer.data, decorationLayer.width),
    obstaclesTilemap: generateTilemap(obstaclesLayer.data, obstaclesLayer.width),
  };

  return result;
}

function generateTilemap(input, width) {
  const result = [];
  while (input.length) {
    result.push(input.splice(0, width));
  }
  return result;
}

function setVisibleGameObjects(state) {
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(state, state.gameObjectsTiles, state.gameObjectsRarity);
}

function setInvisibleGameObjects(state) {
  state.gameTreasuresTilemap = setGameObjectsTilesOnMap(state, [GameObject.none], 0);
  let treasuresCount = 0;

  while (treasuresCount < state.gameTreasuresRarity) {
    const pos = calculateRandomPos(state, Map.size);

    const isAllowedPosition = !(
      state.obstaclesTilemap[pos.y][pos.x] >= 0 || state.gameTreasuresTilemap[pos.y][pos.x] == GameObject.treasure.tile
    );
    if (isAllowedPosition) {
      state.gameTreasuresTilemap[pos.y][pos.x] = GameObject.treasure.tile;
      treasuresCount++;
      state.gameTreasuresCounter += 1;
    }
  }
}

function setInvisibleGameObjectsForClient(state) {
  state.gameTreasuresTilemapForClient = setGameObjectsTilesOnMap(state, state.gameTreasuresTilesForClient, 0);
}

function setGameObjectsTilesOnMap(state, tilesToPropagate, noneTileFrequency) {
  for (let i = 0; i < noneTileFrequency; i++) {
    tilesToPropagate.push(GameObject.none);
  }

  return state.obstaclesTilemap.map((a) => {
    return a.map((b) => {
      if (b <= EMPTY_TILE) {
        state.randomCounter++;
        const randomValue = getRandomNumber(0, tilesToPropagate.length - 1, state.randomCounter);
        const drawnTile = tilesToPropagate[randomValue];
        if (drawnTile.type === GameObject.treasure.type) {
          state.gameTreasuresCounter += 1;
        }
        return drawnTile.tile;
      } else {
        return EMPTY_TILE;
      }
    });
  });
}

function getRandomNumber(min, max, randomCounter) {
  const randomValue = Math.random(randomCounter);
  return Math.floor(randomValue * (max - min + 1)) + min;
}

export function calculateRandomPos(state, max) {
  state.randomCounter++;
  const x = Math.floor(Math.random(state.randomCounter) * max);
  state.randomCounter++;
  const y = Math.floor(Math.random(state.randomCounter) * max);
  return { x, y };
}
