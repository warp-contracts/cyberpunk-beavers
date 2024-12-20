import Const from '../../common/const.mjs';
import { forDeathSounds } from './sounds.js';

export function doPreloadAssets(mainScene) {
  // ===== MAP V2
  // load the PNG file
  // mainScene.load.image('map_sheet', 'assets/maps/v2/Sprite_Map_Sheet.png');
  mainScene.load.image(`war`, 'assets/images/tokens/war.png');
  mainScene.load.image(`trunk`, 'assets/images/tokens/trunk.png');
  mainScene.load.image(`tio`, 'assets/images/tokens/tio.png');
  mainScene.load.image(`rsg`, 'assets/images/tokens/rsg.png');
  mainScene.load.image(`gun`, 'assets/images/tokens/gun.png');

  preloadDesertMapAssets(mainScene);
  preloadCityMapAssets(mainScene);
  preloadHauntedMapAssets(mainScene);

  loadSpriteSheet(mainScene, 'cyberpunk_game_treasures', 'assets/images/game_treasures.png');

  // load the JSON file
  if (mainScene.mapTxId) {
    mainScene.load.tilemapTiledJSON(`map_${mainScene.mapTxId}`, `https://arweave.net/${mainScene.mapTxId}`);
  }
  // ===== MAP V2
  mainScene.load.image('cyberpunk_game_objects', 'assets/images/game_objects.png');
  mainScene.load.image('cyberpunk_game_fov', 'assets/images/fov.png');

  //mainScene.load.image('cyberpunk_game_treasures', 'assets/images/game_treasures.png');

  mainScene.load.image('post_apocalyptic_background', 'assets/images/christmas_ice.png');

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
  mainScene.load.audio('christmas_music', ['assets/audio/christmas_1.mp3']);
  mainScene.load.audio('christmas_music_2', ['assets/audio/christmas_2.mp3']);
  mainScene.load.audio('pick_up_sound', ['assets/audio/pick.mp3']);
  mainScene.load.audio('no_collect_sound', ['assets/audio/no_collect.mp3']);
  mainScene.load.audio('dig_sound', ['assets/audio/dig.mp3']);
  mainScene.load.audio('treasure_sound', ['assets/audio/treasure_arcade.mp3']);
  mainScene.load.audio('beaver_eliminated_sound', ['assets/audio/beaver_eliminated.m4a']);
  mainScene.load.audio('the_gun_collected_sound', ['assets/audio/the_gun_collected.m4a']);
  mainScene.load.audio('not_enough_ap', ['assets/audio/not_enough_ap.m4a']);
  mainScene.load.audio('critical_hit', ['assets/audio/critical_hit.m4a']);
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
  mainScene.load.audio('scan', ['assets/audio/scan.mp3']);
  mainScene.load.audio('explosion', ['assets/audio/explosion_powerful_dynamite.mp3']);
  mainScene.load.audio('blood_splat_1', ['assets/audio/blood_splat/blood_splat_1.mp3']);
  mainScene.load.audio('blood_splat_2', ['assets/audio/blood_splat/blood_splat_2.mp3']);
  mainScene.load.audio('additional_loot', ['assets/audio/additional_loot.mp3']);
  mainScene.load.audio('shrink_alarm', ['assets/audio/shrink_alarm.mp3']);
  mainScene.load.audio('quad_damage', ['assets/audio/quad_damage.m4a']);
  mainScene.load.audio('shot_buzz', ['assets/audio/shot_buzz.mp3']);
  mainScene.load.audio('haha', ['assets/audio/haha.mp3']);
  mainScene.load.audio('hohoho', ['assets/audio/hohoho.mp3']);
  // mainScene.load.audio('background_music_haunted_1', ['assets/audio/background_music_haunted_1.mp3']);
  // mainScene.load.audio('background_music_haunted_2', ['assets/audio/background_music_haunted_2.mp3']);
  mainScene.load.audio('heal_effect', ['assets/audio/heal_effect.mp3']);
  mainScene.load.audio('monster_eliminated', ['assets/audio/monster_eliminated.m4a']);
  mainScene.load.audio('new_wave', ['assets/audio/new_wave.m4a']);
  mainScene.load.audio('prepare_next_wave', ['assets/audio/prepare_next_wave.m4a']);
  mainScene.load.audio('drill', ['assets/audio/drill.mp3']);
  mainScene.load.audio('shield', ['assets/audio/shield.mp3']);
  mainScene.load.audio('xray', ['assets/audio/xray.mp3']);
  mainScene.load.audio('bringItOn', ['assets/audio/bring_it_on.m4a']);
  mainScene.load.audio('winning_team', ['assets/audio/winning_team.mp3']);
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

function loadSpriteSheet(mainScene, key, url) {
  mainScene.load.spritesheet(key, url, {
    frameWidth: 48,
    spacing: 0,
  });
}

function preloadDesertMapAssets(mainScene) {
  loadSpriteSheet(mainScene, 'map_sheet_desert', 'assets/maps/v2/desert/tilesets/Sprite_Map_Sheet.png');
}

function preloadCityMapAssets(mainScene) {
  loadSpriteSheet(mainScene, 'map_sheet_city_1', 'assets/maps/v2/city/tilesets/CC_City_Exterior_A2.png');
  loadSpriteSheet(mainScene, 'map_sheet_city_1_exp', 'assets/maps/v2/city/tilesets/CC_City_Exterior_A2_expanded.png');
  loadSpriteSheet(mainScene, 'map_sheet_city_2', 'assets/maps/v2/city/tilesets/CC_City_Exterior__A4.png');
  loadSpriteSheet(mainScene, 'map_sheet_city_2_exp', 'assets/maps/v2/city/tilesets/CC_City_Exterior__A4_expanded.png');
  loadSpriteSheet(mainScene, 'map_sheet_city_3', 'assets/maps/v2/city/tilesets/CC_City_Exterior_B.png');
  loadSpriteSheet(mainScene, 'map_sheet_city_4', 'assets/maps/v2/city/tilesets/CC_City_Exterior_C.png');
}

function preloadHauntedMapAssets(mainScene) {
  loadSpriteSheet(
    mainScene,
    'hauntedhouse_A2_dark_expanded',
    'assets/maps/v2/haunted/tilesets/hauntedhouse_A2_dark_expanded.png'
  );
  loadSpriteSheet(
    mainScene,
    'hauntedhouse_E_destroyed_dark',
    'assets/maps/v2/haunted/tilesets/hauntedhouse_E_destroyed_dark.png'
  );
  loadSpriteSheet(mainScene, 'hauntedhouse_D_dark', 'assets/maps/v2/haunted/tilesets/hauntedhouse_D_dark.png');
  loadSpriteSheet(
    mainScene,
    'hauntedhouse_A4_dark_expanded',
    'assets/maps/v2/haunted/tilesets/hauntedhouse_A4_dark_expanded.png'
  );
  loadSpriteSheet(
    mainScene,
    '$!Asylum_Door_Large_dark',
    'assets/maps/v2/haunted/tilesets/$!Asylum_Door_Large_dark.png'
  );
  loadSpriteSheet(mainScene, '!$mouse_holes', 'assets/maps/v2/haunted/tilesets/!$mouse_holes.png');
  loadSpriteSheet(mainScene, '!$rat_gray_dark', 'assets/maps/v2/haunted/tilesets/!$rat_gray_dark.png');
  loadSpriteSheet(
    mainScene,
    '$!Asylum_Door_Large_noframe_dark',
    'assets/maps/v2/haunted/tilesets/$!Asylum_Door_Large_noframe_dark.png'
  );
  loadSpriteSheet(
    mainScene,
    '$!curtains_destroyed_dark',
    'assets/maps/v2/haunted/tilesets/$!curtains_destroyed_dark.png'
  );
  loadSpriteSheet(mainScene, '$!Haunted_Painting_dark', 'assets/maps/v2/haunted/tilesets/$!Haunted_Painting_dark.png');
  loadSpriteSheet(
    mainScene,
    '$lightning_window_small_dark',
    'assets/maps/v2/haunted/tilesets/$lightning_window_small_dark.png'
  );
  loadSpriteSheet(mainScene, 'floating_couch_dark', 'assets/maps/v2/haunted/tilesets/floating_couch_dark.png');
  loadSpriteSheet(
    mainScene,
    '$!sliding_bookshelf_door_dark',
    'assets/maps/v2/haunted/tilesets/$!sliding_bookshelf_door_dark.png'
  );
  loadSpriteSheet(mainScene, 'drip_dark', 'assets/maps/v2/haunted/tilesets/drip_dark.png');
  loadSpriteSheet(mainScene, 'hauntedhouse_B_dark', 'assets/maps/v2/haunted/tilesets/hauntedhouse_B_dark.png');
  loadSpriteSheet(
    mainScene,
    'hauntedhouse_C_destroyed_dark',
    'assets/maps/v2/haunted/tilesets/hauntedhouse_C_destroyed_dark.png'
  );
  loadSpriteSheet(mainScene, '!$door', 'assets/maps/v2/snow/tilesets/!$door.png');
  loadSpriteSheet(mainScene, '!$lighthouseani', 'assets/maps/v2/snow/tilesets/!$lighthouseani.png');
  loadSpriteSheet(mainScene, 'non-rm-a1-square', 'assets/maps/v2/snow/tilesets/non-rm-a1-square.png');
  loadSpriteSheet(mainScene, 'non-rm-a2-square', 'assets/maps/v2/snow/tilesets/non-rm-a2-square.png');
  loadSpriteSheet(mainScene, 'non-rm-a3', 'assets/maps/v2/snow/tilesets/non-rm-a3.png');
  loadSpriteSheet(mainScene, 'non-rm-a4-square', 'assets/maps/v2/snow/tilesets/non-rm-a4-square.png');
  loadSpriteSheet(mainScene, 'Snow_A1', 'assets/maps/v2/snow/tilesets/Snow_A1.png');
  loadSpriteSheet(mainScene, 'Snow_A2', 'assets/maps/v2/snow/tilesets/Snow_A2.png');
  loadSpriteSheet(mainScene, 'Snow_A3', 'assets/maps/v2/snow/tilesets/Snow_A3.png');
  loadSpriteSheet(mainScene, 'Snow_A4', 'assets/maps/v2/snow/tilesets/Snow_A4.png');
  loadSpriteSheet(mainScene, 'Snow_A5', 'assets/maps/v2/snow/tilesets/Snow_A5.png');
  loadSpriteSheet(mainScene, 'Snow_B', 'assets/maps/v2/snow/tilesets/Snow_B.png');
  loadSpriteSheet(mainScene, 'Snow_C', 'assets/maps/v2/snow/tilesets/Snow_C.png');
  loadSpriteSheet(mainScene, 'Snow_D', 'assets/maps/v2/snow/tilesets/Snow_D.png');
  loadSpriteSheet(mainScene, 'Snow_E', 'assets/maps/v2/snow/tilesets/Snow_E.png');
  loadSpriteSheet(mainScene, '$oldtruck_tree', 'assets/maps/v2/snow/tilesets/$oldtruck_tree.png');
  loadSpriteSheet(mainScene, '$oldtruck', 'assets/maps/v2/snow/tilesets/$oldtruck.png');
  loadSpriteSheet(mainScene, '$snowglobe', 'assets/maps/v2/snow/tilesets/$snowglobe.png');
  loadSpriteSheet(mainScene, '$sleigh', 'assets/maps/v2/snow/tilesets/$sleigh.png');
  loadSpriteSheet(mainScene, 'Chr_A2', 'assets/maps/v2/snow/tilesets/Chr_A2.png');
  loadSpriteSheet(mainScene, 'Chr_B', 'assets/maps/v2/snow/tilesets/Chr_B.png');
  loadSpriteSheet(mainScene, 'Chr_non-rm-a2-square', 'assets/maps/v2/snow/tilesets/Chr_non-rm-a2-square.png');
}
