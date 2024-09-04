import Const from '../../common/const.mjs';
import { forDeathSounds } from './sounds.js';

export function doPreloadAssets(mainScene) {
  // ===== MAP V2
  // load the PNG file
  // mainScene.load.image('map_sheet', 'assets/maps/v2/Sprite_Map_Sheet.png');
  mainScene.load.spritesheet('map_sheet', 'assets/maps/v2/Sprite_Map_Sheet.png', { frameWidth: 48, spacing: 0 });
  mainScene.load.spritesheet('cyberpunk_game_treasures', 'assets/images/game_treasures.png', {
    frameWidth: 48,
    spacing: 0,
  });

  // load the JSON file
  mainScene.load.tilemapTiledJSON(`map_${mainScene.mapTxId}`, `https://arweave.net/${mainScene.mapTxId}`);
  // ===== MAP V2
  mainScene.load.image('cyberpunk_game_objects', 'assets/images/game_objects.png');

  //mainScene.load.image('cyberpunk_game_treasures', 'assets/images/game_treasures.png');

  mainScene.load.image('medal_gold', 'assets/images/medal-gold.png');
  mainScene.load.image('medal_silver', 'assets/images/medal-silver.png');
  mainScene.load.image('medal_brown', 'assets/images/medal-brown.png');

  Object.keys(Const.BEAVER_TYPES).forEach((b) => {
    loadBeaverAssets(b);
  });

  mainScene.load.atlas(
    `explosion_anim`,
    `assets/images/anims/explosion/explosion_anim.png`,
    `assets/images/anims/explosion/explosion_anim_atlas.json`
  );

  mainScene.load.atlas(
    `blood_splat_1`,
    `assets/images/anims/blood_splat/blood_splat_1.png`,
    `assets/images/anims/blood_splat/blood_splat_1_atlas.json`
  );

  mainScene.load.atlas(
    `blood_splat_2`,
    `assets/images/anims/blood_splat/blood_splat_2.png`,
    `assets/images/anims/blood_splat/blood_splat_2_atlas.json`
  );

  mainScene.load.audio('game_active_sound', ['assets/audio/game_active.mp3']);
  mainScene.load.audio('background_music', ['assets/audio/background_music.mp3']);
  mainScene.load.audio('background_music_metal', ['assets/audio/background_music_metal.mp3']);
  mainScene.load.audio('pick_up_sound', ['assets/audio/pick.mp3']);
  mainScene.load.audio('no_collect_sound', ['assets/audio/no_collect.mp3']);
  mainScene.load.audio('dig_sound', ['assets/audio/dig.mp3']);
  mainScene.load.audio('treasure_sound', ['assets/audio/treasure_arcade.mp3']);
  mainScene.load.audio('beaver_eliminated_sound', ['assets/audio/beaver_eliminated.m4a']);
  mainScene.load.audio('not_enough_ap', ['assets/audio/not_enough_ap.m4a']);
  mainScene.load.audio('new_challenger', ['assets/audio/new_challenger.m4a']);
  mainScene.load.audio('game_over', ['assets/audio/game_over.m4a']);
  mainScene.load.audio('3_rounds_left', ['assets/audio/3_rounds_left.m4a']);
  mainScene.load.audio('last_round', ['assets/audio/last_round.m4a']);
  mainScene.load.audio('first_blood', ['assets/audio/first_blood.m4a']);
  mainScene.load.audio('double_kill', ['assets/audio/double_kill.m4a']);
  mainScene.load.audio('triple_kill', ['assets/audio/triple_kill.m4a']);
  mainScene.load.audio('god_like', ['assets/audio/god_like.m4a']);
  mainScene.load.audio('revenge', ['assets/audio/revenge.m4a']);
  mainScene.load.audio('teleport', ['assets/audio/teleport.mp3']);
  mainScene.load.audio('explosion', ['assets/audio/explosion_powerful_dynamite.mp3']);
  mainScene.load.audio('blood_splat_1', ['assets/audio/blood_splat/blood_splat_1.mp3']);
  mainScene.load.audio('blood_splat_2', ['assets/audio/blood_splat/blood_splat_2.mp3']);
  forDeathSounds((k, i) => loadDeathSound(k, i));

  function loadDeathSound(k, i) {
    mainScene.load.audio(`death_${k}_${i}`, [`assets/audio/death_${k}_${i}.mp3`]);
  }

  function loadBeaverAssets(beaver) {
    mainScene.load.image(`${beaver}_48`, `assets/images/beavers/${beaver}/${beaver}_48px.png`);
    loadBeaverAnim(beaver, 'idle');
    loadBeaverAnim(beaver, 'walk');
    loadBeaverAnim(beaver, 'attack');
    loadBeaverAnim(beaver, 'dig');
    loadBeaverAnim(beaver, 'pick');
    Object.values(Const.Kills).forEach((k) => loadBeaverAnim(beaver, `death_${k}`));
    mainScene.load.audio(`attack_${beaver}_sound`, [`assets/audio/attack_${beaver}.mp3`]);
  }

  function loadBeaverAnim(beaver, asset) {
    mainScene.load.atlas(
      `${beaver}_anim_${asset}`,
      `assets/images/beavers/${beaver}/${beaver}_anim_${asset}.png`,
      `assets/images/beavers/${beaver}/${beaver}_anim_${asset}_atlas.json`
    );
  }
}
