// 打错特错
Function._call(context) = function (context) {}


Function.prototype._call = function (context) {
  let args = [...arguments].slice(1)
  context.fn = this
  const res = context.fn(...args)
  delete context.fn
  return res

}