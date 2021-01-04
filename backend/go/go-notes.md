## go

- go i++是一个是声明 不是表达式
- swith 和 if 都有 initializora
- switch tag 里面的case 不需要break; 不需要 {} ; tag 用逗号隔开，也可以没有tag, 也可以使用break, 使用fallthrough 会进入下一个条件，不管满不满足?
- 对数字用 string() 进行类型转化 会转为ascii，所以要用到 strconv
- iota是个counter ，可以在block里省略编写，新block里会重新变成0
- make 函数可以创建slicae map
- 通过reflect和filed来得到结构体的tag
- 匿名struct(name string){name: "s"} 是值拷贝的
- 从map里获取到空值，可以用ok来检验，也可以配合 if 使用 if val, ok := params['name']; ok {}
- slice map function 类型的变量不能直接对比
- 可以在包内 对fmt 重新声明