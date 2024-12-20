import { playClick } from '../utils/mithril.js';
import { GAMEPLAY_MODE_LABEL } from '../common/const.mjs';
import m from 'mithril';

export function LoungeArenaSceneGui(initialVnode) {
  function showJoinButton(gameStart, walletsQueue, walletAddress) {
    const result = Date.now() < gameStart && !walletsQueue.includes(walletAddress);

    return result;
  }

  return {
    view: function (vnode) {
      const {
        gameTxId,
        walletAddress,
        playerError,
        gameStart,
        gameEnd,
        walletsQueue,
        diff,
        onJoin,
        playersLimit,
        onBack,
        gameplayMode,
      } = vnode.attrs;
      const disabled = walletsQueue && Object.keys(walletsQueue).length >= playersLimit;
      return [
        m('.mithril-component', { id: 'lounge-arena' }, [
          playerError
            ? m(HeaderError, { playerError })
            : [
                m(GameInfo, { gameTxId, gameStart, gameEnd, diff, walletsQueue, gameplayMode }),
                showJoinButton(gameStart, walletsQueue, walletAddress) ? m(JoinButton, { onJoin, disabled }) : null,
                m(
                  '.button back',
                  {
                    onclick: () => {
                      playClick();
                      onBack();
                    },
                  },
                  '< Back'
                ),
                m(
                  '.element',
                  {
                    style: {
                      marginTop: '40px',
                    },
                  },
                  `By the way...`
                ),
                m(
                  '.button join',
                  {
                    onclick: () => {
                      playClick();
                      window.open(
                        'https://bazar.arweave.net/#/collection/iLqXKTX1cwANalufrIU01CO3B-IG2Ht6uWvit5tR0Dk',
                        '_blank'
                      );
                    },
                  },
                  'Cyberbeavers ($DAM) Collection'
                ),
                m(
                  '.info',
                  {
                    style: {
                      marginBottom: '40px',
                    },
                  },
                  [m('', 'NFT Wave 1. 23.12.25'), m('', '44 NFTs, 0,5 AR, listing 16.00-17.00 UTC')]
                ),
                m(
                  '.info',
                  `If the list is full, please wait 30s after the game starts. 
                  Spots will be freed if players from the list won't show up in the game.`
                ),
                m('.players-lists', [
                  m(
                    '.column',
                    walletsQueue?.length
                      ? m(PlayersList, { header: 'Waiting list', list: walletsQueue, walletAddress })
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
        m('.element', [m('.title', 'Mode'), m('.value', GAMEPLAY_MODE_LABEL[vnode.attrs.gameplayMode])]),
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
      const { onJoin, disabled } = vnode.attrs;
      return [
        m(
          `.button join ${disabled && 'disabled'}`,
          {
            onclick: () => {
              if (!disabled) {
                playClick();
                onJoin();
              }
            },
          },
          disabled ? 'Limit reached' : 'Click here to join'
        ),
      ];
    },
  };
}

function HeaderError() {
  return {
    view: function (vnode) {
      return [m('.header error', `Cannot join the game.\n${vnode.attrs.playerError}\n\n`)];
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
