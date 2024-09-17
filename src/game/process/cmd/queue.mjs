import Const from '../../common/const.mjs';

export function checkWhitelist(state, walletAddress) {
  const { walletsWhitelist } = state;
  if (walletsWhitelist.length && !walletsWhitelist.find((w) => w.toLowerCase() == walletAddress.toLowerCase())) {
    const error = `Developers' Internal testing session - ${walletAddress} wallet is not on the whitelist.`;
    console.log(error);
    return { player: { walletAddress, error } };
  }
  return {};
}

export function standInQueue(state, action) {
  const walletAddress = action.mainWalletAddress || action.walletAddress;
  const { walletsQueue } = state;

  if (checkWhitelist(state, walletAddress)?.player?.error) {
    return;
  }

  if (walletsQueue.length < state.playersLimit && !walletsQueue.includes(walletAddress)) {
    walletsQueue.push(walletAddress);
    sendHubNotification(state);
  }
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
