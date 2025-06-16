var topKFrequent = function (nums, k) {
  const map = new Map();
  let res = [];
  nums.map((i) => {
    if (map.get(i)) {
      map.set(i, map.get(i) + 1);
    } else {
      map.set(i, 1);
    }
  });

  const mapArr = Array.from(map).sort((a, b) => {
    console.log(a, b, "a, b");
    return b[1] - a[1];
  });

  console.log(mapArr, "mapArr");
  for (let i = 0; i < k; i++) {
    res.push(mapArr[i][0]);
  }
  return res;
};
nums = [3, 0, 1, 0];
k = 1;
console.log(topKFrequent(nums, k));
