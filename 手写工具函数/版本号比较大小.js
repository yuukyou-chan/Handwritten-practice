// 高途一面
function compareVertion(v1,v2) {
    const v1Arr = v1.split('.').map(Number)
    const v2Arr = v2.split('.').map(Number) 
    const maxLen = Math.max(v1Arr.length,v2Arr.length)  
    
    for(let i = 0; i < maxLen; i++) {
      // 缺位补0
      const v1Num = v1Arr[i] || 0
      const v2Num = v2Arr[i] || 0
      if(v1Num > v2Num) {
        return 1
      } else if(v1Num < v2Num) {
        return -1
      }
    }
    return 0
}

console.log(compareVertion('1.2.3','1.2'))

console.log(compareVertion('1.2.3','1.2.3'))