import Const from './const.mjs';
const { GAME_MODES } = Const;

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

function addCoins(player, type, amount, state, teamWeight) {
  console.log(`Adding ${amount} ${type} to wallet ${player.walletAddress}`);
  if (type === GAME_MODES[state.mode].token) {
    player.stats.coins.gained += Number(amount);
    if (state.teamsConfig?.amount > 0) {
      const team = state.teamsConfig.teams.find((t) => t.id == player.team.id);
      team.points += Number(amount) * (teamWeight || 1);
    }
  } else {
    player.stats.additionalTokens[type].gained += Number(amount);
  }
}

export { addCoins, step, scoreToDisplay };
