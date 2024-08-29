import { Equipment } from './components/Equipment';
import { InfoPanel } from './components/InfoPanel';
import { Stats } from './components/Stats';
import { WeaponInfo } from './components/WeaponInfo';
import { KeyboardMapping } from './components/KeyboardMapping';

export function MainSceneGui() {
  return {
    view: function (vnode) {
      const { mainPlayer, mainPlayerEquipment: equipment, gameStats, roundInfo, gameOver, playersTotal } = vnode.attrs;
      return [
        mainPlayer?.stats ? m(WeaponInfo, { stats: mainPlayer.stats }) : null,
        equipment ? m(Equipment, { equipment }) : null,
        m(KeyboardMapping),
        m(InfoPanel, { gameStats, stats: mainPlayer.stats, roundInfo, gameOver }),
        mainPlayer ? m(Stats, { mainPlayer, playersTotal, gameTokens: gameStats.gameTokens || {} }) : null,
      ];
    },
  };
}
