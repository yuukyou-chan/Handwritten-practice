var twoSum = function (numbers, target) {
  let res = [];
  let left = 0,
    right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];

    if (sum === target) {
      res = [left + 1, right + 1];
      return res;
    }
    if (sum > target) right--;
    if (sum < target) left++;
  }

  return res;
};
(numbers = [2, 7, 11, 15]), (target = 9);
console.log(twoSum(numbers, target));
