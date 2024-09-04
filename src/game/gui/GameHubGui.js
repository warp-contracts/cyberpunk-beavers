import { trimString } from '../utils/utils.js';
import { playClick } from '../utils/mithril.js';

export function GameHubGui() {
  return {
    view: function (vnode) {
      const { games, gameError, joinGame, spectateGame } = vnode.attrs;
      return [
        m('.mithril-component', { id: 'game-hub' }, [
          m(Header, { gameError }),
          vnode.attrs.games ? m(GamesList, { games, joinGame, spectateGame }) : null,
        ]),
      ];
    },
  };
}

function Header() {
  return {
    view: function (vnode) {
      return [m('.header', `${vnode.attrs.gameError ? 'Games are currently unavailable.' : 'Games:'}`)];
    },
  };
}

function GamesList() {
  function generateLabel(processId, game, index) {
    const i = index + 1;
    let label = `${i}. ${trimString(processId, 5, 2, 4)}`;
    let isActive = false;
    let isFinished = false;
    if (game.walletsQueue && game.playersLimit) {
      label += `\nPlayers: ${game.walletsQueue.length}/${game.playersLimit}`;
    }
    if (game.playWindow) {
      if (game.playWindow.begin && game.playWindow.begin > Date.now()) {
        label += `\nStart at: ${new Date(game.playWindow.begin).toLocaleString()}`;
      } else if (game.playWindow.end && game.playWindow.end < Date.now()) {
        label += `\nFinished at: ${new Date(game.playWindow.end).toLocaleString()}`;
        isFinished = true;
      } else {
        isActive = true;
        const termination = game.playWindow.end ? `until ${new Date(game.playWindow.end).toLocaleString()}` : '';
        label += `\nActive ${termination}`;
      }
    }

    return { label, isActive, isFinished };
  }

  return {
    view: function (vnode) {
      return m('.games-list', [
        m(
          '.list',
          vnode.attrs.games.map(([processId, game], index) => {
            const { label, isActive, isFinished } = generateLabel(processId, game, index);
            return m(
              `.element ${isActive ? 'active' : ''} ${isFinished ? 'finished' : ''}`,
              {
                onclick: async () => {
                  playClick();
                  window.warpAO.spectatorMode = false;
                  await vnode.attrs.joinGame(processId, game);
                },
              },
              [
                label,
                isActive
                  ? m(
                      '.spectate',
                      {
                        onclick: async (event) => {
                          event.stopImmediatePropagation();
                          console.log('=== spectate mode clicked');
                          await vnode.attrs.spectateGame(processId, game);
                        },
                      },
                      'Spectate'
                    )
                  : '',
              ]
            );
          })
        ),
      ]);
    },
  };
}
