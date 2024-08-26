export function WeaponInfo() {
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
