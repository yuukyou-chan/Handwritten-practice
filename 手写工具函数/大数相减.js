function subBigNumber(num1, num2) {
  // 特殊情况处理：两个数相等
  if (num1 === num2) {
    return '0'
  }
  
  const num1Arr = num1.split('').map(Number)
  const num2Arr = num2.split('').map(Number)
  const result = []
  
  // 比较两个数的大小
  let isNum1Greater = true
  if (num1Arr.length > num2Arr.length) {
    // num1位数更多，肯定更大
    const diffLen = num1Arr.length - num2Arr.length
    for (let i = 0; i < diffLen; i++) {
      num2Arr.unshift(0)
    }
  } else if (num1Arr.length < num2Arr.length) {
    // num2位数更多，num1更小
    return '-' + subBigNumber(num2, num1)
  } else {
    // 位数相同，只需要同位比较大小，从第一位开始比较，相同位置，数字大的数更大
    for (let i = 0; i < num1Arr.length; i++) {
      if (num1Arr[i] > num2Arr[i]) {
        break
      } else if (num1Arr[i] < num2Arr[i]) {
        isNum1Greater = false
        break
      }
    }
    
    // 如果num1更小，交换两个数
    if (!isNum1Greater) {
      return '-' + subBigNumber(num2, num1)
    }
  }

  let borrow = false // 借位标志
  for (let i = num1Arr.length - 1; i >= 0; i--) {
    // 当前位数值，考虑借位
    let curr1 = borrow ? num1Arr[i] - 1 : num1Arr[i]
    const curr2 = num2Arr[i]

    const diff = curr1 - curr2
    if (diff >= 0) {
      result.unshift(diff)
      borrow = false
    } else {
      result.unshift(diff + 10)
      borrow = true
    }
  }

  // 去除前导零，确保至少返回'0'
  return result.join('').replace(/^0+/, '') || '0'
}

// console.log(subBigNumber('11222','12111'))
// console.log(subBigNumber('123','123456'))


// 大数相减（简化版）：仅处理非负整数，a >= b，返回字符串结果；这个版本未考虑 负数情况
function bigSub(a, b) {
  // 转为字符串，避免精度问题
  a = String(a);
  b = String(b);
  
  // 补零对齐（右对齐，左补零）
  const maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, '0');
  b = b.padStart(maxLen, '0');
  
  let borrow = 0; // 借位标记
  const res = [];
  
  // 从右往左逐位相减
  for (let i = maxLen - 1; i >= 0; i--) {
    const digitA = +a[i];
    const digitB = +b[i];
    // 当前位 = 被减数 - 减数 - 借位
    let curr = digitA - digitB - borrow;
    
    if (curr < 0) {
      curr += 10; // 借位（借1当10）
      borrow = 1; // 标记下一位需借位
    } else {
      borrow = 0;
    }
    
    res.unshift(curr); // 从左到右存结果
  }
  
  // 去除前导零，兼容全零情况
  return res.join('').replace(/^0+/, '') || '0';
}

// 测试用例
console.log(bigSub('1222','2111')); // "12345678891358024680"
console.log(bigSub('1000000', '999')); // "999001"
console.log(bigSub('5', '3')); // "2"
console.log(bigSub('0', '0')); // "0"