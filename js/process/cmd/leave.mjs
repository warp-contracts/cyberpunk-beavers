import Const from '../../common/const.mjs';
import {addCoins} from '../../common/tools.mjs';
import {lootPlayer} from "./attack.mjs";
const { MIN_ROUNDS_AFTER_ATTACK_TO_LEAVE } = Const;

export function leave(state, action) {
  const player = state.players[action.walletAddress];
  if (player == null) {
    return;
  }

  const lastDamage = player.stats.hp.lastDamage;
  let tokenTransfer = 0;
  let transferTo = null;
  if (lastDamage) {
    const roundsDiff = state.round.current - lastDamage.round;
    if (roundsDiff < MIN_ROUNDS_AFTER_ATTACK_TO_LEAVE) {
      console.log('Leaving so soon?');
      // for now - self-rape
      const loot = lootPlayer(player);
      const opponent = state.players[lastDamage.from];
      tokenTransfer = addCoins(opponent, loot);
      transferTo = opponent.walletAddress;
    }
  }
  delete state.players[action.walletAddress];

  return {tokenTransfer, transferTo};
}
