//实现 LRUCache 类：
/**
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；
 * 如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 */

/**
 * 解释
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // 缓存是 {1=1}
 * lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
 * lRUCache.get(1);    // 返回 1
 * lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
 * lRUCache.get(2);    // 返回 -1 (未找到)
 * lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
 * lRUCache.get(1);    // 返回 -1 (未找到)
 * lRUCache.get(3);    // 返回 3
 * lRUCache.get(4);    // 返回 4
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    if (this.cache.size >= this.capacity) {
      // this.cache.keys().next().value 表示第一个key
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

// tips
/**
 * 插入顺序保留：Map 会严格按照键值对的插入顺序来维护元素顺序。
 * 更新不影响顺序：如果修改已存在的键对应的值，该键的位置不会改变。
 * 删除后重新插入会改变顺序：如果删除一个键后再重新插入，它会出现在 Map 的末尾。
 * this.cache.keys() 返回一个迭代器，你可以使用 next() 方法来获取下一个键，从第一个 key 开始。
 */

// 虾皮一面 实现O(1)时间复杂度的LRU缓存除了Map还有什么方法
// 1. 对象 + 双向链表 模拟实现
// 2. 对象：作用是快速找到节点 “key → 链表节点” 的映射。
// 3. 双向链表：用于维护访问顺序；最近访问的节点移动到链表头，最久未访问的节点移动到链表尾。


/**
 * 定义双向链表节点类
 * 每个节点保存key（淘汰时需从Object删除对应项）、value、前驱/后继指针
 */
class ListNode {
  constructor(key, value) {
    this.key = key;      // 缓存的键（必须保存，淘汰节点时用）
    this.value = value;  // 缓存的值
    this.prev = null;    // 指向前一个节点的指针
    this.next = null;    // 指向后一个节点的指针
  }
}

/**
 * LRU缓存核心类
 * 核心逻辑：Object（哈希表）+ 双向链表，保证所有操作O(1)
 */
class LRUCache {
  /**
   * 初始化LRU缓存
   * @param {number} capacity - 缓存的最大容量
   */
  constructor(capacity) {
    this.capacity = capacity; // 缓存容量上限
    this.size = 0;            // 当前缓存的节点数量
    this.cache = {};          // 哈希表：key -> ListNode（O(1)查找节点）

    // 虚拟头尾节点（简化边界处理，无需判断节点是否为null）
    this.head = new ListNode(-1, -1); // 虚拟头（不存实际数据）
    this.tail = new ListNode(-1, -1); // 虚拟尾（不存实际数据）
    this.head.next = this.tail;       // 初始：头 → 尾
    this.tail.prev = this.head;       // 初始：尾 → 头
  }

  /**
   * 辅助方法：将节点插入到虚拟头节点的下一位（链表最前端，标记为最近使用）
   * @param {ListNode} node - 要插入的节点
   */
  _addToHead(node) {
    // 1. 绑定节点与虚拟头的关系
    node.prev = this.head;        // 节点的前驱 = 虚拟头
    node.next = this.head.next;   // 节点的后继 = 原头的下一个节点

    // 2. 反向绑定（双向链表核心）
    this.head.next.prev = node;   // 原头的下一个节点 → 前驱指向当前节点
    this.head.next = node;        // 虚拟头 → 后继指向当前节点
  }

  /**
   * 辅助方法：从链表中删除指定节点（仅调整指针，不删除节点本身）
   * @param {ListNode} node - 要删除的节点
   */
  _removeNode(node) {
    const prevNode = node.prev;   // 拿到节点的前驱
    const nextNode = node.next;   // 拿到节点的后继

    // 跳过当前节点，直接连接前驱和后继
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  /**
   * 辅助方法：将节点移到链表头部（标记为最近使用）
   * @param {ListNode} node - 要移动的节点
   */
  _moveToHead(node) {
    this._removeNode(node); // 先从原位置删除
    this._addToHead(node);  // 再插入到头部
  }

  /**
   * 辅助方法：删除链表尾部节点（最少使用的节点）
   * @returns {ListNode} 被删除的尾部节点（用于从哈希表删除对应key）
   */
  _removeTail() {
    const tailNode = this.tail.prev; // 虚拟尾的前驱 = 实际最后一个节点
    this._removeNode(tailNode);      // 删除该节点
    return tailNode;                 // 返回节点，方便后续操作
  }

  /**
   * 核心方法：获取缓存中的值
   * @param {number|string} key - 要查找的键
   * @returns {number} 找到返回对应值，未找到返回-1
   */
  get(key) {
    const node = this.cache[key]; // 哈希表O(1)查找节点
    if (!node) return -1;        // 未找到，返回-1

    this._moveToHead(node);      // 标记为最近使用（移到头部）
    return node.value;           // 返回值
  }

  /**
   * 核心方法：插入/更新缓存
   * @param {number|string} key - 缓存的键
   * @param {number} value - 缓存的值
   */
  put(key, value) {
    const node = this.cache[key]; // 哈希表O(1)查找节点

    if (!node) {
      // 情况1：新节点 → 插入缓存
      const newNode = new ListNode(key, value); // 创建新节点
      this.cache[key] = newNode;               // 哈希表记录映射
      this._addToHead(newNode);                // 插入到链表头部
      this.size++;                             // 缓存数量+1

      // 超过容量 → 淘汰最少使用的节点（尾部节点）
      if (this.size > this.capacity) {
        const removedNode = this._removeTail(); // 删除链表尾部节点
        delete this.cache[removedNode.key];     // 哈希表删除对应映射
        this.size--;                            // 缓存数量-1
      }
    } else {
      // 情况2：已有节点 → 更新值并标记为最近使用
      node.value = value;    // 更新节点值
      this._moveToHead(node); // 移到链表头部
    }
  }

}

// ======================================
// 测试用例：验证LRU缓存的核心功能
// ======================================
const lru = new LRUCache(2); // 初始化容量为2的LRU缓存

// 测试1：插入两个节点
lru.put(1, 1);
lru.put(2, 2);
lru.printCache(); // 输出：当前缓存顺序（最近→最少）： 2:2 → 1:1