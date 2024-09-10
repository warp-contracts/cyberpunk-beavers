import { formatCountdownTo } from '../../LoungeArenaSceneGui';

export function InfoPanel() {
  return {
    view: function (vnode) {
      const { roundInfo, gameOver, stats, diff, spectatorMode } = vnode.attrs;
      return m('.info-panel', [
        gameOver || diff
          ? null
          : [
              roundInfo
                ? [
                    m('.element rounds', `ROUNDS:${roundInfo.roundsToGo || roundInfo.currentRound || '700'}`),
                    m(Timebar, { progress: roundInfo.gone * 10, pause: gameOver, type: 'rounds' }),
                  ]
                : null,
              spectatorMode
                ? null
                : [
                    m(Timebar, {
                      progress: 100 - Math.floor(((stats?.ap?.current || 0) / stats?.ap?.max) * 100),
                      type: 'ap',
                    }),
                    m(`.element ap ${stats?.ap?.current == 0 ? 'warn' : 'info'}`, `AP:${stats?.ap?.current || 0}`),
                    m(Timebar, {
                      progress: 100 - Math.floor(((stats?.hp?.current || 0) / stats?.hp?.max) * 100),
                      type: 'hp',
                    }),
                    m(`.element hp`, `HP:${stats?.hp?.current || 0}`),
                  ],
            ],
      ]);
    },
  };
}

function Timebar() {
  let width;
  return {
    view: function (vnode) {
      const pause = vnode.attrs.pause;
      if (!pause) {
        const progress = vnode.attrs.progress || 0;
        width = 100 - Math.max(0, Math.min(100, progress));
      }
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
