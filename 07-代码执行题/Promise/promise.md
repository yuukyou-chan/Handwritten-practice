
## 渡一 Promise面题
### 1  ✅
```javascript
const promise = new Promise((resolve, reject) => {
    console.log(1); 
    resolve(); 
    console.log(2);
})

promise.then(() => {
    console.log(3);
})

console.log(4);
// 1 2 4 3
```

### 2 ✅
```javascript
const promise = new Promise((resolve, reject) => {
    console.log(1); 
    setTimeout(()=>{
      console.log(2)
      resolve(); 
    	console.log(3);
    })
})

promise.then(() => {
    console.log(4);
})

console.log(5);
// 1 5 2 3 4
```

### <font style="background-color:#FBDE28;">3 Promise 链式调用结果（易错）</font>
链式调用的promise，返回的是新的Promise。



1. then方法必定会返回一个新的Promise可理解为`后续处理也是一个任务`
2. 新任务的状态取决于后续处理：
    - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据
    - 若有后续处理但还未执行，新任务挂起。
    - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
        * 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
        * 后续处理执行有错，新任务的状态为失败，数据为异常对象
        * 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

```javascript
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

```

### <font style="background-color:#FBDE28;">4 await 1 (易错)</font>
```javascript
async function m(){
  console.log(0);
  const n = await 1;
  console.log(n);
}

m();
console.log(2);

// 0 2 1
// await 1 相当于 await Promise.resovle(1)
```

### 5 易错
```javascript
async function m(){
  console.log(0);
  const n = await 1;
  console.log(n);
}

(async ()=>{
  await m();
  console.log(2);
})();

console.log(3);
// 0 3 1 2
```

### <font style="background-color:#FBDE28;">6 易错 aync函数中不使用await 和使用 await</font>


```javascript
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
```

<!-- 这是一张图片，ocr 内容为：M1:FULFILLED 1 PENDING M2: M3: FULLFILLED 3 M1:FULFILLED 1 M2:PENDING M3:FULFILLED 3 输出3输出1 微队列: 输出1 PROMISE{PENDING PROMISELPENDING -->
![](https://cdn.nlark.com/yuque/0/2026/png/27759506/1768554796558-b5b61802-8f64-46bc-9693-40f5e6a9bce1.png)

<!-- 这是一张图片，ocr 内容为：10 PROMISE{PENDING] 11 ASYNC FUNCTION M3 PROMISE{PENDING 三 M2 12 CONST N 413 13 CONSOLE.LOG(N); 14 RETURN 3; 15 16 1 M3().THEN((N)->>{ 17 10 调试控制台 问题 输出 终端 PROMISE{ <PENDING> PROMISE{<PENDING>_} 41 3 -->
![](https://cdn.nlark.com/yuque/0/2026/png/27759506/1768555072116-cc28dcb0-de0c-440e-a8a3-fdf107d1ab17.png)

### <font style="background-color:#FBDE28;">7 then 方法传的不是函数（易错）</font>
```javascript
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
```

### 8 <font style="background-color:#FBDE28;">赋值与链式promise（易错）</font>
1. 变量是先声明为undefined，然后再执行右边表达式；再进行赋值
2. b的值应该是最后一个then 返回的promise4
3. 所有同步代码执行完毕之后a才被赋值为promise
4.  await a 一直等待自身，会卡在当前状态

```javascript
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

```

### 9
```javascript
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
```

### async函数 return Promise.resolve('2')
字节二面

1. <font style="background-color:#FBDE28;">async 函数的返回值会被</font>**<font style="color:rgb(0, 0, 0);background-color:#FBDE28;">自动用 </font>**`**<font style="color:rgb(0, 0, 0);background-color:#FBDE28;">Promise.resolve()</font>**`**<font style="color:rgb(0, 0, 0);background-color:#FBDE28;"> 进行包装</font>**
2. async 函数 如果return了 Promise.resolve('2') ，相当于return Promise.resolve(Promise.resolve('2'))
3. 当 async 函数内部没有写 `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">return</font>` 语句时，默认返回 `<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">return Promise.resolve(undefined)</font>`。

```javascript
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
```

<font style="background-color:#FBDE28;">await 下面的代码放入微任务队列的时机：当 await 后面的promise resovle了之后</font>。

```javascript
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
  
- 同步执行阶段 ：

- 调用 fn1() 。
- 执行 console.log('1') 。 输出： 1 。
- 执行 await fn2() 。
  - 调用 fn2() ，它返回一个已经处于 resolved 状态的 Promise。
  - await 接收到这个已完成的 Promise，它会 立即 将 fn1 后面的代码（ console.log('3') ）注册到微任务队列中。
- fn1 暂时挂起，主线程继续。
- 执行 Promise.resolve().then(...) 。第一个 .then （打印 4 ）被放入微任务队列。
- 当前微任务队列： [打印 '3', 打印 4] 。
- 微任务执行阶段 (Tick 1) ：

- 取出第一个微任务：执行 console.log('3') 。 输出： 3 。
- 取出第二个微任务：执行 console.log(4) 。 输出： 4 。
  - 执行完后，它的链式回调 .then(打印 5) 被放入微任务队列。
- 当前微任务队列： [打印 5] 。
- 微任务执行阶段 (Tick 2) ：

- 取出微任务：执行 console.log(5) 。 输出： 5 。
  - 它的链式回调 .then(打印 6) 被放入微任务队列。
- 当前微任务队列： [打印 '6'] 。
- 微任务执行阶段 (Tick 3) ：

- 执行 console.log('6') 。 输出： 6 。
```

## <font style="color:rgb(37, 41, 51);">Promise</font>
```javascript
fn1 () {
  conosle.log('1')
  await fn2()
  conosle.log('3')
}
fn2 () {
  return Promise.resovle('2')
}

fn1()

Promise.resovle().then(()=> {
  conosle.log(4)
}).then(()=> {
  conosle.log(5)
}).then(()=>{
  conosle.log('6')
})

// 如果在fn2 前面加个 async 呢

```

### case1、 宏任务 和 嵌套的微任务执行顺序
**知识点：**<u>微任务嵌套的情况，还是先清空微任务！！！</u> <font style="background-color:#FBF5CB;">有微任务就一直执行微任务，直到清空</font>！

```javascript
console.log(1)
setTimeout(()=> {
  console.log(2)
},0)
Promise.resolve(3).then((res)=> {
  console.log(res)
  Promise.resolve(4).then(console.log)  
})

// 打印结果
1
3
4
2
```

 

### case2、Promise 中 return 一个 Promise.resolve() 和 通过then 方法
**知识点：promise 中 return **<u>Promise.resolve(4)  会多两次微任务</u>

注意：.then(() => {  return Promise.resolve(4)}) 和.then(() => { return 4}) 的区别

<u>return Promise.resolve(4) 会多两次微任务</u>

```javascript
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

输出 012345

```

### case3、多次改变promise状态、finally 方法接收的是无参回掉函数
知识点：

1. <font style="color:rgb(36, 41, 47);">Promise的状态一旦改变就无法改变</font>
2. <font style="color:rgb(36, 41, 47);">finally 方法接收的是无参回掉函数</font>

```javascript
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
```

### case4、await 等待的 promise 没有resovle后续代码不会执行、then catch 方法期待传入函数
**知识点：**

+ <font style="color:rgb(36, 41, 47);">async函数中await的</font>`<font style="color:rgb(36, 41, 47);background-color:rgba(175, 184, 193, 0.2);">new Promise</font>`<font style="color:rgb(36, 41, 47);">要是没有返回值的话则不执行后面的内容</font>
+ <font style="color:rgb(36, 41, 47);">.then函数中的参数期待的是函数，如果不是函数的话会发生透传，</font>

```javascript
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
```

```javascript
Promise.resolve(1)
  .then(() => 2)  // 传入函数，返回2
  .then(() => Promise.resolve(3))  // 传入函数，返回Promise.resolve(3)
  .catch(() => 4)  // 传入函数（此处不会触发，因为前面无错误）
  .then(res => console.log(res));  // 接收最终结果3并打印
    
```

### case5、await 函数reject后后续代码不会执行
知识点：await 函数reject后后续代码不会执行

`<font style="color:rgba(0, 0, 0, 0.85);">async/await</font>`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);"> 内部会将 Promise 的 rejected 状态转换为异常抛出，需要通过 </font>`<font style="color:rgba(0, 0, 0, 0.85);">try/catch</font>`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);"> 或 </font>`<font style="color:rgba(0, 0, 0, 0.85);">.catch()</font>`<font style="color:rgba(0, 0, 0, 0.85);background-color:rgb(249, 250, 251);"> 来捕获。</font>

```javascript
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))

//'async2'
// Uncaught (in promise) error
```

### case6、await 接着的函数同步执行、后面的代码是异步代码，优先级低于同步代码
知识点：await 接着的函数同步执行、后面的代码是异步代码，优先级低于同步代码

```javascript
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

'test start...'
'执行testSometing'
'promise start...'
'test end...'
'testSometing'
'执行testAsync'
'promise'
'hello async'
'testSometing' 'hello async'
```

### case7、race 返回后，其他promise依然继续执行
```javascript

function runAsync(x) {
  const p = new Promise(r =>
    setTimeout(() => r(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));

0
'Error: 0'
1
2
3
```

### case8、resolve 下一行的代码依然是同步执行
知识点：then 函数内 代码都是同步执行 

new Promise(function (resolve) {

  console.log(2);

  resolve();

  console.log(3);

}) 2、3同步打印

```javascript
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

2
3
7
8
4
5
6
1
```



### 后面继续
[https://fe.ecool.fun/topic/613e333e-ffca-45ff-a13a-debd8053d913?orderBy=default&order=desc&tagId=10&exerciseCate=2&ignoreMaster=1&difficulty=](https://fe.ecool.fun/topic/613e333e-ffca-45ff-a13a-debd8053d913?orderBy=default&order=desc&tagId=10&exerciseCate=2&ignoreMaster=1&difficulty=)

## 微任务中嵌套宏任务，宏任务嵌套微任务
## <!-- 这是一张图片，ocr 内容为： PROMISE.RESOLVE().THEN(() -> {  CONSOLE.LOG('PROMISEL') TIMER2  SETTIMEOUT(() -> { CONST  CONSOLE.LOG('TIMER2') 子,0) TIMER1 SETTIMEOUT(() CONST CONSOLE.LOG('TIMER1') PROMISE.RESOLVE().THEN(()  CONSOLE.LOG('PROMISE2') ])  CONSOLE.LOG('START') -->
![](https://cdn.nlark.com/yuque/0/2025/png/27759506/1754978130747-ec0ac699-a3f9-4721-ae92-f6796c278a60.png)
<!-- 这是一张图片，ocr 内容为：刚开始整个脚本作为第一次宏任务来执行,我们将它标记为宏1,从上至下执行 遇到 到PROMISE.RESOLVE().THEN 这个微任务,将THEN中的内容加入第一次的微任务队列标 记为微1 遇到定时器TIMER1,将它加入下一次宏任务的延迟列表,标记为宏2,等待执行(先不管里 面是什么内容) 执行宏1中的同步代码 码START 第一次宏任务(宏1)执行完毕,检查第一次的微任务队列(微1),发现有一个 PROMISE.THEN 这个微任务需要执行 ,执行打印出微1中同步代码PROMISEL,然后发现定时器TIMER2,将它加入宏2的后面,标 记为宏3 第一次微任务队列(微1)执行完毕,执行第二次宏任务(宏2),首先执行同步代码 TIMER1 E2这个微任务,将它加入此次循环的微任务队列,标记为微2 然后遇到了 了PROMISE2这个 宏2中没有同步代码可执行了,查找本次循环的微任务队列(微2),发现了PROMISE2,执行 第二轮执行完毕,执行宏3,打印出 TIMER2 答案:'START','PROMISE1','TIM 'TIMER1', 'PROMISE2','TIMER2' -->
![](https://cdn.nlark.com/yuque/0/2025/png/27759506/1754978142868-9c8a3b99-4dd9-4a88-8a93-92b744a1086a.png)

