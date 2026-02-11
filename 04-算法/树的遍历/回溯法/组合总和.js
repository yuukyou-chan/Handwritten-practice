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
  const res = [];
  const path = [];
  let sum = 0;
  
  // 排序是为了后续剪枝优化
  candidates.sort((a, b) => a - b);

  function backTracing(startIndex) {
    // 终止条件
    if (sum === target) {
      res.push([...path]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      // 剪枝：如果当前 sum 加上这个数已经超过 target，因为数组已排序，后面的数更不用看了
      if (sum + candidates[i] > target) break;

      // 做选择
      sum += candidates[i];
      path.push(candidates[i]);

      // 递归：传入 i 而不是 i + 1，表示可以重复使用当前数字
      backTracing(i);

      // 回溯：撤销选择，状态恢复必须完全对称
      sum -= candidates[i];
      path.pop();
    }
  }

  backTracing(0);
  return res;
};

let candidates = [2, 3, 6, 7];
let target = 7;

console.log(combinationSum(candidates, target));
