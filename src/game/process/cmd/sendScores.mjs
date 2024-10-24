import Const, { GAME_MODES, GAMEPLAY_MODES, PRIZES } from '../../common/const.mjs';
import { tokenValueLimit } from './sendTokens.mjs';
const { GameTreasure } = Const;

export function sendScores(state) {
  if (!state.scoresSent) {
    if (state.gameplayMode === GAMEPLAY_MODES.battleRoyale) {
      const totalPrize = state.gameplayPrizes || 0;
      console.log('Total prize for BR mode', totalPrize);
      if (totalPrize > 0) {
        const playersAlive = Object.values(state.players).filter((p) => p.stats.hp.current > 0);
        if (playersAlive.length > 0) {
          const singlePrize = Math.floor(totalPrize / playersAlive.length);
          console.log('Single prize for BR mode', totalPrize);
          for (const player of playersAlive) {
            player.stats.coins.gained += singlePrize;
          }
        }
      }
    }
    const gameScores = {};

    for (let [wallet, data] of Object.entries(state.players)) {
      let gained = state.players[wallet].stats.coins.gained;
      gained = tokenValueLimit(state.mode, gained);
      state.players[wallet].stats.coins.gained = gained;

      const { frags, deaths } = data.stats.kills;
      gameScores[wallet] = {
        userName: data.userName,
        tokens: {
          [GAME_MODES[state.mode].token]: gained,
        },
        kills: {
          frags,
          deaths,
        },
      };

      for (let [type, token] of Object.entries(data.stats.additionalTokens)) {
        if (token.gained > 0) {
          const qty = token.gained * GameTreasure[type].baseVal;
          gameScores[wallet].tokens[type] = qty;
        }
      }
    }

    console.log(`Attempting to send game scores`, gameScores);
    ao.send({
      Target: state.leaderboardProcessId,
      HubProcessId: state.hubProcessId,
      Data: JSON.stringify(gameScores),
      Action: 'AddGameScores',
    });
  } else {
    console.log(`Games scores already sent`);
  }
  state.scoresSent = true;
}
