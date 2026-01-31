// 岛上有一只大象，第一年会生两只小象，每只小象三年后又会产两只小象。
// 请问n年后，岛上有多少只大象？
// 腾讯一面
// 思路：核心是动态转移方程怎么写？
// 第n年的大象数量 = 第n-1年的大象数量 + 第n-3年的大象数量 * 2
function calculateElephantDP(n) {
    const dp = new Array(n + 1).fill(0)
    dp[0] = 1
    dp[1] = 3
    dp[2] = 3
    dp[3] = 3
    for (let i = 4; i <= n; i++) {
        // 第i年的大象数量 = 上一年剩余的大象（老的大象） + 前三年生产的大象（新增的大象）
        dp[i] = dp[i - 1] + dp[i - 3] * 2
    }
    return dp[n]
}
console.log(calculateElephantDP(5))
