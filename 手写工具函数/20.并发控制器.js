// 实现一个并发请求控制器
// 得物 一面 手写题

const limitRequest = (fnArr, limit) => {
  return new Promise((resolve, reject) => {
    const len = fnArr.length;
    if (len === 0) return resolve([]);

    const results = new Array(len);
    let nextIndex = 0;      // 下一个待启动的任务索引
    let completedCount = 0; // 已完成的任务总数

    const run = () => {
      // 1. 所有的任务都已经启动了，停止递归
      if (nextIndex >= len) return;

      // 2. 核心：通过闭包锁定当前的索引位置
      // nextIndex++ 是先赋值后+1 此时currentIndex = 0
      const currentIndex = nextIndex++; 
      const task = fnArr[currentIndex];

      task()
        .then((res) => {
          results[currentIndex] = res; // 确保结果顺序
          completedCount++;

          // 3. 只有当【所有】任务都执行完毕才 resolve
          if (completedCount === len) {
            resolve(results);
          } else {
            // 4. 一个任务结束，立刻拉取下一个任务进入执行池
            run();
          }
        })
        .catch((err) => {
          reject(err); // 任何一个失败则整体失败
        });
    };

    // 5. 初始启动 limit 个并发任务
    const initialCount = Math.min(limit, len);
    for (let i = 0; i < initialCount; i++) {
      run();
    }
  });
};

let p1 = () =>
  new Promise(function (resolve, reject) {
    console.log("开始执行1");
    setTimeout(function () {
      console.log("1执行完毕");
      resolve(1);
    }, 2000);
  });
let p2 = () =>
  new Promise(function (resolve, reject) {
    console.log("开始执行2");
    setTimeout(function () {
      console.log("2执行完毕");
      resolve(2);
    }, 2000);
  });
let p3 = () =>
  new Promise(function (resolve, reject) {
    console.log("开始执行3");
    setTimeout(function () {
      console.log("3执行完毕");
      resolve(3);
    }, 2000);
  });
let p4 = () =>
  new Promise(function (resolve, reject) {
    console.log("开始执行4");
    setTimeout(function () {
      console.log("4执行完毕");
      resolve(4);
    }, 2000);
  });
let p5 = () =>
  new Promise(function (resolve, reject) {
    console.log("开始执行5");
    setTimeout(function () {
      console.log("5执行完毕");
      resolve(5);
    }, 2000);
  });

const limitRequest2 = (fnArr, limit) => {
  return new Promise((resolve, reject) => {
    // let count = 0; // 当前正在执行的请求数量
    let currPosition = 0; // 当前处理的请求索引
    const resContainer = new Array(fnArr.length); // 结果容器，长度固定为 fnArr.length

    const request = (position) => {
      // 执行当前请求
      fnArr[position]()
        .then((res) => {
          resContainer[position] = res; // 将结果按原始顺序存入 resContainer
        })
        .catch((error) => {
          reject(error); // 如果任何一个请求失败，立即返回失败原因
        })
        .finally(() => {
          // count--; // 当前请求完成，减少正在执行的请求数量
          if (currPosition < fnArr.length) {
            request(currPosition); // 启动下一个请求
            currPosition++; // 移动到下一个索引
          }
          // 如果所有请求都已完成，返回结果数组
          if (position === fnArr.length - 1) {
            console.log("resContainer", resContainer);
            resolve(resContainer);
          }
        });
    };

    // 启动初始的请求（不超过并发限制）
    for (let i = 0; i < Math.min(limit, fnArr.length); i++) {
      // count++;
      request(currPosition);
      currPosition++;
    }
  });
};
const arr = [p1, p2, p3, p4, p5];

limitRequest2(arr, 2).then((res) => console.log(res));
