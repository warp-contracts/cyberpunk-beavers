export function MainSceneGui(initialVnode) {
  return {
    view: function (vnode) {
      const { mainPlayerStats: stats, mainPlayerEquipment: equipment } = vnode.attrs;
      return [
        stats ? m(WeaponInfo, { stats }) : null,
        equipment ? m(EquipmentGui, { equipment }) : null,
        m(KeyboardMapping),
      ];
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
              m('img', { src: 'assets/images/keys/P.png' }),
              m('div', { class: 'label' }, 'PICK'),
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
