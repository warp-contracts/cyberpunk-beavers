import { formatCoin, trimString } from '../../../utils/utils';
import Const, { GAME_MODES } from '../../../common/const.mjs';
import m from 'mithril';

const { GameTreasure } = Const;

export function PlayerInfo() {
  return {
    view: function (vnode) {
      const { playersTotal, mainPlayer, gameTokens, visible, teams } = vnode.attrs;
      const { userName, walletAddress, beaverChoice, stats } = mainPlayer;
      const processId = window.warpAO.processId();
      const tokenProcessId = gameTokens[GAME_MODES[warpAO.config.mode].token]?.id;
      return m('.player-info', [
        m(`.stats-main ${visible && 'extended'}`, [
          m('img', {
            src: `assets/images/beavers/${beaverChoice}/${beaverChoice}_portrait.png`,
            width: 72,
            height: 72,
          }),
          m('.stats-labels', [
            m(Label, {
              name: 'player',
              content: displayName({ userName, walletAddress }),
              style: `pl-0 ${mainPlayer?.team ? 'mt-5' : ''}`,
              inlineStyle: `pr-10`,
            }),
            m(Label, {
              name: 'process',
              content: m(
                'a',
                { target: '__blank', href: `https://www.ao.link/#/entity/${processId}` },
                `${trimString(processId)}`
              ),
              style: 'mt-10 pl-0',
              inlineStyle: `pr-10`,
            }),
            m(Label, {
              name: 'gained',
              content: mainPlayer?.stats?.coins.gained,
              style: `mt-10 pl-10`,
              inlineStyle: `pr-10`,
            }),
            m(Label, {
              name: 'beavers',
              content: `${playersTotal || 0}`,
              style: `mt-10 pl-0 ${mainPlayer?.team ? '' : 'mb-5'}`,
              inlineStyle: `pr-10 w-170 text-right`,
            }),
            mainPlayer?.team &&
              m(Label, {
                name: 'team',
                content: mainPlayer?.team?.name,
                style: 'mt-10 pl-0 mb-5',
                inlineStyle: `pr-10 w-170 text-right`,
              }),
          ]),
        ]),
        visible &&
          m('.stats-container', [
            teams &&
              teams.map((t) =>
                m(Label, {
                  name: t.name,
                  content: t.players.length,
                  style: `pl-0`,
                  overrideStyle: {
                    color: t.color,
                    backgroundColor: 'black',
                    padding: '3px 0 3px 3px',
                    marginRight: '11px',
                  },
                })
              ),
            m(Label, {
              name: 'frags/deaths',
              content: `${stats?.kills.frags}/${stats?.kills.deaths}`,
              style: `mt-10 pl-0`,
              inlineStyle: `pr-10`,
            }),
            m(Label, {
              name: GAME_MODES[warpAO.config.mode].token,
              content: m(
                'a',
                { target: '__blank', href: `https://www.ao.link/#/token/${tokenProcessId}` },
                `${trimString(tokenProcessId)}`
              ),
              style: `mt-10 pl-0`,
              inlineStyle: `pr-10`,
            }),
            m(Label, {
              name: 'owned',
              content: stats?.coins.balance,
              style: `mt-5 pl-15`,
              inlineStyle: `pr-10`,
            }),
            m(Label, {
              name: 'gained',
              content: stats?.coins.gained,
              style: `mt-5 pl-15`,
              inlineStyle: `pr-10`,
            }),
            Object.entries(stats?.additionalTokens || {}).map(([name, info]) => [
              m(Label, {
                name: `${GameTreasure[name]?.label}`,
                content: m(
                  'a',
                  { target: '__blank', href: `https://www.ao.link/#/token/${gameTokens[name]?.id || '-'}` },
                  `${trimString(gameTokens[name]?.id)}`
                ),
                style: `mt-10 pl-0`,
                inlineStyle: `pr-10`,
              }),
              m(Label, {
                name: 'treasures',
                content: `${info.gained}/${gameTokens[name]?.amount || '-'}`,
                style: `mt-5 pl-15`,
                inlineStyle: `pr-10`,
              }),
              m(Label, {
                name: 'gained',
                content: `${formatCoin(info.gained, name) || '-'}`,
                style: `mt-5 pl-15`,
                inlineStyle: `pr-10`,
              }),
            ]),
          ]),
      ]);
    },
  };
}

export function SpectatorStats() {
  return {
    view: function (vnode) {
      const { gameTokens } = vnode.attrs;
      const processId = window.warpAO.processId();

      return m('.stats', [
        m('.stats-container', [
          m('.stats-main', [
            m('.stats-labels', [
              m(Label, {
                name: 'process',
                content: m(
                  'a',
                  { target: '__blank', href: `https://www.ao.link/#/entity/${processId}` },
                  `${trimString(processId)}`
                ),
                style: 'mt-10 pl-0',
                inlineStyle: `pr-10`,
              }),
              Object.entries(gameTokens || {}).map(([name, info]) => [
                m(Label, {
                  name: `${GameTreasure[name]?.label}`,
                  content: m(
                    'a',
                    { target: '__blank', href: `https://www.ao.link/#/token/${gameTokens[name]?.id || '-'}` },
                    `${trimString(gameTokens[name]?.id)}`
                  ),
                  style: `mt-10 pl-0`,
                  inlineStyle: `pr-10`,
                }),
                m(Label, {
                  name: 'treasures',
                  content: `${gameTokens[name]?.amount || '-'}`,
                  style: `mt-5 pl-15`,
                  inlineStyle: `pr-10`,
                }),
              ]),
            ]),
          ]),
        ]),
      ]);
    },
  };
}

function Label() {
  return {
    view: function (vnode) {
      const { style, name, content, inlineStyle, overrideStyle } = vnode.attrs;
      return m(`.label ${style}`, overrideStyle && { style: overrideStyle }, [
        m('div', name),
        m('.label-container', [m(`.label-element ${inlineStyle}`, content)]),
      ]);
    },
  };
}

function displayName(player) {
  if (player.userName) {
    if (player.userName.length > 11) {
      return trimString(player.userName, 4, 3, 4);
    }
    return player.userName;
  }
  if (player.walletAddress) {
    return trimString(player.walletAddress);
  }
  return '';
}
