const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const Command = {
  attack: 'attack',
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
  hp: { type: 'hp', tile: 1 },
  ap: { type: 'ap', tile: 0 },
  treasure: { type: 'treasure', tile: 0 },
  hole: { type: 'hole', tile: 1 },
  none: { type: 'none', tile: 2 },
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
