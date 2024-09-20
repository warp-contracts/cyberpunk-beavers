import Const, { GAME_MODES } from '../../common/const.mjs';
const { GameTreasure } = Const;

export function sendScores(state) {
  if (!state.scoresSent) {
    const gameScores = {};

    for (let [wallet, data] of Object.entries(state.players)) {
      let gained = state.players[wallet].stats.coins.gained;
      if (state.mode === GAME_MODES.rsg.type) {
        gained = gained * GameTreasure[GAME_MODES.rsg.token].baseVal;
      }
      const { frags, deaths } = data.stats.kills;
      gameScores[wallet] = {
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
          gameScores[wallet].tokens[type] = `${qty}`;
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
