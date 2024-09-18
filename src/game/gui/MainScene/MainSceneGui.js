import { Equipment } from './components/Equipment';
import { InfoPanel } from './components/InfoPanel';
import { PlayerInfo, SpectatorStats, Stats } from './components/Stats';
import { KeyboardMapping } from './components/KeyboardMapping';
import { formatCountdownTo } from '../LoungeArenaSceneGui.js';
import { formatLag } from '../GameHubGui.js';

export function MainSceneGui() {
  let visible = false;

  window.onkeydown = function (event) {
    if (event.code === 'Tab') {
      event.preventDefault();
      event.stopImmediatePropagation();
      visible = !visible;
      m.redraw();
    }
  };

  return {
    oninit: function (vnode) {
      vnode.state.hasEnterAnimated = false;
      vnode.state.hasPanelInfoAnimated = false;
    },
    view: function (vnode) {
      const {
        mainPlayer,
        mainPlayerEquipment: equipment,
        gameStats,
        roundInfo,
        gameOver,
        playersTotal,
        diff,
        gameActive,
        spectatorMode,
      } = vnode.attrs;

      const { lagMessage, lagClass } = formatLag(window.warpAO.lag);

      if (gameActive && !vnode.state.hasEnterAnimated) {
        animateEnter(vnode);
      }

      if (!vnode.state.hasPanelInfoAnimated) {
        animatePanelInfo(vnode);
      }

      return spectatorMode
        ? [
            m(InfoPanel, { gameStats, stats: mainPlayer?.stats, roundInfo, gameOver, diff, spectatorMode }),
            m(KeyboardMapping, { spectatorMode }),
            m(SpectatorStats, { gameTokens: gameStats.gameTokens || {} }),
          ]
        : [
            m('.main-scene-panel', [
              !visible && m('.main-scene-panel-info', `Press TAB for more info`),
              m('.main-scene-panel-elements', [
                mainPlayer ? m(PlayerInfo, { mainPlayer, playersTotal }) : null,
                m(InfoPanel, { gameStats, stats: mainPlayer?.stats, roundInfo, gameOver, diff }),
                equipment ? m(Equipment, { equipment, stats: mainPlayer?.stats }) : null,
              ]),
            ]),
            visible ? m(KeyboardMapping, { spectatorMode }) : null,
            mainPlayer && visible
              ? m(Stats, { mainPlayer, playersTotal, gameTokens: gameStats.gameTokens || {} })
              : null,
            m(`.main-scene-info.main-scene-enter.alert`, 'FIGHT!'),
            gameOver ? m('.main-scene-info.blink', 'GAME OVER') : null,
            !gameActive && diff > 0 ? m('.main-scene-info.small', `GAME STARTS IN: ${formatCountdownTo(diff)}`) : null,
            mainPlayer ? m(`.main-scene-lag ${lagClass !== `success` ? 'blink' : ''} ${lagClass}`, lagMessage) : null,
          ];
    },
  };
}

function animateEnter(vnode) {
  vnode.state.hasEnterAnimated = true;
  const enterElement = document.querySelector('.main-scene-enter');
  if (enterElement) {
    enterElement.classList.add('animated');
    enterElement.addEventListener(
      'animationend',
      () => {
        enterElement.classList.remove('animated');
      },
      { once: true }
    );
  }
}

function animatePanelInfo(vnode) {
  const element = document.querySelector('.main-scene-panel-info');
  if (element) {
    element.classList.add('animated');
    setTimeout(() => {
      element.classList.remove('animated');
      vnode.state.hasPanelInfoAnimated = true;
    }, 5000);
  }
}
