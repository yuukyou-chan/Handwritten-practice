function myNew(constructor, ...args) {
  // 1. 创建一个空对象
  const obj = {};

  // 2. 将空对象的原型指向构造函数的prototype
  Object.setPrototypeOf(obj, constructor.prototype);
  // 等价于：obj.__proto__ = constructor.prototype（不推荐直接操作__proto__）

  // 3. 执行构造函数，将this绑定到obj
  const result = constructor.apply(obj, args);

  // 4. 判断返回值：如果是对象类型（且不为null），则返回该对象，否则返回obj
  return (typeof result === "object" && result !== null) ||
    typeof result === "function"
    ? result
    : obj;
}
