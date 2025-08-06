class Observer {
  constructor() {
    this.events = {};
  }

  on(name, fn) {
    if (this.events[name]) {
      this.events[name].push(fn);
    } else {
      this.events[name] = [fn];
    }
  }

  emit(name) {
    const events = this.events[name];
    if (!events) return;
    events.forEach((fn) => {
      fn();
    });
  }

  off(name, fn) {
    this.events[name] = this.events[name].filter((i) => i === fn);
    if (!fn) {
      delete this.events[name];
    }
  }

  // 字面一面手撕：额外实现一个once方法，只执行一次，然后删除这个事件的监听
  // 申通一面
  once(name, fn) {
    const onceFn = () => {
      fn();
      this.off(name, onceFn);
    };
    this.on(name, onceFn);
  }
}
