import { GAME_MODES } from '../common/const.mjs';
import { playClick } from '../utils/mithril.js';

export function LeaderboardGui(initialVnode) {
  return {
    view: function (vnode) {
      const { tokenTypes, data, back } = vnode.attrs;
      console.log(data);
      return [
        m('.mithril-component', { id: 'leaderboard' }, [
          m(
            '.button',
            {
              onclick: () => {
                playClick();
                back();
              },
            },
            '< Back'
          ),
          m('.title', 'top beavers'),
          m('.table-wrapper', [
            m('.row header', [
              m('.col', 'rank'),
              m('.col', 'player'),
              m('.col', 'points'),
              m('.col', GAME_MODES[warpAO.config.mode].token),
              tokenTypes && tokenTypes.map((t) => m('.col', `${t}`)),
              m('.col', 'frags'),
              m('.col', 'deaths'),
            ]),
            data.map(([index, player, points, coins, tokens, frags, deaths]) => {
              return m('.row', [
                m('.col', index),
                m(`.col portrait ${player.img}`, player.name),
                m('.col', points),
                m('.col', coins),
                tokens && tokens.map((t) => m('.col', t)),
                m('.col', frags),
                m('.col', deaths),
              ]);
            }),
          ]),
        ]),
      ];
    },
  };
}
