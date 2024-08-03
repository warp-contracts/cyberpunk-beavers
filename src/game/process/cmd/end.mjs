const TOKEN_CONTRACT_ID = 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8';
const TOKEN_CONTRACT_METHOD = 'Transfer';

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
        ao.send({
          Target: TOKEN_CONTRACT_ID,
          Data: '1234',
          Action: TOKEN_CONTRACT_METHOD,
          Recipient: player,
          Quantity: gained.toString(),
        });
      }
    }
  }
  state.tokensTransferred = true;
}
