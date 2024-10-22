import Const, { COLLISIONS_LAYER, DEFAULT_ROUND_INTERVAL_MS } from '../../common/const.mjs';

const { GameObject, GameTreasure, Scores, Map, EMPTY_TILE } = Const;

export function __init(state, message) {
  state = Object.assign(state, initState(message, state));
  setVisibleGameObjects(state);
  setInvisibleGameTreasures(state);

  delete state.rawMap;
  delete state.shrinkSchedule;
}

function tryLoadLayer(type, rawMap) {
  const layer = rawMap.layers.find((l) => l.name == type);
  if (!layer) {
    throw new ProcessError(`No "${type}" found in map data`);
  }

  return layer;
}

function initState(message, state) {
  const obstaclesLayer = tryLoadLayer(COLLISIONS_LAYER, state.rawMap);
  const mapWidth = obstaclesLayer.width;
  const mapHeight = obstaclesLayer.height;

  return {
    nextModuleId: null,
    activated: false,
    tokensTransferred: false,
    scoresSent: false,
    counter: 0,
    pos: 1,
    playWindow: {},
    map: {
      width: mapWidth,
      height: mapHeight,
    },
    lastTxs: [],
    gameObjectsTiles: [
      GameObject.ap,
      GameObject.hp,
      GameObject.teleport_device,
      GameObject.equipment_mine,
      GameObject.scanner_device,
      GameObject.quad_damage,
      GameObject.show_map,
      GameObject.hazard,
      GameObject.none,
    ],
    gameHiddenObjects: Array(mapHeight)
      .fill([])
      .map(() => Array(mapHeight)),
    gameTreasuresTilemap: Array(mapHeight)
      .fill([])
      .map(() => Array(mapHeight)),
    gameTreasuresTilemapForClient: Array(mapHeight)
      .fill([])
      .map(() => Array(mapHeight)),
    gameTokens: state.gameTokens || Const.DEFAULT_GAME_TOKENS,
    gameTreasuresCounter: Object.fromEntries(
      Object.entries(state.gameTokens || Const.DEFAULT_GAME_TOKENS).map(([k, v]) => [k, v.amount])
    ),
    round: {
      current: 0,
      start: message.Timestamp, //ms
      interval: DEFAULT_ROUND_INTERVAL_MS, //ms
    },
    walletsQueue: [],
    walletsWhitelist: [], // if not empty restricts players registration
    generatedWalletsMapping: {},
    players: {},
    spectators: [],
    playersOnTiles: Array(mapHeight)
      .fill([])
      .map(() => Array(mapHeight)),
    obstaclesTilemap: generateTilemap(obstaclesLayer.data, obstaclesLayer.width),
    mode: state.mode || Const.GAME_MODES.default.type,
    gameObjectsToRespawn: {},
    gameObjectsToRespawnInRound: [],
  };
}

function generateTilemap(input, width) {
  const result = [];
  while (input.length) {
    result.push(input.splice(0, width));
  }

  return result;
}

function setVisibleGameObjects(state) {
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(state, [GameObject.none], 0);
  for (let gameObject of state.gameObjectsTiles) {
    console.log('Setting', gameObject);
    setObjectsOnRandomPositions(state, gameObject, gameObject.rarity, state.gameObjectsTilemap, state.gameObjectsTiles);
  }
}

function setInvisibleGameTreasures(state) {
  Object.entries(state.gameTokens).forEach(([type, token]) => {
    setObjectsOnRandomPositions(
      state,
      GameTreasure[type],
      token.amount,
      state.gameTreasuresTilemap,
      Object.values(GameTreasure)
    );
  });
}

function setGameObjectsTilesOnMap(state, tilesToPropagate, noneTileFrequency) {
  return state.obstaclesTilemap.map((a) => {
    return a.map(() => {
      return GameObject.none.tile;
    });
  });
}

export function calculateRandomPos(state, max) {
  state.randomCounter++;
  const x = Math.floor(Math.random(state.randomCounter) * max);
  state.randomCounter++;
  const y = Math.floor(Math.random(state.randomCounter) * max);
  return { x, y };
}

function setObjectsOnRandomPositions(state, gameObject, rarity, tilemap, tiles) {
  let gameObjectCount = 0;
  tiles = Object.values(tiles).map((t) => {
    if (t.type != GameObject.none.type) return t.tile;
  });
  //console.log(tiles);

  while (gameObjectCount < rarity) {
    const pos = calculateRandomPos(state, state.map.width);
    const isAllowedPosition =
      state.obstaclesTilemap[pos.y][pos.x] === EMPTY_TILE && !tiles.includes(tilemap[pos.y][pos.x]);
    /*console.log({
      pos,
      isAllowedPosition,
      empty: state.obstaclesTilemap[pos.y][pos.x] === EMPTY_TILE,
      tileIncludes: tilemap[pos.y][pos.x]
    });*/
    if (isAllowedPosition) {
      tilemap[pos.y][pos.x] = gameObject.tile;
      gameObjectCount++;
    }
  }
}
