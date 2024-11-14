import { Equipment } from './components/Equipment';
import { InfoPanel } from './components/InfoPanel';
import { PlayerInfo, SpectatorStats } from './components/Stats';
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
        lastAttack,
        gameStats,
        roundInfo,
        gameOver,
        playersTotal,
        diff,
        gameActive,
        spectatorMode,
        roundsToShrink,
        waitingForNewWave,
        hordeAliveMonsters,
        hordeAlivePlayers,
        hordeWaveNumber,
        winningTeam,
      } = vnode.attrs;

      const { lagMessage, lagClass } = formatLag(window.warpAO.lag);

      if (gameActive && !vnode.state.hasEnterAnimated) {
        animateEnter(vnode);
      }

      if (!vnode.state.hasPanelInfoAnimated) {
        animatePanelInfo(vnode);
      }

      return m(
        'div',
        { id: 'main-scene' },
        spectatorMode
          ? [
              m(InfoPanel, { gameStats, stats: mainPlayer?.stats, roundInfo, gameOver, diff, spectatorMode }),
              m(KeyboardMapping, { spectatorMode }),
              m(SpectatorStats, { gameTokens: gameStats.gameTokens || {} }),
            ]
          : [
              m('.main-scene-panel', [
                m('.main-scene-panel-info', `Press TAB for more info`),
                m('.main-scene-panel-elements', [
                  mainPlayer
                    ? m('.main-scene-panel-element', [
                        m(PlayerInfo, { mainPlayer, playersTotal, gameTokens: gameStats.gameTokens || {}, visible }),
                      ])
                    : null,
                  m('.main-scene-panel-element', [
                    m(InfoPanel, { gameStats, stats: mainPlayer?.stats, roundInfo, gameOver, diff }),
                  ]),
                  equipment
                    ? m('.main-scene-panel-element', [m(Equipment, { equipment, stats: mainPlayer?.stats })])
                    : null,
                ]),
              ]),
              visible ? m(KeyboardMapping, { spectatorMode }) : null,
              m(`.main-scene-info.main-scene-enter.alert`, 'FIGHT!'),
              gameOver ? m('.main-scene-info.blink', 'GAME OVER') : null,
              gameOver && winningTeam
                ? m(
                    '.main-scene-info.team.blink',
                    {
                      style: {
                        color: winningTeam.color,
                      },
                    },
                    `${winningTeam.name} WINS!`
                  )
                : null,
              !gameActive && diff > 0
                ? m('.main-scene-info.small', `GAME STARTS IN: ${formatCountdownTo(diff)}`)
                : null,
              roundsToShrink > 0
                ? m(
                    '.main-scene-info.small.blink',
                    `Map shrinks in ${roundsToShrink} round${roundsToShrink > 1 ? 's' : ''}`
                  )
                : null,
              waitingForNewWave ? m('.main-scene-info.small.blink', `Prepare for new monsters wave!`) : null,
              hordeWaveNumber > 0 && !waitingForNewWave
                ? m(
                    '.main-scene-info.small',
                    `Wave: ${hordeWaveNumber}, monsters alive: ${hordeAliveMonsters}, players alive: ${hordeAlivePlayers}`
                  )
                : null,
              m(BattleReport, {
                trigger: gameActive && lastAttack.criticalHit,
                message: 'CRITICAL HIT!',
                timeout: 5_000,
              }),
              mainPlayer ? m(`.main-scene-lag ${lagClass !== `success` ? 'blink' : ''} ${lagClass}`, lagMessage) : null,
              !gameOver && winningTeam
                ? m(
                    '.main-scene-team',
                    {
                      style: {
                        color: winningTeam.color,
                      },
                    },
                    `WINNING TEAM: ${winningTeam.name}`
                  )
                : null,
            ]
      );
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

function BattleReport() {
  return {
    view: function (vnode) {
      const { message, timeout, trigger } = vnode.attrs;
      if (trigger) {
        vnode.state.animating = true;
        setTimeout(() => (vnode.state.animating = false), timeout);
      }
      return vnode.state.animating ? m('.main-scene-info.small.battle-report', message) : null;
    },
  };
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
