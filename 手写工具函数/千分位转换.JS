function formatThousands(num) {
    // 正则解释：找到一个空位置，这个空位置到总字符串末尾的内容，是3个数字的倍数（出现一次或多次）
    // (?= ... ):找到一个空位置, 这个位置后面的内容要满足括号里的规则（只定位，不删改字符）
    // (\d{3})+: 匹配3个数字, 这个组可以重复出现一次或多次
    // $: 匹配字符串的结束位置,从末尾开始匹配
   return String(num).replace(/(?=(\d{3})+$)/g,',').split(',').filter(Boolean).toString()
}
console.log(formatThousands(100000))