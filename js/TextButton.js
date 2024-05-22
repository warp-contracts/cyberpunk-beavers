export class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style, callback) {
    super(scene, x, y, text, style);

    this.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      callback();
    });

    scene.add.existing(this);
  }
}
