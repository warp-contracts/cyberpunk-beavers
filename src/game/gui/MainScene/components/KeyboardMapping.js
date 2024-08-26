export function KeyboardMapping() {
  let visible = true;

  window.onkeydown = function (event) {
    if (event.code === 'Escape') {
      visible = !visible;
      m.redraw();
    }
  };

  return {
    view: function () {
      return visible
        ? m('.mithril-component', { id: 'keyboard-mapping' }, [
            m('.row', [
              m('img', { src: 'assets/images/keys/ARROWLEFT.png' }),
              m('img', { src: 'assets/images/keys/ARROWUP.png' }),
              m('img', { src: 'assets/images/keys/ARROWDOWN.png' }),
              m('img', { src: 'assets/images/keys/ARROWRIGHT.png' }),
              m('.label', 'MOVE'),
            ]),
            m('.row single', [m('img', { src: 'assets/images/keys/D.png' }), m('.label', 'DIG')]),
            m('.row single', [m('img', { src: 'assets/images/keys/C.png' }), m('.label', 'COLLECT')]),
            m('.row', [
              m('.row attack-wrapper', [
                m('img', { src: 'assets/images/keys/SPACE.png' }),
                m('.plus', '+'),
                m('.row', [
                  m('img', { src: 'assets/images/keys/ARROWLEFT.png' }),
                  m('img', { src: 'assets/images/keys/ARROWUP.png' }),
                  m('img', { src: 'assets/images/keys/ARROWDOWN.png' }),
                  m('img', { src: 'assets/images/keys/ARROWRIGHT.png' }),
                ]),
              ]),
              m('.label', 'ATTACK'),
            ]),
            m('.row equipment', [
              m('img', { src: 'assets/images/keys/1.png' }),
              m('img', { src: 'assets/images/keys/2.png' }),
              m('.label', 'EQUIPMENT'),
            ]),
          ])
        : null;
    },
  };
}
