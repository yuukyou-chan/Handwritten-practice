// a.b.v.c.x.d 生成嵌套对象
function createNestedObject(str,value) {
    const keys = str.split('.')
    const res = {}
    let curr = res
    for(let i=0;i<keys.length;i++){
      if(i === keys.length - 1) {
      	curr[keys[i]] = value
      } else {
        curr[keys[i]] = {}
        curr = curr[keys[i]]
      }
    }
  return res
}

console.dir(JSON.stringify(createNestedObject('a.b.v.c.x.d',100)))