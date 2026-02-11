// 腾讯 二面 手写题：
//    有一朵花两种鸟，两种鸟的叫声不一样，花会定时开放，花开时鸟会叫，用代码实现这样的场景
// 分析：观察者模式有两个类，一个是 主体类 Subject（被观察者），一个是观察者类 Observer
// 此题中 花是主体，鸟儿是观察者
// PS: 花儿定时开放可以使用 setTimeInterval 实现，面试时没答上来

// 定义观察者类
class Observer {
  constructor(name, voice) {
    this.name = name;
    this.voice = voice;
  }

  // 更新方法，当主体状态改变时调用
  update() {
    console.log(this.voice);
  }
}

// 定义主体类
class Subject {
  constructor(name) {
    this.observers = [];
    this.name = name;
    this.isBloom = false;
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 通知观察者
  notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }

  // 模拟花开
  bloom() {
    if (!this.isBloom) {
      this.isBloomed = true;
      console.log(`The flower ${this.name} is blooming!`);
      this.notifyObservers();
      setTimeout(() => {
        this.isBloom = false;
      }, 1000);
    }
  }

  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter((i) => i.name === observer.name);
  }
}

const flower = new Subject("rose");
const bird1 = new Observer("bird1", "11111");
const bird2 = new Observer("bird2", "22222");

flower.addObserver(bird1);
flower.addObserver(bird2);

setInterval(() => {
  flower.bloom();
}, 5000);
