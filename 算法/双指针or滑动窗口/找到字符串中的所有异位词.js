var findAnagrams = function (s, p) {
  const res = [];
  let left = 0;
  const pMap = new Map();
  for (let char of p) {
    pMap.set(char, (pMap.get(char) || 0) + 1);
  }
  const windowMap = new Map();
  let valid = 0;

  for (let right = 0; right < s.length; right++) {
    const curChar = s[right];
    windowMap.set(curChar, (windowMap.get(curChar) || 0) + 1);
    if (windowMap.get(curChar) === pMap.get(curChar)) {
      valid++;
    }
    if (valid === pMap.size) {
      res.push(left);
    }
    if (right - left + 1 === p.length) {
      const delChar = s[left];
      // pMap.has(delChar) && valid--;
      // 这里不能直接减，因为可能有重复字符，所以要判断是否相等
      pMap.get(delChar) === windowMap.get(delChar) && valid--;
      windowMap.set(delChar, windowMap.get(delChar) - 1);
      left++;
    }
  }
  return res;
};

(s = "cbaebabacd"), (p = "abc");
console.log(findAnagrams(s, p));
