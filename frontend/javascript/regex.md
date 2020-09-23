# Regex

``` javascript
const str = ""

// (): 子表达式
// {1}: 前方表达式固定出现一次
// []: 中括号匹配
// [123]：简单字符组，匹配1、2、3，
// [1-35-7]：组合字符组，匹配1、2、3、5、6、7
// [^0-9]：排除型字符组，除了0-9的字符
// JS中的预定义字符组：\D，\W，\S 分别对于非数字字符组，非单词字符组，非空白字符组
// \d == [0-9]，数字字符组(digit)
// \w == [a-zA-Z_0-9]，单词字符组(word)
// \s == [ \t\n\x0B\f\r]，和空白符字符组(space)。
// .: 除了 /n 字符之外的任意字符
// g: 匹配出全局所有符合条件的

// 限定符
// *: 0次、1次、多次，
// +: 1次、多次
// ?: 0次、1次
// {n}: 精确匹配 n次，
// {n,}: 匹配 n次或 n+次，如 {1,} = +
// {n,m}: 最少匹配 n 次且最多匹配 m 次
// *、+限定符都是贪婪的，因为它们会尽可能多的匹配文字，只有在它们的后面加上一个?就可以实现非贪婪或最小匹配。
// eg: <H1>Chapter 1 - 介绍正则表达式</H1> /<.*>/ 匹配所有，/<.*?>/ 匹配 <H1>
// \b \B 

//JS 操作
//regexObj.exec(str) 如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的属性。
//返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。

//regexObj.test(str) 如果正则表达式与指定的字符串匹配 ，返回true；否则false。

//str.match(regexp) 如果字符串匹配到了表达式，会返回一个数组，数组的第一项是进行匹配完整的字符串，
//之后的项是用圆括号捕获的结果。如果没有匹配到，返回null。第二项开始是数组的每一个子表达式的匹配

//匹配 lux-mt20 lux-cofff
str.match(/lux-(w|h|mt|mr|mb|ml|pt|pr|pb|pl|fs|bg|co){1}[1-9a-zA-Z]+/g)

//a,b 之间
str.match(/a(.*)b/)[1]

// 1. 匹配 require('../../styles/weui.css')
"require('../../lib/rem')".match(/^require\('..\/..\/lib\/rem'\)\n/)

//固话，7位或8位数字
new RegExp(/\d{7,8}/).test("12345678")

//服务热线，400/800 + 7位数字
new RegExp(/[48]00\d{7}/).test("4008001234")

// 匹配 lux-mt20
new RegExp(/lux-(w|h|mt|mr|mb|ml|pt|pr|pb|pl|fs)\d+/g)

// 匹配 lux-bgfff
new RegExp(/lux-(co|bg)[a-f|A-F|0-9]{3,6}/g)

//取出 mt 和 20
const result = d.match(/(w|h|mt|mr|mb|ml|pt|pr|pb|pl|fs|co|bg)(.+)/)
const key = result[1]
const value = result[2]
```