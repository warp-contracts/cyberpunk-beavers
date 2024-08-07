import Const from './const.mjs';

function step(pos, dir) {
  switch (dir) {
    case Const.Direction.left:
      return { x: pos.x - 1, y: pos.y };
    case Const.Direction.right:
      return { x: pos.x + 1, y: pos.y };
    case Const.Direction.up:
      return { x: pos.x, y: pos.y - 1 };
    case Const.Direction.down:
      return { x: pos.x, y: pos.y + 1 };
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
  player.stats.coins.gained += Number(amount);
}

export { addCoins, step, scoreToDisplay };
