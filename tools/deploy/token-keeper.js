import { GameTreasure } from '../../src/game/common/const.mjs';
import { transferToken } from './deploy-spawn-common.js';

export const TOKEN_CONTRACT_MOCK = {
  [GameTreasure.cbcoin.type]: {
    id: '_ThTRfZDNAV1Y-yX2h_9PNe5oGHh4q0eRhv6Y1tRVR0',
    transfer: 'Transfer',
  },
  [GameTreasure.trunk.type]: {
    id: '2_O3UNKze6Yuy1oaNzRAGQjqbXJyd8AprlR90QFDp98',
    transfer: 'Transfer',
  },
  [GameTreasure.tio.type]: {
    id: 'h3FqYG9AVze-JFH-MQS3Rvv5golBhjnDuPDpJFEpdwE',
    transfer: 'Transfer',
  },
  [GameTreasure.war.type]: {
    id: 'Q7-XYIgAKiatIGuez3dM7eu4miqH5_USvKt6uY4bw9Y',
    transfer: 'Transfer',
  },
  [GameTreasure.rsg.type]: {
    id: 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU',
    transfer: 'Transfer',
  },
  [GameTreasure.gun.type]: {
    id: 'BzwAEjvM2XgUPBhV5l97QR6wJkfcuIXhkCewG7GNbzc',
    transfer: 'Transfer',
  },
};

export const TOKEN_CONTRACT = {
  [GameTreasure.cbcoin.type]: {
    id: 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8',
    transfer: 'Transfer',
  },
  [GameTreasure.trunk.type]: {
    id: 'wOrb8b_V8QixWyXZub48Ki5B6OIDyf_p1ngoonsaRpQ',
    transfer: 'Transfer',
  },
  [GameTreasure.tio.type]: {
    id: 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
    transfer: 'Transfer',
  },
  [GameTreasure.war.type]: {
    id: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
    transfer: 'Transfer',
  },
  [GameTreasure.rsg.type]: {
    id: 'p5OI99-BaY4QbZts266T7EDwofZqs-wVuYJmMCS0SUU',
    transfer: 'Transfer',
  },
  [GameTreasure.gun.type]: {
    id: 'O-566VlALuKNrSQBdLOgHyYIcqT0oqeattaBk2gNS70',
    transfer: 'Transfer',
  },
};

export async function handleTokenTransfers(gameProcessId, bridgeProcessId, tokensShipment, gameTokens) {
  const { runMainTransfer, runBridgeTransfers } = tokensShipment;
  if (runMainTransfer) {
    const cbcoinProcessId = gameTokens[GameTreasure.cbcoin.type].id;
    console.log(`Transferring ${GameTreasure.cbcoin.type} to game ${gameProcessId}`);
    await transferToken(cbcoinProcessId, gameProcessId, cbcoinProcessId);
  }

  if (runBridgeTransfers) {
    for (let [key, token] of Object.entries(gameTokens)
      .filter(([key]) => key !== GameTreasure.cbcoin.type)
      .filter(([key]) => key !== GameTreasure.rsg.type)
      .filter(([, token]) => token.amount > 0)) {
      const qty = token.amount * GameTreasure[key].baseVal;
      console.log(`Transferring additional ${qty} ${key} to bridge ${bridgeProcessId}`);
      await transferToken(token.id, bridgeProcessId, null, qty);
    }
  }
}

export function addTokenProcessIds(tokensShipment, gameTokens) {
  const contracts = tokensShipment.mocks ? TOKEN_CONTRACT_MOCK : TOKEN_CONTRACT;
  Object.entries(gameTokens).forEach(([k, v]) => {
    v.id = contracts[k].id;
    v.transfer = contracts[k].transfer;
  });
  return gameTokens;
}
