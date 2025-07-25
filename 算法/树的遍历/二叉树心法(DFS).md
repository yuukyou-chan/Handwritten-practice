## 二叉树通用解题思路

遇到一道二叉树的题目时的通用思考过程是：

1、通过遍历一遍二叉树得到答案。如果可以，用一个 traverse 函数配合外部变量来实现，这叫「遍历」的思维模式。——回溯法

2、通过子问题（子树）的答案推导出原问题的答案。如果可以，写出这个递归函数的定义， **并充分利用这个函数的返回值** （后续遍历），这叫「分解问题」的思维模式（分治思想）。—— 动态规划

无论使用哪种思维模式，你都需要思考：

1. 如果单独抽出一个二叉树节点，它需要做什么事情？
2. 需要在什么时候（前/中/后序位置）做？
3. 其他的节点不用你操心，递归函数会帮你在所有节点上执行相同的操作。

## 后续遍历的特殊之处

1. 前序位置的代码 **只能从函数参数中获取父节点传递来的数据**
2. 后序位置的代码 **可以获取到左右子树通过函数返回值传递回来的数据**

某些情况下把代码移到后序位置效率最高；有些事情，只有后序位置的代码能做。
例题:二叉树的直径 https://leetcode.cn/problems/diameter-of-binary-tree/
二叉树转换为链表 https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/

## 基础代码模板

```javaScript
// 二叉树的遍历框架 DFS
var traverse = function(root) {
    if (root === null) {
        return;
    }
    // 前序位置
    traverse(root.left);
    // 中序位置
    traverse(root.right);
    // 后序位置
}
```
