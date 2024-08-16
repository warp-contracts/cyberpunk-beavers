import { WeaponInfo } from '../../components/mithril/WeaponInfo.js';
import { EquipmentGui } from '../../components/mithril/EquipmentGui.js';
import { KeyboardMapping } from '../../components/mithril/KeyboardMapping.js';

export function MainSceneGui(initialVnode) {
  console.log('Inside MainSceneGui', initialVnode);

  return {
    oninit: function (vnode) {
      console.log('init a closure component');
    },
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
