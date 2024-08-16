export function EquipmentGui(initialVnode) {
  return {
    view: function (vnode) {
      return m('div', { id: 'player-equipment-gui', class: 'mithril-component' }, [
        m('div', { class: 'equipment-slot-container' }, [
          m('div', { class: 'equipment-slot' }, [
            m('img', { src: `/assets/images/equipment/teleport_device.png` }),
            m('span', { class: 'equipment-number' }, `1.`),
            m('span', { class: 'equipment-counter' }, vnode.attrs.equipment.teleports),
          ]),
        ]),

        m('div', { class: 'equipment-slot-container' }, [
          m('div', { class: 'equipment-slot' }, [
            m('img', { src: `/assets/images/equipment/landmine.png` }),
            m('span', { class: 'equipment-number' }, `2.`),
            m('span', { class: 'equipment-counter' }, vnode.attrs.equipment.landmines),
          ]),
        ]),
      ]);
    },
  };
}
