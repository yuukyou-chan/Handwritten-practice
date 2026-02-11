// 腾讯 二面 手写题：
//    有一朵花两种鸟，两种鸟的叫声不一样，花会定水开放，花开时鸟会叫，用代码实现这样的场景
// 分析：观察者模式有两个类，一个是 主体类 Subject（被观察者），一个是观察者类 Observer
// 此题中 花是主体，鸟儿是观察者
// PS: 花儿定时开放可以使用 setTimeInterval 实现，面试时没答上来
// 20min

class Flower {
  constructor() {
    this.observes = [];
    this.open = false;
    this.bloom();
  }

  change() {
    this.open = !this.open;
  }

  bloom() {
    setInterval(() => {
      if (this.open) {
        this.observes.forEach((i) => i.notify());
      }
      change();
    }, 500);
  }
}

class Bird {
  constructor(name) {
    this.name = name;
    this.voice = `my name is ${name}`;
  }

  notify() {
    console.log(this.voice);
  }
}
