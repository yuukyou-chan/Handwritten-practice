// 滴滴一面 原题变式
// 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续  不算嵌套
// (()()) 最长串长度 4 —— ()()不算嵌套
// (())))  最长串长度 2 —— ()不算嵌套
// (()()()) 最长串长度 6 —— ()()()不算嵌套
// ()(()) - 2
// ))(() -2

// 思路：
// 1.用栈存储，如果当前元素和栈顶元素匹配，就入栈
// 2.每次入栈后，都计算栈的长度，取最大值
// 3.如果当前元素和栈顶元素不匹配，就清空栈，重新入栈
// 4.边界条件判断：)() 如果栈长为 1，且栈顶元素为 )，就清空栈，重新入栈

const MathLength = (str) => {
  let maxLength = 0;
  let stack = [];
  const StringArr = str.split("");
  const map = new Map([
    ["(", ")"],
    [")", "("],
  ]);

  for (let i = 0; i < StringArr.length; i++) {
    const preS = stack[stack.length - 1];
    const currS = StringArr[i];

    // 边界情况:)()   —— 当 stack 元素为 1 且栈顶元素为 ) 时，清空栈，
    if (stack.length === 1 && stack[stack.length - 1] === ")") {
      // ... existing code ...

      const arr = [1, [2, 3, 4], 5, [6, [7, 9], 8]];
      console.log(flatWithStack(arr));
      console.log(flatWithQueue(arr));

      stack = [];
      stack.push(currS);
      continue;
    }

    // 判断当前字符是否和栈顶元素相反
    if (map.get(preS) === currS) {
      stack.push(currS);
      // 边界条件判断 当栈中元素个数为偶数时，才计算长度，否则不计算
      if (stack.length % 2 === 0) {
        maxLength = Math.max(maxLength, stack.length);
      }
    } else {
      stack = [];
      stack.push(currS);
    }
  }
  return maxLength;
};

console.log(MathLength("()( ())"));

// leetCode 原题
// 考虑 嵌套条件
const MathLength2 = (str) => {
  let maxLength = 0;
  let stack = [];
  const StringArr = str.split("");

  for (let i = 0; i < StringArr.length; i++) {
    if (StringArr[i] === "(") {
      stack.push(i);
    }
    if (StringArr[i] === ")" && stack.length > 0) {
      maxLength = maxLength + 2;
      stack.pop();
    }
  }

  return maxLength;
};

// console.log(MathLength2("()(()"));
