// 实现一个并发请求控制器
// 得物 一面 手写题

const limitRequest = (fnArr, limit) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let currPosition = 0;
    const resContainer = [];

    const request = (position) => {
      // console.log("当前位置", currPosition);
      fnArr[currPosition]().then((res) => {
        count--;
        resContainer[position] = res;
        if (count < limit && currPosition < fnArr.length) {
          count++;
          request(currPosition + 1);
        }
        if (currPosition === fnArr.length) {
          return resolve(resContainer);
        }
      });
      currPosition++;
    };

    for (let i = 0; i < limit; i++) {
      count++;
      request(currPosition);
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
    let count = 0; // 当前正在执行的请求数量
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
          count--; // 当前请求完成，减少正在执行的请求数量
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
      count++;
      request(currPosition);
      currPosition++;
    }
  });
};
const arr = [p1, p2, p3, p4, p5];

limitRequest2(arr, 2).then((res) => console.log(res));
