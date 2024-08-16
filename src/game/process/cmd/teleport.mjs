import Const from '../../common/const.mjs';
import { scoreToDisplay, step } from '../../common/tools.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';

const { GameObject } = Const;
const TELEPORT_AP_COST = 4;

export function teleportPlayer(state, action) {
  const { walletAddress } = action;
  const player = state.players[walletAddress];
  if (!player) {
    console.log(`Wallet ${walletAddress} is not an active player`);
    return {};
  }
  if (player.stats.ap.current < TELEPORT_AP_COST) {
    console.log(
      `Cannot use teleport ${walletAddress}. Not enough ap: ${player.stats.ap.current}. Required: ${TELEPORT_AP_COST}`
    );
    return { player, moved: false };
  }
  if (player.equipment.teleports < 1) {
    console.log(`Cannot use teleport ${walletAddress}. There are no available.`);
    return { player, moved: false };
  }

  player.pos = calculatePlayerRandomPos(state);
  player.stats.ap.current -= TELEPORT_AP_COST;
  player.equipment.teleports -= 1;

  return {
    player,
    scoreToDisplay: scoreToDisplay([{ value: -TELEPORT_AP_COST, type: GameObject.ap.type }]),
  };
}
