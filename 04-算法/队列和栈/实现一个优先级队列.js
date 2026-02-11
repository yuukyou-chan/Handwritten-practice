// 基于数组排序的方式实现 时间复杂度：n log n
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enQueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (queueElement.priority < this.queue[i].priority) {
        this.queue.splice(i, 0, queueElement);
        added = true;
        return;
      }
    }
    added = false;
    if (!added) this.queue.push(queueElement);
  }
}
