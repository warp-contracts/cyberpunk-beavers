import { addCoins, scoreToDisplay } from '../../common/tools.mjs';
import Const from '../../common/const.mjs';

const { GameObject, GameTreasure, Scores, GAME_MODES } = Const;

export function pick(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];

  if (player.stats.ap.current < 1) {
    console.log(`Cannot perform pick ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return { player, picked: false };
  }

  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos.y][player.pos.x]
  );
  const { type, value } = gameObjectTile;

  switch (type) {
    case GameObject.hp.type:
      return pickHP(state, player, value);
    case GameObject.ap.type:
      return pickAP(state, player, value);
    case GameObject.equipment_mine.type:
      return pickDevice(state, player, {
        value,
        type: GameObject.equipment_mine.type,
        equipmentType: `landmines`,
      });
    case GameObject.teleport_device.type:
      return pickDevice(state, player, {
        value,
        type: GameObject.teleport_device.type,
        equipmentType: `teleports`,
      });
    case GameObject.scanner_device.type:
      return pickDevice(state, player, {
        value,
        type: GameObject.scanner_device.type,
        equipmentType: `scanners`,
      });
    case GameObject.none.type:
      return pickTreasure(state, player);
  }
  return { player, picked: false };
}

function pickHP(state, player, value) {
  console.log(`Player ${player.walletAddress} stands on HP, increasing by ${value}.`);
  player.stats.ap.current -= 1;
  player.stats.hp.current += value;
  addCoins(player, GAME_MODES[state.mode].token, value, state);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  addGameObjectToRespawn(state, GameObject.hp.type, player);
  return {
    player,
    picked: { type: GameObject.hp.type },
    scoreToDisplay: scoreToDisplay([
      { value: value, type: Scores.hp },
      { value: -1, type: Scores.ap },
    ]),
  };
}

function pickAP(state, player, value) {
  console.log(`Player stands on a AP object, increasing by ${value}. `);
  player.stats.ap.current -= 1;
  player.stats.ap.current += value;
  addCoins(player, GAME_MODES[state.mode].token, value, state);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  addGameObjectToRespawn(state, GameObject.ap.type, player);
  return {
    player,
    picked: { type: GameObject.ap.type },
    scoreToDisplay: scoreToDisplay([
      { value: value, type: Scores.ap },
      { value: -1, type: Scores.ap },
    ]),
  };
}

function pickDevice(state, player, device) {
  let { type, value, equipmentType } = device;
  console.log(`Player stands on an unclaimed equipment: ${type}`);
  const limit = player.equipment[equipmentType].max;
  if (player.equipment[equipmentType].current >= limit) {
    console.log(`Player ${player?.walletAddress} cannot pick ${type}. Limit reached ${limit}`);
    return { player, picked: false };
  } else {
    player.stats.ap.current -= 1;
    player.equipment[equipmentType].current += 1;
    addCoins(player, GAME_MODES[state.mode].token, value, state);
    state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
    addGameObjectToRespawn(state, type, player);
    return {
      player,
      picked: { type },
      scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
    };
  }
}

function pickTreasure(state, player) {
  const treasureTile = state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x];
  if (!treasureTile || treasureTile === GameTreasure.hole.tile) {
    console.log(`Cannot perform pick ${player.walletAddress}. Player does not stand on a treasure`);
    return { player, picked: false };
  }

  const treasure = Object.values(GameTreasure).find((t) => t.tile === treasureTile);
  const { type, value } = treasure;
  player.stats.ap.current -= 1;
  state.gameTreasuresTilemap[player.pos.y][player.pos.x] = GameTreasure.hole.tile;
  state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] = GameTreasure.hole.tile;
  const valueWithBonus = value + (player.stats.bonus[type] || 0);
  addCoins(player, GAME_MODES[state.mode].token, valueWithBonus, state);
  addCoins(player, type, 1, state); //FIXME: this might be wrong in case of cbcoin
  return {
    player,
    picked: { type, tile: treasureTile },
    scoreToDisplay: scoreToDisplay([
      { value: valueWithBonus, type: Scores.coin },
      { value: -1, type: Scores.ap },
    ]),
  };
}

function addGameObjectToRespawn(state, gameObjectType, player) {
  const roundsToRespawn = GameObject[gameObjectType].roundsToRespawn;
  if (!roundsToRespawn) return;
  const round = state.round.current + roundsToRespawn;
  let respawnInRound = state.gameObjectsToRespawn[round];
  const gameObjectToRespawn = { type: gameObjectType, tile: GameObject[gameObjectType].tile, pos: player.pos };

  if (!respawnInRound) {
    state.gameObjectsToRespawn[round] = [gameObjectToRespawn];
  } else {
    state.gameObjectsToRespawn[round].push(gameObjectToRespawn);
  }

  console.log('respawn in round added', state.gameObjectsToRespawn);
}
