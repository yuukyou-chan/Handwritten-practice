function curryAdd(...args1) {
  return function (...args2) {
    const allArgs = [...args1, ...args2];
    return;
  };
}

// 实现
// add(1,2,3,4)()
// add(1)(2)(3)(4)()

/**
 * 思路：
 * 1. 定义一个内部函数inner， 专门用于接收传进来的参数，每次都返回 inner函数接收参数
 * 2. 通过闭包变量来存所有接到的参数
 * 3. inner 函数通过参数长度判断 是否执行累加操作
 *
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
console.log(curringAdd(1, 2, 3)(4)(5)());

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

// 通用柯里化函数
function uniCurry(fn) {
  return function curried(...args) {
    const params = [...args];
    return function inner(...args2) {
      if (args2.length >= 1) {
        params.push(...args2);
        return inner;
      } else {
        return fn.apply(this, params);
      }
    };
  };
}
