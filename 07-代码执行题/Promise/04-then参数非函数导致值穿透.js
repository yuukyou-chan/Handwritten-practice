/**
 * ### 7 then 方法传的不是函数（易错）
 */
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

// 结果 ：1

// 解析：then 方法的规范是传入一个函数，将它注册为回调函数；
// 如果传的不是回调函数那么默认为 then(null),可以理解直接把它删了
// Promise.resolve(1).then(2)  === Promise.resolve(1)
// Promise.resolve(1).then(Promise.resolve(3)) === Promise.resolve(1).then(Promise{<fulfill 1>}) === Promise.resolve(1)
// 最终等价于Promise.resolve(1)	.then(console.log)
