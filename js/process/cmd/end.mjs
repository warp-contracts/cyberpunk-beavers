const TOKEN_CONTRACT_ID = 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8';
const TOKEN_CONTRACT_METHOD = 'Transfer';

export function end(state, action) {
  const { walletAddress } = action;

  sendTokens(walletAddress, state.players[walletAddress].stats.coins.gained);
}

function sendTokens(recipient, qty) {
  ao.send({
    Target: TOKEN_CONTRACT_ID,
    Data: '1234',
    Action: TOKEN_CONTRACT_METHOD,
    Recipient: recipient,
    Quantity: qty.toString(),
  });
}
