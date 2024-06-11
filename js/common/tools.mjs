import Const from './const.mjs'

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

export { step, scoreToDisplay }