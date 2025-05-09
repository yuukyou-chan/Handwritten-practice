function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(), delay);
  };
}

// 滴滴 记录最后一次执行结果
