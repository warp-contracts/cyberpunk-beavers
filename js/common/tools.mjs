import Const from './const.mjs'

const TOKEN_GAME_LOCKED_AMOUNT = 100;

function step(pos, dir) {
  switch (dir) {
    case Const.Direction.left:
      return [pos[0] - 1, pos[1]];
    case Const.Direction.right:
      return [pos[0] + 1, pos[1]];
    case Const.Direction.up:
      return [pos[0], pos[1] - 1];
    case Const.Direction.down:
      return [pos[0], pos[1] + 1];
  }
}

function scoreToDisplay(scoreValues) {
  return scoreValues.map((v) => {
    const isValuePositive = v.value > 0;
    return {
      value: `${isValuePositive ? '+' : ''}${v.value}`,
      type: v.type?.toUpperCase() || '',
      sign: isValuePositive ? 'positive' : 'negative',
    };
  });
}

function addCoins(player, amount) {
  player.stats.coins.available += amount;
  if (player.stats.coins.available > TOKEN_GAME_LOCKED_AMOUNT) {
    const toBeTransferred = player.stats.coins.available - TOKEN_GAME_LOCKED_AMOUNT;
    player.stats.coins.available = TOKEN_GAME_LOCKED_AMOUNT;
    return toBeTransferred;
  }
}

export { addCoins, step, scoreToDisplay }