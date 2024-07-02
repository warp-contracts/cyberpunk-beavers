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
  const attackRange = player.stats.attack_range;
  let range = 0;
  let opponent = null;
  let prevPos = player.pos;
  let attackPos = prevPos;
  while (range < attackRange && opponent == null) {
    attackPos = step(prevPos, action.dir);
    opponent = state.players[state.playersOnTiles[attackPos.y][attackPos.x]];
    range++;
    prevPos = attackPos;
    // TODO: check obstacles
  }

  if (opponent) {
    console.log(`Player ${player.walletAddress} attacked ${attackPos.x} ${attackPos.y} ${opponent.walletAddress}`);
    const { finished, revenge,  loot, tokenTransfer } = finishHim(player, opponent);
    if (finished) {
      opponent.pos = calculatePlayerRandomPos(state);
      state.playersOnTiles[attackPos.y][attackPos.x] = null;
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
      revenge,
      pos: attackPos,
      scoreToDisplay: scoreToDisplay(playerScores),
      opponentScoreToDisplay: scoreToDisplay(opponentScores),
    };
  }
  return { player,  pos: attackPos, tokenTransfer: 0 };
}

function finishHim(player, opponent) {
  opponent.stats.hp.current -= player.stats.damage;
  if (opponent.stats.hp.current <= 0) {
    const loot = lootPlayer(opponent) + Const.BEAVER_TYPES[player.beaverId].bonus[Const.BonusType.KillBonus];
    const revenge = (player.stats.kills.killedBy === opponent.walletAddress);
    console.log(`Player ${player.walletAddress} finished ${opponent.walletAddress}. Loot ${loot}`);
    opponent.stats.hp.current = opponent.stats.hp.max;
    opponent.stats.kills.deaths++;
    opponent.stats.kills.fragsInRow = 0;
    opponent.stats.kills.killedBy = player.walletAddress;
    player.stats.kills.frags++;
    player.stats.kills.fragsInRow++;
    if (revenge) {
      player.stats.kills.killedBy = '';
    }
    const tokenTransfer = addCoins(player, loot);
    return {
      finished: true,
      revenge,
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
