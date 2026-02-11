function cloneDeep(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      newObj[key] = cloneDeep(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

// 支持循环引用
function cloneDeep2(obj, map = new Map()) {
  let newObj = {};
  if (map.has(obj)) return map.get(obj);
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object) {
      // map.set(obj, obj);  这样的话新对象会指向旧对象，不符合深拷贝
      map.set(obj, newObj);

      newObj[key] = cloneDeep2(obj[key], map);
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

const obj = {
  name: "zzz",
  age: 18,
  friend: {
    name: "xxx",
    age: 19,
  },
  self: null,
};
obj.self = obj;

console.log(cloneDeep2(obj));
