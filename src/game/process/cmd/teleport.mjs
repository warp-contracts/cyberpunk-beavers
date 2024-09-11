import Const, { AP_COSTS } from '../../common/const.mjs';
import { scoreToDisplay, step } from '../../common/tools.mjs';
import { calculatePlayerRandomPos } from './registerPlayer.mjs';

const { GameObject } = Const;

export function teleportPlayer(state, action) {
  const { walletAddress } = action;
  const player = state.players[walletAddress];
  if (!player) {
    console.log(`Wallet ${walletAddress} is not an active player`);
    return {};
  }
  if (player.stats.ap.current < AP_COSTS.teleport) {
    console.log(
      `Cannot use teleport ${walletAddress}. Not enough ap: ${player.stats.ap.current}. Required: ${AP_COSTS.teleport}`
    );
    return { player, moved: false };
  }
  if (player.equipment.teleports.current < 1) {
    console.log(`Cannot use teleport ${walletAddress}. There are no available.`);
    return { player, moved: false };
  }

  state.playersOnTiles[player.pos.y][player.pos.x] = null;
  player.pos = calculatePlayerRandomPos(state);
  state.playersOnTiles[player.pos.y][player.pos.x] = player.walletAddress;
  player.stats.ap.current -= AP_COSTS.teleport;
  player.equipment.teleports.current -= 1;

  return {
    player,
    scoreToDisplay: scoreToDisplay([{ value: -AP_COSTS.teleport, type: GameObject.ap.type }]),
  };
}
