/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
// 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

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

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length === 0) return [];

    // 1. 按照左端点升序排序
    intervals.sort((a, b) => a[0] - b[0]);

    const res = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];
        const last = res[res.length - 1];

        // 2. 如果当前区间的左端点 <= 结果集中最后一个区间的右端点，说明重叠
        if (curr[0] <= last[1]) {
            // 合并：更新最后一个区间的右端点为两者中的较大值
            last[1] = Math.max(last[1], curr[1]);
        } else {
            // 3. 不重叠，直接作为新区间加入
            res.push(curr);
        }
    }

    return res;
};
