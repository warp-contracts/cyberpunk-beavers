import { playClick } from '../utils/mithril.js';

export function LoungeArenaSceneGui(initialVnode) {
  function showJoinButton(gameStart, walletsQueue, walletsBench, walletAddress) {
    const result =
      Date.now() < gameStart && !walletsQueue.includes(walletAddress) && !walletsBench.includes(walletAddress);

    return result;
  }

  return {
    view: function (vnode) {
      const { gameTxId, walletAddress, gameError, gameStart, gameEnd, walletsQueue, walletsBench, diff, onJoin } =
        vnode.attrs;

      return [
        m('.mithril-component', { id: 'lounge-arena' }, [
          gameError
            ? m(HeaderError, { gameError })
            : [
                m(GameInfo, { gameTxId, gameStart, gameEnd, diff, walletsQueue }),
                showJoinButton(gameStart, walletsQueue, walletsBench, walletAddress) ? m(JoinButton, { onJoin }) : null,
                m('.players-lists', [
                  m(
                    '.column',
                    walletsQueue?.length
                      ? m(PlayersList, { header: 'Waiting list', list: walletsQueue, walletAddress })
                      : null
                  ),
                  m(
                    '.column',
                    walletsBench?.length
                      ? m(PlayersList, { header: 'Waiting for next games', list: walletsBench, walletAddress })
                      : null
                  ),
                ]),
              ],
        ]),
      ];
    },
  };
}

function GameInfo() {
  function gameCountdownLabel(diff, gameStart, gameEnd) {
    const now = Date.now();
    if (gameStart && now < gameStart) {
      return `Starts In`;
    }
    if (gameStart && gameEnd && now >= gameStart && now < gameEnd) {
      return `Ends In`;
    } else {
      return null;
    }
  }

  return {
    view: function (vnode) {
      const countdownLabel = gameCountdownLabel(vnode.attrs.diff, vnode.attrs.gameStart, vnode.attrs.gameEnd);

      return m('.game-info', [
        vnode.attrs.gameTxId ? m('.element', [m('.title', 'Game Id'), m('.value', vnode.attrs.gameTxId)]) : null,
        m('.element', [m('.title', 'Players'), m('.value', vnode.attrs.walletsQueue?.length)]),
        vnode.attrs.gameStart
          ? m('.element', [m('.title', 'Game Start'), m('.value', new Date(vnode.attrs.gameStart).toLocaleString())])
          : null,
        vnode.attrs.gameEnd
          ? m('.element', [m('.title', 'Game End'), m('.value', new Date(vnode.attrs.gameEnd).toLocaleString())])
          : null,
        countdownLabel
          ? m('.element', [m('.title', countdownLabel), m('.value', formatCountdownTo(vnode.attrs.diff))])
          : null,
      ]);
    },
  };
}

function PlayersList() {
  return {
    view: function (vnode) {
      return m('.players-list', [
        m('.header', vnode.attrs.header),
        m(
          'ol',
          { class: 'list' },
          vnode.attrs.list.map((l) =>
            m('li', { class: `element ${l === vnode.attrs.walletAddress ? 'player' : ''}` }, l)
          )
        ),
      ]);
    },
  };
}

function JoinButton() {
  return {
    view: function (vnode) {
      return [
        m(
          '.button',
          {
            onclick: () => {
              playClick();
              vnode.attrs.onJoin();
            },
          },
          'Click here to join'
        ),
      ];
    },
  };
}

function HeaderError() {
  return {
    view: function (vnode) {
      return [m('.header error', `Cannot join the game.\n${vnode.gameError}\n\n`)];
    },
  };
}

export function formatCountdownTo(diff) {
  if (!diff) {
    return '--:--:--';
  }
  const hour = Math.floor(diff / 3600);
  diff -= hour * 3600;
  const min = Math.floor(diff / 60);
  const sec = diff - min * 60;
  const padZero = (x) => x.toString().padStart(2, '0');
  return `${padZero(hour)}:${padZero(min)}:${padZero(sec)}`;
}
