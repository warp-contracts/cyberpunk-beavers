import Const from '../common/const.mjs';

export function handle(state, message) {
  console.log('-- Game Hub, message from ', message.Owner);

  const actionTagValue = message.Tags?.find((t) => t.name === 'Action')?.value;
  const gameProcess = message.Tags?.find((t) => t.name === 'From-Process')?.value;
  const module = message.Tags?.find((t) => t.name === 'From-Module')?.value;
  const action = JSON.parse(actionTagValue || '{}');
  action.walletAddress = message.Owner;
  console.log(`-- Game Hub process, action ${action.cmd} from ${message.Owner}`);
  if (!state.games) {
    state.games = {};
    state.removedGames = {};
  }

  switch (action.cmd) {
    case Const.Command.hubInfo:
      // console.log(`-- Game Hub - hubInfo`, state.games);
      ao.result({
        cmd: Const.Command.hubStats,
        games: state.games,
        removedGames: state.removedGames,
      });
      break;

    case Const.Command.hubRemoveGame:
      if (ao.env.Process.Owner !== message.Owner) {
        console.log(`-- HUB Unauthorized ${Const.Command.hubRemoveGame} attempt by`, message.Owner);
        ao.result({
          cmd: Const.Command.hubRemovedGame,
          error: `Unauthorized ${message.Owner}`,
        });
        return;
      }
      const gameProcessId = 'gameId';
      const toBeRemovedId = action[gameProcessId];
      if (toBeRemovedId) {
        if (!state.games[toBeRemovedId]) {
          console.log(`-- HUB game ${toBeRemovedId} not found`);
          ao.result({
            cmd: Const.Command.hubRemovedGame,
            error: `Process Id not found ${toBeRemovedId}`,
          });
        } else {
          const moduleId = state.games[toBeRemovedId].module;
          state.removedGames[toBeRemovedId] = state.games[toBeRemovedId];
          delete state.games[toBeRemovedId];
          ao.result({
            cmd: Const.Command.hubRemovedGame,
            processId: toBeRemovedId,
            moduleId,
          });
          console.log(`-- HUB removed game ${toBeRemovedId}`);
          return;
        }
      } else {
        console.log(`-- HUB missing argument '${gameProcessId}'`);
        ao.result({
          cmd: Const.Command.hubRemovedGame,
          error: `Missing argument '${gameProcessId}'`,
        });
      }
      break;

    case Const.Command.hubRegisterGame:
      state.games[gameProcess] = {
        module,
        ...action.game,
      };
      // console.log(`-- HUB registered game`, state.games[gameProcess]);
      ao.result({
        cmd: Const.Command.hubStats,
        games: state.games,
      });
      break;

    case Const.Command.hubGamePlayers:
      console.log(`-- HUB updating players`, action);
      state.games[gameProcess].walletsQueue = action.walletsQueue;
      ao.result({
        cmd: Const.Command.hubStats,
        games: state.games,
      });
      break;

    default:
      console.log(`-- HUB action no found`, action.cmd);
      throw new ProcessError(`Hub Unknown action: ${action.cmd}`);
  }

  //console.log(`-- Game Hub state`, state);
}
