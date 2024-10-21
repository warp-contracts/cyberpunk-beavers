import Const, { AP_COSTS, BOOSTS, FOV_DEPTH, MAIN_PLAYER_DEPTH, MINIMAP_SIZE_PX } from '../common/const.mjs';
import Player from './Player.js';
import { doPlayAttackSound } from '../scenes/main-scene/sounds.js';
import { CAMERA_MARGIN } from '../scenes/main-scene/camera.js';

const { up, left, right, down } = Const.Direction;
const { attack, move, pick, dig, useLandmine, useTeleport, useScanner, useHp } = Const.Command;

const RANGE_COLOR = 0x00ff00;
const AIM_COLOR = 0xff0000;

export default class MainPlayer extends Player {
  combatMode = false;
  mainScene;
  lastNoApPlayTimestamp;

  constructor(data) {
    let { stats, scene, x, y } = data;
    super(data);

    const range = stats.weapon.attack_range;
    const diff = Math.ceil(range / 2); //there's sth super fucked up with the coordinates..

    this.rangeBarXLeft = scene.add.grid(x - 48 * diff, y, range * 48, 48, 48, 48, RANGE_COLOR, 0.4);
    this.rangeBarXRight = scene.add.grid(x + 48 * diff, y, range * 48, 48, 48, 48, RANGE_COLOR, 0.4);
    this.rangeBarYUp = scene.add.grid(x, y - 48 * diff, 48, range * 48, 48, 48, RANGE_COLOR, 0.4);
    this.rangeBarYDown = scene.add.grid(x, y + 48 * diff, 48, range * 48, 48, 48, RANGE_COLOR, 0.4);

    this.setDepth(MAIN_PLAYER_DEPTH);
    this.rangeBarXLeft.setDepth(this.depth + 10);
    this.rangeBarXRight.setDepth(this.depth + 10);
    this.rangeBarYUp.setDepth(this.depth + 10);
    this.rangeBarYDown.setDepth(this.depth + 10);
    this.healthBar.setDepth(this.depth + 20);
    this.apBar.setDepth(this.depth + 20);
    this.position.setDepth(this.depth + 20);
    this.name.setDepth(this.depth + 20);
    if (this.medal) {
      this.medal.setDepth(this.depth + 20);
    }
    this.diggedTreasures = {};
    // this.maybeHideMinimap();
  }

  kill() {
    super.kill();
    this.rangeBarXLeft.setVisible(false);
    this.rangeBarXRight.setVisible(false);
    this.rangeBarYUp.setVisible(false);
    this.rangeBarYDown.setVisible(false);
  }

  async update() {
    if (this.stats.ap.current === 0) {
      if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
      if (!this.mainScene.notEnoughApSound.isPlaying && !this.mainScene.beaverEliminatedSound.isPlaying) {
        const now = Date.now();
        if (!this.lastNoApPlayTimestamp || now - this.lastNoApPlayTimestamp > 5000) {
          this.mainScene.notEnoughApSound.play();
          this.lastNoApPlayTimestamp = now;
        }
      }
      return;
    }

    if (this.stats.hp.current <= 0 || this.locked) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputKeys.left)) {
      await this.action(left);
    } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.right)) {
      await this.action(right);
    } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.up)) {
      await this.action(up);
    } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.down)) {
      await this.action(down);
    }

    if (this.mainScene.gameActive) {
      if (Phaser.Input.Keyboard.JustDown(this.inputKeys.space)) {
        this.combatMode = true;
      } else if (Phaser.Input.Keyboard.JustUp(this.inputKeys.space)) {
        this.combatMode = false;
        this.resetAimingBar();
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.c)) {
        if (this.onGameObject) {
          await this.send({ cmd: pick });
          this.pickAnim();
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.d) && this.stats.ap.current >= 2) {
        await this.send({ cmd: dig });
        this.digAnim();
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.one) && this.stats.ap.current >= AP_COSTS.teleport) {
        await this.send({ cmd: useTeleport });
        this.digAnim();
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.two) && this.stats.ap.current >= AP_COSTS.landmine) {
        await this.send({ cmd: useLandmine });
        this.digAnim();
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.three) && this.stats.ap.current >= AP_COSTS.scanner) {
        await this.send({ cmd: useScanner });
        this.digAnim();
      } else if (Phaser.Input.Keyboard.JustDown(this.inputKeys.four) && this.stats.ap.current >= AP_COSTS.hp) {
        await this.send({ cmd: useHp });
      } else {
        if (!this.anims.isPlaying) this.anims.play(`${this.beaverChoice}_idle`, true);
      }
    }
  }

  getCanvasPoint() {
    const x = this.x - this.mainScene.cameras.main.scrollX * this.scrollFactorX;
    const y = this.y - this.mainScene.cameras.main.scrollY * this.scrollFactorY;
    return { x, y };
  }

  baseMoveTo(pos, onStart, onComplete) {
    const { movementTemplate, moveHorizontal, moveVertical } = super.baseMoveTo(pos, onStart, onComplete);
    this.scene.tweens.add({
      ...movementTemplate,
      targets: [
        this.rangeBarXLeft,
        this.rangeBarXRight,
        this.rangeBarYUp,
        this.rangeBarYDown /*, this.mainScene.light*/,
      ],
      x: `+=${moveHorizontal}`,
      y: `+=${moveVertical}`,
      onComplete: (_) => {
        this.maybeHideMinimap();
      },
    });
  }

  maybeHideMinimap() {
    const canvasPos = this.getCanvasPoint();
    if (this.mainScene.minimap.setVisible(true)) {
      if (
        canvasPos.x >= window.innerWidth - MINIMAP_SIZE_PX - 2 * Const.Tile.size &&
        canvasPos.y <= MINIMAP_SIZE_PX + CAMERA_MARGIN + Const.Tile.size
      ) {
        this.mainScene.minimap.setVisible(false);
      } else {
        this.mainScene.minimap.setVisible(true);
      }
    }
  }

  async action(dir) {
    switch (dir) {
      case left:
        this.scaleX = -1;
        break;
      case right:
        this.scaleX = 1;
        break;
    }
    if (this.combatMode) {
      const now = Date.now();
      if (!this.stats.previousAttackTs || now - this.stats.previousAttackTs > this.stats.weapon.attack_recovery_ms) {
        await this.send({ cmd: attack, dir });
        doPlayAttackSound(this.beaverChoice, this.scene);
        if (this.mainScene.mainPlayer.activeBoosts) {
          if (this.mainScene.mainPlayer.activeBoosts[BOOSTS.quad_damage.type]) {
            this.mainScene.shotBuzz.play();
          }
        }
        this.attackAnim();
      }
      if (dir == left) {
        this.rangeBarXLeft.fillColor = AIM_COLOR;
        this.rangeBarXRight.fillColor = this.rangeBarYUp.fillColor = this.rangeBarYDown.fillColor = RANGE_COLOR;
      } else if (dir == right) {
        this.rangeBarXRight.fillColor = AIM_COLOR;
        this.rangeBarXLeft.fillColor = this.rangeBarYUp.fillColor = this.rangeBarYDown.fillColor = RANGE_COLOR;
      } else if (dir == down) {
        this.rangeBarYDown.fillColor = AIM_COLOR;
        this.rangeBarXLeft.fillColor = this.rangeBarXRight.fillColor = this.rangeBarYUp.fillColor = RANGE_COLOR;
      } else if (dir == up) {
        this.rangeBarYUp.fillColor = AIM_COLOR;
        this.rangeBarXLeft.fillColor = this.rangeBarXRight.fillColor = this.rangeBarYDown.fillColor = RANGE_COLOR;
      }
    } else {
      await this.send({ cmd: move, dir });
    }
  }

  resetAimingBar() {
    this.rangeBarXLeft.fillColor =
      this.rangeBarXRight.fillColor =
      this.rangeBarYDown.fillColor =
      this.rangeBarYUp.fillColor =
        RANGE_COLOR;
  }

  nextRound() {
    this.stats.ap.current = this.stats.ap.max;
    this.updateStats(this.stats);
  }

  async send(message) {
    if (this.locked) return;
    if (this.mainScene.lockingTx) {
      console.log(`Action locked for tx`, this.mainScene.lockingTx);
    } else {
      try {
        this.mainScene.lockingTx = (await this.scene.server.send(message)).id;
      } catch (e) {
        console.error(e);
        this.mainScene.lockingTx = null;
      }
      //console.log('Locked actions until tx is resolved', this.mainScene.lockingTx);
    }
  }
}
