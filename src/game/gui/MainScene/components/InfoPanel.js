export function InfoPanel() {
  return {
    view: function (vnode) {
      const { roundInfo, gameOver, stats } = vnode.attrs;
      return m('.info-panel', [
        gameOver ? m('.element', 'GAME OVER') : null,
        m('.element', `ROUNDS LEFT ${roundInfo.roundsToGo || roundInfo.currentRound || '700'}`),
        m(Timebar, { progress: roundInfo.gone * 10, pause: gameOver, type: 'rounds' }),
        m(`.element ${stats?.ap?.current == 0 ? 'warn' : 'info'}`, `AP: ${stats?.ap?.current || 0}`),
      ]);
    },
  };
}

function Timebar() {
  let width;
  return {
    oninit: function (vnode) {
      const progress = vnode.attrs.progress || 0;
      width = 100 - Math.max(0, Math.min(100, progress));
    },
    onbeforeupdate: function (vnode) {
      const pause = vnode.attrs.pause;
      if (!pause) {
        const progress = vnode.attrs.progress || 0;
        width = 100 - Math.max(0, Math.min(100, progress));
      }
    },
    view: function (vnode) {
      return m('.timebar-container', [
        m('.timebar', [
          m(`.timebar-progress ${vnode.attrs.type}`, {
            style: {
              width: width + '%',
            },
          }),
        ]),
      ]);
    },
  };
}
