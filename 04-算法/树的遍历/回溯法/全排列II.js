/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 字节一面 全排列 I https://leetcode.cn/problems/permutations/description/

// 全排列II https://leetcode.cn/problems/permutations-ii/
var permuteUnique = function (nums) {
  const path = [];
  const res = [];
  const used = [];
  nums.sort((a, b) => a - b);

  function backTracing(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      const currNum = nums[i];

      // nums[i] === nums[i-1] && !used[i-1] 进行去重；!used[i-1] 是为了进行树层去重，避免走到树枝
      if (used[i] || (nums[i] === nums[i - 1] && !used[i - 1])) {
        continue;
      }
      path.push(currNum);
      used[i] = true;
      backTracing(path, i + 1);
      path.pop();
      used[i] = false;
    }
  }
  backTracing(path, 0);
  return res;
};
