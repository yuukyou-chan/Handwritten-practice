// 实现一个缓存请求控制器，实现以下功能：
// 1. a 和 b 页面同时发起了同一个请求，只需要发起一次请求，其他页面拿到的是同一个结果
// 2. 需要考虑a页面请求还没结束，b页面又发起了请求，此时b页面的请求应该等待a页面的请求结果返回后再返回

class CacheRequestController {
  constructor() {
    // 存放缓存数据
    this.cache = new Map();
    // 记录正在请求的数据
    this.pendingRequest = new Map();
  }

  async cacheFetch(url, options) {}
}
