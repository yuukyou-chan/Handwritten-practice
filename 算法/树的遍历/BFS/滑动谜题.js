/**
 * @param {number[][]} board
 * @return {number}
 */

// https://leetcode.cn/problems/sliding-puzzle/
var slidingPuzzle = function (board) {
  const visited = new Set();
  const queue = [String(board)];
  let steps = 0;
  // map 表示把二维数组展开后的 当前一维数组位置的相邻位置
  const map = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4],
  ];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const currNode = queue.shift();
      if (currNode === "1,2,3,4,5,0") {
        return steps;
      }
      if (visited.has(currNode)) continue;
      visited.add(currNode);

      const zeroPosition = currNode.split(",").findIndex((i) => i === "0");
      for (let j = 0; j < map[zeroPosition].length; j++) {
        const currStr = currNode.split(",");
        const currP = map[zeroPosition][j];
        [currStr[currP], currStr[zeroPosition]] = [
          currStr[zeroPosition],
          currStr[currP],
        ];
        if (!visited.has(currStr.join(","))) {
          queue.push(currStr.join(","));
        }
      }
    }
    steps++;
  }
  return -1;
};

let board = [
  [4, 1, 2],
  [5, 0, 3],
];

console.log(slidingPuzzle(board));
