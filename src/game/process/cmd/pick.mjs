import { addCoins, scoreToDisplay } from '../../common/tools.mjs';
import Const from '../../common/const.mjs';

const { GameObject, GameTreasure, Scores } = Const;

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
      return pickLandmine(state, player, value);
    case GameObject.teleport_device.type:
      return pickTeleportDevice(state, player, value);
    case GameObject.none.type:
      return pickTreasure(state, player);
  }
  return { player, picked: false };
}

function pickHP(state, player, value) {
  console.log(`Player ${player.walletAddress} stands on HP, increasing by ${value}.`);
  player.stats.ap.current -= 1;
  player.stats.hp.current += value;
  addCoins(player, GameTreasure.cbcoin.type, value);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
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
  addCoins(player, GameTreasure.cbcoin.type, value);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  return {
    player,
    picked: { type: GameObject.ap.type },
    scoreToDisplay: scoreToDisplay([
      { value: value, type: Scores.ap },
      { value: -1, type: Scores.ap },
    ]),
  };
}

function pickLandmine(state, player, value) {
  console.log(`Player stands on an unclaimed equipment: landmine`);
  const limit = player.equipment.landmines.max;
  if (player.equipment.landmines.current >= limit) {
    console.log(`Player ${player?.walletAddress} cannot pick landmine. Limit reached ${limit}`);
    return { player, picked: false };
  } else {
    player.stats.ap.current -= 1;
    player.equipment.landmines.current += 1;
    addCoins(player, GameTreasure.cbcoin.type, value);
    state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
    return {
      player,
      picked: { type: GameObject.equipment_mine.type },
      scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
    };
  }
}

function pickTeleportDevice(state, player, value) {
  console.log(`Player stands on an unclaimed equipment: teleport_device`);
  const limit = player.equipment.teleports.max;
  if (player.equipment.teleports.current >= limit) {
    console.log(`Player ${player?.walletAddress} cannot pick teleport. Limit reached ${limit}`);
    return { player, picked: false };
  } else {
    player.stats.ap.current -= 1;
    player.equipment.teleports.current += 1;
    addCoins(player, GameTreasure.cbcoin.type, value);
    state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
    return {
      player,
      picked: { type: GameObject.teleport_device.type },
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
  addCoins(player, GameTreasure.cbcoin.type, valueWithBonus);
  addCoins(player, type, 1);
  return {
    player,
    picked: { type, tile: treasureTile },
    scoreToDisplay: scoreToDisplay([
      { value: valueWithBonus, type: Scores.coin },
      { value: -1, type: Scores.ap },
    ]),
  };
}
