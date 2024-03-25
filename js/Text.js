export default class Text extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      fontSize: 'calc(100vw / 50)',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    });
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }
}
