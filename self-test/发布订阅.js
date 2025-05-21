class a {
  constructor() {
    this.events = {};
  }

  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }

  emit(name) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => {
        fn();
      });
    }
  }

  off(name, fn) {
    if (fn) {
      this.events[name].filter((i) => i !== fn);
    } else {
      delete this.events[name];
    }
  }

  once(name, fn) {
    const cb = () => {
      fn();
      off(name, cb);
    };
    this.on(name, cb);
  }
}
