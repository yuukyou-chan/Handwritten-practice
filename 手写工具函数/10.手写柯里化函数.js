// pdd 一面
// 实现
// add(1,2,3,4)()
// add(1)(2)(3)(4)()

/**
 * 思路：
 * 1. 定义一个内部函数inner， 专门用于接收传进来的参数，每次都返回 inner函数接收参数
 * 2. 通过闭包变量来存所有接到的参数
 * 3. inner 函数通过参数长度判断 是否执行累加操作
 */

function curringAdd() {
  const args1 = Array.from(arguments);
  const params = [...args1];
  function inner(...args2) {
    if (args2.length >= 1) {
      params.push(...args2);
      return inner;
    } else {
      console.log("params", params);
      return params.reduce((pre, curr) => {
        return pre + curr;
      }, 0);
    }
  }
  return inner;
}
// console.log(curringAdd(1, 2, 3)(4)(5)());

// 实现add(1)(2)(3)
function add() {
  const args = Array.from(arguments);
  const allParams = [...args];
  function inner(...args2) {
    if (args2.length >= 1) {
      allParams.push(...args2);
      return inner;
    } else {
      return allParams.reduce((pre, curr) => {
        return pre + curr;
      }, 0);
    }
  }
  return inner;
}

// 通用版柯里化函数 —— 固定长度参数
// const curry = (fn) => {
//   return function curried() {
//     const params = Array.from(arguments);
//     return function inner(...args) {
//       if (args.length >= fn.length) {
//         return fn.apply(this, params);
//       } else {
//         params.push(...args);
//         return curried;
//       }
//     };
//   };
// };

// 当前实现的问题分析：
// 1. 参数污染：params数组在闭包中被共享，多次调用可能导致参数混乱
// 2. 递归调用效率低：每次都重新创建params数组和inner函数
// 3. fn.length局限性：无法处理默认参数和剩余参数
// 腾讯微信小店 1 面
// 改进后的柯里化函数
const curry = (fn) => {
  // 使用递归方式实现参数累积
  const curried = (...args) => {
    // 如果参数足够，直接调用原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // 否则返回一个新函数，继续收集参数
    return (...moreArgs) => {
      // 将新参数与已有参数合并，递归调用curried
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
  return curried;
};

// 定义一个简单的加法函数
function add(a, b, c) {
  return a + b + c;
}

// 使用 curry 函数将 add 函数柯里化
const curriedAdd = curry(add);

// 测试不同的调用方式
// console.log(curriedAdd(1, 2, 3)); // 输出: 6
// console.log(curriedAdd(1)(2)(3)); // 输出: 6
// console.log(curriedAdd(1, 2)(4)); // 输出: 6
