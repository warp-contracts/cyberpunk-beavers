import { EVENTS_NAME } from '../utils/events.js';

export default class HintScene extends Phaser.Scene {
  constructor() {
    super('hint-scene');
  }

  init() {
    console.log('Hint Scene - 1. Init');
  }

  preload() {
    console.log('Hint Scene - 2. Preload');
    this.load.image('hint', 'assets/images/modal.png');
  }

  create() {
    console.log('Hint Scene - 3. Create');
    this.initListeners();
  }

  initListeners() {
    this.game.events.on(EVENTS_NAME.displayHint, (hint) =>
      this.displayHint(hint)
    );
  }

  displayHint(hint) {
    const hintImage = this.add.image(this.game.scale.width / 2, 100, 'hint');
    hintImage.setScale(0.3);
    const hintText = this.add.text(0, 0, hint).setDepth(1);
    Phaser.Display.Align.In.Center(hintText, hintImage);
    const hintContainer = this.add.container(0, 0, [hintImage, hintText]);

    this.tweens.add({
      targets: [hintContainer],
      y: { start: -hintImage.height, to: 0 },
      ease: 'Linear',
      duration: 1000,
      hold: 2000,
      repeat: 0,
      yoyo: true,
    });
  }
}
