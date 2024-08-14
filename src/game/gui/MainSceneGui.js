import { WeaponInfo } from '../../components/mithril/WeaponInfo.js';
import { KeyboardMapping } from '../../components/mithril/KeyboardMapping.js';

export function MainSceneGui(initialVnode) {
  console.log('Inside MainSceneGui', initialVnode);

  return {
    oninit: function (vnode) {
      console.log('init a closure component');
    },
    view: function (vnode) {
      return [
        vnode.attrs.mainPlayerStats ? m(WeaponInfo, { stats: vnode.attrs.mainPlayerStats }) : null,
        m(KeyboardMapping),
      ];
    },
  };
}
