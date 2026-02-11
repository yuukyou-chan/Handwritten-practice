// function DFSflat(arr, depth = 1) {
//   let res = [];
//   function dfs(arr, currDepth) {
//     for (let i = 0; i < arr.length; i++) {
//       if (Array.isArray(arr[i]) && currDepth < depth) {
//         dfs(arr[i], currDepth + 1);
//       } else {
//         res.push(arr[i]);
//       }
//     }
//   }
//   dfs(arr, 0);
//   return res;
// }


function DFSflat(arr,depth) {
  let res = [];
  let currDepth = 0
  function dfs(arr) {
    currDepth++
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currDepth <= depth) {
        dfs(arr[i]);
      } else {
        res.push(arr[i]);
      }
    }
  }
  dfs(arr);
  return res;
}

const testArr = [1, [2, [3, 4]], 5];
console.log('Depth 1:', DFSflat(testArr, 1));
console.log('Depth 2:', DFSflat(testArr, 2));
