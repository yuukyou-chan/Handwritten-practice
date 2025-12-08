/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 */
function isValid(s) {
  const arr = s.split("");
  const dist = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
  ]);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (dist.has(arr[i])) {
      stack.push(arr[i]);
    } else if (dist.get(stack[stack.length - 1]) === arr[i]) {
      stack.pop();
    }
  }
  return stack.length === 0;
}
