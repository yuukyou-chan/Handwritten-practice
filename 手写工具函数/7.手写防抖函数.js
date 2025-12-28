function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(), delay);
  };
}

// 滴滴 快手 返回函数的执行结果
// 思路：因为是异步执行，必须返回一个 Promise 才能让外部拿到结果
function debounce2(fn, delay) {
  let timer = null;
  let resolveFn = null;
  const resPromise = new Promise((res,rej) => {
    resolveFn = res;
  })
  return function(...args) {
    const context = this;
    if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // 执行函数并 resolve 结果
        const result = fn.apply(context, args);
        resolveFn(result);
      }, delay);

    // 返回一个 Promise
    return resPromise
  };
}

// 使用示例：
// const dFn = debounce2((val) => val, 1000);
// dFn('hello').then(res => console.log(res)); // 1秒后输出 hello
