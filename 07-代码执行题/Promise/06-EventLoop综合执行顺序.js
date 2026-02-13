/**
 * ### 9
 */
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout


// 宏任务： 输出setTimeout
// 微任务： 输出async1 end  输出promise2

/**
 * ### case1、 宏任务 和 嵌套的微任务执行顺序
 * **知识点：**<u>微任务嵌套的情况，还是先清空微任务！！！</u> <font style="background-color:#FBF5CB;">有微任务就一直执行微任务，直到清空</font>！
 */

console.log(1)
setTimeout(()=> {
  console.log(2)
},0)
Promise.resolve(3).then((res)=> {
  console.log(res)
  Promise.resolve(4).then(console.log)
})

// 打印结果
// 1
// 3
// 4
// 2
