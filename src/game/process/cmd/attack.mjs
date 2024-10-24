import Const, { GAMEPLAY_MODES, GAME_MODES, BOOSTS } from '../../common/const.mjs';
import { step, scoreToDisplay, addCoins } from '../../common/tools.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';

export function attack(state, action, timestamp) {
  const player = state.players[action.walletAddress];
  if (player.stats.ap.current < 1) {
    return { player, tokenTransfer: 0 };
  }
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
    if (attackPos.x < 0 || attackPos.x > state.map.width - 1 || attackPos.y < 0 || attackPos.y > state.map.width - 1) {
      break;
    }
    // note: hacker beaver can shoot over obstacles, because why not.
    if (state.obstaclesTilemap[attackPos.y][attackPos.x] > Const.EMPTY_TILE && player.beaverId != 'hacker_beaver') {
      break;
    }
    opponent = state.players[state.playersOnTiles[attackPos.y][attackPos.x]];
    if (opponent != null && opponent.stats.hp.current > 0) {
      break;
    }
    range++;
    prevPos = attackPos;
  }

  if (opponent) {
    const { finished, revenge, loot, tokenTransfer, damage, additionalLoot } = finishHim(
      player,
      opponent,
      { range },
      state,
      timestamp
    );
    if (finished && state.gameplayMode === GAMEPLAY_MODES.deathmatch) {
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
      additionalLoot,
    };
  }
  return { player, pos: attackPos, tokenTransfer: 0 };
}

function calculateDamage(player, damageFigures, state) {
  const { range } = damageFigures;
  const baseDmg = damageFigures.baseDmg || player.stats.weapon.damage[range];
  if (damageFigures.type === Const.GameObject.active_mine.type) {
    return {
      range,
      baseDmg,
      criticalHit: false,
      dmgMultiplier: 1,
      finalDmg: baseDmg,
    };
  }

  const criticalChance = player.stats.weapon.critical_hit_chance[range];
  const criticalHitRandom = Math.random(++state.randomCounter);
  let dmgMultiplier = 1;
  let criticalHit = false;
  if (criticalHitRandom <= criticalChance) {
    criticalHit = true;
    dmgMultiplier = player.stats.weapon.critical_hit_multiplier[range];
  }
  if (player.activeBoosts[BOOSTS.quad_damage.type]) {
    dmgMultiplier = BOOSTS.quad_damage.effect(dmgMultiplier);
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
    criticalHit,
    dmgMultiplier,
    finalDmg,
  };
}

export function finishHim(player, opponent, damageFigures, state, timestamp) {
  const damage = calculateDamage(player, damageFigures, state);
  console.log(`Player ${player.walletAddress} dealt ${damage?.baseDmg} to opponent ${opponent.walletAddress}`);
  opponent.stats.hp.current -= damage.finalDmg;
  if (opponent.stats.hp.current <= 0) {
    const { loot, additionalLoot } = lootPlayer(opponent, state);
    const revenge = player.stats.kills.killedBy === opponent.walletAddress;
    let lootWithBonus = loot + (player.stats.bonus[state.mode][Const.BonusType.KillBonus] || 0);
    console.log(
      `Player ${player.walletAddress} finished ${opponent.walletAddress}. Loot with kill bonus ${lootWithBonus}`
    );
    respawnPlayer(opponent, state, timestamp);
    opponent.stats.kills.killedBy = player.walletAddress;
    player.stats.kills.frags++;
    player.stats.kills.fragsInRow++;
    if (revenge) {
      player.stats.kills.killedBy = '';
    }
    addCoins(player, GAME_MODES[state.mode].token, lootWithBonus, state);
    if (additionalLoot?.token) {
      addCoins(player, additionalLoot.token, 1, state);
    }
    return {
      finished: true,
      revenge,
      loot: lootWithBonus,
      additionalLoot,
      damage,
    };
  }
  return {
    finished: false,
    loot: 0,
    tokenTransfer: 0,
    additionalLoot: {},
    damage,
  };
}

export function respawnPlayer(player, state, timestamp) {
  player.stats.hp.current = 0;
  player.stats.kills.deaths++;
  player.stats.kills.fragsInRow = 0;
  delete player.activeBoosts[BOOSTS.quad_damage.type];
  if (state.gameplayMode === GAMEPLAY_MODES.deathmatch) {
    player.stats.hp.current = player.stats.hp.max;
    state.playersOnTiles[player.pos.y][player.pos.x] = null;
    player.pos = calculatePlayerRandomPos(state);
    state.playersOnTiles[player.pos.y][player.pos.x] = player.walletAddress;
  }
  player.stats.death = {
    ts: timestamp,
    round: state.round.current,
  };
}

export function lootPlayer(player, state) {
  const loot = Math.min(player.stats.coins.gained, Const.Combat.DefaultLoot);
  player.stats.coins.gained -= loot;

  const additionalTokens = Object.keys(player.stats.additionalTokens).filter(
    (t) => player.stats.additionalTokens[t].gained > 0
  );

  let additionalLoot;
  if (additionalTokens.length > 0) {
    const random = Math.floor(Math.random(state.randomCounter++) * additionalTokens.length);
    additionalLoot = { token: additionalTokens[random], amount: 1 };
    player.stats.additionalTokens[additionalLoot.token].gained -= 1;
  }

  return { loot, additionalLoot };
}
