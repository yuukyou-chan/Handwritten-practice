import { useRef, useCallback } from 'react';

// 阿里 夸克千文 事业群
/**
 * 极简版请求并发控制Hooks（仅保留并发限制+队列）
 * @param {number} maxConcurrency - 最大并发数
 * @returns {Function} - 添加请求的方法
 */
const useRequestConcurrency = (maxConcurrency) => {
  // 1. 核心状态：请求队列、当前执行数（用ref避免不必要的重渲染）
  const requestQueue = useRef([]); // 等待执行的请求任务队列
  const currentRunning = useRef(0); // 当前正在执行的请求数

  // 2. 执行单个请求的核心方法
  const executeTask = useCallback(async (task) => {
    currentRunning.current += 1; // 执行前，并发数+1
    try {
      // 执行实际的请求函数，把结果返回给外层Promise
      const result = await task.request();
      task.resolve(result);
    } catch (error) {
      // 请求失败时，把错误抛出给外层
      task.reject(error);
    } finally {
      currentRunning.current -= 1; // 执行完成，并发数-1
      // 队列里有等待的请求，就取出下一个执行
      if (requestQueue.current.length > 0) {
        const nextTask = requestQueue.current.shift();
        executeTask(nextTask);
      }
    }
  }, []);

  // 3. 对外暴露的添加请求方法（核心API）
  const addRequest = useCallback((requestFn) => {
    return new Promise((resolve, reject) => {
      // 封装请求任务 ！！！ 常用操作
      const task = {
        request: requestFn,
        resolve,
        reject
      };

      // 判断是否直接执行或加入队列
      if (currentRunning.current < maxConcurrency) {
        // 没有用while 循环的原因是，当前执行到了最大并发数，直接在任务的回调函数里再执行就能保证一直的最大并发数
        executeTask(task); // 并发数没超，直接执行
      } else {
        requestQueue.current.push(task); // 并发数超了，加入队列
      }
    });
  }, [maxConcurrency, executeTask]);

  return { addRequest };
};

// --------------- 极简使用示例 ---------------
// const Example = () => {
//   const { addRequest } = useRequestConcurrency(2); // 最多2个并发

//   // 模拟请求函数
//   const mockRequest = (id) => {
//     return new Promise((resolve) => {
//       console.log(`请求${id}开始执行`);
//       setTimeout(() => {
//         resolve(`请求${id}执行完成`);
//       }, 1000);
//     });
//   };

//   // 批量发起5个请求
//   const handleBatchRequest = () => {
//     for (let i = 1; i <= 5; i++) {
//       addRequest(() => mockRequest(i))
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
//     }
//   };

//   return <button onClick={handleBatchRequest}>发起5个请求（并发2）</button>;
// };

export default useRequestConcurrency;