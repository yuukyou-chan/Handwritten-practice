function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      res[i] = Promise.resolve(arr[i]);
    }
  });
}

// 核心点：
// 1. PromiseAll 返回 promise，当所有promise fulfill 了 才resolve，有一个reject 就reject
// 2. 可以使用 Promise.resolve 执行promise,再接着使用then方法拿到结果(直接then方法也行)
// 3. promise.then 方法接受两个回调函数，第一个 成功时执行，第二失败时执行,两个
// 4. 使用变量记住

function bestPromiseAll(arr) {
  return new Promise((resolve, reject) => {
    let res = [];
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i]).then(
        (v) => {
          res[i] = v;
          count++;
          if (count === arr.length) return resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}

// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
bestPromiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});
