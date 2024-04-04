const EVENTS_NAME = {
  currentMove: 'currentMove',
};

const Command = {
  join: 'join',
  register: 'register',
  registered: 'registered',
  move: 'move',
  moved: 'moved'
}

const Direction = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}

const Tile = {
  size: 48
}

export default {
  Command, Direction, EVENTS_NAME, Tile
};

