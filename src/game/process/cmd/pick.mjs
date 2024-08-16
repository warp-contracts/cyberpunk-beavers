import { addCoins, scoreToDisplay } from '../../common/tools.mjs';
import Const from '../../common/const.mjs';

const { GameObject, Scores } = Const;

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
      return pickMine(state, player, value);
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
  addCoins(player, value);
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
  addCoins(player, value);
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

function pickMine(state, player, value) {
  console.log(`Player stands on an unclaimed equipment: mine`);
  player.stats.ap.current -= 1;
  player.equipment.mines += 1;
  addCoins(player, value);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  return {
    player,
    picked: { type: GameObject.equipment_mine.type },
    scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
  };
}

function pickTeleportDevice(state, player, value) {
  console.log(`Player stands on an unclaimed equipment: teleport_device`);
  player.stats.ap.current -= 1;
  player.equipment.teleports += 1;
  addCoins(player, value);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  return {
    player,
    picked: { type: GameObject.teleport_device.type },
    scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
  };
}

function pickTreasure(state, player) {
  const gameTreasureTile = state.gameTreasuresTiles.find(
    (t) => t.tile === state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x]
  );
  const { type, value } = gameTreasureTile;
  if (type === GameObject.none.type) {
    console.log(`Cannot perform pick ${player.walletAddress}. Player does not stand on a game object`);
    return { player, picked: false };
  } else if (type === GameObject.treasure.type) {
    player.stats.ap.current -= 1;
    state.gameTreasuresTilemap[player.pos.y][player.pos.x] = GameObject.hole.tile;
    state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] = GameObject.hole.tile;
    const valueWithBonus = value + player.stats.bonus[GameObject.treasure.type];
    addCoins(player, valueWithBonus);
    return {
      player,
      picked: { type },
      scoreToDisplay: scoreToDisplay([
        { value: valueWithBonus, type: Scores.coin },
        { value: -1, type: Scores.ap },
      ]),
    };
  }
}
