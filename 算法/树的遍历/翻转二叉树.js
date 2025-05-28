const traverseTree = function (root) {
  function traverse(node) {
    if (!node) {
      return node;
    }
    [node.left, node.right] = [node.right, node.left];
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
};
