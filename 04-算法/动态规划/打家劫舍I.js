// 一个专业的小偷，计划偷窃沿街的房屋。
// 每间房内都藏有一定的现金，影响小偷偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组 nums ，
// 请计算 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // dp[i] 表示前 i 个房屋能偷取最大金额
    const dp = new Array(nums.length+1).fill(0)
    dp[0] = 0
    dp[1] = nums[0]

    for(let i = 2; i < nums.length + 1; i++) {
        // 状态转移：当前i 房屋的钱 = 
        // 1. 偷当前房屋 = 前两个房屋的钱[i-2] + 当前房屋的钱
        // 2. 不偷当前房屋 = 上一个房屋的钱
        dp[i] = Math.max(dp[i-2] + nums[i-1], dp[i-1])
    }

    return dp[nums.length]
};
