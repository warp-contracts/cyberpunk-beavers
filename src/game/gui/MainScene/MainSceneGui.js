import { Equipment } from './components/Equipment';
import { InfoPanel } from './components/InfoPanel';
import { PlayerInfo, SpectatorStats, Stats } from './components/Stats';
import { KeyboardMapping } from './components/KeyboardMapping';
import { formatCountdownTo } from '../LoungeArenaSceneGui.js';

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

      if (gameActive && !vnode.state.hasEnterAnimated) {
        animateEnter(vnode);
      }

      return spectatorMode
        ? [
            m(InfoPanel, { gameStats, stats: mainPlayer?.stats, roundInfo, gameOver, diff, spectatorMode }),
            m(KeyboardMapping, { spectatorMode }),
            m(SpectatorStats, { playersTotal, gameTokens: gameStats.gameTokens || {} }),
          ]
        : [
            mainPlayer ? m(PlayerInfo, { mainPlayer }) : null,
            equipment ? m(Equipment, { equipment, stats: mainPlayer?.stats }) : null,
            visible ? m(KeyboardMapping, { spectatorMode }) : null,
            m(InfoPanel, { gameStats, stats: mainPlayer?.stats, roundInfo, gameOver, diff }),
            mainPlayer && visible
              ? m(Stats, { mainPlayer, playersTotal, gameTokens: gameStats.gameTokens || {} })
              : null,
            m(`.main-scene-info.main-scene-enter.alert`, 'FIGHT!'),
            gameOver ? m('.main-scene-info.blink', 'GAME OVER') : null,
            diff ? m('.main-scene-info.small', `GAME STARTS IN: ${formatCountdownTo(diff)}`) : null,
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
