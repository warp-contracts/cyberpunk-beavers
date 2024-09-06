import Const from '../../common/const.mjs';

/*
 * walletsQueue will join the game
 * */
export function standInQueue(state, action) {
  const { walletAddress } = action;
  const { walletsQueue, walletsWhitelist } = state;

  if (walletsWhitelist.length && !walletsWhitelist.includes(walletAddress)) {
    const error = `Developers' Internal testing session - ${action.walletAddress} wallet is not on the whitelist.`;
    console.log(error);
    return { player: { walletAddress, error } };
  }

  if (walletsQueue.includes(walletAddress)) {
    return { walletsQueue };
  }

  if (walletsQueue.length < state.playersLimit) {
    walletsQueue.push(walletAddress);
    sendHubNotification(state);
  }
  return { walletsQueue };
}

export function activate(state) {
  if (!state.activated) {
    const { walletsQueue, players } = state;
    const walletsDequeued = walletsQueue.filter((w) => players.hasOwnProperty(w));
    state.walletsQueue = walletsDequeued;
    sendHubNotification(state);
    state.activated = true;
  }
}

function sendHubNotification(state) {
  console.log(`---- GAME -- updating wallets queue`, state.hubProcessId);
  ao.send({
    Target: state.hubProcessId,
    Data: '1234',
    Action: JSON.stringify({
      cmd: Const.Command.hubGamePlayers,
      walletsQueue: state.walletsQueue,
    }),
  });
}
