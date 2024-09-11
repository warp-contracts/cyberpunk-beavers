import { WeaponInfo } from './WeaponInfo.js';

export function Equipment() {
  return {
    view: function (vnode) {
      const { equipment, stats } = vnode.attrs;

      return m('div', { id: 'player-equipment-gui' }, [
        m('.equipment-slot-container', [m('.equipment-slot', [m(WeaponInfo, { stats })])]),

        m('.equipment-slot-container', [
          m('.equipment-slot', [
            m('img', { src: `/assets/images/equipment/teleport_device.png` }),
            m('span', { class: 'equipment-number' }, `1.`),
            m('span', { class: 'equipment-counter' }, `${equipment.teleports.current}/${equipment.teleports.max}`),
          ]),
        ]),

        m('.equipment-slot-container', [
          m('.equipment-slot', [
            m('img', { src: `/assets/images/equipment/landmine.png` }),
            m('span', { class: 'equipment-number' }, `2.`),
            m('span', { class: 'equipment-counter' }, `${equipment.landmines.current}/${equipment.landmines.max}`),
          ]),
        ]),

        m('.equipment-slot-container', [
          m('.equipment-slot', [
            m('img', { src: `/assets/images/equipment/scanner_device.png` }),
            m('span', { class: 'equipment-number' }, `3.`),
            m('span', { class: 'equipment-counter' }, `${equipment.scanners.current}/${equipment.scanners.max}`),
          ]),
        ]),
      ]);
    },
  };
}
