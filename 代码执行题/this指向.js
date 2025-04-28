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

// this 指向只和调用方式有关，this 是动态的不是静态的
f1(); // 1
obj.fn(); // 2
f2(); // 1

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
