import { scoreToDisplay } from '../../common/tools.mjs';
import Const from '../../common/const.mjs';

const { GameObject, Scores } = Const;

export function dig(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];
  if (player.stats.ap.current < 2) {
    console.log(`Cannot perform dig ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return { player, digged: false };
  }

  const gameObjectTile = state.gameObjectsTiles.find(
    (t) => t.tile === state.gameObjectsTilemap[player.pos.y][player.pos.x]
  );
  let { type: objectTile } = gameObjectTile;
  if (objectTile != GameObject.none.type) {
    console.log(`Cannot perform dig ${player.walletAddress}. Player stands on a game object.`);
    return { player, digged: false };
  }

  const tile = state.gameTreasuresTiles.find((t) => t.tile === state.gameTreasuresTilemap[player.pos.y][player.pos.x]);
  const { type } = tile;

  if (type === GameObject.hole.type) {
    console.log(`Player ${player.walletAddress} tried to dig already existing hole.`);
    return { player, digged: false };
  }

  player.stats.ap.current -= 2;

  if (type === GameObject.none.type) {
    console.log(`Player ${player.walletAddress} digged nothing.`);
    state.gameTreasuresTilemap[player.pos.y][player.pos.x] = GameObject.hole.tile;
    state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] = GameObject.hole.tile;

    return {
      player,
      digged: { type },
      scoreToDisplay: scoreToDisplay([{ value: -2, type: Scores.ap }]),
    };
  }

  if (type == GameObject.treasure.type) {
    console.log(`Player stands on a game treasure: ${type}.`);
    state.gameTreasuresTilemapForClient[player.pos.y][player.pos.x] = GameObject.treasure.tile;
    return {
      player,
      digged: { type },
      scoreToDisplay: scoreToDisplay([{ value: -2, type: Scores.ap }]),
    };
  }

  return { player, digged: false };
}
