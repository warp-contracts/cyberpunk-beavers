import Const from '../../common/const.mjs'
import gameContract from '../game-contract.mjs'

function registerPlayer(walletAddress, beaverId) {
    return {
        cmd: Const.Command.registered,
        groundTilemap: gameContract.state.groundTilemap,
        gameObjectsTilemap: gameContract.state.gameObjectsTilemap,
        round: gameContract.state.round,
        player: gameContract.registerPlayer(walletAddress, beaverId)
    }
}

export default registerPlayer
