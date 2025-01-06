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
