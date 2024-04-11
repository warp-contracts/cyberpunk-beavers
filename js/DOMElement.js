export default class Dom extends Phaser.GameObjects.DOMElement {
  constructor(scene, x, y) {
    super(scene, x, y)
    this.setOrigin(0, 0)
    scene.add.existing(this)
  }
}
