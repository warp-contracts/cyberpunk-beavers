import Phaser from 'phaser';
import Const, { BEAVER_TYPES, DEFAULT_BG_MUSIC, maps } from '../../common/const.mjs';

export function doAddSounds(mainScene) {
  mainScene.gameActiveSound = mainScene.sound.add('game_active_sound', { loop: false, volume: 1.0 });
  mainScene.backgroundMusic = mainScene.sound.add('background_music', { loop: true, volume: 0.25 });
  mainScene.backgroundMusicMetal = mainScene.sound.add('background_music_metal', { loop: true, volume: 0.25 });
  mainScene.pickUpSound = mainScene.sound.add('pick_up_sound', { loop: false, volume: 3 });
  mainScene.noCollectSound = mainScene.sound.add('no_collect_sound', { loop: false, volume: 3 });
  mainScene.digSound = mainScene.sound.add('dig_sound', { loop: false, volume: 0.5 });
  mainScene.treasureSound = mainScene.sound.add('treasure_sound', { loop: false, volume: 0.5 });
  mainScene.attackHeavyBeaverSound = mainScene.sound.add('attack_heavy_beaver_sound', { loop: false, volume: 0.5 });
  mainScene.attackHackerBeaverSound = mainScene.sound.add('attack_hacker_beaver_sound', { loop: false, volume: 0.5 });
  mainScene.attackSpeedyBeaverSound = mainScene.sound.add('attack_speedy_beaver_sound', { loop: false, volume: 0.5 });
  mainScene.beaverEliminatedSound = mainScene.sound.add('beaver_eliminated_sound', { loop: false, volume: 2.0 });
  mainScene.theGunCollectedSound = mainScene.sound.add('the_gun_collected_sound', { loop: false, volume: 2.0 });
  mainScene.notEnoughApSound = mainScene.sound.add('not_enough_ap', { loop: false, volume: 1.0 });
  mainScene.criticalHitSound = mainScene.sound.add('critical_hit', { loop: false, volume: 4.0 });
  mainScene.newChallengerSound = mainScene.sound.add('new_challenger', { loop: false, volume: 2.0 });
  mainScene.gameOverSound = mainScene.sound.add('game_over', { loop: false, volume: 2.0 });
  mainScene.threeRoundsLeftSound = mainScene.sound.add('3_rounds_left', { loop: false, volume: 2.0 });
  mainScene.lastRoundSound = mainScene.sound.add('last_round', { loop: false, volume: 2.0 });
  mainScene.firstBloodSound = mainScene.sound.add('first_blood', { loop: false, volume: 4.0 });
  mainScene.doubleKillSound = mainScene.sound.add('double_kill', { loop: false, volume: 4.0 });
  mainScene.tripleKillSound = mainScene.sound.add('triple_kill', { loop: false, volume: 4.0 });
  mainScene.godLikeSound = mainScene.sound.add('god_like', { loop: false, volume: 4.0 });
  mainScene.revengeSound = mainScene.sound.add('revenge', { loop: false, volume: 4.0 });
  mainScene.teleportSound = mainScene.sound.add('teleport', { loop: false, volume: 5.0 });
  mainScene.scanSound = mainScene.sound.add('scan', { loop: false, volume: 3.0 });
  mainScene.explosionSound = mainScene.sound.add('explosion', { loop: false, volume: 0.5 });
  mainScene.bloodSplat1Sound = mainScene.sound.add('blood_splat_1', { loop: false, volume: 1.0 });
  mainScene.bloodSplat2Sound = mainScene.sound.add('blood_splat_2', { loop: false, volume: 1.5 });
  mainScene.additionalLoot = mainScene.sound.add('additional_loot', { loop: false, volume: 1.5 });
  mainScene.shrinkWarn = mainScene.sound.add('shrink_alarm', { loop: false, volume: 2.0 });
  mainScene.quadDamage = mainScene.sound.add('quad_damage', { loop: false, volume: 2.5 });
  mainScene.shotBuzz = mainScene.sound.add('shot_buzz', { loop: false, volume: 0.5 });
  forDeathSounds((k, i) => addDeathSound(k, i));

  const mapTxId = window.warpAO.mapTxId();
  const mapConfig = Object.values(maps).find((val) => val.txId === mapTxId);
  const backgroundMusic = mainScene[mapConfig ? mapConfig.music : DEFAULT_BG_MUSIC];
  if (window.warpAO.config.env === 'prod') {
    backgroundMusic?.play();
  }
  const musicKey = mainScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  musicKey.on('up', () => {
    if (backgroundMusic?.isPlaying) {
      backgroundMusic?.stop();
    } else {
      backgroundMusic?.play();
    }
  });

  function addDeathSound(k, i) {
    mainScene[`${k}${i}DeathSound`] = mainScene.sound.add(`death_${k}_${i}`, { loop: false, volume: 2.0 });
  }
}

export function forDeathSounds(execute) {
  for (let i = 0; i < Const.DEATH_SOUND_OPTIONS; i++) {
    Object.values(Const.Kills).forEach((k) => execute(k, i + 1));
  }
}

export function doPlayAttackSound(beaverId, mainScene) {
  let sound = null;
  switch (beaverId) {
    case BEAVER_TYPES.heavy_beaver.name:
      sound = mainScene.attackHeavyBeaverSound;
      break;
    case BEAVER_TYPES.hacker_beaver.name:
      sound = mainScene.attackHackerBeaverSound;
      break;
    case BEAVER_TYPES.speedy_beaver.name:
      sound = mainScene.attackSpeedyBeaverSound;
      break;
    default:
      console.log('Beaver type not found');
  }
  if (sound != null) {
    sound.play();
  }
}

export function doPlayOpponentFinishedSound(player, revenge, mainScene) {
  if (revenge) {
    if (!mainScene.revengeSound.isPlaying) {
      mainScene.revengeSound.play();
    }
    return;
  }
  switch (player.stats.kills.fragsInRow) {
    case 1:
      if (!mainScene.firstBloodSound.isPlaying) {
        mainScene.firstBloodSound.play();
      }
      break;
    case 2:
      if (!mainScene.doubleKillSound.isPlaying) {
        mainScene.doubleKillSound.play();
      }
      break;
    case 3:
      if (!mainScene.tripleKillSound.isPlaying) {
        mainScene.tripleKillSound.play();
      }
      break;
    case 10:
      if (!mainScene.godLikeSound.isPlaying) {
        mainScene.godLikeSound.play();
      }
      break;
    default:
      if (!mainScene.beaverEliminatedSound.isPlaying) {
        mainScene.beaverEliminatedSound.play();
      }
  }
}
