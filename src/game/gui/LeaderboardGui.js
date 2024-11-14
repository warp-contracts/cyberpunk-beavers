import { GAME_MODES } from '../common/const.mjs';
import { playClick } from '../utils/mithril.js';
import { trimString } from '../utils/utils.js';
import m from 'mithril';

export function LeaderboardGui(initialVnode) {
  return {
    view: function (vnode) {
      const { tokenTypes, data, back, teams } = vnode.attrs;
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
              teams && m('.col wide', 'team'),
              m('.col', 'points'),
              m('.col', GAME_MODES[warpAO.config.mode].token),
              tokenTypes && tokenTypes.map((t) => m('.col', `${t}`)),
              m('.col', 'frags'),
              m('.col', 'deaths'),
            ]),
            data.map(([index, player, points, coins, tokens, frags, deaths]) => {
              return m(
                '.row',
                {
                  style: {
                    color: player.team?.color || 'white',
                  },
                },
                [
                  m('.col', index),
                  m(`.col portrait ${player.img}`, player.name),
                  teams && m('.col wide', trimString(player.team?.name, 9, 3, 0)),
                  m('.col', points),
                  m('.col', coins),
                  tokens && tokens.map((t) => m('.col', t)),
                  m('.col', frags),
                  m('.col', deaths),
                ]
              );
            }),
          ]),
        ]),
      ];
    },
  };
}
