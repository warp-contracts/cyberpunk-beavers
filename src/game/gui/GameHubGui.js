import { trimString } from '../utils/utils.js';
import { playClick } from '../utils/mithril.js';

export function GameHubGui(initialVnode) {
  return {
    view: function (vnode) {
      const { games, gameError, joinGame } = vnode.attrs;
      return [
        m('div', { id: 'game-hub', class: 'mithril-component' }, [
          m(Header, { gameError }),
          vnode.attrs.games ? m(GamesList, { games, joinGame }) : null,
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
    if (game.walletsQueue && game.playersLimit) {
      label += `\nPlayers: ${game.walletsQueue.length}/${game.playersLimit}`;
    }
    if (game.playWindow) {
      if (game.playWindow.begin && game.playWindow.begin > Date.now()) {
        label += `\nStart at: ${new Date(game.playWindow.begin).toLocaleString()}`;
      } else if (game.playWindow.end && game.playWindow.end < Date.now()) {
        label += `\nFinished at: ${new Date(game.playWindow.end).toLocaleString()}`;
      } else {
        isActive = true;
        const termination = game.playWindow.end ? `until ${new Date(game.playWindow.end).toLocaleString()}` : '';
        label += `\nActive ${termination}`;
      }
    }

    return { label, isActive };
  }

  return {
    view: function (vnode) {
      console.log(vnode.attrs.games);

      return m('.games-list', [
        m(
          '.list',
          vnode.attrs.games.map(([processId, game], index) => {
            const { label, isActive } = generateLabel(processId, game, index);
            return m(
              `.element ${isActive ? 'active' : ''}`,
              {
                onclick: async () => {
                  playClick();
                  await vnode.attrs.joinGame(processId, game);
                },
              },
              label
            );
          })
        ),
      ]);
    },
  };
}
