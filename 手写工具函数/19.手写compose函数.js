// 它将多个函数从右到左依次执行，即将每个函数的输出作为下一个函数的输入。
// pipe函数从左往右

function compose(...funcs) {
  if (funcs.length === 0) return (ags) => ags;
  if (funcs.length === 1) return funcs[0];
  return function (x) {
    return funcs.reduce((pre, cur) => cur(pre), x);
  };
}

function compose2(...funcs) {
  let count = funcs.length;
  let result;
  function inner(x) {
    if (count < 0) {
      return result;
    } else {
      result = funcs[count--](x);
      return inner(result);
    }
  }
  return inner;
}

const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;
const square = (x) => x * x;

const composedFunction = compose(square, multiply2, add1);
const result = composedFunction(2);
// 等价于 square(multiply2(add1(2)))
// 等价于 square(multiply2(3))
// 等价于 square(6)
// 结果是 36

console.log(result); // 输出: 36
