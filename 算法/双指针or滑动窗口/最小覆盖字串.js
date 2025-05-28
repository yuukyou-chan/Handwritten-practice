//给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
var minWindow = function (s, t) {
  let left = 0,
    right = 0,
    start = 0;
  const tMap = new Map();
  for (let char of t) {
    tMap.set(char, (tMap.get(char) || 0) + 1);
  }
  const windowMap = new Map(s.split("").map((i) => [i, 0]));
  let minLength = Infinity;

  const check = () => {
    for (const [key, value] of windowMap) {
      if (value >= tMap.get(key)) {
        return false;
      }
    }
    return true;
  };

  for (; right < s.length; right++) {
    if (windowMap.has(s[right])) {
      let currMapItem = windowMap.get(s[right]);
      windowMap.set(s[right], currMapItem + 1);
    }
    while (check()) {
      if (right - left < minLength) {
        start = left;
        minLength = right - left;
      }
      if (windowMap.has(s[left])) {
        let currMapItem = windowMap.get(s[left]);
        windowMap.set(s[left], currMapItem - 1);
      }
      left++;
    }
  }
  return minLength === Infinity
    ? ""
    : s.substring(start, start + minLength + 1);
};

let s = "aEBAC",
  t = "ABC";

console.log(minWindow(s, t));
