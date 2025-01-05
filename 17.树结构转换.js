/**
 * 要点：
 * 1.构构建 map 存储每一个item，方便找到对应父节点
 * 2.map 存的是对象的引用，不是拷贝，可以直接获取到对应item并对其修改。
 * 3.当没有找到父id 说明当前项是根结点。
 */
function jsonToTree(arr) {
  const res = [];
  const map = new Map();
  arr.forEach((item) => {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  });

  arr.forEach((item) => {
    const parent = map.get(item.pid);
    if (parent) {
      parent.children = parent.children ? [...parent.children, item] : [item];
    } else {
      res.push(item);
    }
  });
  return res;
}

// 转换前：
var source = [
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 1,
    name: "title",
  },
  {
    id: 3,
    pid: 2,
    name: "div",
  },
];
// 转换为:
var tree = [
  {
    id: 1,
    pid: 0,
    name: "body",
    children: [
      {
        id: 2,
        pid: 1,
        name: "title",
        children: [
          {
            id: 3,
            pid: 1,
            name: "div",
          },
        ],
      },
    ],
  },
];

console.log(jsonToTree(source));
