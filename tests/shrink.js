import { calculateShrinkSchedule } from '../src/game/process/cmd/setup.mjs';

function shrinkArray(arr, halfShrinkSize) {
  arr.splice(0, halfShrinkSize);
  arr.splice(arr.length - halfShrinkSize, halfShrinkSize);
}

const test = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function doShrink() {
  // remove rows
  const halfShrinkSize = 2;
  shrinkArray(test, halfShrinkSize);

  // remove columns
  test.forEach((row) => {
    console.log('before:', row);
    shrinkArray(row, halfShrinkSize);
    console.log('after:', row);
  });

  console.dir(JSON.stringify(test), { depth: null });
}

function modifyObstaclesLayer(obstaclesTilemap, offset, size) {
  const playersPositionsToCheck = [];
  for (let y = offset; y < obstaclesTilemap.length - offset; y++) {
    for (let x = offset; x < obstaclesTilemap.length - offset; x++) {
      if (
        y - offset < size ||
        x - offset < size ||
        y > obstaclesTilemap.length - offset - size - 1 ||
        x > obstaclesTilemap.length - offset - size - 1
      ) {
        obstaclesTilemap[y][x] = 100;
        playersPositionsToCheck.push({ x, y });
      }
    }
  }

  return playersPositionsToCheck;
}

// const result = modifyObstaclesLayer(test, 1, 4);
//console.log(JSON.stringify(test));
//console.table(test);

//console.table(result);
//doShrink();

console.table(calculateShrinkSchedule((5 * 60 * 1000) / 10_000, 30));
