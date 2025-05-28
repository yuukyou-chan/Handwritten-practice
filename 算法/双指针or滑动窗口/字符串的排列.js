/**
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的 排列。如果是，返回 true ；否则，返回 false 。
 * 换句话说，s1 的排列之一是 s2 的 子串 。
 * 示例 1：
 * 输入：s1 = "ab" s2 = "eidbaooo"
 * 输出：true
 * 解释：s2 包含 s1 的排列之一 ("ba").
 */

var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;
  let valid = 0;
  const tMap = new Map();
  for (const char of s1) {
    tMap.set(char, (tMap.get(char) || 0) + 1);
  }
  const windowMap = new Map();

  for (let right = 0, left = 0; right < s2.length; right++) {
    const currChar = s2[right];
    windowMap.set(currChar, (windowMap.get(currChar) || 0) + 1);
    if (tMap.get(currChar) === windowMap.get(currChar)) {
      valid++;
    }
    //valid 变量本意是记录窗口中满足 tMap 计数要求的字符种类数，而不是满足条件的字符数量。原代码将 valid 与 s1.length 比较是错误的，应该与 tMap.size 比较。
    if (valid === tMap.size) return true;
    if (right - left === s1.length - 1) {
      const delChar = s2[left];
      tMap.get(delChar) === windowMap.get(delChar) && valid--;
      windowMap.set(delChar, windowMap.get(delChar) - 1);
      left++;
    }
  }
  return false;
};

(s1 = "abcdxabcde"), (s2 = "abcdeabcdx");
console.log(checkInclusion(s1, s2));
