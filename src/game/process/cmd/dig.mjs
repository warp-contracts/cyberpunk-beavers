import { scoreToDisplay } from '../../common/tools.mjs';
import Const from '../../common/const.mjs';

const { GameObject, GameTreasure, Scores } = Const;

export function dig(state, action) {
  const player = state.players[action.walletAddress];
  if (notEnoughAP(player)) {
    return { player, digged: false };
  }
  if (standsOnGameObject(state, player)) {
    return { player, digged: false };
  }
  if (alreadyDug(state, player)) {
    return { player, digged: false };
  }

  const treasureTile = state.gameTreasuresTilemap[player.pos.y][player.pos.x];
  if (!treasureTile) {
    return foundNothing(state, player);
  }
  if (treasureTile === GameTreasure.hole.tile) {
    console.log(`Player ${player.walletAddress} tried to dig already existing hole.`);
    return { player, digged: false };
  } else {
    return foundTreasure(state, player, treasureTile);
  }
}

function notEnoughAP(player) {
  if (player.stats.ap.current < 2) {
    console.log(`Cannot perform dig ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return true;
  }
  return false;
}

function standsOnGameObject(state, player) {
  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos.y][player.pos.x]
  );
  let { type: objectTile } = gameObjectTile;
  if (objectTile !== GameObject.none.type) {
    console.log(`Cannot perform dig ${player.walletAddress}. Player stands on a game object.`);
    return true;
  }
  return false;
}

function alreadyDug(state, player) {
  return state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] > 0;
}

function foundNothing(state, player) {
  console.log(`Player ${player.walletAddress} digged nothing.`);
  player.stats.ap.current -= 2;
  state.gameTreasuresTilemap[player.pos.y][player.pos.x] = GameTreasure.hole.tile;
  state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] = GameTreasure.hole.tile;

  return {
    player,
    digged: GameTreasure.hole,
    scoreToDisplay: scoreToDisplay([{ value: -2, type: Scores.ap }]),
  };
}

function foundTreasure(state, player, treasureTile) {
  const treasure = Object.values(GameTreasure).find((t) => t.tile === treasureTile);
  const { type, tile } = treasure;
  console.log(`Player digged on a game treasure: ${type}.`);
  player.stats.ap.current -= 2;
  state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] = tile;
  state.gameTreasuresTilemap[player.pos.y][player.pos.x] = tile;
  state.gameTreasuresCounter[type] -= 1;
  player.onGameTreasure = treasure;
  return {
    player,
    digged: { type, tile },
    scoreToDisplay: scoreToDisplay([{ value: -2, type: Scores.ap }]),
  };
}
