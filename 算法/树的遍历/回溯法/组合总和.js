/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
/**
 *
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 */
// https://leetcode.cn/problems/combination-sum/
var combinationSum = function (candidates, target) {
  let path = [];
  const res = [];
  let sum = 0;
  candidates.sort((a, b) => a - b);

  function backTracing(path) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < candidates.length; i++) {
      sum += candidates[i];
      if (sum > target) {
        sum = 0;
        path = [];
        continue;
      }
      path.push(candidates[i]);
      backTracing(path);
      sum -= candidates[i];
      path.pop(candidates[i]);
    }
  }
  backTracing(path);
  return res;
};

let candidates = [2, 3, 6, 7];
let target = 7;

console.log(combinationSum(candidates, target));
