import { GlobalScore as PlayerGlobalScore } from './GlobalScore.js';
import { GAME_MODES, GameTreasure } from '../../common/const.mjs';
import { playClick } from '../../utils/mithril.js';
import { displayName, formatToken } from '../../utils/utils.js';
import m from 'mithril';

export function GlobalLeaderboardGui() {
  let currentPage = 1;
  let lastPage = 1;
  const leadingToken = GAME_MODES[warpAO.config.mode].token;
  const displayAddToken = warpAO.config.aoMode;
  let orderBy = leadingToken;

  return {
    oninit: function (vnode) {
      const { leaderboardProcessId, walletAddress } = vnode.attrs;
      return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage, orderBy);
    },
    view: function (vnode) {
      const { walletAddress, leaderboardProcessId, back } = vnode.attrs;
      const loadScores = (newOrder) => {
        orderBy = newOrder;
        return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage, newOrder);
      };
      return m('.mithril-component', { id: 'global-leaderboard' }, [
        m(
          '.top.button',
          {
            onclick: () => {
              playClick();
              back();
            },
          },
          '< Back'
        ),
        m('.title', 'hall of fame'),
        m('.table-wrapper', [
          m('.row header', [
            m('.col', 'rank'),
            m('.col', 'player'),
            m(ColumnHeader, {
              name: leadingToken,
              activeOrder: orderBy,
              loadScores,
            }),
            m(ColumnHeader, {
              name: 'frags',
              activeOrder: orderBy,
              loadScores,
            }),
            displayAddToken
              ? m(ColumnHeader, {
                  name: GameTreasure.war.type,
                  activeOrder: orderBy,
                  loadScores,
                })
              : null,
            displayAddToken
              ? m(ColumnHeader, {
                  name: GameTreasure.trunk.type,
                  activeOrder: orderBy,
                  loadScores,
                })
              : null,
            displayAddToken
              ? m(ColumnHeader, {
                  name: GameTreasure.tio.type,
                  activeOrder: orderBy,
                  loadScores,
                })
              : null,
            m(ColumnHeader, {
              name: 'deaths',
              activeOrder: orderBy,
              loadScores,
            }),
          ]),
          m(
            '.user-list',
            PlayerGlobalScore.list.map(
              ({ rowNum, rowTotal, wallet, userName, [leadingToken]: coins, war, trunk, tio, frags, deaths }) => {
                const ownerClass = walletAddress === wallet ? '.owner' : '';
                lastPage = Math.ceil(rowTotal / PlayerGlobalScore.limit);
                return m(`.row${ownerClass}`, [
                  m('.col', rowNum),
                  m('.col', displayName(userName, wallet)),
                  m('.col', coins),
                  m('.col', frags),
                  displayAddToken ? m('.col', formatToken(war, GameTreasure.war.type)) : null,
                  displayAddToken ? m('.col', formatToken(trunk, GameTreasure.trunk.type)) : null,
                  displayAddToken ? m('.col', formatToken(tio, GameTreasure.tio.type)) : null,
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
                    return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage, orderBy);
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
                    return PlayerGlobalScore.loadList(leaderboardProcessId, walletAddress, currentPage, orderBy);
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

function ColumnHeader() {
  return {
    view: function (vnode) {
      const { name, activeOrder, loadScores } = vnode.attrs;

      return m(
        '.col',
        {
          onclick: () => {
            loadScores(name);
          },
        },
        [m('.label', name), name === activeOrder ? m('.arrow-down', '>') : null]
      );
    },
  };
}
