// 腾讯二面
// 实现一个场景：消息记录的提示：消息发送的时间小于1分钟，显示刚刚，大于1分钟小于1小时，显示xx分钟前，大于1小时小于24小时，显示xx小时前，大于24小时，显示xx天前

// 定义策略接口，每个策略必须实现 这个接口上的方法
class Kind {
  isApplicable(diffMs) {}
  format(diffMs) {}
}

// 分钟策略
class MinStrategy extends Kind {
  isApplicable(diffMs) {
    return diffMs < 60 * 1000;
  }
  format(diffMs) {
    return "刚刚";
  }
}

// 小时策略
class HourStrategy extends Kind {
  isApplicable(diffMs) {
    return diffMs < 60 * 60 * 1000 && diffMs >= 60 * 1000;
  }
  format(diffMs) {
    return `${Math.floor(diffMs / (60 * 1000))}分钟前`;
  }
}

// 策略管理器
class MessageManager {
  constructor(time) {
    this.strategies = [new MinStrategy(), new HourStrategy()];
  }

  format(time) {
    const currTime = new Date();
    const diffMs = currTime - time;

    this.strategies.forEach((strategy) => {
      if (strategy.isApplicable(diffMs)) {
        return strategy.format(diffMs);
      }
    });
  }
}

// 使用方式
MessageManager.format(1000);

//
