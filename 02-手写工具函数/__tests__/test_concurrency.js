const limitRequest = (fnArr, limit) => {
  return new Promise((resolve, reject) => {
    const len = fnArr.length;
    if (len === 0) return resolve([]);
    
    const results = new Array(len);
    let nextIndex = 0;
    let completedCount = 0;

    const run = () => {
      if (nextIndex >= len) return;

      const currentIndex = nextIndex++;
      const task = fnArr[currentIndex];

      task()
        .then((res) => {
          results[currentIndex] = res;
          completedCount++;

          if (completedCount === len) {
            resolve(results);
          } else {
            run();
          }
        })
        .catch((err) => {
          reject(err);
        });
    };

    const initialCount = Math.min(limit, len);
    for (let i = 0; i < initialCount; i++) {
      run();
    }
  });
};

// --- Test Cases ---

const createTask = (id, delay) => () =>
  new Promise((resolve) => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} finished after ${delay}ms`);
      resolve(id);
    }, delay);
  });

const tasks = [
  createTask(1, 1000),
  createTask(2, 500),
  createTask(3, 300),
  createTask(4, 400),
  createTask(5, 100),
];

console.log('--- Starting Concurrency Test (Limit: 2) ---');
limitRequest(tasks, 2).then((results) => {
  console.log('Final Results:', results);
  if (JSON.stringify(results) === '[1,2,3,4,5]') {
    console.log('SUCCESS: Order is preserved and all tasks completed.');
  } else {
    console.log('FAILURE: Unexpected results.');
  }
});
