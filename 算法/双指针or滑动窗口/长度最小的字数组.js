//2、给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组，打印该子数组并返回其长度。如果不存在符合条件的子数组，返回 0。
var minSubArrayLen = function (target, nums) {
  let left = 0; // 窗口左边界
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    // 当窗口合满足条件时，尝试收缩左边界
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLength === Infinity ? 0 : minLength;
};

console.log(
  minSubArrayLen(80, [10, 5, 13, 4, 8, 4, 5, 11, 14, 9, 16, 10, 20, 8])
);
