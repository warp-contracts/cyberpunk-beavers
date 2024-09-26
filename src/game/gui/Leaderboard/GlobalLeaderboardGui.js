import { GlobalScore as PlayerGlobalScore } from './GlobalScore.js';
import { GAME_MODES, GameTreasure } from '../../common/const.mjs';
import { playClick } from '../../utils/mithril.js';
import { displayName, formatCoin, formatToken, trimString } from '../../utils/utils.js';

export function GlobalLeaderboardGui() {
  let currentPage = 1;
  let lastPage = 1;
  return {
    oninit: function (vnode) {
      const { leaderboardProcessId, walletAddress } = vnode.attrs;
      return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage);
    },
    view: function (vnode) {
      const { walletAddress, leaderboardProcessId, back } = vnode.attrs;
      return m('.mithril-component', { id: 'global-leaderboard' }, [
        m('.top', [
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
        ]),
        m('.title', 'hall of fame'),
        m('.table-wrapper', [
          m('.row header', [
            m('.col', 'rank'),
            m('.col', 'player'),
            m('.col', 'cbcoin'),
            m('.col', 'frags'),
            m('.col', 'war'),
            m('.col', 'trunk'),
            m('.col', 'tio'),
            m('.col', 'deaths'),
          ]),
          m(
            '.user-list',
            PlayerGlobalScore.list.map(
              ({ rowNum, rowTotal, wallet, userName, cbcoin, war, trunk, tio, frags, deaths }) => {
                const ownerClass = walletAddress === wallet ? '.owner' : '';
                lastPage = Math.ceil(rowTotal / PlayerGlobalScore.limit);
                return m(`.row${ownerClass}`, [
                  m('.col', rowNum),
                  m('.col', displayName(userName, wallet)),
                  m('.col', cbcoin),
                  m('.col', frags),
                  m('.col', formatToken(war, GameTreasure.war.type)),
                  m('.col', formatToken(trunk, GameTreasure.trunk.type)),
                  m('.col', formatToken(tio, GameTreasure.tio.type)),
                  m('.col', deaths),
                ]);
              }
            )
          ),
        ]),
        m('.paging', [
          currentPage > 1
            ? m(
                '.button',
                {
                  onclick: () => {
                    playClick();
                    currentPage -= 1;
                    if (currentPage < 1) currentPage = 1;
                    return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage);
                  },
                },
                ' < '
              )
            : m('.button.inactive', '< '),
          m('.current', `Page ${currentPage}/${lastPage}`),
          currentPage < lastPage
            ? m(
                '.button',
                {
                  onclick: () => {
                    playClick();
                    currentPage += 1;
                    if (currentPage > lastPage) currentPage = lastPage;
                    return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage);
                  },
                },
                ' > '
              )
            : m('.button.inactive', '> '),
        ]),
      ]);
    },
  };
}
