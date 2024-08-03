import Const from '../common/const.mjs';

export function handle(state, message) {
  console.log('-- Game Hub, message from ', message.Owner);

  const actionTagValue = message.Tags?.find((t) => t.name === 'Action')?.value;
  const gameProcess = message.Tags?.find((t) => t.name === 'From-Process')?.value;
  const module = message.Tags?.find((t) => t.name === 'From-Module')?.value;
  const action = JSON.parse(actionTagValue || '{}');
  action.walletAddress = message.Owner;
  console.log('-- Game Hub process', state.games, action.walletAddress, action.cmd, gameProcess, module);
  if (!state.games) {
    state.games = {};
    console.log(`-- Game Hub - assigned games `, state.games);
  }

  switch (action.cmd) {
    case Const.Command.hubInfo:
      console.log(`-- Game Hub - hubInfo`, state.games);
      ao.result({
        cmd: Const.Command.hubStats,
        games: state.games,
      });
      break;

    case Const.Command.hubRegisterGame:
      state.games[gameProcess] = {
        module,
        ...action.game,
      };
      console.log(`-- HUB registered game`, state.games[gameProcess]);
      break;

    case Const.Command.hubGamePlayers:
      console.log(`-- HUB updating players`, action);
      state.games[gameProcess].players = action.players;
      break;

    default:
      console.log(`-- HUB action no found`, action.cmd);
      throw new ProcessError(`Hub Unknown action: ${action.cmd}`);
  }

  console.log(`-- Game Hub state`, state);
}
