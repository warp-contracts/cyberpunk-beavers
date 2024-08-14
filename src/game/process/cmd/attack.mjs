import Const from '../../common/const.mjs';
import { step, scoreToDisplay, addCoins } from '../../common/tools.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';

export function attack(state, action, timestamp) {
  const player = state.players[action.walletAddress];
  if (player.stats.ap.current < 1) {
    return { player, tokenTransfer: 0 };
  }
  console.log({
    'player.stats.previousAttackTs': player.stats.previousAttackTs,
    timestamp: timestamp,
    diff: timestamp - player.stats.previousAttackTs,
    recovery: player.stats.weapon.attack_recovery_ms,
  });

  if (
    player.stats.previousAttackTs !== null &&
    timestamp - player.stats.previousAttackTs < player.stats.weapon.attack_recovery_ms
  ) {
    return { player, tokenTransfer: 0 };
  }

  player.stats.previousAttackTs = timestamp;
  player.stats.ap.current -= 1;
  const attackRange = player.stats.weapon.attack_range;
  let range = 0;
  let opponent = null;
  let prevPos = player.pos;
  let attackPos = prevPos;
  while (range < attackRange) {
    attackPos = step(prevPos, action.dir);
    // note: hacker beaver can shoot over obstacles, because why not.
    if (state.obstaclesTilemap[attackPos.y][attackPos.x] >= 0 && player.beaverId != 'hacker_beaver') {
      break;
    }
    opponent = state.players[state.playersOnTiles[attackPos.y][attackPos.x]];
    if (opponent != null) {
      break;
    }
    range++;
    prevPos = attackPos;
  }

  if (opponent) {
    const { finished, revenge, loot, tokenTransfer, damage } = finishHim(player, opponent, { range }, state);
    if (finished) {
      opponent.pos = calculatePlayerRandomPos(state);
      state.playersOnTiles[attackPos.y][attackPos.x] = null;
      state.playersOnTiles[opponent.pos.y][opponent.pos.x] = opponent.walletAddress;
    }
    const playerScores = [{ value: -1, type: Const.GameObject.ap.type }];

    const opponentScores = [{ value: -damage.finalDmg, type: Const.GameObject.hp.type }];

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
      damage,
      pos: attackPos,
      scoreToDisplay: scoreToDisplay(playerScores),
      opponentScoreToDisplay: scoreToDisplay(opponentScores),
    };
  }
  return { player, pos: attackPos, tokenTransfer: 0 };
}

function calculateDamage(player, damageFigures, state) {
  const { range } = damageFigures;
  const baseDmg = damageFigures.baseDmg || player.stats.weapon.damage[range];
  const criticalChance = player.stats.weapon.critical_hit_chance[range];
  const criticalHitRandom = Math.random(++state.randomCounter);
  let dmgMultiplier = 1;
  if (criticalHitRandom <= criticalChance) {
    dmgMultiplier = player.stats.weapon.critical_hit_multiplier[range];
  }
  const hitChance = player.stats.weapon.hit_chance[range];
  const hitRandom = Math.random(++state.randomCounter);
  let finalDmg = Math.floor(baseDmg * dmgMultiplier);
  if (hitRandom > hitChance) {
    console.log({
      hitRandom,
      hitChance,
    });
    finalDmg = 0;
  }
  return {
    range,
    baseDmg,
    criticalChance,
    random: criticalHitRandom,
    dmgMultiplier,
    finalDmg,
  };
}

export function finishHim(player, opponent, damageFigures, state) {
  const damage = calculateDamage(player, damageFigures, state);
  console.log(`Player ${player.walletAddress} dealt ${damage} to opponent ${opponent.walletAddress}`);
  opponent.stats.hp.current -= damage.finalDmg;
  if (opponent.stats.hp.current <= 0) {
    const loot = lootPlayer(opponent) + Const.BEAVER_TYPES[player.beaverId].bonus[Const.BonusType.KillBonus];
    const revenge = player.stats.kills.killedBy === opponent.walletAddress;
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
    addCoins(player, loot);
    return {
      finished: true,
      revenge,
      loot,
      damage,
    };
  }
  return {
    finished: false,
    loot: 0,
    tokenTransfer: 0,
    damage,
  };
}

function lootPlayer(player) {
  const amount = Math.min(player.stats.coins.gained, Const.Combat.DefaultLoot);
  player.stats.coins.gained -= amount;
  return amount;
}
