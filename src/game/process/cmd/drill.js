import { scoreToDisplay } from '../../common/tools.mjs';
import Const, { AP_COSTS } from '../../common/const.mjs';
import { getAreaAroundPlayer } from './scan.mjs';
import { EMPTY_TILE } from '../../common/mapsLayersConst.mjs';
import { GameObject } from '../../common/gameObject.mjs';

const { GameTreasure, Scores } = Const;

export function drill(state, action) {
  const player = state.players[action.walletAddress];
  if (notEnoughAP(player)) {
    return { player, digged: false };
  }

  player.stats.ap.current -= AP_COSTS.drill;
  player.equipment.drills.current -= 1;

  const area = getAreaAroundPlayer(player.pos, player.stats?.drillRadius).map((a) => {
    if (!standsOnGameObject(state, { x: a[0], y: a[1] }) && !alreadyDug(state, { x: a[0], y: a[1] })) {
      const treasureTile = state.gameTreasuresTilemap[a[1]]?.[a[0]];
      if (!treasureTile) {
        return foundNothing(state, { x: a[0], y: a[1] });
      } else {
        return foundTreasure(state, treasureTile, { x: a[0], y: a[1] });
      }
    } else {
      return { pos: { x: a[0], y: a[1] }, type: GameObject.none.type, tile: GameObject.none.tile };
    }
  });

  return {
    player,
    drilled: area,
    scoreToDisplay: scoreToDisplay([{ value: -AP_COSTS.drill, type: Scores.ap }]),
  };
}

function notEnoughAP(player) {
  if (player.stats.ap.current < AP_COSTS.drill) {
    console.log(`Cannot perform drill ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return true;
  }
  return false;
}

function standsOnGameObject(state, pos) {
  if (state.obstaclesTilemap[pos.y][pos.x] !== EMPTY_TILE) {
    return true;
  }
  const gameObjectTile = state.gameObjectsTiles.find((t) => t.tile === state.gameObjectsTilemap[pos.y][pos.x]);
  let { type: objectTile } = gameObjectTile;
  if (objectTile !== GameObject.none.type) {
    return true;
  }
  return false;
}

function alreadyDug(state, pos) {
  return state.gameTreasuresTilemapForClient[pos.y][pos.x] > 0;
}

function foundNothing(state, { x, y }) {
  state.gameTreasuresTilemap[y][x] = GameTreasure.hole.tile;
  state.gameTreasuresTilemapForClient[y][x] = GameTreasure.hole.tile;
  return { pos: { x, y }, type: GameTreasure.hole.type, tile: GameTreasure.hole.tile };
}

function foundTreasure(state, treasureTile, { x, y }) {
  const treasure = Object.values(GameTreasure).find((t) => t.tile === treasureTile);
  const { type, tile } = treasure;
  state.gameTreasuresTilemapForClient[y][x] = tile;
  state.gameTreasuresTilemap[y][x] = tile;
  state.gameTreasuresCounter[type] -= 1;
  return { pos: { x, y }, type, tile };
}
