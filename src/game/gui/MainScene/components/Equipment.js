export function Equipment() {
  return {
    view: function (vnode) {
      return m('.mithril-component', { id: 'player-equipment-gui' }, [
        m('.equipment-slot-container', [
          m('.equipment-slot', [
            m('img', { src: `/assets/images/equipment/teleport_device.png` }),
            m('span', { class: 'equipment-number' }, `1.`),
            m(
              'span',
              { class: 'equipment-counter' },
              `${vnode.attrs.equipment.teleports.current}/${vnode.attrs.equipment.teleports.max}`
            ),
          ]),
        ]),

        m('.equipment-slot-container', [
          m('.equipment-slot', [
            m('img', { src: `/assets/images/equipment/landmine.png` }),
            m('span', { class: 'equipment-number' }, `2.`),
            m(
              'span',
              { class: 'equipment-counter' },
              `${vnode.attrs.equipment.landmines.current}/${vnode.attrs.equipment.landmines.max}`
            ),
          ]),
        ]),
      ]);
    },
  };
}
