import Const from '../../common/const.mjs';
import { step, scoreToDisplay } from '../../common/tools.mjs';

export function attack(state, action) {
  const player = state.players[action.walletAddress];
  if (player.stats.ap.current < 1) {
    console.log(`Cannot perform attack ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return { player, tokenTransfer: 0 };
  }
  player.stats.ap.current -= 1;
  const attackPos = step(player.pos, action.dir);
  const opponent = state.players[state.playersOnTiles[attackPos[1]][attackPos[0]]];

  if (opponent) {
    console.log(`Player ${player.walletAddress} attacked ${opponent.walletAddress}`);
    const{ loot, tokenTransfer } = finishHim(player, opponent);
    return {
      player,
      tokenTransfer,
      opponent,
      attackPos,
      scoreToDisplay: scoreToDisplay([
        { value: -1, type: Const.GameObject.ap.type },
        { value: loot, type: Const.Scores.coin },
        { value: player.stats.damage, type: null },
      ]),
      opponentScoreToDisplay: scoreToDisplay([
        { value: -player.stats.damage, type: Const.GameObject.hp.type },
        { value: -loot, type: Const.Scores.coin },
      ]),
    };
  } else if ([1, 3].includes(state.groundTilemap[attackPos[1]][attackPos[0]])) {
    console.log(`Attack found obstacle ${player.walletAddress}. Tile ${attackPos} has obstacle`);
  }
  return { player, attackPos, tokenTransfer: 0 };
}

function finishHim(player, opponent) {
  opponent.stats.hp.current -= player.stats.damage;
  player.stats.ap.current -= 1;
  if (opponent.stats.hp.current <= 0) {
    const loot = opponent.loot();
    console.log(`Player ${player.walletAddress} finished ${opponent.walletAddress}. Loot ${loot}`);
    opponent.stats.hp.current = opponent.stats.hp.max;
    const tokenTransfer = player.addCoins(loot);
    return {
      loot, tokenTransfer
    };
  }
  return {
    loot: 0, tokenTransfer: 0
  };
}

