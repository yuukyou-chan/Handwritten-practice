/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
 * 示例 1:
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */

// 滑动窗口
function lengthOfLongestSubstring(s) {
  const charIndexMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    if (
      charIndexMap.has(currentChar) &&
      // 重复i索引在left左边说明 之前记录的位置不在滑动窗口内，不是重复字符，不需要更新left
      charIndexMap.get(currentChar) >= left
    ) {
      left = charIndexMap.get(currentChar) + 1;
    }
    charIndexMap.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
}

// 暴力解法 时间复杂度 O(n^2) 无法通过 leetCode
function lengthOfLongestSubstring(s) {
  let maxString = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let currString = s.slice(i, j + 1);
      let currCharacter = s[j + 1];
      console.log(currString, currCharacter, i, j);
      if (currString.length > maxString.length) {
        maxString = currString;
      }
      if (currString.includes(currCharacter)) {
        break;
      }
    }
  }

  return maxString.length;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
