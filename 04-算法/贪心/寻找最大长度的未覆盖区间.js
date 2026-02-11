// 给定：
// 一个非负整数上限 n（表示整个区间的右边界，整个待考察的完整区间是 [0, n]）。
// 一个二维整数数组 ranges，其中 ranges[i] = [start_i, end_i] 表示一个已被覆盖的闭区间（0 ≤ start_i ≤ end_i ≤ n，区间内的所有整数都被视为已覆盖）。
// 要求：
// 找出 [0, n] 区间内所有未被覆盖的连续整数区间，并返回这些未覆盖区间的数组形式；
// 若不存在未覆盖区间，返回空数组。额外要求：返回的未覆盖区间需满足「按起始位置升序排列」，且区间之间「无重叠、无间隙」。
/**
 * @param {number} n
 * @param {number[][]} ranges
 * @return {number[][]}
 */
var findUncoveredIntervals = function (n, ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [ranges[0]];
  // 1 合并区间
  for(let i = 0; i < ranges.length;i++) {
    const cur = ranges[i]
    const last = merged[merged.length - 1]
    if(cur[0] <= last[1]) {
        last[1] = Math.max(last[1], cur[1])
    } else {
        merged.push(cur)
    }
  }

  // 2 遍历合并区间找到最大间隔
  let res = []
  // 检查开头
  if(merged[0][0] !== 0) {
    res.push([0,merged[0][0] - 1])
  }
  // 检查中间
  for(let i = 1; i <merged.length;i++) {
    res.push([merged[i-1][1]+1, merged[i][0]-1])
  }
  //检查结尾
  if(merged[merged.length-1][1] !== n) {
    res.push([merged[merged.length-1][1]+1, n])
  }
 return res
};

n=10
ranges=[[1,3],[5,7]]
console.log(findUncoveredIntervals(n, ranges))
