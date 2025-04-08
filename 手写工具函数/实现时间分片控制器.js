// 浏览器原生 API requestIdleCallback 用法
// 浏览器16.6 毫秒渲染一次
requestIdleCallback((idle) => {
  while (idle.timeRemaining() > 0) {
    // 执行任务
  }
});

// 1、下一次分片什么时候开始 —— 一个渲染中空闲时开启分片
// 2、每一次分片执行多少
