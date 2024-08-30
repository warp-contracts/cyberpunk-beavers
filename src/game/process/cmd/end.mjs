import Const from '../../common/const.mjs';
const { GameTreasure } = Const;

const TOKEN_CONTRACT_ACTION = {
  [GameTreasure.cbcoin.type]: {
    transfer: 'Transfer',
  },
  [GameTreasure.trunk.type]: {
    transfer: 'Transfer',
  },
  [GameTreasure.tio.type]: {
    transfer: 'Transfer',
  },
  [GameTreasure.war.type]: {
    transfer: 'Transfer',
  },
};

export function end(state, message) {
  if (ao.env.Process.Owner !== message.Owner) {
    console.log(`Unauthorized end game attempt by`, message.Owner);
    return;
  }

  sendTokens(state);
}

export function sendTokens(state) {
  if (!state.tokensTransferred) {
    for (let player of Object.keys(state.players)) {
      const gained = state.players[player].stats.coins.gained;
      if (gained > 0) {
        const type = GameTreasure.cbcoin.type;
        const target = state.gameTokens[type].id;
        const action = TOKEN_CONTRACT_ACTION[type].transfer;
        console.log(`Transferring ${gained} ${type} to ${player}`);
        ao.send({
          Target: target,
          Data: '1234',
          Action: action,
          Recipient: player,
          Quantity: gained.toString(),
        });
      }

      for (let [type, token] of Object.entries(state.players[player].stats.additionalTokens)) {
        if (token.gained > 0) {
          const target = state.gameTokens[type].id;
          const action = TOKEN_CONTRACT_ACTION[type].transfer;
          const qty = token.gained * GameTreasure[type].baseVal;
          console.log(`Transferring ${qty} ${type}:${target} to ${player}`);
          ao.send({
            Target: target,
            Data: '1234',
            Action: action,
            Recipient: player,
            Quantity: qty.toString(),
          });
        }
      }
    }
  }
  state.tokensTransferred = true;
}
