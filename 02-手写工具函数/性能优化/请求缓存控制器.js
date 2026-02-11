// 实现一个缓存请求控制器，实现以下功能：
// 1. a 和 b 页面同时发起了同一个请求，只需要发起一次请求，其他页面拿到的是同一个结果
// 2. 需要考虑a页面请求还没结束，b页面又发起了请求，此时b页面的请求应该等待a页面的请求结果返回后再返回

class CacheRequestController {
  constructor(requestor) {
    // 存放缓存数据
    this.cache = new Map();
    // 记录正在请求的数据
    this.pendingRequest = new Map();
    //
    this.requestor = requestor;
  }

  async cacheFetch(url, option) {
    let res;
    const currCache = this.cache.get(url + option);
    if (currCache) return currCache;

    const currPromise = this.pendingRequest.get(url + option);
    if (currPromise) {
      res = currPromise;
    } else {
      res = this.requestor.fetch(url, option);
      this.pendingRequest.set(url + option, res);
      res
        .then((result) => {
          this.cache.set(url + option, result);
        })
        .finally(() => {
          this.pendingRequest.delete(url + option);
        });
    }

    return res;
  }
}
