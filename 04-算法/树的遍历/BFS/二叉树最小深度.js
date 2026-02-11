/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if(root === null) return 0
    const queue = [root]
    let depth = 1

    while(queue.length) {
        // 必须用变量存储 当前队列长度，因为队列长度会在循环中改变
        const nums = queue.length
        // for循环便利当前层的所有节点
        for(let i = 0;i < nums; i++) {
            const curr = queue.shift()
            if(curr.left === null && curr.right === null) {
                return depth
            }
            curr.left !== null && queue.push(curr.left)
            curr.right !== null && queue.push(curr.right)
        }
        // for循环结束说明 当前层已经遍历完，深度+1
        depth++
    }
    return depth

};