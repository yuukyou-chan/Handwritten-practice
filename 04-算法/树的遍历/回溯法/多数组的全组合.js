// 多数组的全组合 shopee safety 一面
// [
//   ["iPhone X", "黑色", "64g"],
//   ["iPhone X", "黑色", "256g"],
//   ["iPhone X", "白色", "64g"],
//   ["iPhone X", "白色", "256g"],
//   ["iPhone XS", "黑色", "64g"],
//   ["iPhone XS", "黑色", "256g"],
//   ["iPhone XS", "白色", "64g"],
//   ["iPhone XS", "白色", "256g"],
// ]

let names = ["iPhone X", "iPhone XS"]
let colors = ["黑色", "白色"]
let storages = ["64g", "256g"]

/**
 * 获取多个数组的全组合（笛卡尔积）
 * @param {Array[]} arrays 二维数组，每个子数组代表一个维度的选项
 * @returns {Array[]} 所有可能的组合结果
 */
function getCombinations(arrays) {
  const result = [];

  // index 当前处理到第几个数组；current 共享的组合路径数组
  function combine(index, current) {
    // 遍历到最后一个数组时终止
    if (index === arrays.length) {
      // 重要：由于 current 是共享的引用，存入结果集时必须拷贝一份
      // 否则最终 result 里的所有项都会指向同一个被清空的 current
      result.push([...current]);
      return;
    }

    // 遍历当前层级的所有选项
    for (const item of arrays[index]) {
      // 1. 做选择：将当前项加入路径
      current.push(item);
      // 2. 递归：进入下一层处理
      combine(index + 1, current);
      // 3. 撤销选择：将当前项弹出（回溯的核心动作）
      // 这样在下一次循环尝试其他 item 时，current 已经恢复到了进入循环前的状态
      current.pop();
    }
  }

  combine(0, []);
  return result;
}

const combinations = getCombinations([names, colors, storages]);
console.log(combinations);
