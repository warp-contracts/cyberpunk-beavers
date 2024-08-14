import { WeaponInfo } from '../../components/mithril/WeaponInfo.js';

export function MainSceneGui(initialVnode) {
  console.log('Inside MainSceneGui', initialVnode);

  return {
    oninit: function (vnode) {
      console.log('init a closure component');
    },
    view: function (vnode) {
      console.log('view', vnode);
      return [vnode.attrs.mainPlayerStats ? m(WeaponInfo, { stats: vnode.attrs.mainPlayerStats }) : null];
    },
  };
}
