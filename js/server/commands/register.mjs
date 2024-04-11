import Const from '../../common/const.mjs'
import gameContract from '../game-contract.mjs'

function registerPlayer() {
  return {
    cmd: Const.Command.registered,
    groundTilemap: gameContract.state.groundTilemap,
    gameObjectsTilemap: gameContract.state.gameObjectsTilemap,
    round: gameContract.state.round,
    player: gameContract.registerPlayer(
      getRandomNumber(0, gameContract.names.length - 1)
    ),
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default registerPlayer
