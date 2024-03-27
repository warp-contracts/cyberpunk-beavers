import Const from './const.mjs';


export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    let { name, scene, x, y, texture, frame } = data;
    super(scene, x, y, texture, frame);
    this.playerName = name;
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
    this.scene.ws.addEventListener("message", function (event) {
      const response = JSON.parse(event.data);
      console.log('Data from ws %s', event.data, response.cmd, response.dir);
      if (response.cmd === Const.Command.move) {

        const moveHorizontal = (74 + response.pos[0] * 48) - player.x;
        const moveVertical = (74 + response.pos[1] * 48) - player.y;

        player.scaleX = Math.sign(moveHorizontal) || player.scaleX;
        player.scene.tweens.add({...movementTemplate, x: `+=${moveHorizontal}`, });
        player.scene.tweens.add({...movementTemplate, y: `+=${moveVertical}`, });

      }
    });
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
    console.log('update', this.playerName);


    // const speed = 17;
    // let playerVelocity = new Phaser.Math.Vector2();
    if (Phaser.Input.Keyboard.JustUp(this.inputKeys.left)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.left }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.right)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.right }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.up)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.up }));
    } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.down)) {
      this.scene.ws.send(JSON.stringify({ pid: this.playerName, cmd: Const.Command.move, dir: Const.Direction.down }));
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
