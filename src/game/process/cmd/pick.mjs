import { addCoins, scoreToDisplay } from '../../common/tools.mjs';
import Const, { BOOSTS, Respawned } from '../../common/const.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';
import { lootPlayer, respawnPlayer } from './attack.mjs';

const { GameObject, GameTreasure, Scores, GAME_MODES } = Const;

export function pick(state, action, message) {
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
      return pickEquipment(state, player, { value, type: GameObject.hp.type, equipmentType: `hp` });
    case GameObject.ap.type:
      return pickAP(state, player, value);
    case GameObject.equipment_mine.type:
      return pickEquipment(state, player, {
        value,
        type: GameObject.equipment_mine.type,
        equipmentType: `landmines`,
      });
    case GameObject.teleport_device.type:
      return pickEquipment(state, player, {
        value,
        type: GameObject.teleport_device.type,
        equipmentType: `teleports`,
      });
    case GameObject.scanner_device.type:
      return pickEquipment(state, player, {
        value,
        type: GameObject.scanner_device.type,
        equipmentType: `scanners`,
      });
    case GameObject.quad_damage.type:
    case GameObject.shield.type:
    case GameObject.show_map.type:
      return pickBoost(state, player, {
        value,
        type,
      });
    case GameObject.hazard.type:
      return pickHazardItem(state, player, message.Timestamp);
    case GameObject.drill.type:
      return pickEquipment(state, player, {
        value,
        type: GameObject.drill.type,
        equipmentType: 'drills',
      });
    case GameObject.none.type:
      return pickTreasure(state, player);
  }
  return { player, picked: false };
}

function pickAP(state, player, value) {
  console.log(`Player stands on a AP object, increasing by ${value}. `);
  player.stats.ap.current -= 1;
  player.stats.ap.current += value;
  addCoins(player, GAME_MODES[state.mode].token, value, state);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  const respawnedPos = addGameObjectToRespawn(state, GameObject.ap.type, player);
  return {
    player,
    picked: { type: GameObject.ap.type, respawned: respawnedPos },
    scoreToDisplay: scoreToDisplay([
      { value: value, type: Scores.ap },
      { value: -1, type: Scores.ap },
    ]),
  };
}

function pickEquipment(state, player, device) {
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
    const respawnedPos = addGameObjectToRespawn(state, type, player);
    return {
      player,
      picked: { type, respawned: respawnedPos },
      scoreToDisplay: scoreToDisplay([{ value: -1, type: Scores.ap }]),
    };
  }
}

function pickHazardItem(state, player, timestamp) {
  const hazardRandom = Math.random(++state.randomCounter); //0.6
  player.stats.ap.current -= 1;
  const tokenName = GAME_MODES[state.mode].token;
  const value = GameTreasure[tokenName].value; // ? or baseValue? da fuck
  const valueWithBonus = value + (player.stats.bonus[state.mode][tokenName] || 0);
  if (hazardRandom < 0.5) {
    addCoins(player, GAME_MODES[state.mode].token, valueWithBonus, state);
    return {
      player,
      picked: { type: GameObject.hazard.type, result: 'win' },
      scoreToDisplay: scoreToDisplay([
        { value: valueWithBonus, type: Scores.coin },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else {
    const dmg = Const.GameObject.active_mine.damage;
    player.stats.hp.current -= dmg;
    const prevPos = player.pos;
    let finished = false;
    let loot = 0;
    let additionalLoot = null;
    if (player.stats.hp.current <= 0) {
      finished = true;
      const { loot, additionalLoot } = lootPlayer(player, state);
      respawnPlayer(player, state, timestamp);
    }

    return {
      player,
      picked: { type: GameObject.hazard.type, result: 'loose', finished, additionalLoot, prevPos },
      scoreToDisplay: scoreToDisplay([
        { value: loot, type: Scores.coin },
        { value: -dmg, type: Scores.hp },
        { value: -1, type: Scores.ap },
      ]),
    };
  }
}

function pickBoost(state, player, boost) {
  const { type, value } = boost;
  player.activeBoosts[type] = {
    type,
    roundAdded: state.round.current + 1, // so that player had "full" 'duration' rounds for using the item
    duration: BOOSTS[type].duration_rounds,
  };
  addCoins(player, GAME_MODES[state.mode].token, value, state);
  state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
  const respawnedPos = addGameObjectToRespawn(state, type, player);

  return {
    player,
    picked: { type, respawned: respawnedPos },
    scoreToDisplay: scoreToDisplay([
      { value: -1, type: Scores.ap },
      { value: value, type: Scores.coin },
    ]),
  };
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
  const valueWithBonus = value + (player.stats.bonus[state.mode][type] || 0);
  addCoins(player, GAME_MODES[state.mode].token, valueWithBonus, state);
  if (type !== GAME_MODES[state.mode].token) {
    addCoins(player, type, 1, state);
  }
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
  const gameObjectToRespawn = {
    type: gameObjectType,
    tile: GameObject[gameObjectType].tile,
    pos: state.gameObjectsConfig.respawned == Respawned.constant ? player.pos : null,
  };

  if (!respawnInRound) {
    state.gameObjectsToRespawn[round] = [gameObjectToRespawn];
  } else {
    state.gameObjectsToRespawn[round].push(gameObjectToRespawn);
  }

  console.log('respawn in round added', state.gameObjectsToRespawn);
  return gameObjectToRespawn.pos;
}
