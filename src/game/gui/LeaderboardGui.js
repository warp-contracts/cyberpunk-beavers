import { playClick } from '../utils/mithril.js';

export function LeaderboardGui(initialVnode) {
  return {
    view: function (vnode) {
      const { data, back } = vnode.attrs;
      console.log(data);
      return [
        m('div', { id: 'leaderboard', class: 'mithril-component' }, [
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
              m('.col', 'cbcoins'),
              m('.col', 'frags'),
              m('.col', 'deaths'),
            ]),
            data.map(([index, player, points, cbcoins, frags, deaths]) => {
              return m('.row', [
                m('.col', index),
                m(`.col portrait ${player.img}`, player.name),
                m('.col', points),
                m('.col', cbcoins),
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
