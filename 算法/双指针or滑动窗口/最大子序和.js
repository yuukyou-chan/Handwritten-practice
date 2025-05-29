// 腾讯云2面
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
//子数组 是数组中的一个连续部分。

var maxSubArray = function (nums) {
  let sum = 0;
  let maxSum = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    // 和为负数说明灰影响后面的累加，直接丢掉前面一堆
    if (sum < 0) {
      sum = nums[++right];
    }
    maxSum = Math.max(sum, maxSum);
  }

  return maxSum;
};
console.log(maxSubArray([-1]));
