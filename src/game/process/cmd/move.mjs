import Const from '../../common/const.mjs';
import { scoreToDisplay, step } from '../../common/tools.mjs';
import { triggerLandmine } from './landmine.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';
const {
  GameObject,
  Map,
  NO_AP_GROUND_TILES,
  LOW_AP_GROUND_TILES,
  MED_AP_GROUND_TILES,
  HIGH_AP_DECO_TILES,
  NO_AP_COST,
  LOW_AP_COST,
  MED_AP_COST,
  HIGH_AP_COST,
} = Const;

export function movePlayer(state, action) {
  const { walletAddress, dir } = action;
  const player = state.players[walletAddress];
  if (!player) {
    console.log(`Cannot move ${walletAddress} Player not registered`);
    return { player: { error: 'Player not registered' } };
  }

  const newPos = step(player.pos, dir);

  if (newPos.x < 0 || newPos.x >= Map.size || newPos.y < 0 || newPos.y >= Map.size) {
    console.log(`Cannot move ${player.walletAddress}. Reached edge of the universe ${newPos}`);
    return { player };
  } else if (state.playersOnTiles[newPos.y][newPos.x]) {
    console.log(
      `Cannot move ${player.walletAddress}. Tile ${newPos} occupied by ${state.playersOnTiles[newPos.y][newPos.x]}`
    );
    return { player };
  } else if (state.obstaclesTilemap[newPos.y][newPos.x] >= 0) {
    console.log(`Cannot move ${player.walletAddress}. Tile ${newPos} has obstacle`);
    return { player };
  } else {
    const apCost = calculateApCost(state, newPos.y, newPos.x);
    if (player.stats.ap.current < apCost) {
      console.log(`Cannot move ${player.walletAddress}. Not enough ap`);
      return { player, moved: false };
    }

    player.onGameObject = state.gameObjectsTiles.find((t) => t.tile === state.gameObjectsTilemap[newPos.y][newPos.x]);

    player.onGameTreasure = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemapForClient[newPos.y][newPos.x]
    );

    state.playersOnTiles[player.pos.y][player.pos.x] = null;
    state.playersOnTiles[newPos.y][newPos.x] = player.walletAddress;
    player.pos = newPos;
    // we need to know and send the position of moving along with the position calculated after dying
    player.movedPos = newPos;

    player.stats.ap.current -= apCost;
    const scores = [{ value: -apCost, type: GameObject.ap.type }];
    const opponentScores = [];

    const hiddenObject = state.gameHiddenObjects[newPos.y][newPos.x];
    let encounter = false;
    if (hiddenObject?.type === GameObject.active_mine.type && hiddenObject.owner !== player.walletAddress) {
      encounter = {
        type: GameObject.active_mine.type,
        leftBy: hiddenObject.owner,
      };
    }

    if (encounter?.type === GameObject.active_mine.type) {
      const { finished, revenge, loot, tokenTransfer, damage } = triggerLandmine(state, player, hiddenObject);
      if (finished) {
        player.pos = calculatePlayerRandomPos(state);
        state.playersOnTiles[newPos.y][newPos.x] = null;
        state.playersOnTiles[player.pos.y][player.pos.x] = player.walletAddress;
      }

      scores.push({ value: -damage.finalDmg, type: Const.GameObject.hp.type });

      if (parseInt(loot) > 0) {
        opponentScores.push({ value: loot, type: Const.Scores.coin });
        scores.push({ value: -loot, type: Const.Scores.coin });
      }
    }

    return {
      player,
      encounter,
      opponent: hiddenObject?.owner,
      scoreToDisplay: scoreToDisplay(scores),
      opponentScoreToDisplay: scoreToDisplay(opponentScores),
    };
  }
}

function calculateApCost(state, y, x) {
  if (HIGH_AP_DECO_TILES.includes(state.decorationTilemap[y][x])) {
    return HIGH_AP_DECO_TILES;
  }
  if (NO_AP_GROUND_TILES.includes(state.groundTilemap[y][x])) {
    return NO_AP_COST;
  }
  if (LOW_AP_GROUND_TILES.includes(state.groundTilemap[y][x])) {
    return LOW_AP_COST;
  }
  if (MED_AP_GROUND_TILES.includes(state.groundTilemap[y][x])) {
    return MED_AP_COST;
  }

  return LOW_AP_COST;
}
