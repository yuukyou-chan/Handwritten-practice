class Observer {
  constructor() {
    this.events = [];
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
    events.array.forEach((fn) => {
      fn();
    });
  }

  off(name, fn) {
    this.events[name] = this.events[name].filter((i) => i === fn);
    if (!fn) {
      delete this.events[name];
    }
  }
}
