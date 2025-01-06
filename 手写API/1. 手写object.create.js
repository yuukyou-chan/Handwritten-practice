// object.create 方法接受一个对象，返回一个原型指向该对象的对象

// 这样写不是很好， 严格模式下无法使用__proto__
function create(obj) {
  const newObj = {};
  newObj.__proto__ = obj;
  return newObj;
}

function bestCreate(obj) {
  function temp() {}
  temp.prototype = obj;
  return new temp();
}
