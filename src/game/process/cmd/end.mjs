import Const from '../../common/const.mjs';
const { GameTreasure } = Const;

export function end(state, message) {
  if (ao.env.Process.Owner !== message.Owner) {
    console.log(`Unauthorized end game attempt by`, message.Owner);
    return;
  }

  sendTokens(state);
}

export function sendTokens(state) {
  if (!state.tokensTransferred) {
    const transfers = {
      [GameTreasure.war.type]: {},
      [GameTreasure.tio.type]: {},
      [GameTreasure.trunk.type]: {},
    };

    for (let playerWallet of Object.keys(state.players)) {
      const gained = state.players[playerWallet].stats.coins.gained;
      if (gained > 0) {
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
      }

      for (let [type, token] of Object.entries(state.players[playerWallet].stats.additionalTokens)) {
        if (token.gained > 0) {
          const target = state.bridgeProcessId;
          const qty = token.gained * GameTreasure[type].baseVal;
          transfers[type][playerWallet] = `${qty}`;
          console.log(`Setting transfer ${qty} ${type}:${target} to ${playerWallet}`);
        }
      }
    }

    ao.send({
      Target: state.bridgeProcessId,
      HubProcessId: state.hubProcessId,
      Data: JSON.stringify(transfers),
      Action: 'ScheduleTransfer',
      Recipient: `All`,
    });
  }
  state.tokensTransferred = true;
}
