# Go Practice Problem

3. 按照规范写的 fmt.Println("hello \n") 怎么有warn 提示 Println arg list ends with redundant newlinego-vet
   1. ln 本意意味着line
4. fmt.Println("%d",d ) 会warn提示  Println call has possible formatting directive %d, 
   1. 因为 Println 不做格式化操作，应该使用 printf
5. 如果我只想计算 c=a +b，但是不使用 c ，
   1. 可以使用下划线 _
6. 对于数量很长的字符串拼接，怎么strings.Join() 花费的时间更长
7. go this go 中基类和继承类中的this，分别指代的是哪个对象？
8. go 也可以通过 sync.Mutex 互斥量来实现同步, try it, see how many times did that print?
9. go 里面怎么在一个函数内，声明另一个函数？
10. go 为什么如果使用闭包函数取地址，每次都不一样呢 ，即f() == f() 是false [link](https://docs.hundan.org/gopl-zh/ch2/ch2-03.html)？
11. `pc[i] = pc[i/2] + byte(i&1)` and `pc[byte(x>>(1*8))]`
12. `if x := f(); x == 0 `
