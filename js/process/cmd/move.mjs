import Const from '../../common/const.mjs';
import { scoreToDisplay, step } from '../../common/tools.mjs';
const { GameObject, Map } = Const;

export function movePlayer(state, action) {
  const walletAddress = action.walletAddress;
  const dir = action.dir;
  const player = state.players[walletAddress];
  if (player.stats.ap.current < 1) {
    console.log(`Cannot move ${player.walletAddress}. Not enough ap`);
    return { player, moved: false };
  }

  const newPos = step(player.pos, dir);

  if (
    newPos.x < 0 ||
    newPos.x >= Map.size ||
    newPos.y < 0 ||
    newPos.y >= Map.size
  ) {
    console.log(`Cannot move ${player.walletAddress}. Reached edge of the universe ${newPos}`);
    return { player };
  } else if (state.playersOnTiles[newPos.y][newPos.x]) {
    console.log(`Cannot move ${player.walletAddress}. Tile ${newPos} occupied by ${state.playersOnTiles[newPos.y][newPos.x]}`);
    return { player };
  } else if ([1, 3].includes(state.groundTilemap[newPos.y][newPos.x])) {
    console.log(`Cannot move ${player.walletAddress}. Tile ${newPos} has obstacle`);
    return { player };
  } else {
    player.onGameObject = state.gameObjectsTiles.find(
      (t) => t.tile === state.gameObjectsTilemap[newPos.y][newPos.x]
    );

    player.onGameTreasure = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[newPos.y][newPos.x]
    );

    state.playersOnTiles[player.pos.y][player.pos.x] = null;
    state.playersOnTiles[newPos.y][newPos.x] = player.walletAddress;
    player.pos = newPos;
    player.stats.ap.current -= 1;
    return {
      player,
      scoreToDisplay: scoreToDisplay([{ value: -1, type: GameObject.ap.type }]),
    };
  }
}
