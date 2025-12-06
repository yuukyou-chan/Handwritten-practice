/**
 * 数字转中文读法
 * @param {number} num 要转换的数字
 * @returns {string} 中文读法
 */

// 思路：中文读法是将数字每四位拆成一组，每一组进行翻译，最后在每组之间插入层级单位；注意 0 的处理。 
function toChineseNum(num) {
    const numChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const unit = ["","十","百","千"];
    const levelUnit = ["","万","亿"]
    // 卡点1:将数字每四位拆成一组 [123,4000,0000]
    // 正则解释：
    // (?= ... ):找到一个空位置, 这个位置后面的内容要满足括号里的规则（只定位，不删改字符）
    // (\d{4})+: 匹配4个数字, 这个组可以重复出现一次或多次
    // $: 匹配字符串的结束位置,从末尾开始匹配
    let part = num.toString().replace(/(?=(\d{4})+$)/g, ',').split(',').filter(Boolean);

    function _handelZero(str) {
        // 1.合并中间零 2.去掉末尾零
        return str.replace(/零+/g, '零').replace(/零$/g, '');
    }

    // 将四位数字转成中文 + 单位
    function _transform(str) {
        let result = ''
        // 从后往前遍历
        for(let i = 0; i < str.length; i++) {
            // 找到数字对应的中文
            const c = numChar[str[i]];
            // 卡点2：找到对应单位, 拿末尾坐标减去当前坐标，相当于从后往前遍历
            let u = unit[str.length - 1 - i];
            if(c === '零') {
                u = ''
            }
            result += c + u;
        }
        // 处理零
        result = _handelZero(result);
        return result
    }

    let result = ''
    for(let i = 0; i < part.length; i++) {
        const c =  _transform(part[i])
        const u = levelUnit[part.length - 1 - i]
        // 处理中间0,比如 100 0000 1232 ，中间的 0000 要变成零，且单位要去掉
        if(c === '') {
            c='零'
            u=''
        }
        result += c + u;
    }
    result = _handelZero(result).replace(/一十/g,'十')
    return result

}
console.log(toChineseNum(111180))
 // '一undefined一undefined一千一百八十'