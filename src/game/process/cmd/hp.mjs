import Const from '../../common/const.mjs';
import { scoreToDisplay } from '../../common/tools.mjs';

const { GameObject, AP_COSTS, Scores } = Const;

export function useHp(state, action) {
  const { walletAddress } = action;
  const player = state.players[walletAddress];
  if (!player) {
    console.log(`Wallet ${walletAddress} is not an active player`);
    return { applied: false };
  }
  if (player.stats.ap.current < AP_COSTS.hp) {
    console.log(`Cannot use hp ${walletAddress}. Not enough ap: ${player.stats.ap.current}. Required: ${AP_COSTS.hp}`);
    return { player, applied: false };
  }
  if (player.equipment.hp.current < 1) {
    console.log(`Cannot use hp ${walletAddress}. There are no available.`);
    return { player, applied: false };
  }
  if (player.stats.hp.current === player.stats.hp.max) {
    console.log(`Cannot use hp ${walletAddress}. User has maximum hp.`);
    return { player, applied: false };
  }

  player.stats.ap.current -= AP_COSTS.hp;
  player.equipment.hp.current -= 1;
  const baseHpValue = GameObject.hp.value[state.gameplayMode];
  const hpMissing = player.stats.hp.max - player.stats.hp.current;
  const hpApplied = Math.min(hpMissing, baseHpValue);
  player.stats.hp.current += hpApplied;
  console.log(`Applied ${hpApplied} to player: ${walletAddress}.`);

  return {
    player,
    scoreToDisplay: scoreToDisplay([
      { value: hpApplied, type: Scores.hp },
      { value: -AP_COSTS.hp, type: Scores.ap },
    ]),
    applied: true,
  };
}
