// 柯里化
function curryAdd() {
  const params = [...arguments];
  function curried() {
    if (arguments.length >= 1) {
      params.push(...arguments);

      return curried;
    } else {
      return params.reduce((pre, cur) => pre + cur, 0);
    }
  }
  return curried;
}
const sum = curryAdd(1, 2, 3)(4, 5)(5, 6)();
console.log(sum);
