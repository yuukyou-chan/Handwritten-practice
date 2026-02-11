/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

// https://leetcode.cn/problems/zlDJc7/

const up = (str, p) => {
  const strArr = str.split("");
  if (strArr[p] === "9") {
    strArr[p] = "0";
  } else {
    strArr[p] = Number(strArr[p]) + 1;
  }
  return strArr.join("");
};

const down = (str, p) => {
  const strArr = str.split("");
  if (strArr[p] === "0") {
    strArr[p] = "9";
  } else {
    strArr[p] = Number(strArr[p]) - 1;
  }
  return strArr.join("");
};

// 抽象成8叉树，BFS 求最短深度
var openLock = function (deadends, target) {
  const visited = new Set();
  const deadArr = new Set(deadends);
  const queue = ["0000"];
  visited.add("0000");
  let step = 0;

  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const currNode = queue.shift();
      // 添加的时候再标记访问
      // visited.add(currNode)
      if (deadArr.has(currNode)) {
        continue;
      }
      if (currNode === target) {
        return step;
      }
      for (let j = 0; j < 4; j++) {
        const upNum = up(currNode, j);
        if (!visited.has(upNum)) {
          queue.push(upNum);
          visited.add(upNum);
        }
        const downNum = down(currNode, j);
        if (!visited.has(downNum)) {
          queue.push(downNum);
          visited.add(downNum);
        }
      }
    }
    step++;
  }
  return -1;
};
