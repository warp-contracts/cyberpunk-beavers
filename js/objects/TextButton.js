import { Text } from './Text.js';

export class TextButton extends Text {
  constructor(scene, x, y, text, style, callback) {
    super(scene, x, y, text, style);

    this.setInteractive({ useHandCursor: true }).on('pointerdown', async () => {
      await callback();
    });

    scene.add.existing(this);
  }
}
