/**
 * ### 1  ✅
 */
const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
})

promise1.then(() => {
    console.log(3);
})

console.log(4);
// 1 2 4 3

/**
 * ### 2 ✅
 */
const promise2 = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(()=>{
      console.log(2)
      resolve();
    	console.log(3);
    })
})

promise2.then(() => {
    console.log(4);
})

console.log(5);
// 1 5 2 3 4

/**
 * ### case8、resolve 下一行的代码依然是同步执行
 * 知识点：then 函数内 代码都是同步执行
 *
 * new Promise(function (resolve) {
 *   console.log(2);
 *   resolve();
 *   console.log(3);
 * }) 2、3同步打印
 */
setTimeout(function () {
  console.log(1);
}, 100);

new Promise(function (resolve) {
  console.log(2);
  resolve();
  console.log(3);
}).then(function () {
  console.log(4);
  new Promise((resove, reject) => {
    console.log(5);
    setTimeout(() =>  {
      console.log(6);
    }, 10);
  })
});
console.log(7);
console.log(8);

// 2
// 3
// 7
// 8
// 4
// 5
// 6
// 1
