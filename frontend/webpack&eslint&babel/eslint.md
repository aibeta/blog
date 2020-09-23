# Eslint

# 前端规范

## 开发注意事项

- 注意遵从 ESlint 规范
- 避免同样的代码写很多遍，超过两次的使用就要考虑提取公共方法
- 避免一个方法写很多行，超过一屏的能分离就分离

## Git 工作流程

- 在 develop 分支上进行开发
- 开发结束之后在 develop 分支进行测试
    - 测试出现的 bug 依然在 develop 分支进行修复
- 测试完毕后，把 develop 合并到 master 分支进行测试
    - 如果出现问题，切换到develop 分支进行修复
    - 然后合并到 master 分支
- 测试没问题，使用 master 分支要发上线版本
    - 如果需要，可以打一个 tag

## ESlint 配置说明

- `no-case-declarations`，在`case\\default` 里的代码用花括号括起来，否则 `let\\const\\function\\class` 会共享`swtich`的词法作用域
- `semi`，句尾加分号
- `comma-dangle`，对象的属性后面必须加逗号
- `object-shorthand`，对象字面量速记语法
```
// es6 提供了简洁的属性和方法定义形式
var foo = {x, y, z}
var foo = {
// 等同于 a: function() {}
a() {},
}
```
- `no-plusplus`，不使用`++`，而用`+=1`，避免自动补全分号的问题
- `(padded-blocks)`，花括号后面不要换行
- `no-cond-assign`，禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了
- `eqeqeq`，必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
- `no-param-reassign`, 禁止对函数的参数重新赋值
- `no-unused-vars`, 定义过的变量必须使用
- `no-use-before-define`, 变量必须先定义后使用
- `linebreak-style`, 限制换行符为 LF 或 CRLF
- `no-mixed-spaces-and-tabs`, 禁止混用空格和缩进
- `no-var`, 禁止出现 var
- `no-unexpected-multiline`, 禁止出现难以理解的多行表达式
- `array-bracket-spacing`, 数组的括号内的前后禁止有空格
- `comma-spacing`, 逗号前禁止有空格`, 逗号后必须要有空格
- `no-nested-ternary`, 禁止使用嵌套的三元表达式, 比如 a ? b : c ? d : e
- `no-constant-condition`, 禁止将常量作为分支条件判断中的测试表达式, 但允许作为循环条件判断中的测试表达式
- `yoda`, 必须使用 if (foo === 5) 而不是 if (5 === foo)
- `no-debugger`, 禁止使用 debugger
- `no-trailing-spaces`, 禁止行尾有空格
- `one-var`, 禁止变量申明时用逗号一次申明多个
- `one-var-declaration-per-line`, 变量申明必须每行一个
- `sort-imports`, import 必须按规则排序
- `space-before-blocks`, if, function 等的大括号之前必须要有空格, 比如 if (a) {
- `arrow-spacing`, 箭头函数的箭头前后必须有空格