# Go Reading Notes

- Go 程序里要注意释放打开的操作系统层面的资源，比如打开的文件要关闭，建立的网络连接要记得断开 `resp.Body.Close()`
- 需要在各种条件里关闭文件，就可以使用 `defer` 释放资源，在整个函数执行完后执行defer 后面的函数，如果声明里多个defer，适用于洋葱模型
- fmt.Printf("%*s", n, s) 这个 `*` 会在输出s字符串前插入n个空格
- 函数名后缀f是一个通用的命名规范，代表该可变参数函数可接收Printf风格的格式化字符串

### 声明

- `s := ""` 短变量声明，只能用于函数内部
- `var s string` 默认初始化零值机制把s初始化为 ""
- var 变量名字 类型 = 表达式,“类型”或“= 表达式”两个部分可以省略其中的一个
- 名字 := 表达式”形式 声明变量，变量的类型根据表达式来自动推导
- 简短变量声明语句只有对已经在同级词法域声明过的变量才和赋值操作语句等价，如果变量是在外部词法域声明的，那么简短变量声明语句将会在当前词法域重新声明一个新的变量
- 简短变量声明语句中必须至少要声明一个新的变量
- 指针 fmt.Println(f() == f()) // "false" ？？
- go new: 可以使用 new 函数创建一个指针p `p := new(int)`
- go new: 每次调用new都会生成一个新的变量的地址，意思是创建出来的指针不相等
- go new: 注意 new 只是一个预定义函数，所以可以在自己的函数里重新定义 
- go fuzhi: ``m[key], x.(T), <-ch``
- go type 类型名 底层类型，来声明别名，也可以使用 T(x) 来进行类型转换
- go type 许多类型内部都有 String 方法，使用fmt 打印时，会调用这个方法
- go unit32 and rune equals, they can replace with each other
- go unit8 and byte equals, but byte more streessed the value is a raw type data
- go string 内置的len函数可以返回一个字符串的字节数目，而不是 rune 数目, 因为utf8可占用两个或多个字节
- go connst 声明的常量可以是无类型的
- go iota 初始为0，在重复的时候+1

## for

- for initialization; condition; post {} 这三部分每一个部分都可胜利，甚至可以全省略
- `for i :=0; i<len(s); i++`  和 `for _, char := range s` 等价
- for range array 迭代可以避免数组越界
- for range string 只能遍历UTF8编码的字符串，因为其他编码可是一个二进制数组结构
- for range 想遍历原始的字节码，可以把字符串转为 []byte 字节序后再进行遍历 `for i, c := range []byte("世")`
- for 按下标方式遍历字符串的字节数据 `for i:=0; i < len(s); i++`， 然后`fmt.Printf("%x", s[i])`

## Go Advanced

- CSP: conmunicating sequential processes
- fmt.Println('str'), 参数字符串是作为地址传递的，并没有发生复制
- fmt.Printf("%T, %#v", b, b) 可以打印数组的类型和详细信息
- go 中，函数传参都是以复制的方式传递的？那么上面的一句话怎么理解
- go 函数中的闭包是以引用的方式访问外部变量的，其他复制和传参都是传值。
- go recursive  go  使用 可变栈，不用考虑溢出的情况
- go error 错误信息是以链式组合在一起的，在处理的时候不要换行

### 数组

- go Array 是一种值类型，就是说变量是一个完整的值，而不是隐式地指向第一个元素的指针
- go Array 拷贝是深拷贝，我们可以通过 `var b = &a` 拷贝指针
- go Array 是固定长度的、特定类型元素的序列, `var a [3]int`, `var a = [...]{1,2,3}`
- go Array 字符串 `var s1=[2]string("hello", "w")`, `var s2=[...]("hello", "w")`
- go Array 结构体 `var l1=[2]image.Point`, `var l2=[...]image.Point({0,0}, {1,1})`
- go Array 接口 `var unknown1 [2]interface()`, `var unknown2 = [...]interface{} {12,34}`
- go Array 管道 `var chanList = [2]chan init{}`
- go array 只有两个数组里所有的元素都是相等的时候，两个数组才是相等的
- go array 数组在作为函数的参数被传递时，整个数组都会进行复制，对于数组的修改因此也与元数组无关
- go array 为了解决上面的问题，我们可以不传数组，而是传一个数组指针

### 字符串

- go String 底层结构是一个只读的字节数组，所以赋值只是复制了数据地址和对应的长度
- go String 是一个结构体数组，有两个信息，1字符串执行的底层字节数组，2是字节的长度
- go String 在赋值时，是这个结构体的赋值，而不是1指向的底层字节数组的赋值
- go String `s := "hehe"`和 `var s = [...]byte{'h','e','h','e'}` 在底层完全一致
- go String 不是切片，但是支持切片操作 `he := "hehe"[:5]`
- go String 查看 unicode 底层数组 fmt.Printf("%#v", "世")
- go String 直接打印utf8编码的值 fmt.Println("\xe4\xb8\x96")
- go rune 其实是 int32 的别名，有几种对字符串强制转换的模拟实现，不是特别理解.

### 切片

- go Slice 结构和String类型相似，区别是取消了只读的限制,结构体数组头信息多了一个 cap 表示最大容量
- go Slice 每个slice 有独立的长度和容量信息，切片的头信息里有底层数据的指针

    ```go
    var (
    a []int
    b = []int{}
    c = []int{1,2,3}
    d = c[:2]
    e = c[0:2:cap(c)]
    f = c[:0]
    g = make([]int ,3)
    h = make([]int, 2, 3)
    i = make([]int, 0, 3)
    )
    ```

- go Slice 和数组指针的操作方式类型，在对切片进行赋值或参数传递时，只是复制了切片头的信息
- go Slice 的类型和数组不同，切片的类型和长度无关，相同类型元素构成的切片的类型是相同的
- go Slice 可以使用泛型函数 append 向切片位置添加元素 `a = append(a, []int{1,2,3}...)` ...叫做解包，在头部添加元素可以用`a = append([]int{0}, a...)`
- go Slice 在头部添加元素会导致每个元素重新分配内存，性能会差点儿
- go Slice 在中间添加一个元算

    ```go
    a = append(a, 0)
    copy(a[i+i:], a[i:])
    a[i]=x
    ```

- go Slice 在中间添加多个元素

    ```go
    a = append(a, x...)
    copy(a[i+len(x):], a[i:])
    copy[a[i:], x]
    ```

- go Slice 删除开头元素`a = a[1:]` 或者n个元素 `a=a[n:]`, 也可以用 append 和 copy 实现 `a = append(a[:0], a[1:]...)` `a = a[:copy(a, a[1:])]`，删除中间元素也是可以通过 append 和 copy 实现
- go Slice 删除尾部元素`a = a[:len(a) -1]` 或者n个元素 `a=a[:len(a)-n]`
- go Slice 空切片是说 len 和 cap 都是0，但是它并不是一个 nil 值的切片
- go Slice 一个len是0，但是cap 不是0的0长度切片确实很有用的初始化一个空切片 `f := c[:0]`
- go Slice 高效的要点：1. 降低内存分配次数，2.保证append不超出cap
- go Slice 切片的垃圾回收，以及切片类型的强制转换，看完不是特别理解
 go slice 一般写作 []T，T 表示元素的类型，slice：data/len/cap
- go slice 为什么说 slice 的元素不一定是数组的第一个元素，它跟数组有什么关系
- go slice 是对数组的引用，扩展了slice，就意味着能访问更多的数组元素了
- go slice 所以slice 声明 `s := []int{0,1}` 会隐式地创建一个数组，slice 指向这个数组
- go slice x[m:n] 如果操作字符串会生成新的字符串，如果操作的是[]byte 会生成新的[]byte
- go slice 除了bytes.Equal,其他的类型的slice没有内置的比较函数，但是可以自己实现逐个元素的比对
- go slice 测试slice为空，使用len(s) 来判断，一个零值的slice等于nil，一个 nil值的slice并没有底层数组
- go slice 模拟push `append(s, "")`
- go slice 模式pop `top  = stack[len(stack) - 1]; stack = stack[:len(stack) -1]`
- go slice 模拟remove `copy(slice[i:], slice[i+1:]); slice[:len(slice)-1]`

- todo解释：go 通过隐式接口机制实现了鸭子面向对象模型
- go main: go 程序的初始化是通过 main.main 开始的, 1. 导入包级常量 初始化这个包的常量和变量，执行 init 2. main

### struct

- go struct 结构体是一个聚合类型，结构体变量大写/小写开头`type Employee struct {ID int}`
- go struct 可以通过.操作符和指针操作符来访问成员,
- go struct 结构体无任何成员就是空结构体 struct{}，大小为0，不包含任何信息
- go struct 可以作为函数的参数和返回值, 它同样会复制整个结构体对象，考虑效率的话可以使用指针
- go struct 如果所有成员都可比较，那么结构体也可以比较
- go struct 匿名成员的数据类型必须是命名的类型 或者指向一个命名的类型的指针
- go struct 结构体字面量赋值无法简短地声明匿名类型，必须遵循形状类型声明时的结构

### map

- go map map[K]V 对应 key和value 的类型
- go map 可以使用 `args := make(map[string]int)` 创建，或者`map[string]int {}`, 可以使用`args["a"]`访问value
- go map 也可以 ` args := map[string]int { "alice": 31 }`
- go map map中的元素并不是一个变量，所以不能进行取地址操作 
- go map 使用for range 迭代map，每一次的key的顺序都不同，
- go map 类型的零值是nil，此时 len(map) == 0
- go map 用于测试map里面是否存在某个元素 `if age, ok := ages["bob"]; !ok{}`
- go map 如果我们想让一个slice作为 key也是可以的，就是每次操作map时先把slice转为**string**

### json

- go json 结构体成员可以添加tag  `json:"released,omitempty"` omitempty 代表它可能为空
- go json `json.Marshal` 可以把 一个结构体slice转化为json
- go json `json.Unmarshal(data, &titles) ` 可以解析 titles  结构体，`var titles []struct { Title string }` 
- go json 如果 json  名称和我们声明的结构体的成员名称不同，我们需要加上tag注明
- go json 我们也可以使用  json.Decoder 从一个输入流里面解码json 数据

### 函数和方法

- go func 参数没有默认值，每次调用必须按照声明顺序提供参数
- go func 如果实参包括引用类型，slice、map、function、channel，可能导致实参被修改
- go func 如果一个函数所有的返回值都有变量名字，那么就可以   bare  return
- go func 函数是第一类对象，go 中分为具名和匿名函数，匿名函数` var Add = func(a, b int) int`
- go func 可以接收多个参数，返回多个值，可变数量的参数其实是一个切片类型的参数
- go func 在声明时可以给返回值命名，命名后可以通过名字修改返回值
- go method 方法是OOP的概念，是一个类对象的成员函数
- go method 中，我们先声明一个 type，再声明一个类型独有的方法 `func(f *File) Close() error{}`, 它们需要在一个包里
- go inherit go 不支持传统的继承，而是通过在结构体内置匿名的成员来实现内部成员和成员类型的方法的继承
- go polym 但是这种继承方法并不能实现多态特性，如果想要虚函数的多态，需要借助go语言接口实现
- go func `func (this *H5handler)` 使用指针进行单例的传递

### defer

- go func 里有 defer 语句，可以声明一个匿名函数并调用 `defer func(){} ()`
- go func defer 一个函数是指在函数返回后调用这个defer 后面的函数
- 在context 调用 cancel 的时候为要 defer cancel()，确保后面的函数能够确保函数在返回前运行, cancel 本身则是为了释放资源

### 指针

- 并不是每个值都有一个内存地址
- 每个变量必然有对应的内存地址，通过指针可以直接读或更新对应变量的值，不需要知道变量的名字
- var x int 声明一个x变量，&x 代表x的指针，*int 代表指针对应的数据类型
- go pointer 的地址不是固定的，那么 我们是么时候 返回 `&x` 什么时候返回`*x`
- go pointer: 两个指针如果指向同一个地址，那么它们相等
- go pointer: two nil value equals

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


### 多线程

- goroutine 和系统线程不是等价的，它的栈可以动态伸缩，通过以go 轻松启动
- go atom 原子操作最小的不可并行化的操作，当一个线程访问一个共享资源时，其他线程应该等待。
- sync.Mutex 可以实现粗粒度的原子操作，有`lock` `unlock` 但是效率会比较低下
- sync.Atomic 实现高性能的原子操作
- 使用原子操作配合互斥锁可以实现非常高效的单例模式，这里看的不是很明白，需要代码验证一下
- 为什么先lock，然后就 unlock, defer 有时什么意思， try  it
- go 同步使用go 启动线程时不能保证顺序，也不能保证这个线程改过的数据会被另一个访问到
- go 通过原语可以保证两个事件的顺序，`done <- -1` `<-done`
- go init，go 的init 启动，如果在其他包的init 里面启动goroutine，那么它是和 main.main 并发执行的
- goroutine 的创建的例子可以多次尝试，看两个并发的goroutine 的执行顺序
- go channel 我们可以在 done 管道上发送同步信号实现同步
- var done = make(chan bool) 创建一个channel，可以设置 `done <- true` 也可以`close(done)`
- go channel 对于带缓冲的channel，try it,
- go 可以通过 select{} 来阻塞线程
- sync.Mutex 超过1次的lock 会导致线程阻塞，mu.Unlock() 之后才会解除这个阻塞继续向下执行

### channel

- quit := make(chan os.Signal) 这个声明是什么意思? 声明了一个 os 类型的channel，并且赋值给quit
- `<-quit` 是什么意思？ 从quit channel 中接收数据，如果一直没有数据，那么一直阻塞，此处没有没有发生赋值

### 类型转化

- string(b) 内置函数，可以把一个rune[] 转化成字符串, json.Marshal 后的[]byte 其实也可以转
- templatePath.(string) 是把 templatePath 转换成 string 类型的一个操作
- `templateInfo.(config.Template).Path` 进行格式转化
- fmt.Sprintf("%s/tpl/**/*")? 把里面的内容格式化为一个字符串, 并且返回，所以前面是大写的S
- fmt.Sprintf("%s:%d", "a", 1) 这个函数的返回值是什么？返回一个第一个格式化函数格式化后的 string
- fmt.Sscanf(s, "%f%s", &value, &unit) 把字符串s分离，然后解析 ` var value float64; var unit string `
- fmt.Printf("%T", w) 显示一个变量的类型，如果在包里想获得类型，就需要用到反射

### 反射

- go 里面的反射是指动态地获取一个变量(可以是interfate{}) 的类型信息和值信息

### reference

- https://chai2010.cn/advanced-go-programming-book/
- https://docs.hundan.org/gopl-zh/ch13/ch13-04.html
