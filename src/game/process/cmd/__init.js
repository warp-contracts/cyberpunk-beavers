import Const, { COLLISIONS_LAYER } from '../../common/const.mjs';

const { GameObject, GameTreasure, Scores, Map, EMPTY_TILE } = Const;

export function __init(state, message) {
  state = Object.assign(state, initState(message, state));
  setVisibleGameObjects(state);
  setInvisibleGameTreasures(state);
  delete state.rawMap;
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

  const result = {
    nextProcessId: null,
    nextModuleId: null,
    tokensTransferred: false,
    counter: 0,
    pos: 1,
    playWindow: {},
    map: {
      width: obstaclesLayer.width,
      height: obstaclesLayer.height,
    },
    lastTxs: [],
    gameObjectsTiles: [
      GameObject.ap,
      GameObject.hp,
      GameObject.teleport_device,
      GameObject.equipment_mine,
      GameObject.none,
    ],
    gameHiddenObjects: Array(Map.size)
      .fill([])
      .map(() => Array(Map.size)),
    gameTreasuresTilemap: Array(Map.size)
      .fill([])
      .map(() => Array(Map.size)),
    gameTreasuresTilemapForClient: Array(Map.size)
      .fill([])
      .map(() => Array(Map.size)),
    gameTokens: state.gameTokens || Const.DEFAULT_GAME_TOKENS,
    gameTreasuresCounter: Object.fromEntries(
      Object.entries(state.gameTokens || Const.DEFAULT_GAME_TOKENS).map(([k, v]) => [k, v.amount])
    ),
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
  state.gameObjectsTilemap = setGameObjectsTilesOnMap(state, [GameObject.none], 0);
  for (let gameObject of state.gameObjectsTiles) {
    setObjectsOnRandomPositions(state, gameObject, gameObject.rarity, state.gameObjectsTilemap, state.gameObjectsTiles);
  }
}

function setInvisibleGameTreasures(state) {
  setObjectsOnRandomPositions(
    state,
    GameTreasure.cbcoin,
    state.gameTokens[GameTreasure.cbcoin.type].amount,
    state.gameTreasuresTilemap,
    Object.values(GameTreasure)
  );
  setObjectsOnRandomPositions(
    state,
    GameTreasure.tio,
    state.gameTokens[GameTreasure.tio.type].amount,
    state.gameTreasuresTilemap,
    Object.values(GameTreasure)
  );
  setObjectsOnRandomPositions(
    state,
    GameTreasure.war,
    state.gameTokens[GameTreasure.war.type].amount,
    state.gameTreasuresTilemap,
    Object.values(GameTreasure)
  );
  setObjectsOnRandomPositions(
    state,
    GameTreasure.trunk,
    state.gameTokens[GameTreasure.trunk.type].amount,
    state.gameTreasuresTilemap,
    Object.values(GameTreasure)
  );
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

  while (gameObjectCount < rarity) {
    const pos = calculateRandomPos(state, Map.size);
    const isAllowedPosition =
      state.obstaclesTilemap[pos.y][pos.x] === EMPTY_TILE && !tiles.includes(tilemap[pos.y][pos.x]);
    if (isAllowedPosition) {
      tilemap[pos.y][pos.x] = gameObject.tile;
      gameObjectCount++;
    }
  }
}
