import Const, { GAMEPLAY_MODES, GAME_MODES, AP_COSTS, BEAVER_TYPES } from '../../common/const.mjs';
import { step, scoreToDisplay, addCoins } from '../../common/tools.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';
import { BOOSTS } from '../../common/boostsConst.mjs';
import { EMPTY_TILE } from '../../common/mapsLayersConst.mjs';
import { GameObject } from '../../common/gameObject.mjs';

export function attack(state, action, timestamp, horde) {
  const player = state.players[action.walletAddress];
  if (player.stats.ap.current < AP_COSTS.attack) {
    return { player, tokenTransfer: 0 };
  }
  if (
    player.stats.previousAttackTs !== null &&
    timestamp - player.stats.previousAttackTs < player.stats.weapon.attack_recovery_ms
  ) {
    return { player, tokenTransfer: 0 };
  }

  player.stats.previousAttackTs = timestamp;
  player.stats.ap.current -= AP_COSTS.attack;
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
    if (
      state.obstaclesTilemap[attackPos.y][attackPos.x] > EMPTY_TILE &&
      player.beaverId !== BEAVER_TYPES.hacker_beaver.name
    ) {
      break;
    }
    // we are treating players from the same team as obstacles
    if (
      state.teamsConfig.amount > 0 &&
      state.players[state.playersOnTiles[attackPos.y][attackPos.x]]?.team?.id == player.team?.id &&
      player.beaverId !== BEAVER_TYPES.hacker_beaver.name
    ) {
      break;
    }
    if (state.gameplayMode === GAMEPLAY_MODES.horde && state.currentWave) {
      opponent = state.currentWave.monsters[state.monstersOnTiles[attackPos.y][attackPos.x]];
    } else {
      opponent = state.players[state.playersOnTiles[attackPos.y][attackPos.x]];
    }
    if (opponent != null && opponent.stats.hp.current > 0) {
      break;
    }
    range++;
    prevPos = attackPos;
  }

  if (opponent && state.teamsConfig.amount > 0 && opponent.team?.id == player.team?.id) {
    console.log(`Opponent ${opponent.walletAddress} is from the same team: ${opponent.team?.name}`);
    return { player, pos: attackPos, tokenTransfer: 0 };
  }

  if (opponent && opponent.stats.hp.current > 0) {
    if (state.gameplayMode === GAMEPLAY_MODES.horde) {
      const dmg = calculateDamage(player, opponent, { range }, state);
      horde.registerAttack({
        dmg,
        player,
        monster: opponent,
      });
      return;
    }

    const { finished, revenge, loot, tokenTransfer, damage, additionalLoot } = finishHim(
      player,
      opponent,
      { range },
      state,
      timestamp
    );
    const playerScores = [{ value: -AP_COSTS.attack, type: GameObject.ap.type }];
    const opponentScores = [{ value: -damage.finalDmg, type: GameObject.hp.type }];

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

export function calculateDamage(objectWithWeapon, opponent, damageFigures, state) {
  const { range } = damageFigures;
  const baseDmg = damageFigures.baseDmg || objectWithWeapon.stats.weapon.damage[range];
  if (damageFigures.type === GameObject.active_mine.type) {
    return {
      range,
      baseDmg,
      criticalHit: false,
      dmgMultiplier: 1,
      finalDmg: baseDmg,
    };
  }

  const criticalChance = objectWithWeapon.stats.weapon.critical_hit_chance[range];
  const criticalHitRandom = Math.random(++state.randomCounter);
  let dmgMultiplier = 1;
  let criticalHit = false;
  if (criticalHitRandom <= criticalChance) {
    criticalHit = true;
    dmgMultiplier = objectWithWeapon.stats.weapon.critical_hit_multiplier[range];
  }
  if (objectWithWeapon?.activeBoosts[BOOSTS.quad_damage.type]) {
    dmgMultiplier = BOOSTS.quad_damage.effect(dmgMultiplier);
  }
  if (opponent.activeBoosts[BOOSTS.shield.type]) {
    dmgMultiplier = BOOSTS.shield.effect(dmgMultiplier, opponent);
  }
  const hitChance = objectWithWeapon.stats.weapon.hit_chance[range];
  const hitRandom = Math.random(++state.randomCounter);
  let finalDmg = Math.floor(baseDmg * dmgMultiplier);
  if (hitRandom > hitChance) {
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

export function calculateLootBonus(player, state) {
  return player.stats.bonus[state.mode][Const.BonusType.KillBonus] || 0;
}

export function finishHim(player, opponent, damageFigures, state, timestamp) {
  const damage = calculateDamage(player, opponent, damageFigures, state);
  console.log(`Player ${player.walletAddress} dealt ${damage?.baseDmg} to opponent ${opponent.walletAddress}`);
  opponent.stats.hp.current -= damage.finalDmg;
  if (opponent.stats.hp.current <= 0) {
    const { loot, additionalLoot } = lootPlayer(opponent, state);
    const revenge = player.stats.kills.killedBy === opponent.walletAddress;
    let lootWithBonus = loot + calculateLootBonus(player, state);
    console.log(
      `Player ${player.walletAddress} finished ${opponent.walletAddress}. Loot with kill bonus ${lootWithBonus}`
    );
    respawnPlayer(opponent, state, timestamp);
    opponent.stats.kills.killedBy = player.walletAddress;
    player.stats.kills.frags++;
    if (state.teamsConfig?.amount > 0) {
      const teams = state.teamsConfig.teams;
      teams[player.team.id].frags++;
      teams[opponent.team.id].deaths++;
    }
    player.stats.kills.fragsInRow++;
    if (revenge) {
      player.stats.kills.killedBy = '';
    }
    addCoins(player, GAME_MODES[state.mode].token, lootWithBonus, state, state.teamsConfig?.weight?.frags);
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
  [BOOSTS.quad_damage.type, BOOSTS.shield.type].forEach((b) => delete player.activeBoosts[b]);
  if (state.gameplayMode === GAMEPLAY_MODES.deathmatch || state.gameplayMode === GAMEPLAY_MODES.horde) {
    player.stats.hp.current = player.stats.hp.max;
    state.playersOnTiles[player.pos.y][player.pos.x] = null;
    player.pos = calculatePlayerRandomPos(state);
    state.playersOnTiles[player.pos.y][player.pos.x] = player.walletAddress;
  }
  if (timestamp) {
    player.stats.death = {
      ts: timestamp,
      round: state.round.current,
    };
  }
}

export function lootPlayer(player, state) {
  const loot = Math.min(player.stats.coins.gained, Const.Combat.DefaultLoot);
  addCoins(player, GAME_MODES[state.mode].token, -loot, state);

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
