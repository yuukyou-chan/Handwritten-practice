/**
 * 记忆化函数，根据依赖数组判断是否重新计算
 * @param {Function} fn - 需要执行的计算函数
 * @param {Array} deps - 依赖数组，当依赖变化时重新计算
 * @returns {Function} 包装后的函数，返回计算结果或缓存结果
 */

// 第一个点：如何监听依赖数组是否变化？  —— 传入数组的引用，每次函数执行时对比下数组的内容是否一致
// 第二个点：如何缓存计算结果？  —— 闭包

function memorizeFunction(fn, deps) {
  // 缓存计算结果
  let cachedResult;
  // 缓存上一次的依赖数组
  let previousDeps = [...deps];
  // 检查两个依赖数组是否相等
  function areDepsEqual(newDeps, oldDeps) {
    // 长度不同直接认为不相等
    if (newDeps.length !== oldDeps.length) {
      return false;
    }
    // 逐个比较元素
    for (let i = 0; i < newDeps.length; i++) {
      // 对于基本类型直接比较值，对于对象比较引用
      if (newDeps[i] !== oldDeps[i]) {
        return false;
      }
    }
    return true;
  }

  // 返回包装函数
  return function () {
    // 获取最新的依赖数组
    // 为什么能获取到最近的依赖变化？？ —— 因为传进来的是数组的引用地址，引用地址不变
    const currentDeps = [...deps];
    // 检查依赖是否变化
    if (!areDepsEqual(currentDeps, previousDeps)) {
      // 依赖变化，重新计算并更新缓存
      cachedResult = fn.apply(this, arguments);
      previousDeps = currentDeps;
    }
    // 返回缓存的结果
    return cachedResult;
  };
}
const a = 0