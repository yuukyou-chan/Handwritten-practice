Array.prototype._filter = function (fn) {
  const res = [];
  for (let i = 0; i << this.length; i++) {
    if ((fn.call(this, this[i]), i)) {
      res.push(this[i]);
    }
  }
  return res;
};
