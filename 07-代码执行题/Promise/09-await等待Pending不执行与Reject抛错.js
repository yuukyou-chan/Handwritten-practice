/**
 * ### case4、await 等待的 promise 没有resovle后续代码不会执行、then catch 方法期待传入函数
 * **知识点：**
 *
 * + async函数中await的new Promise要是没有返回值的话则不执行后面的内容
 * + .then函数中的参数期待的是函数，如果不是函数的话会发生透传，
 */

const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
}
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)

// 首次答案：script start async1 promise1 async1 end async1 success script end 4 timer2 timer1
// 正确答案：
//'script start'
//'async1'
//'promise1'
//'script end'
//1
//'timer2'
//'timer1'

/*
Promise.resolve(1)
  .then(() => 2)  // 传入函数，返回2
  .then(() => Promise.resolve(3))  // 传入函数，返回Promise.resolve(3)
  .catch(() => 4)  // 传入函数（此处不会触发，因为前面无错误）
  .then(res => console.log(res));  // 接收最终结果3并打印
*/

/**
 * ### case5、await 函数reject后后续代码不会执行
 * 知识点：await 函数reject后后续代码不会执行
 *
 * async/await 内部会将 Promise 的 rejected 状态转换为异常抛出，需要通过 try/catch 或 .catch() 来捕获。
 */

async function async1_demo2 () {
  await async2_demo2();
  console.log('async1');
  return 'async1 success'
}
async function async2_demo2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1_demo2().then(res => console.log(res))

//'async2'
// Uncaught (in promise) error
