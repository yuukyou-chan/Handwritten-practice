/**
 * ### 3 Promise 链式调用结果（易错）
 * 链式调用的promise，返回的是新的Promise。
 *
 * 1. then方法必定会返回一个新的Promise可理解为`后续处理也是一个任务`
 * 2. 新任务的状态取决于后续处理：
 *     - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据
 *     - 若有后续处理但还未执行，新任务挂起。
 *     - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
 *         * 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
 *         * 后续处理执行有错，新任务的状态为失败，数据为异常对象
 *         * 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致
 */

const promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
    resolve()
  }, 1000)
})
const promise2 = promise1.catch((erro) => {
  // 这里return相当于处理了这个promise，状态为fulfilled
  return 2;
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

// promise1 pending
// promise2 pending
// promise1 fullfilled undefined
// promise2 fullfilled undefined

// 为什么第二次 promise2 打印是 fullfilled undefined 呢，按理来说不是不会执行catch回调函数吗

// 答：状态传递：在 Promise 链中，如果一个 Promise 成功了，
// 而你只写了 .catch，那么这个成功的信号会直接穿透（Skip）掉这个 .catch，把成功的结果传递给后面。

// 如果将 resolve 改成 reject 呢？

// promise1 pending
// promise2 pending
// promise1 reject undefined
// promise2 fullfilled 2
