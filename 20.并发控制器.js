// 实现一个并发请求控制器
const limitRequest = (fnArr, limit) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let currPosition = 0;
    const resContainer = [];

    const request = () => {
      // console.log("当前位置", currPosition);
      fnArr[currPosition]().then((res) => {
        count--;
        resContainer[currPosition] = res;
        if (count < limit && currPosition < fnArr.length) {
          count++;
          request();
        }
        if (currPosition === fnArr.length) {
          return resolve(resContainer);
        }
      });
      currPosition++;
    };

    for (let i = 0; i < limit; i++) {
      count++;
      request();
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
const arr = [p1, p2, p3, p4, p5];

limitRequest(arr, 2).then((res) => console.log(res));
