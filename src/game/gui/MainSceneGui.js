export function MainSceneGui(initialVnode) {
  return {
    view: function (vnode) {
      const { mainPlayerStats: stats, mainPlayerEquipment: equipment, gameStats, roundInfo, gameOver } = vnode.attrs;
      return [
        stats ? m(WeaponInfo, { stats }) : null,
        equipment ? m(EquipmentGui, { equipment }) : null,
        m(KeyboardMapping),
        m(InfoPanel, { gameStats, stats, roundInfo, gameOver }),
      ];
    },
  };
}

function InfoPanel() {
  return {
    view: function (vnode) {
      const { gameStats, roundInfo, gameOver, stats } = vnode.attrs;
      return m('.info-panel', [
        gameOver
          ? m('.element', 'GAME OVER')
          : gameStats?.gameTreasuresCounter
            ? m('.element', [
                m('span', gameStats?.gameTreasuresCounter),
                m('img', { src: `/assets/images/token.png` }),
                m('span', 'HIDDEN'),
              ])
            : m('.element', 'Find the treasure...'),
        m('.element', `ROUNDS LEFT ${roundInfo.roundsToGo || roundInfo.currentRound || '700'}`),
        m(Timebar, { progress: roundInfo.gone * 10, pause: gameOver }),
        m(`.element ${stats?.ap?.current == 0 ? 'warn' : 'info'}`, `AP: ${stats?.ap?.current}`),
      ]);
    },
  };
}

function Timebar() {
  let width;
  return {
    oninit: function (vnode) {
      const progress = vnode.attrs.progress || 0;
      width = 100 - Math.max(0, Math.min(100, progress));
    },
    onbeforeupdate: function (vnode) {
      const pause = vnode.attrs.pause;
      if (!pause) {
        const progress = vnode.attrs.progress || 0;
        width = 100 - Math.max(0, Math.min(100, progress));
      }
    },
    view: function (vnode) {
      return m('div.timebar-container', [
        m('div.timebar', [
          m('div.timebar-progress', {
            style: {
              width: width + '%',
            },
          }),
        ]),
      ]);
    },
  };
}

function EquipmentGui(initialVnode) {
  return {
    view: function (vnode) {
      return m('div', { id: 'player-equipment-gui', class: 'mithril-component' }, [
        m('div', { class: 'equipment-slot-container' }, [
          m('div', { class: 'equipment-slot' }, [
            m('img', { src: `/assets/images/equipment/teleport_device.png` }),
            m('span', { class: 'equipment-number' }, `1.`),
            m('span', { class: 'equipment-counter' }, vnode.attrs.equipment.teleports.current),
          ]),
        ]),

        m('div', { class: 'equipment-slot-container' }, [
          m('div', { class: 'equipment-slot' }, [
            m('img', { src: `/assets/images/equipment/landmine.png` }),
            m('span', { class: 'equipment-number' }, `2.`),
            m('span', { class: 'equipment-counter' }, vnode.attrs.equipment.landmines.current),
          ]),
        ]),
      ]);
    },
  };
}

function KeyboardMapping(initialVnode) {
  let visible = true;

  window.onkeydown = function (event) {
    if (event.code === 'Escape') {
      visible = !visible;
      m.redraw();
    }
  };

  return {
    view: function (vnode) {
      return visible
        ? m('div', { id: 'keyboard-mapping', class: 'mithril-component' }, [
            m('div', { class: 'row' }, [
              m('img', { src: 'assets/images/keys/ARROWLEFT.png' }),
              m('img', { src: 'assets/images/keys/ARROWUP.png' }),
              m('img', { src: 'assets/images/keys/ARROWDOWN.png' }),
              m('img', { src: 'assets/images/keys/ARROWRIGHT.png' }),
              m('div', { class: 'label' }, 'MOVE'),
            ]),
            m('div', { class: 'row single' }, [
              m('img', { src: 'assets/images/keys/D.png' }),
              m('div', { class: 'label' }, 'DIG'),
            ]),
            m('div', { class: 'row single' }, [
              m('img', { src: 'assets/images/keys/C.png' }),
              m('div', { class: 'label' }, 'COLLECT'),
            ]),
            m('div', { class: 'row' }, [
              m('div', { class: 'row attack-wrapper' }, [
                m('img', { src: 'assets/images/keys/SPACE.png' }),
                m('div', { class: 'plus' }, '+'),
                m('div', { class: 'row' }, [
                  m('img', { src: 'assets/images/keys/ARROWLEFT.png' }),
                  m('img', { src: 'assets/images/keys/ARROWUP.png' }),
                  m('img', { src: 'assets/images/keys/ARROWDOWN.png' }),
                  m('img', { src: 'assets/images/keys/ARROWRIGHT.png' }),
                ]),
              ]),
              m('div', { class: 'label' }, 'ATTACK'),
            ]),
            m('div', { class: 'row equipment' }, [
              m('img', { src: 'assets/images/keys/1.png' }),
              m('img', { src: 'assets/images/keys/2.png' }),
              m('div', { class: 'label' }, 'EQUIPMENT'),
            ]),
          ])
        : null;
    },
  };
}

function WeaponInfo(initialVnode) {
  function calculateRecoveryPercent(stats) {
    if (stats.previousAttackTs === null) {
      return 100;
    }

    const now = Date.now();
    const diff = Math.min((now - stats.previousAttackTs) / stats.weapon.attack_recovery_ms, 1);

    return Math.ceil(diff * 100);
  }

  return {
    view: function (vnode) {
      return m('div', { id: 'weapon-info', class: 'mithril-component' }, [
        m('div', { class: 'recovery-bar', style: `width: ${calculateRecoveryPercent(vnode.attrs.stats)}%;` }),
        m('img', { src: `/assets/images/weapons/${vnode.attrs.stats.weapon.type}.png` }),
      ]);
    },
  };
}
