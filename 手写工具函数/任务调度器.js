// 百度二面 字节 虾皮 
// Schedule 函数的作用是，将接收到的任务函数，在指定的时间间隔之后执行。
// 具体来说，Schedule 函数接收两个参数：
// 1、maxTaskCount：表示最大并发任务数。
// 使用方式 schedule =  new Schedule(2)
// schedule.addTask(‘2’, 1000).then(console.log)
// schedule.addTask(‘3’, 1000).then(console.log)
class Schedule {
  constructor(maxTaskCount) {
    this.maxTaskCount = maxTaskCount;
    this.taskQueue = [];
    this.runningTaskCount = 0;
  }
  addTask(params, delay) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push(
        () =>
          new Promise((res, rej) =>
            setTimeout(() => {
              res(params);
              resolve(params);
            }, delay)
          )
      );
      this.runTask();
    });
  }

  runTask() {
    while (this.taskQueue.length && this.runningTaskCount < this.maxTaskCount) {
      const task = this.taskQueue.shift();
      task().finally((res) => {
        this.runningTaskCount--;
        this.runTask();
      });
      this.runningTaskCount++;
    }
  }
}

const schedule = new Schedule(2);
schedule.addTask("1", 1000).then(console.log);
schedule.addTask("2", 500).then(console.log);
schedule.addTask("3", 1000).then(console.log);

class Schedule2 {
  constructor(maxTaskCount) {
    this.maxTaskCount = maxTaskCount;
    this.taskQueue = [];
    this.runningTaskCount = 0;
  }
  addTask(params, delay) {
    return new Promise((res, rej) => {
      this.taskQueue.push(
        () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              res(params);
              resolve(params);
            }, delay);
          })
      );
    });
  }

  runTask() {
    while (this.taskQueue.length && this.runningTaskCount < this.maxTaskCount) {
      const task = this.taskQueue.shift();
      this.runningTaskCount++;

      task().finally((res) => {
        this.runningTaskCount--;
        this.runTask();
      });
    }
  }
}
