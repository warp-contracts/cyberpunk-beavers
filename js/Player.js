import Const from "./common/const.mjs";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { playerName, stats, scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    this.playerName = playerName;
    this.stats = stats;
    scene.add.existing(this);
    this.initAnimations();
    console.log(this);
  }

  moveTo(response) {
    let movementTemplate = {
      targets: this,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: 0, // -1: infinity
      yoyo: false,
      onStart: () => {
        this.anims.play('walk', true);
      },
      onComplete: () => {
        this.anims.play('idle', true);
      },
    }

    const moveHorizontal = (26 + response.pos[0] * Const.Tile.size) - this.x;
    const moveVertical = (26 + response.pos[1] * Const.Tile.size) - this.y;

    this.scaleX = Math.sign(moveHorizontal) || this.scaleX;
    this.scene.tweens.add({...movementTemplate, x: `+=${moveHorizontal}`, });
    this.scene.tweens.add({...movementTemplate, y: `+=${moveVertical}`, });
  }

  static preload(scene) {
    scene.load.atlas(
      'atlas',
      'assets/images/atlas.png',
      'assets/images/atlas.json'
    );
    scene.load.atlas(
      'bat_idle_atlas',
      'assets/images/idle_bat.png',
      'assets/images/idle_bat_atlas.json'
    );
    scene.load.atlas(
      'bat_move_atlas',
      'assets/images/move_bat.png',
      'assets/images/move_bat_atlas.json'
    );
    // scene.load.animation('atlas_anim', 'assets/images/atlas_anim.json');
  }

  initAnimations() {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNames('bat_move_atlas', {
        prefix: 'tile00',
        start: 0,
        end: 5,
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNames('bat_idle_atlas', {
        prefix: 'tile00',
        start: 0,
        end: 7,
      }),
      frameRate: 8,
    });
  }
}
