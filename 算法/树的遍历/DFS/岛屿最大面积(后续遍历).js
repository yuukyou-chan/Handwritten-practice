/**
 * @param {number[][]} grid
 * @return {number}
 */
// leetCode： https://leetcode.cn/problems/ZL6zAn/
// 思路分析: 不要看到二维数组就动态规划、动态规划需要有状态转移
// 这是一个搜索问题：深度优先搜索、广度优先搜索都可以做
// 遍历二维数组、找到 1 就开始扩散搜索附近节点，注意去重将访问过的节点置为0，避免重复计算
var maxAreaOfIsland = function (grid) {
  let maxS = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  function DFS(i, j) {
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === 0) return 0;
    // 标记当前单元格为已访问（关键修复）
    grid[i][j] = 0;
    const a = DFS(i - 1, j);
    const b = DFS(i + 1, j);
    const c = DFS(i, j + 1);
    const d = DFS(i, j - 1);

    return a + b + c + d + 1;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        const s = DFS(i, j);
        maxS = Math.max(maxS, s);
      }
    }
  }
  return maxS;
};
