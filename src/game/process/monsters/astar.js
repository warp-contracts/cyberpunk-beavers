import Const from '../../common/const.mjs';

const { EMPTY_TILE } = Const;

export class AStar {
  constructor(obstaclesGrid, playersGrid, monstersGrid) {
    this.rows = obstaclesGrid.length;
    this.cols = obstaclesGrid[0].length;
    this.obstaclesGrid = obstaclesGrid;
    this.playersGrid = playersGrid;
    this.monstersGrid = monstersGrid;
  }

  findPath(start, end) {
    // console.log({ start, end });
    const openSet = [];
    const closedSet = [];

    const openSetMap = {};
    const closedSetMap = {};
    openSet.push(start);

    while (openSet.length > 0) {
      // Find the node with the lowest total cost in the open set
      let currentNode = openSet[0];
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < currentNode.f || (openSet[i].f === currentNode.f && openSet[i].h < currentNode.h)) {
          currentNode = openSet[i];
        }
      }

      // Remove the current node from the open set
      openSet.splice(openSet.indexOf(currentNode), 1);
      delete openSetMap[`${currentNode.row}:${currentNode.col}`];

      closedSetMap[`${currentNode.row}:${currentNode.col}`] = currentNode;
      closedSet.push(currentNode);

      // If the current node is the goal, reconstruct the path
      if (currentNode.row === end.row && currentNode.col === end.col) {
        let path = [];
        let temp = currentNode;
        while (temp) {
          path.push(temp);
          temp = temp.parent;
        }
        const result = path.reverse();
        // console.log({firstStep: result[0]});
        return result;
      }

      // Generate neighbors of the current node
      const neighbors = [];
      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]; // Right, Down, Left, Up

      for (let dir of directions) {
        const neighborRow = currentNode.row + dir[0];
        const neighborCol = currentNode.col + dir[1];

        if (this._isValidCell(neighborRow, neighborCol)) {
          const neighbor = {
            row: neighborRow,
            col: neighborCol,
            g: currentNode.g + 1, // Cost to move to a neighboring cell is 1
            h: heuristic({ row: neighborRow, col: neighborCol }, end),
            f: 0,
            parent: currentNode,
          };

          neighbor.f = neighbor.g + neighbor.h;

          // Check if the neighbor is already in the closed set
          /*console.log(`Checking in closed set`, {
            length: closedSet.length
          });*/
          if (closedSetMap[`${neighbor.row}:${neighbor.col}`]) {
            continue;
          }
          /*if (closedSet.some((node) => node.row === neighbor.row && node.col === neighbor.col)) {
            continue;
          }*/

          // Check if the neighbor is already in the open set
          const openSetNode = openSetMap[`${neighbor.row}:${neighbor.col}`]; //openSet.find((node) => node.row === neighbor.row && node.col === neighbor.col);
          if (!openSetNode || neighbor.g < openSetNode.g) {
            openSet.push(neighbor);
            openSetMap[`${neighbor.row}:${neighbor.col}`] = neighbor;
          }
        }
      }
    }

    function heuristic(a, b) {
      return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    }
  }

  _isValidCell(row, col) {
    return (
      row >= 0 &&
      row < this.rows &&
      col >= 0 &&
      col < this.cols &&
      this.obstaclesGrid[row][col] <= EMPTY_TILE &&
      /*&& this.playersGrid[row][col] == null*/
      this.monstersGrid[row][col] == null
    );
  }
}
