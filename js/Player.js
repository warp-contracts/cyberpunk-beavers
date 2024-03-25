export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.collideLayer);
    this.getBody().setCollideWorldBounds(true);
    this.getBody().setSize(64, 64);
    this.getBody().setOffset(0, 0);
    this.initAnimations();
    this.setupWebSocketListener();
    console.log(this);

    // const { Body, Bodies } = Phaser.Physics.Arc.Matter;
    // const playerCollider = Bodies.circle(this.x, this.y, 12, {
    //   isSensor: false,
    //   label: 'playerCollider',
    // });
    // const playerSensor = Bodies.circle(this.x, this.y, 24, {
    //   isSensor: true,
    //   label: 'playerSensor',
    // });
    // const compoundBody = Body.create({
    //   parts: [playerCollider, playerSensor],
    //   frictionAir: 0.35,
    // });
    // this.setExistingBody(compoundBody);
    // this.setFixedRotation();
  }

  setupWebSocketListener() {
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


    const player = this;
    // Event listener for incoming messages from the server
    this.scene.socket.onmessage = function (event) {
      console.log('Data from ws %s', event.data);
      switch (event.data) {
        case 'move left':
          player.scaleX = -1;
          player.scene.tweens.add({...movementTemplate, x: '-=48', });
          break;
        case 'move right':
          player.scaleX = 1;
          player.scene.tweens.add({...movementTemplate, x: '+=48', });
          break;
        case 'move up':
          player.scene.tweens.add({...movementTemplate, y: '-=48', });
          break;
        case 'move down':
          player.scene.tweens.add({...movementTemplate, y: '+=48', });
          break;
      }
    };
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

  get velocity() {
    return this.body.velocity;
  }

  update() {
    console.log('update');


    // const speed = 17;
    // let playerVelocity = new Phaser.Math.Vector2();
    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.scene.socket.send('left');
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.scene.socket.send('right');
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.scene.socket.send('up');
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.scene.socket.send('down');
    } else {
      this.anims.play('idle', true);
    }
    // playerVelocity.normalize();
    // playerVelocity.scale(speed);
    // this.setVelocity(playerVelocity.x, playerVelocity.y);
    // if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
    //   this.anims.play('walk', true);
    // } else {
    //   this.anims.play('idle', true);
    // }
  }

  getBody() {
    return this.body;
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
