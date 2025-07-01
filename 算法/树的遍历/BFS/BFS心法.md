## BFS 常解决 最短路径问题

## 基础代码模板

BFS 需要用到队列，不断循环队列，每次遍历把当前节点的子节点加入队列中一直循环，通常需要一个 visited 数组记录访问过的节点，
如果需要求最短路径，还需要一个 step 变量记录步数，

```javaScript
// 从 s 开始 BFS 遍历图的所有节点，且记录遍历的步数
// 当走到目标节点 target 时，返回步数
var bfs = function(graph, s, target) {
    var visited = new Array(graph.size()).fill(false);
    var q = [];
    q.push(s);
    visited[s] = true;
    // 记录从 s 开始走到当前节点的步数
    var step = 0;

    while (q.length !== 0) {
        var sz = q.length;
        for (var i = 0; i < sz; i++) {
            var cur = q.shift();
            // 访问当前节点
            console.log("visit " + cur + " at step " + step);
            // 判断是否到达终点
            if (cur === target) {
                return step;
            }
            // 将邻居节点加入队列，向四周扩散搜索
            var neighbors = neighborsOf(cur);
            for (var i = 0; i < neighbors.length; i++) {
                var to = neighbors[i];
                if (!visited[to]) {
                    q.push(to);
                    visited[to] = true;
                }
            }
        }
        step++;
    }
    // 如果走到这里，说明在图中没有找到目标节点
    return -1;
}
```
