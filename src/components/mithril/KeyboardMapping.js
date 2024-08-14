export function KeyboardMapping(initialVnode) {
  return {
    view: function (vnode) {
      return m('div', { id: 'keyboard-mapping', class: 'mithril-component' }, [
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
      ]);
    },
  };
}
