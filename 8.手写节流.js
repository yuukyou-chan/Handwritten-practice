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
