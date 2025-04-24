// 浏览器原生 API requestIdleCallback 用法
// 浏览器16.6 毫秒渲染一次
requestIdleCallback((idle) => {
  while (idle.timeRemaining() > 0) {
    // 执行任务
  }
});

// 1、下一次分片什么时候开始 —— 一个渲染中空闲时开启分片
// 2、每一次分片执行多少
btn.onclick = () => {
  const taskHandler = (i) => {
    div.innerHTML = i;
    document.body.appendChild(div);
  };

  const scheduler = (task) => {
    setTimeout(() => {
      const now = performance.now();
      task(() => performance.now() - now <= 10);
    }, 1000);
  };

  performChunk(datas, taskHandler, scheduler);
};

function performChunk(datas, taskHandler, scheduler) {
  if (datas.length === 0) return;
  let i = 0;
  function _run() {
    if (i >= datas.length) return;
    scheduler((goOn) => {
      while (goOn() && i < datas.length) {
        taskHandler(datas[i], i);
        i++;
      }
      // 此次分片完成
      _run();
    });
  }
  _run();
}
