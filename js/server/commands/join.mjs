import gameContract from '../game-contract.mjs'
import Const from '../../common/const.mjs'

function getPlayer(walletAddress) {
  if (!walletAddress) {
    console.log(`Cannot getPlayer, walletAddress is undefined`);
    return {
      cmd: Const.Command.registered,
      error: Const.Errors.invalidWallet
    }
  }
  const player = gameContract.state.players[walletAddress]
  if (!player) {
    console.log(`No player registered under wallet`, walletAddress);
    return {
      cmd: Const.Command.registered,
      error: Const.Errors.notRegistered
    }
  }
  return {
    cmd: Const.Command.registered,
    groundTilemap: gameContract.state.groundTilemap,
    gameObjectsTilemap: gameContract.state.gameObjectsTilemap,
    round: gameContract.state.round,
    player: player,
  }
}

export default getPlayer
