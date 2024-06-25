import Const from '../../common/const.mjs';
import { step, scoreToDisplay, addCoins } from '../../common/tools.mjs';
import { calculatePlayerRandomPos } from "./registerPlayer.mjs";

export function attack(state, action) {
  const player = state.players[action.walletAddress];
  if (player.stats.ap.current < 1) {
    console.log(`Cannot perform attack ${player.walletAddress}. Not enough ap ${player.stats.ap.current}`);
    return { player, tokenTransfer: 0 };
  }
  player.stats.ap.current -= 1;
  const pos = step(player.pos, action.dir);
  const opponent = state.players[state.playersOnTiles[pos.y][pos.x]];

  if (opponent) {
    console.log(`Player ${player.walletAddress} attacked ${pos.x} ${pos.y} ${opponent.walletAddress}`);
    const { finished,  loot, tokenTransfer } = finishHim(player, opponent);
    if (finished) {
      opponent.pos = calculatePlayerRandomPos(state);
      state.playersOnTiles[pos.y][pos.x] = null;
      state.playersOnTiles[opponent.pos.y][opponent.pos.x] = opponent.walletAddress;
    }
    const playerScores = [{ value: -1, type: Const.GameObject.ap.type }];

    const opponentScores = [{ value: -player.stats.damage, type: Const.GameObject.hp.type }];

    if (parseInt(loot) > 0) {
      playerScores.push({ value: loot, type: Const.Scores.coin });
      opponentScores.push({ value: -loot, type: Const.Scores.coin });
    }
    return {
      player,
      tokenTransfer,
      opponent,
      opponentFinished: finished,
      pos,
      scoreToDisplay: scoreToDisplay(playerScores),
      opponentScoreToDisplay: scoreToDisplay(opponentScores),
    };
  } else if ([1, 3].includes(state.groundTilemap[pos.y][pos.x])) {
    console.log(`Attack found obstacle ${player.walletAddress}. Tile ${pos.x} ${pos.y} has obstacle`);
  }
  return { player,  pos, tokenTransfer: 0 };
}

function finishHim(player, opponent) {
  opponent.stats.hp.current -= player.stats.damage;
  if (opponent.stats.hp.current <= 0) {
    const loot = lootPlayer(opponent);
    console.log(`Player ${player.walletAddress} finished ${opponent.walletAddress}. Loot ${loot}`);
    opponent.stats.hp.current = opponent.stats.hp.max;
    const tokenTransfer = addCoins(player, loot);
    return {
      finished: true,
      loot,
      tokenTransfer,
    };
  }
  return {
    finished: false,
    loot: 0,
    tokenTransfer: 0,
  };
}

function lootPlayer(player) {
  const amount = Math.min(player.stats.coins.available, Const.Combat.DefaultLoot);
  player.stats.coins.available -= amount;
  return amount;
}
