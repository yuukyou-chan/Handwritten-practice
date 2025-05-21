// 百度二面  字节
// Schedule 函数的作用是，将接收到的任务函数，在指定的时间间隔之后执行。
// 具体来说，Schedule 函数接收两个参数：
// 1、maxTaskCount：表示最大并发任务数。
// 使用方式 schedule =  new Schedule(2)
// schedule.addTask(‘2’, 1000).then(console.log)
// schedule.addTask(‘3’, 1000).then(console.log)

class Schedule {
  constructor(max) {
    this.max = max;
    this.runningTask = 0;
    this.tasks = [];
  }

  addTask(name, delay) {
    return new Promise((resolve, reject) => {
      this.tasks.push(
        () =>
          new Promise((res, rej) => {
            setTimeout(() => {
              resolve(name);
              res();
            }, delay);
          })
      );
      this.run();
    });
  }

  run() {
    while (this.tasks.length > 0 && this.runningTask < this.max) {
      this.runningTask++;
      const task = this.tasks.shift();
      task().finally(() => {
        this.runningTask--;
        this.run();
      });
    }
  }
}

const schedule = new Schedule(2);
schedule.addTask("1", 1000).then(console.log);
schedule.addTask("2", 500).then(console.log);
schedule.addTask("3", 1000).then(console.log);
