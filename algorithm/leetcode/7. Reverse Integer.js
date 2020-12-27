/**
 * @param {number} x
 * @return {number}
 */

// 给一个 32-bit 无符号整形，逆转数字

// 知识点：32-bit 符号整形是什么? Math.pow(2,31) - 1 
// JS: Math.pow(2,31) 平方
// JS: Math.sqrt(9,2)和开方
// JS：Math.abs(n) 绝对值
// Number(021) === 17
// 按10解析数字 parseInt(num,10)

// form:22:00, end: 23:02

/**
 * @param {nummber} x
 */
var reverse = function(x) {
    const abs_x = Math.abs(x)
    const reverse_str = String(abs_x).split("").reverse().join("")
    const reverse_num = parseInt(reverse_str, 10)
    if(reverse_num  > 0x7FFFFFFF) return 0
    return x < 0 ? reverse_num * -1 : reverse_num
};