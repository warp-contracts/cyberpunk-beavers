import Const, { DEFAULT_ROUND_INTERVAL_MS } from '../../common/const.mjs';
import { DEFAULT_GAME_OBJECTS_CONFIG, GameObject } from '../../common/gameObject.mjs';
import { COLLISIONS_LAYER, EMPTY_TILE } from '../../common/mapsLayersConst.mjs';
import { DEFAULT_TEAMS_CONFIG } from '../../common/teams.mjs';

const { GameTreasure } = Const;

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

export function overwriteGameObjectParams(gameObjectsTiles, items) {
  if (!items) {
    return;
  }

  for (const item of items) {
    const gameObjectIdx = gameObjectsTiles.findIndex((o) => o.type === item.type);
    console.log('Overwriting item', item.type);
    gameObjectsTiles[gameObjectIdx] = {
      ...gameObjectsTiles[gameObjectIdx],
      ...item,
    };
  }

  console.log(JSON.stringify(gameObjectsTiles, null, 2));
}

export function allGameObjectTiles() {
  return [
    GameObject.ap,
    GameObject.hp,
    GameObject.teleport_device,
    GameObject.equipment_mine,
    GameObject.scanner_device,
    GameObject.quad_damage,
    GameObject.show_map,
    GameObject.hazard,
    GameObject.drill,
    GameObject.shield,
    GameObject.xray,
    GameObject.none,
  ];
}

function initState(message, state) {
  const obstaclesLayer = tryLoadLayer(COLLISIONS_LAYER, state.rawMap);
  const mapWidth = obstaclesLayer.width;
  const mapHeight = obstaclesLayer.height;

  const gameObjectsTiles = allGameObjectTiles();

  console.log('======== OVERWRITE GAME OBJECT PARAMS ====', state.gameObjectsConfig?.items);
  overwriteGameObjectParams(gameObjectsTiles, state.gameObjectsConfig?.items);

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
    gameObjectsTiles,
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
    monstersOnTiles: Array(mapHeight)
      .fill([])
      .map(() => Array(mapHeight)),
    obstaclesTilemap: generateTilemap(obstaclesLayer.data, obstaclesLayer.width),
    mode: state.mode || Const.GAME_MODES.default.type,
    gameObjectsToRespawn: {},
    gameObjectsToRespawnInRound: [],
    gameObjectsConfig: state.gameObjectsConfig || DEFAULT_GAME_OBJECTS_CONFIG,
    teamsConfig: state.teamsConfig || DEFAULT_TEAMS_CONFIG,
    diggers: [],
  };
}

function generateTilemap(input, width) {
  const result = [];
  while (input.length) {
    result.push(input.splice(0, width));
  }

  return result;
}

export function setVisibleGameObjects(state) {
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(state, [GameObject.none], 0);
  for (let gameObject of state.gameObjectsTiles) {
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
  const x = Math.floor(Math.random(++state.randomCounter) * max);
  const y = Math.floor(Math.random(++state.randomCounter) * max);
  return { x, y };
}

function setObjectsOnRandomPositions(state, gameObject, rarity, tilemap, tiles) {
  let gameObjectCount = 0;
  tiles = Object.values(tiles).map((t) => {
    if (t.type !== GameObject.none.type) return t.tile;
  });

  while (gameObjectCount < rarity) {
    ({ count: gameObjectCount } = setObjectOnPos(gameObjectCount, state, tilemap, tiles, gameObject));
  }
}

export function setObjectOnPos(count, state, tilemap, tiles, gameObject) {
  let finalPos;
  const pos = calculateRandomPos(state, state.map.width);
  const isAllowedPosition =
    state.obstaclesTilemap[pos.y][pos.x] === EMPTY_TILE && !tiles.includes(tilemap[pos.y][pos.x]);
  if (isAllowedPosition) {
    tilemap[pos.y][pos.x] = gameObject.tile;
    finalPos = pos;
    count++;
  }

  return { count, pos: finalPos };
}
