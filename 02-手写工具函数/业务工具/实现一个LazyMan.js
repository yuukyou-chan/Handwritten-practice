// LazyMan('Hank')输出:
// Hi! This is Hank!
// LazyMan('Hank').sleep(10).eat('dinner')输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
// LazyMan('Hank').eat('dinner').eat('supper')输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
// LazyMan('Hank').sleepFirst(5).eat('supper')输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
function LazyMan(name) {
  return new _LazyMan(name);
}

class _LazyMan {
  constructor(name) {
    this.queue = [];
    const task = () => {
      console.log(`Hi! This is ${name}!`);
      this.next();
    };
    this.queue.push(task);

    // 核心：通过 setTimeout 0 确保在所有链式调用任务收集结束后才开始执行任务
    // 在下一个事件循环中触发任务
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.queue.shift();
    if (task) {
      task();
    }
  }

  sleep(time) {
    const task = () => {
      console.log(`等待${time}秒..`);
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    this.queue.push(task);
    return this;
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}~`);
      this.next();
    };
    this.queue.push(task);
    return this;
  }

  sleepFirst(time) {
    const task = () => {
      console.log(`等待${time}秒..`);
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    // 放到队列最前面
    this.queue.unshift(task);
    return this;
  }
}

// 测试用例
// LazyMan('Hank').sleep(2).eat('dinner');
// LazyMan('Hank').eat('dinner').eat('supper');
LazyMan('Hank').sleepFirst(5).eat('supper');
