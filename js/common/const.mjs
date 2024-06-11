const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const Command = {
  attack: 'attack',
  attacked: 'attacked',
  join: 'join',
  move: 'move',
  moved: 'moved',
  register: 'register',
  registered: 'registered',
  stats: 'stats',
  pick: 'pick',
  picked: 'picked',
  dig: 'dig',
  digged: 'digged',
  token: 'token',
};

const Direction = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
};

const Tile = {
  size: 48,
};

const GameObject = {
  hp: { type: 'hp', tile: 1, value: 5 },
  ap: { type: 'ap', tile: 0, value: 5 },
  treasure: { type: 'treasure', tile: 0, value: 1000 },
  hole: { type: 'hole', tile: 1, value: 0 },
  none: { type: 'none', tile: 2, value: 0 },
};

const Scores = {
  hp: 'hp',
  ap: 'ap',
  coin: '$',
};

const Errors = {
  notRegistered: 'Player not registered',
  invalidWallet: 'Wallet address is invalid',
};

export default {
  Command,
  Direction,
  EVENTS_NAME,
  Errors,
  Tile,
  GameObject,
  Scores,
};
