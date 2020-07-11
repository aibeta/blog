# Go Reading Notes

### 声明

- `s := ""` 短变量声明，只能用于函数内部
- `var s string` 默认初始化零值机制把s初始化为 ""

### for

- for initialization; condition; post {} 这三部分每一个部分都可胜利，甚至可以全省略
- `for i :=0; i<len(s); i++`  和 `for _, char := range s` 等价

## Go Advanced

- CSP: conmunicating sequential processes
- fmt.Println('str'), 参数字符串是作为地址传递的，并没有发生复制
- fmt.Printf("%T, %#v", b, b) 可以打印数组的类型和详细信息
- go 中，函数传参都是以复制的方式传递的？那么上面的一句话怎么理解
- go 函数中的闭包是以引用的方式访问外部变量的，其他复制和传参都是传值。

### 数组

- go Array 是一种值类型，就是说变量是一个完整的值，而不是隐式地指向第一个元素的指针
- go Array 拷贝是深拷贝，我们可以通过 `var b = &a` 拷贝指针
- go Array 是固定长度的、特定类型元素的序列, `var a [3]int`, `var a = [...]{1,2,3}`
- go Array 字符串 `var s1=[2]string("hello", "w")`, `var s2=[...]("hello", "w")`
- go Array 结构体 `var l1=[2]image.Point`, `var l2=[...]image.Point({0,0}, {1,1})` 
- go Array 接口 `var unknown1 [2]interface()`, `var unknown2 = [...]interface{} {12,34}`
- go Array 管道 `var chanList = [2]chan init{}`

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

- for range array 迭代可以避免数组越界
- for range string 只能遍历UTF8编码的字符串，因为其他编码可是一个二进制数组结构
- for range 想遍历原始的字节码，可以把字符串转为 []byte 字节序后再进行遍历 `for i, c := range []byte("世")`
- for 按下标方式遍历字符串的字节数据 `for i:=0; i < len(s); i++`， 然后`fmt.Printf("%x", s[i])`

- todo解释：go 通过隐式接口机制实现了鸭子面向对象模型
- go main: go 程序的初始化是通过 main.main 开始的, 1. 导入包级常量 初始化这个包的常量和变量，执行 init 2. main

### 函数和方法

- go func 函数是第一类对象，go 中分为具名和匿名函数，匿名函数` var Add = func(a, b int) int`
- go func 可以接收多个参数，返回多个值，可变数量的参数其实是一个切片类型的参数
- go func 在声明时可以给返回值命名，命名后可以通过名字修改返回值
- go func 里有 defer 语句，可以声明一个匿名函数并调用 `defer func(){} ()`
- go pointer 的地址不是固定的，那么 我们是么时候 返回 `&x` 什么时候返回`*x`
- go method 方法是OOP的概念，是一个类对象的成员函数
- go method 中，我们先声明一个 type，再声明一个类型独有的方法 `func(f *File) Close() error{}`, 它们需要在一个包里
- go inherit go 不支持传统的继承，而是通过在结构体内置匿名的成员来实现内部成员和成员类型的方法的继承
- go polym 但是这种继承方法并不能实现多态特性，如果想要虚函数的多态，需要借助go语言接口实现

### 接口

- go interface 如果一个对只要看起来是某种接口类型的实现，那么就可以作为该接口类型使用
- go interface 可以让我们创建一个新的接口类型满足已存在的具体类型，但是不破坏该原有类型
- go interface 延迟绑定，我们继承的只是规范，就是说在运行时，才会去检测 interface 里面的方法是否真的存在,
- go interface 这里有两个例子需要代码验证

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

### reference

- https://chai2010.cn/advanced-go-programming-book/
- https://docs.hundan.org/gopl-zh/ch13/ch13-04.html
