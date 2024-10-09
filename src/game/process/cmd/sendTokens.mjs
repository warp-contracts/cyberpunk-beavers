import Const, { GAME_MODES, TreasureLimit } from '../../common/const.mjs';
const { GameTreasure } = Const;

export function sendTokens(state) {
  if (!state.tokensTransferred) {
    const transfers = {};

    const external = {
      [GameTreasure.rsg.type]: {
        id: state.gameTokens?.[GameTreasure.rsg.type]?.id,
        recipients: {},
      },
    };

    for (let playerWallet of Object.keys(state.players)) {
      const gained = state.players[playerWallet].stats.coins.gained;
      if (gained > 0) {
        const type = GAME_MODES[state.mode].token;
        const qty = tokenValueLimit(state.mode, gained);
        console.log(`Transferring ${qty} ${type} to ${playerWallet}`);
        if (type === GameTreasure.cbcoin.type) {
          const target = state.gameTokens[type].id;
          ao.send({
            Target: target,
            Data: '1234',
            Action: 'Transfer',
            Recipient: playerWallet,
            Quantity: qty.toString(),
          });
        } else if (type === GameTreasure.rsg.type) {
          external[type].recipients[playerWallet] = `${qty}`;
          continue;
        }
      }

      for (let [type, token] of Object.entries(state.players[playerWallet].stats.additionalTokens)) {
        if (token.gained > 0) {
          const target = state.gameTokens[type].id;
          const qty = token.gained * GameTreasure[type].baseVal;
          if (!transfers[type]) {
            transfers[type] = {};
          }
          transfers[type][playerWallet] = `${qty}`;
          console.log(`Setting transfer ${qty} ${type}:${target} to ${playerWallet}`);
        }
      }
    }

    if (Object.keys(transfers).length) {
      ao.send({
        Target: state.bridgeProcessId,
        HubProcessId: state.hubProcessId,
        Data: JSON.stringify(transfers),
        Action: 'ScheduleTransfer',
        Recipient: `All`,
      });
    }

    state.tokensTransferred = true;
    return { external };
  }
}

export function tokenValueLimit(gameMode, qty) {
  const tokenType = GAME_MODES[gameMode].token;
  const tokenLimit = TreasureLimit.PerGame[gameMode]?.[tokenType]?.value;
  if (typeof tokenLimit === 'number') {
    return Math.min(qty, tokenLimit);
  }
  return qty;
}
