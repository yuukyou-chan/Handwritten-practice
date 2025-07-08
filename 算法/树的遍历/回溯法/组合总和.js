/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
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
