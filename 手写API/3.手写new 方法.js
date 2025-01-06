function myNew(constructor, param) {
  let obj = {};
  obj.__proto__ = constructor.prototype;
  const res = constructor(...param);
  if (typeof res === "object") {
    return res;
  } else {
    return obj;
  }
}
