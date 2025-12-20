// https://leetcode.cn/problems/number-of-islands/
/**
 * @param {character[][]} grid
 * @return {number}
 */
// 搜索问题
var numIslands = function (grid) {
    const row = grid.length
    const col = grid[0].length
    let count = 0

    function DFS(i, j) {
        // 关键点：寻找边界，当坐标不是1时，即是边界
        if (i < 0 || j < 0 || i >= row || j >= col || grid[i][j] !== '1') return
        // 关键点：已访问过的陆地，标记为2，避免重复访问
        if (grid[i][j] === '1') grid[i][j] = "2"
        DFS(i - 1, j)
        DFS(i, j - 1)
        DFS(i + 1, j)
        DFS(i, j + 1)
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1') {
                count++
                DFS(i, j)
            }
        }
    }
    return count
};