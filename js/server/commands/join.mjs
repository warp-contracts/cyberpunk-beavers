import gameContract from "../game-contract.mjs";
import Const from "../../common/const.mjs";
import registerPlayer from "./register.mjs";

function getPlayer(id) {
    if (!id) {
        console.log(`Cannot getPlayer, id is undefined`);
    }
    const player = gameContract.state.players[id];
    if (!player) {
        console.log(`No player registered under id`, id);
        return registerPlayer();
    }
    return {
        cmd: Const.Command.registered,
        level1: gameContract.state.level1,
        level2: gameContract.state.level2,
        round: gameContract.state.round,
        player: player
    }
}

export default getPlayer;
