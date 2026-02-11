// https://leetcode.cn/problems/combination-sum-iii/
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const res = [];
  let path = [];
  let sum = 0;
  function backtracing(path, start) {
    if (sum === n && path.length === k) {
      res.push([...path]);
      return;
    }
    // 回溯法本质是 DFS 递归遍历 n 叉树，要访问当前层的所有子节点所以用for 循环
    for (let i = start; i <= 9; i++) {
      sum += i;
      path.push(i);
      backtracing(path, i + 1);
      path.pop(i);
      sum -= i;
    }
  }
  backtracing(path, 1);
  return res;
};
