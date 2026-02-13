/**
 * ### 8 赋值与链式promise（易错）
 * 1. 变量是先声明为undefined，然后再执行右边表达式；再进行赋值
 * 2. b的值应该是最后一个then 返回的promise4
 * 3. 所有同步代码执行完毕之后a才被赋值为promise
 * 4. await a 一直等待自身，会卡在当前状态
 */

var a;
var b = new Promise((resolve, reject) => {
  console.log('promise1');
  setTimeout(()=>{
    resolve();
  }, 1000);
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  await a
  resolve(true);
  console.log('after2');
});

console.log('end');

// 结果：
// promise1
// undefined
// end
//
// promise2
// promise3
// promise4
// Promise{pending}
// after1
