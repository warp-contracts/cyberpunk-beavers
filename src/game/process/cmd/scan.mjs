import { AP_COSTS } from '../../common/const.mjs';

export function scan(state, action) {
  const walletAddress = action.walletAddress;
  const player = state.players[walletAddress];

  if (!player) {
    console.log(`Wallet ${walletAddress} is not an active player`);
    return { area: [] };
  }

  if (player.stats.ap.current < AP_COSTS.scanner) {
    console.log(
      `Cannot use scan ${walletAddress}. Not enough ap: ${player.stats.ap.current}. Required: ${AP_COSTS.scanner}`
    );
    return { player, area: [] };
  }

  if (player.equipment.scanners.current < 1) {
    console.log(`Cannot use scan ${walletAddress}. There are no available.`);
    return { player, area: [] };
  }

  player.stats.ap.current -= AP_COSTS.scanner;
  player.equipment.scanners.current -= 1;
  const area = getAreaAroundPlayer(player.pos, player.stats?.scannerRadius).map((a) => {
    const treasure = state.gameTreasuresTilemap[a[1]]?.[a[0]];
    return { tile: [a[0], a[1]], treasure };
  });
  return { area, player };
}

function getAreaAroundPlayer(playerPosition, radius = 1) {
  const { x, y } = playerPosition;
  let area = [];

  for (let playerX = x - radius; playerX <= x + radius; playerX++) {
    for (let playerY = y - radius; playerY <= y + radius; playerY++) {
      if (playerX >= 0 && playerY >= 0) {
        area.push([playerX, playerY]);
      }
    }
  }

  return area;
}
