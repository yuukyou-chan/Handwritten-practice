// DFS 深度优先遍历
// 先序遍历：中左右，  中序遍历：左中右， 后序遍历：左右中
const preorderTraversal = function (root) {
  const res = [];
  function dfs(node) {
    if (!node) return;
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return res;
};
