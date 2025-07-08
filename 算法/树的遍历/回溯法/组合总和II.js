// https://leetcode.cn/problems/combination-sum-ii/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const res = [];
  const path = [];
  let sum = 0;
  candidates.sort((a, b) => a - b);

  function backtracing(path, startIndex) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      const currNum = candidates[i];
      if (i > startIndex && candidates[i] === candidates[i - 1]) continue;

      sum += currNum;
      if (sum > target) {
        sum -= currNum;
        break;
      }
      path.push(currNum);
      backtracing(path, i + 1);
      sum -= currNum;
      path.pop();
    }
  }
  backtracing(path, 0);
  return res;
};
