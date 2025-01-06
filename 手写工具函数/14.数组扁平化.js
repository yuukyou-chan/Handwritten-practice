function flat(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // 易错点：这里不能直接push，flat函数返回的是数组，又push进去了

      res = [...res, ...flat(arr[i])];
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
const arr = [1, [2, 3, 4], 5, [6, [7, 9], 8]];
console.log(flat(arr));
