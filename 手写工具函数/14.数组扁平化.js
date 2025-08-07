// 方法1 递归
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

// 不用递归还能用什么方式 ？迭代法
// 队列会存在顺序不一致的问题
const flatWithQueue = (arr) => {
  const res = [];
  const queue = [arr];
  while (queue.length) {
    const item = queue.shift();
    if (Array.isArray(item)) {
      queue.push(...item);
    } else {
      res.push(item);
    }
  }
  return res;
};

// 方法2: 迭代法
function flatWithStack(arr) {
  const stack = [arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 展开数组并压入栈
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }
  return result;
}

const arr = [1, [2, 3, 4], 5, [6, [7, 8], 9]];
console.log(flatWithStack(arr));

// 方法3： 字符串
arr
  .toString()
  .split(",")
  .map((item) => Number(item));
