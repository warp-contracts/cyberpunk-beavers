export const EMPTY_TILE = 0;
export const OBSTACLES_DEPTH = -100;
export const OBJECTS_DEPTH = 80;
export const PLAYER_DEPTH = 100;
export const MAIN_PLAYER_DEPTH = 200;
export const FRONT_LAYER_DEPTH = 1000;
export const FOV_DEPTH = 10000;
export const FOG_ALPHA = 0.4;
export const MINIMAP_SIZE_PX = 250;
export const COLLISIONS_LAYER = 'collisions';
export const FRONT_LAYER_PREFIX = 'front';

export const DEFAULT_BG_MUSIC = 'backgroundMusic';

export const DEV_MAP = 'b4m3';

const maps_snow = {
  b4m1: {
    txId: 'HJZzZP2yiQ1H1pfB997xfCL6OkbZyAmp-_SAEZLMdwY',
    music: 'christmasMusic2',
  },
  b4m2: {
    txId: '5lQ6D8daF0uznGUK5xhc81_ZK7v8bP3H0xHao4ihH5M',
    music: 'christmasMusic',
  },
  b4m3: {
    txId: 'Nm6Lq4iFbYbouRS3Sv--e3P5p5Z_aae3L4F8gHJVKtg',
    music: 'christmasMusic2',
  },
};

const maps_desert = {
  b1m1: {
    txId: 'GdAsRCknjjudRxmIvGvNCtM3JLxUDW2B6cCF_Tvd7g8',
    music: 'backgroundMusicMetal',
  },
  b1m2: {
    txId: 'YNFa9YBS_M4GtRF4BF2-aiy-JuX0CqO5nuclaE1yIDQ',
    music: 'backgroundMusic',
  },
  b1m3: {
    txId: 'v9vRtTZJfdX2cyZ_KG96cUKpvQjXz7KHJlPrJgS0Adc',
    music: 'backgroundMusicMetal',
  },
  b1m4: {
    txId: 'Cbdwm_6JDDmtllVzmtrsDqK2fULK9A8YRqivCAjzDV0',
    music: 'backgroundMusic',
  },
  b1m5: {
    txId: 'fcH7-DtyZk3sCJzN9qUUIVVFagV6rf5RdYR7zpQD5d4',
    music: 'backgroundMusicMetal',
  },
  b1m6: {
    txId: 'XuxDKD4nXTxCB7UeKKgIjhOGkbvcEUl93Qz4lsowGoM',
    music: 'backgroundMusic',
  },
  b1m7: {
    txId: 'z0rycDjxuLsrP_I6hKbm7lXPQ1wsLwkKkDfvIk5EiQA',
    music: 'backgroundMusicMetal',
  },
};
const maps_city = {
  b2m1: {
    txId: 'rnq-Mem2T_WjPPkCIBWgnFYXZuGIiPtzo0nHpTOUAxU',
    music: 'backgroundMusic',
  },
  b2m2: {
    txId: '9pupw_-i_5hIN0PrwDiDMAszZRBGLFXjlcPQX7UYye0',
    music: 'backgroundMusicMetal',
  },
  b2m3: {
    txId: 'S1WqprUkSrgnoZmFMS26Ur73hGn3NccHsJT6pq134sY',
    music: 'backgroundMusic',
  },
  b2m4: {
    txId: '5Klvs5p4EsGbMZKXHLcUG0LoYzMqsshdv1guud__lVY',
    music: 'backgroundMusicMetal',
  },
  b2m5: {
    txId: 'MpjJMdxTP4iEE76aIScmSjLY6JGSUxOhWZaHJZNg8aM',
    music: 'backgroundMusic',
  },
};
const maps_haunted = {
  b3m1: {
    txId: 'c0kF0CSoNGLrTBnxFtIq6yRubM5xULnKmvDbuvTv8aM',
    music: 'backgroundMusicHaunted_2',
  },
  b3m2: {
    txId: 'SaEQ3VGuJNDjoj47LNHuRLe_mUD61SSyr3yWBCKLIcM',
    music: 'backgroundMusicHaunted_1',
  },
  b3m3: {
    txId: '_TBpJY3JzCyZtPaXFJ6gG8vLTyUPwyOCuTIKpUmRr8k',
    music: 'backgroundMusicHaunted_2',
  },
  b3m4: {
    txId: 'HsIpwTIIlTRZT1apXSznirc7Z8x-C4vvot9LggbcA00',
    music: 'backgroundMusicHaunted_1',
  },
  b3m5: {
    txId: 'Kyiw5H3sxkLflVmT2cn3A3j2Z9vXxs02Dy2O78eU8x4',
    music: 'backgroundMusicHaunted_2',
  },
};

export const maps = {
  ...maps_desert,
  ...maps_city,
  ...maps_haunted,
  ...maps_snow,
};
