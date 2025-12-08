/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// 合并区间
/**
 * 思路：
 * 难点：每一次合并完成之后，数组项会变化，如何顺利的继续迭代？
 * ——1. 将数组进行排序，根据第一个元素进行排序
 * ——2. 初始化结果数组将第一个元素加入，遍历从第二个元素开始，始终拿结果数组的最后一个元素与当前元素进行比较，
 * 如果有重叠部分，将前一个元素弹出，将合并后的元素加入结果数组，
 * 如果没有重叠部分，直接将当前元素加入结果数组。
 * 
 */
var merge = function (intervals) {
    const _intervals = intervals.sort((a, b) => a[0] - b[0])
    const res = [_intervals[0]]

    function compare(a, b) {
        if (b[0] <= a[1] && a[1] <= b[1]) return [a[0], b[1]]
        if (b[0] <= a[1] && a[1] >= b[1]) return [a[0], a[1]]
        return false
    }
    for (let i = 1; i < _intervals.length; i++) {
        const _compare = compare(res[res.length - 1], _intervals[i])
        if (_compare) {
            res.pop()
            res.push(_compare)
        } else {
            res.push(_intervals[i])
        }
    }
    return res
};