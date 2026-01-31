// 有一个数组
// [{id:'1',pid:'0'},
// {id:'2',pid:'1'},
// {id:'3',pid:'2'}，
// {id:'4',pid:'null'}]

// 你需要实现两个函数
// 1. 找到指定id节点的所有祖先节点，返回一个包含该节点的所有祖先节点的数组
// 2. 找到指定id节点的所有后代节点，返回一个包含该节点的所有后代节点的数组 

function getParents(arr,id) {
  const map = new Map();
  const res = [];
  arr.forEach((item) => {
    map.set(item.id, item);
  });

  function dfs(node) {
    if(node.pid === 'null') return 
    res.push(node.pid)
    dfs(map.get(node.pid))
  }
  dfs(map.get(id));

  return res;
}

function getChilden(arr,id) {
  const pMap = new Map();
  const res = [];
  // 找到 pid 的所有子节点
  arr.forEach((item) => {
    if(!pMap.has(item.pid)) {
        pMap.set(item.pid,[item])
    } else {
        pMap.set(item.pid, [...pMap.get(item.pid), item])
    }
  });

  function dfs(id) {
    if(!pMap.has(id)) return 
    pMap.get(id).forEach((item)=>{
        res.push(item.id)
        dfs(item.id)
    })
  }

  dfs(id);
  return res
}