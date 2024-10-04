import Const, { GAME_MODES } from '../../common/const.mjs';
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
        if (state.mode === Const.GAME_MODES.ao.type) {
          const type = GameTreasure.cbcoin.type;
          const target = state.gameTokens[type].id;
          console.log(`Transferring ${gained} ${type} to ${playerWallet}`);
          ao.send({
            Target: target,
            Data: '1234',
            Action: 'Transfer',
            Recipient: playerWallet,
            Quantity: gained.toString(),
          });
        } else if (state.mode === GAME_MODES.rsg.type) {
          const type = GAME_MODES.rsg.token;
          const qty = gained * GameTreasure[type].baseVal;
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
