import Const from '../../common/const.mjs';
import { finishHim } from './attack.mjs';
import { scoreToDisplay } from '../../common/tools.mjs';

const LANDMINE_AP_COST = 4;

export function useLandmine(state, action) {
  const { walletAddress } = action;
  const player = state.players[walletAddress];
  if (!player) {
    console.log(`Wallet ${walletAddress} is not an active player`);
    return {};
  }
  if (player.stats.ap.current < LANDMINE_AP_COST) {
    console.log(
      `Cannot use landmine ${walletAddress}. Not enough ap: ${player.stats.ap.current}. Required: ${LANDMINE_AP_COST}`
    );
    return { player };
  }
  if (player.equipment.landmines < 1) {
    console.log(`Cannot use landmine ${walletAddress}. There are no available.`);
    return { player };
  }

  player.stats.ap.current -= LANDMINE_AP_COST;
  player.equipment.landmines -= 1;
  state.gameHiddenObjects[player.pos.y][player.pos.x] = {
    type: Const.GameObject.active_mine.type,
    owner: walletAddress,
  };

  return {
    player,
    scoreToDisplay: scoreToDisplay([{ value: -LANDMINE_AP_COST, type: Const.Scores.ap }]),
  };
}

export function triggerLandmine(state, player, landmine) {
  const damage = {
    baseDmg: Const.GameObject.active_mine.damage,
    range: 0,
  };
  state.gameHiddenObjects[player.pos.y][player.pos.x] = undefined;
  return finishHim(state.players[landmine.owner], player, damage, state);
}
