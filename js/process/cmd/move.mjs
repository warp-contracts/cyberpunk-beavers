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
    newPos[0] < 0 ||
    newPos[0] >= Map.size ||
    newPos[1] < 0 ||
    newPos[1] >= Map.size
  ) {
    console.log(`Cannot move ${player.walletAddress}. Reached edge of the universe ${newPos}`);
    return { player };
  } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
    console.log(`Cannot move ${player.walletAddress}. Tile ${newPos} occupied by ${state.playersOnTiles[newPos[1]][newPos[0]]}`);
    return { player };
  } else if ([1, 3].includes(state.groundTilemap[newPos[1]][newPos[0]])) {
    console.log(`Cannot move ${player.walletAddress}. Tile ${newPos} has obstacle`);
    return { player };
  } else {
    player.onGameObject = state.gameObjectsTiles.find(
      (t) => t.tile === state.gameObjectsTilemap[newPos[1]][newPos[0]]
    );

    player.onGameTreasure = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[newPos[1]][newPos[0]]
    );

    state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
    state.playersOnTiles[newPos[1]][newPos[0]] = player.walletAddress;
    player.pos = newPos;
    player.stats.ap.current -= 1;
    return {
      player,
      scoreToDisplay: scoreToDisplay([{ value: -1, type: GameObject.ap.type }]),
    };
  }
}
