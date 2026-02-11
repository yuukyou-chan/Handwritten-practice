// 树 或者 嵌套结构（数组扁平化） 的遍历 都有两种方法，一种递归一种迭代
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

//  迭代法
var preorderTraversal2 = function (root) {
  const res = [];
  if (!root) return res;
  const stack = [root];
  let curr = null;
  while (stack.length) {
    curr = stack.pop();
    res.push(curr.val);
    curr.right && stack.push(curr.right);
    curr.left && stack.push(curr.left);
  }
  return res;
};
