/**
 * 要点：
 * 1.this 指向调用的数组本身
 * 2.reduce 传入一个函数和 初始值
 */
Array.prototype._reduce = function (fn, init) {
  let pre = init;
  for (let i = 0; i < this.length; i++) {
    pre = fn(pre, this[i]);
  }
  return pre;
};

console.log([1, 2, 3, 4, 5]._reduce((t, c) => t + c, 0));
