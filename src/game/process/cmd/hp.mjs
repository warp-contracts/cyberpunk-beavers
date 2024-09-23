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
  if (player.stats.hp.current == player.stats.hp.max) {
    console.log(`Cannot use hp ${walletAddress}. User has maximum hp.`);
    return { player, applied: false };
  }

  player.stats.ap.current -= AP_COSTS.hp;
  player.equipment.hp.current -= 1;
  let hpValue;
  const hpMissing = player.stats.hp.max - player.stats.hp.current;
  if (hpMissing >= GameObject.hp.value) {
    hpValue = GameObject.hp.value;
    player.stats.hp.current += hpValue;
  } else {
    hpValue = hpMissing;
    player.stats.hp.current += hpValue;
  }

  console.log(`Applied ${hpValue} to player: ${walletAddress}.`);

  return {
    player,
    scoreToDisplay: scoreToDisplay([
      { value: hpValue, type: Scores.hp },
      { value: -AP_COSTS.hp, type: Scores.ap },
    ]),
    applied: true,
  };
}
