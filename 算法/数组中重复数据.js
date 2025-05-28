// 腾讯云二面：
// 1、给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。找到所有出现两次的元素。
// leetCode 422 https://leetcode.cn/problems/find-all-duplicates-in-an-array/description/

function findDuplicates(nums) {
  const map = new Map();
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    const currNum = map.get(nums[i]);
    if (currNum === 1) {
      res.push(nums[i]);
    } else if (!map.has(nums[i])) {
      map.set(nums[i], (currNum || 0) + 1);
    }
  }

  return res;
}

// 原地哈希
function findDuplicates(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const verseNum = nums[0 - nums[i]];
    if (verseNum !== undefined) {
      res.push(nums[i]);
    } else {
      nums[0 - nums[i]] = nums[i];
    }
  }

  return res;
}

const nums = [4, 3, 2, 7, 8, 2, 3, 1];

console.log(findDuplicates(nums));
