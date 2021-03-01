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

### go embed 
- 用法1: 嵌入为字符串或比特数组, 把文件里都内容嵌入为字符串s
```go
//go:embed hello.txt
var s string // var b []byte
```
- 用法2: 支持嵌入多个文件作为文件系统, 支持目录/pattern
```go
//go:embed hello.txt hello2.txt
//go:embed image/* template/*
var f embed.FS
```
- 用法3: 在提供http服务时，可以用 `http.FS` 代换掉 `http.Dir` 来 serve 静态文件
- 用法4: html/template 也可以从嵌入的文件系统中解析模板