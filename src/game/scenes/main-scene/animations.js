import { ANIM_SETTINGS } from '../anim/settings.js';

export function doInitAnimations(mainScene) {
  mainScene.anims.create({
    key: `explosion_anim`,
    frames: mainScene.anims.generateFrameNames(`explosion_anim`, { prefix: 'explosion-f', start: 1, end: 8 }),
    frameRate: 24,
  });

  mainScene.anims.create({
    key: `blood_splat_1`,
    frames: mainScene.anims.generateFrameNames(`blood_splat_1`, {
      prefix: 'frame-',
      start: 1,
      end: 7,
      frameRate: 8,
    }),
  });

  mainScene.anims.create({
    key: `blood_splat_2`,
    frames: mainScene.anims.generateFrameNames(`blood_splat_2`, {
      prefix: 'frame-',
      start: 1,
      end: 7,
      frameRate: 8,
    }),
  });

  for (const [beaver, anims] of Object.entries(ANIM_SETTINGS)) {
    for (const [anim, config] of Object.entries(anims)) {
      const { prefix, start, end, frameRate } = config;
      mainScene.anims.create({
        key: `${beaver}_${anim}`,
        frames: mainScene.anims.generateFrameNames(`${beaver}_anim_${anim}`, { prefix, start, end }),
        frameRate,
      });
    }
  }
}
