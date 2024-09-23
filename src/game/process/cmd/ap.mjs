import Const from '../../common/const.mjs';
import { scoreToDisplay } from '../../common/tools.mjs';

const { GameObject, AP_COSTS, Scores } = Const;

export function useAp(state, action) {
  const { walletAddress } = action;
  const player = state.players[walletAddress];
  if (!player) {
    console.log(`Wallet ${walletAddress} is not an active player`);
    return { applied: false };
  }
  if (player.stats.ap.current < AP_COSTS.ap) {
    console.log(`Cannot use ap ${walletAddress}. Not enough ap: ${player.stats.ap.current}. Required: ${AP_COSTS.ap}`);
    return { player, applied: false };
  }
  if (player.equipment.ap.current < 1) {
    console.log(`Cannot use ap ${walletAddress}. There are no available.`);
    return { player, applied: false };
  }

  const apValue = GameObject.ap.value;
  player.stats.ap.current -= AP_COSTS.ap;
  player.equipment.ap.current -= 1;
  player.stats.ap.current += apValue;

  console.log(`Applied ${apValue} to player: ${walletAddress}.`);

  return {
    player,
    scoreToDisplay: scoreToDisplay([
      { value: apValue, type: Scores.ap },
      { value: -AP_COSTS.ap, type: Scores.ap },
    ]),
    applied: true,
  };
}
