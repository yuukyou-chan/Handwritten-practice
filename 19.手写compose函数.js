// 它将多个函数从右到左依次执行，即将每个函数的输出作为下一个函数的输入。
// pipe函数从左往右

function compose(...funcs) {
  if (funcs.length === 0) return (ags) => ags;
  if (funcs.length === 1) return funcs[0];
  return function (x) {
    return funcs.reduce((pre, cur) => () => pre(cur(x)));
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
