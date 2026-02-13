/**
 * ### case3、多次改变promise状态、finally 方法接收的是无参回掉函数
 * 知识点：
 *
 * 1. Promise的状态一旦改变就无法改变
 * 2. finally 方法接收的是无参回掉函数
 */

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})

// 我的首次答案 resovle1 finally 1 timer1 Promise.fullfill
// 实际答案
// 'resolve1'
// 'finally' undefined
// 'timer1'
// Promise{<resolved>: undefined}
