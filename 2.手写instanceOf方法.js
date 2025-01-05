// 此版本错误，第二个参数应该是构造函数，应该比较的是target对象的原型上是否在构造函数的原型对象
// 而不是直接拿函数来和原型对象比
function instanceOf(target, origin) {
  let prototype = target.__proto__;
  while (true) {
    if (prototype === null) return false;
    if (prototype === origin) return true;
    prototype = prototype.__proto__;
  }
}

function bestInstanceOf(obj, constructor) {
  let leftPrototype = Object.getPrototypeOf(obj);
  let rightPrototype = constructor.prototype;
  while (true) {
    if (leftPrototype === null) return false;
    if (leftPrototype === rightPrototype) return true;
    leftPrototype = Object.getPrototypeOf(leftPrototype);
  }
}
