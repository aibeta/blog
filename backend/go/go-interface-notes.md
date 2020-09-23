# Go Interface Notes

### 接口

- go interface 我们声明了一个类型`type Counter int` ，也同样可以给 `Counter` 添加方法
- go interface 注意 T 类型的值不拥有所有 `*T` 指针的方法
- go interface 如果一个对只要看起来是某种接口类型的实现，那么就可以作为该接口类型使用
- go interface 可以让我们创建一个新的接口类型满足已存在的具体类型，但是不破坏该原有类型
- go interface 延迟绑定，我们继承的只是规范，就是说在运行时，才会去检测 interface 里面的方法是否真的存在,
- go interface 一个接口值，包含了一个动态的接口类型和一个动态的接口值
- go interface 接口类型的隐式转换 `var w io.Writer;` 后，`w = os.Stdout` 和 `w = io.Writer(os.Stdout)` 等价，此时接口值的动态类型是 `*os.File` 指针的类型描述符，它的动态值是一个指向 os.File 类型变量的指针
- go interface 两个接口值都是nil 的时候才相等，或者是可比较的动态类型（int、string、boolean，基本类型和指针）；切片、函数、映射是不可比较的
- go interface 如果我们声明了一个 `var buf = *bytes.Buffer`，注意这时候buf 是不等于nil的，如果想要它为nil，需要声明为 io.Writer
- go interface 内置了sort包，sort.Strings()，可以对字符串切片进行排序，`sort.Sort(sort.Reverse(sort.StringSlice(x)))` 反向排序， StringSlice 是一个类型，实现了排序需要的三个方法 `len` `less` `swap`，任何实现排序接口的类型，都可以调用 `sort.Sort` 进行排序

### 注意点 tips

- 如果我们在json 解析的时候不去判断错误，而是直接 `json.Unmarshal(body, &Result{})` 会出现的问题就是出错时得到的是一个空的 Result
- 如果我们要在 interface 里面包上 interface，只要定义好结构体，就是可以正常解析的
- 如果 json 解析的时候内部的数据结构比较复杂，可以考虑使用 `json.rawmessage` 类型