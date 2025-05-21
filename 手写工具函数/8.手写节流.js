function throttle(fn, delay) {
  let preTime = new Date().getTime();
  let currentTime = new Date().getTime();

  return function () {
    const args = arguments;
    currentTime = new Date().getTime();

    if (currentTime - preTime >= delay) {
      preTime = currentTime;
      return fn(...args);
    } else {
    }
  };
}

// 滴滴 变式保证最后一次结果执行
function throttle2(fn, delay) {
  let preTime = new Date().getTime();
  let currentTime = new Date().getTime();
  let timer = null;
  return function () {
    const args = arguments;
    currentTime = new Date().getTime();
    if (currentTime - preTime >= delay) {
      preTime = currentTime;
      return fn(...args);
    } else {
      if (timer) {
        clearTimeout(timer);
      } else {
        timer = setTimeout(() => {
          preTime = currentTime;
          return fn(...args);
        }, delay);
      }
    }
  };
}
