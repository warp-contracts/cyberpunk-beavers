import { Text } from './Text.js';

export class TextButton extends Text {
  constructor(scene, x, y, text, style, callback, attach = true) {
    super(scene, x, y, text, style);

    this.setInteractive({ useHandCursor: true }).on('pointerdown', async () => {
      await callback();
    });

    if (attach) {
      scene.add.existing(this);
    }
  }
}
