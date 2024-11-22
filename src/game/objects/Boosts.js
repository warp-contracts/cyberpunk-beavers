import { BOOSTS } from '../common/boostsConst.mjs';

export class Boosts {
  active;
  constructor(player) {
    this.player = player;
    this.quadDamageFx = null;
    this.shieldFx = null;
  }

  playQuadDamageSound(mainScene) {
    if (this.active?.[BOOSTS.quad_damage.type]) {
      mainScene.shotBuzz.play();
    }
  }

  playShieldSound(mainScene) {
    if (this.active?.[BOOSTS.shield.type]) {
      mainScene.shieldSound.play();
    }
  }

  showQuadDamageBoost() {
    if (this.quadDamageFx === null) {
      this.quadDamageFx = this.player.postFX.addGlow(0xff0000, 2, 0, false, 0.1, 16);
    }
  }

  animateQuadDamageBoost() {
    if (this.quadDamageFx) {
      // this.quadDamageTween = this.player.scene.tweens.add({
      //   targets: this.quadDamageFx,
      //   outerStrength: 8,
      //   yoyo: true,
      //   ease: 'sine.inout',
      // });
    }
  }

  hideQuadDamageBoost() {
    if (this.quadDamageFx !== null) {
      if (this.active) {
        delete this.active[BOOSTS.quad_damage.type];
      }
      this.quadDamageTween?.remove();
      this.player.postFX.remove(this.quadDamageFx);
      this.quadDamageTween = null;
      this.quadDamageFx = null;
    }
  }

  showShieldBoost() {
    if (this.shieldFx === null) {
      this.shieldFx = this.player.postFX.addGlow(0x00ffff, 2, 0, false, 0.1, 16);
    }
  }

  animateShieldBoost() {
    if (this.shieldFx) {
      // this.shieldTween = this.player.scene.tweens.add({
      //   targets: this.shieldFx,
      //   outerStrength: 8,
      //   color: 0xffde21,
      //   yoyo: true,
      //   ease: 'sine.inout',
      // });
    }
  }

  hideShieldBoost() {
    if (this.shieldFx !== null) {
      if (this.active) {
        delete this.active[BOOSTS.shield.type];
      }
      this.shieldTween?.remove();
      this.player.postFX.remove(this.shieldFx);
      this.shieldTween = null;
      this.shieldFx = null;
    }
  }
}
