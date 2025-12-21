// 单例类：全局唯一的计数器示例
class SingletonCounter {
    // 静态私有字段存储唯一实例（面试可简化为 _instance，说明是约定私有）
    static #instance = null;

    // 构造函数：初始化+阻止重复创建
    constructor() {
        // 关键：已有实例则直接返回，不新建
        if (SingletonCounter.#instance) {
            return SingletonCounter.#instance;
        }
        // 实例状态（全局共享）
        this.count = 0;
        // 首次创建时绑定实例 ********** 重点
        // 这个this 只得就是刚刚创建出来的对象，new 构造函数第一步就是在内部创建一个新对象
        SingletonCounter.#instance = this;
    }

    // 全局访问点（核心 API）
    static getInstance() {
        // 通过静态方法/属性访问（类名.方法名），确保全局唯一性
        // 不能使用 this，这样就会变成实例方法，每次调用都会创建新实例
        if (!SingletonCounter.#instance) {
            new SingletonCounter();
        }
        return SingletonCounter.#instance;
    }

    // 实例方法（业务逻辑）
    increment() {
        this.count++;
        return this.count;
    }
}

// -------------------------- 面试演示用法 --------------------------
// 1. 获取实例（首次调用初始化）
const counter1 = SingletonCounter.getInstance();
// 2. 再次获取（返回同一个实例）
const counter2 = SingletonCounter.getInstance();

// 验证唯一性（面试必说：证明单例核心特性）
console.log(counter1 === counter2); // true

// 共享状态（面试必演示：多实例操作同一状态）
console.log(counter1.increment()); // 1
console.log(counter2.increment()); // 2（共享count，不是独立状态）

// 3. 即使直接 new，也返回同一个实例（面试加分：说明防绕过逻辑）
const counter3 = new SingletonCounter();
console.log(counter3 === counter1); // true
console.log(counter3.increment()); // 3


class Singleton {
    static _instance = null

    constructor() {
        if (Singleton._instance) {
            return Singleton._instance
        }
        Singleton._instance = this
    }

    getInstance() {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton()
        }
        return Singleton._instance
    }
}