## 为什么 go 避免将一个有可能为 nil 的具体类型的值赋值给 interface 变量?

把一个 nil 的结构体赋值给一个 interface 变量，此时不能使用 == nil 来判空

而要使用 reflect.ValueOf(i).IsNil()

```go
package main

import (
	"fmt"
)

type Animal interface { }                                               
type Dog struct{ }  

func isNil(i interface{}) bool {                        
   return i == nil 
}

func main() {
   var d *Dog = nil
   var a Animal = d
   fmt.Println(isNil(a)) // false
}
```