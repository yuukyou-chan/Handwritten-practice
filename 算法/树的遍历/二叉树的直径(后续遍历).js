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

// https://leetcode.cn/problems/diameter-of-binary-tree/
var diameterOfBinaryTree = function (root) {
  let maxDis = 0;
  // 传入一颗树，返回这个树的最大深度
  function DFS(node) {
    if (!node) return 0;
    let leftDepth = DFS(node.left);
    let rightDepth = DFS(node.right);

    maxDis = Math.max(leftDepth + rightDepth, maxDis);
    // 返回的是左右子树的最大深度，不是到根结点的最大深度
    return 1 + Math.max(leftDepth, rightDepth);
  }
  DFS(root);
  return maxDis;
};
