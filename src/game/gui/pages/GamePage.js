import '../../config/warp-ao.js';
import { config } from '../../../main.js';

export function GamePage() {
  return {
    oncreate: () => {
      window.game = new Phaser.Game(config);
    },
    view: () => {
      console.log(`Game loaded.`);
    },
  };
}
