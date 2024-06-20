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

  if (type === GameObject.hp.type) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}.`);
    player.stats.hp.current += value;
    const tokenTransfer = addCoins(player, value);
    state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
    return {
      player,
      picked: { type },
      tokenTransfer,
      scoreToDisplay: scoreToDisplay([
        { value: value, type: Scores.hp },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else if (type === GameObject.ap.type) {
    player.stats.ap.current -= 1;
    console.log(`Player stands on a game object, increasing ${type}. `);
    player.stats.ap.current += value;
    const tokenTransfer = addCoins(player, value);
    state.gameObjectsTilemap[player.pos.y][player.pos.x] = GameObject.none.tile;
    return {
      player,
      picked: { type },
      tokenTransfer,
      scoreToDisplay: scoreToDisplay([
        { value: value, type: Scores.ap },
        { value: -1, type: Scores.ap },
      ]),
    };
  } else if (type === GameObject.none.type) {
    const gameTreasureTile = state.gameTreasuresTiles.find(
      (t) => t.tile === state.gameTreasuresTilemap[player.pos.y][player.pos.x]
    );
    const { type, value } = gameTreasureTile;
    if (type === GameObject.none.type) {
      console.log(`Cannot perform pick ${player.walletAddress}. Player does not stand on a game object`);
      return { player, picked: false };
    } else if (type === GameObject.treasure.type) {
      player.stats.ap.current -= 1;

      state.gameTreasuresTilemap[player.pos.y][player.pos.x] = GameObject.hole.tile;
      const valueWithBonus = value + player.stats.bonus[GameObject.treasure.type];
      const tokenTransfer = addCoins(player, valueWithBonus);
      return {
        player,
        picked: { type },
        tokenTransfer,
        scoreToDisplay: scoreToDisplay([
          { value: valueWithBonus, type: Scores.coin },
          { value: -1, type: Scores.ap },
        ]),
      };
    }
  }

  return { player, picked: false };
}
