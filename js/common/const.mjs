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
  hp: 'hp',
  ap: 'ap',
  none: 'none',
};

export default {
  Command,
  Direction,
  EVENTS_NAME,
  Tile,
  GameObject,
};
