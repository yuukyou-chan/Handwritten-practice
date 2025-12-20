// 输出所有和为N的连续正数序列./
// 输入一个正数N, 输出所有和为N的连续正数序列. 例如输入15, 结果: [[1, 2, 3, 4, 5], [4, 5, 6], [7, 8],]
// https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/description/
/**
 * @param {number} target
 * @return {number[][]}
 */
var fileCombination = function (target) {
    const res = []
    const curr = []
    let sum = 0

    for (let i = 1; i < target; i++) {
        sum += i
        curr.push(i)
        if (sum === target) {
            res.push([...curr])
        }
        while (sum > target) {
            const temp = curr.shift()
            sum -= temp
            if (sum === target) {
                res.push([...curr])
            }
        }
    }
    return res

};
fileCombination(15)
//  fn(15)