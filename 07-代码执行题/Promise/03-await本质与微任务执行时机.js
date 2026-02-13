/**
 * ### 4 await 1 (易错)
 */
async function m(){
  console.log(0);
  const n = await 1;
  console.log(n);
}

m();
console.log(2);

// 0 2 1
// await 1 相当于 await Promise.resovle(1)

/**
 * ### 5 易错
 */
async function m2_demo(){
  console.log(0);
  const n = await 1;
  console.log(n);
}

(async ()=>{
  await m2_demo();
  console.log(2);
})();

console.log(3);
// 0 3 1 2

/**
 * ### 6 易错 aync函数中不使用await 和使用 await
 */
async function m1(){
  return 1;
}

async function m2(){
  const n = await m1();
  console.log(n)
  return 2;
}

async function m3(){
  const n = m2();
  console.log(n);
  return 3;
}

m3().then(n=>{
  console.log(n);
});

m3();

console.log(4);

// 同步任务执行：Promise {<pengding>} => Promise {<pengding>} => 4
// 微任务队列：输出1 输出3 输出1

// 结果 ：
// Promise {<pengding>}
// Promise {<pengding>}
// 4
// 1
// 3
// 1

/**
 * ### case6、await 接着的函数同步执行、后面的代码是异步代码，优先级低于同步代码
 * 知识点：await 接着的函数同步执行、后面的代码是异步代码，优先级低于同步代码
 */

async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSometing(); // 后面是异步代码
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
  console.log("promise start...");
  resolve("promise");
});
promise.then(val => console.log(val));

console.log("test end...");

// 'test start...'
// '执行testSometing'
// 'promise start...'
// 'test end...'
// 'testSometing'
// '执行testAsync'
// 'promise'
// 'hello async'
// 'testSometing' 'hello async'
