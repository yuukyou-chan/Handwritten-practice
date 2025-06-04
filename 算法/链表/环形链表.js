var hasCycle = function (head) {
  let curr = head;
  let fast = head;
  // 思考：什么时候跳出 while 循环呢？当 node 存在（不为null）的时候
  while (fast && fast.next) {
    fast = fast.next.next;
    curr = curr.next;
    if (fast === curr) {
      return true;
    }
  }
  return false;
};
