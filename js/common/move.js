import Const from './const.mjs'

export default function move(pos, direction) {
  switch (direction) {
    case Const.Direction.left:
      pos[0] -= 1
      break
    case Const.Direction.right:
      pos[0] += 1
      break
    case Const.Direction.up:
      pos[1] -= 1
      break
    case Const.Direction.down:
      pos[1] += 1
      break
  }
  return pos
}
