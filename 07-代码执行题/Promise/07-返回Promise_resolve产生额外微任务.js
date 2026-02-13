/**
 * ### async函数 return Promise.resolve('2')
 * 字节二面
 *
 * 1. async 函数的返回值会被自动用 Promise.resolve() 进行包装
 * 2. async 函数 如果return了 Promise.resolve('2') ，相当于return Promise.resolve(Promise.resolve('2'))
 * 3. 当 async 函数内部没有写 return 语句时，默认返回 return Promise.resolve(undefined)。
 */

async function fn1(){
  console.log('1')
  await fn2()
  console.log('3')
}

async function fn2() {
  return Promise.resolve('2')
}

fn1()

Promise.resolve().then(()=> {
  console.log(4)
}).then(()=> {
  console.log(5)
}).then(()=>{
  console.log('6')
})

// 1
// 4
// 5
// 3
// 6
// 如果把 async 去掉呢？

/**
 * await 下面的代码放入微任务队列的时机：当 await 后面的promise resovle了之后。
 */

/*
async function fn1(){
  console.log('1')
  await fn2()
  console.log('3')
}

function fn2() {
  return Promise.resolve('2')
}

fn1()

Promise.resolve().then(()=> {
  console.log(4)
}).then(()=> {
  console.log(5)
}).then(()=>{
  console.log('6')
})

// 错误：1 4 3 5 6
// 正确：1 3 4 5
*/

/**
 * ### case2、Promise 中 return 一个 Promise.resolve() 和 通过then 方法
 * **知识点：promise 中 return **<u>Promise.resolve(4)  会多两次微任务</u>
 *
 * 注意：.then(() => {  return Promise.resolve(4)}) 和.then(() => { return 4}) 的区别
 *
 * <u>return Promise.resolve(4) 会多两次微任务</u>
 */

Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4)
}).then((res) => { console.log(res) })


Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
})

// 输出 012345
