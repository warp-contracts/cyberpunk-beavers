import { trimString } from '../../../utils/utils';
import Const from '../../../common/const.mjs';
const { GameTreasure } = Const;

export function Stats() {
  return {
    view: function (vnode) {
      const { stats, userName, walletAddress, beaverChoice } = vnode.attrs.mainPlayer;
      const { playersTotal, gameTokens } = vnode.attrs;
      const processId = window.warpAO.processId();
      const tokenProcessId = gameTokens[GameTreasure.cbcoin.type]?.id;
      return m('.stats', [
        m('.stats-container', [
          m('.stats-main', [
            m('img', {
              src: `assets/images/beavers/${beaverChoice}/${beaverChoice}_portrait.png`,
              width: 72,
              height: 72,
            }),
            m('.stats-empty'),
            m('.stats-labels', [
              m(Label, {
                name: 'player',
                content: displayName({ userName, walletAddress }),
                style: `mt-18 pl-0`,
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
                name: 'lag',
                content: formatLag(window.warpAO.lag),
                style: 'mt-10 pl-0',
                inlineStyle: `pr-10 w-170 text-right`,
              }),
            ]),
          ]),
          m(Label, {
            name: 'frags/deaths',
            content: `${stats?.kills.frags}/${stats?.kills.deaths}`,
            style: `mt-10 pl-0`,
            inlineStyle: `pr-10`,
          }),
          m(Label, {
            name: 'cbcoins',
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
              content: `${Math.round(info.gained * GameTreasure[name]?.baseVal) || '-'}`,
              style: `mt-5 pl-15`,
              inlineStyle: `pr-10`,
            }),
          ]),
          m('div', [m('.stats-other-beavers', `OTHER BEAVERS`, m('span', `(${playersTotal - 1 || 0})`))]),
        ]),
      ]);
    },
  };
}

function Label() {
  return {
    view: function (vnode) {
      const { style, name, content, inlineStyle } = vnode.attrs;
      return m(`.label ${style}`, [
        m('div', name),
        m('.label-container', [m(`.label-element ${inlineStyle}`, content)]),
      ]);
    },
  };
}

function displayName(player) {
  if (player.userName) {
    if (player.userName.length > 11) {
      trimString(player.userName, 4, 3, 4);
    }
    return player.userName;
  }
  if (player.walletAddress) {
    return trimString(player.walletAddress);
  }
  return '';
}

function formatLag(lag) {
  return lag ? `${lag.total}(${lag.cuCalc})ms` : 'N/A';
}
