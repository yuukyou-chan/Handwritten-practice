// 百度
var x = 1;
function f1() {
  console.log(this.x);
  this.x = this.y ? 9 : 3;
}

var obj = {
  x: 2,
  y: 1,
  fn: f1,
};

const { fn: f2 } = obj;

f1(); //
obj.fn(); //
f2(); //

console.log(new obj.fn().x);

var name = "渣渣前端";

function foo() {
  console.log(this.name);
}

function fooo() {
  var name = "辣鸡前端";
  foo();
}
fooo();
