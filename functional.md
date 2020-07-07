# Functional

## 函数式编程

是一种声明式的范式，JS 中函数是一等对象，可以赋给变量也可以作为参数传递给其他函数。函数式编程里有下面几个概念
- 核心是函数可以作为参数和返回值进行传递
    - 比如我们使用的 map reduce 方法
- 所谓高阶函数，是使用函数作为参数或返回值的函数
- 函数作为一等公民是说它可以被声明为一个变量，作变量的事情

## 声明式编程

代码描述了要做的事情，React 是声明式的，描述了做了什么

```jsx
const string = 'Restaurants in Hanalei';
// 声明式编程
const urlFriendly = string.replace(/ /g, "-");

// Imperative 编程
// 在这里用for循环去做字符替换
```

## 函数式编程的核心概念

## 不变 immutability

就像身份证复印件一样，函数式编程的不变指的的是我们不会去改变原始的数据和结构，而是使用数据的拷贝

- 可以使用Object.assign 来进行数据拷贝
- 如果要为数据加一项，那么不要用push，而用concat
- 注意扩展运算符也是不变的

即，函数不会修改变量值，而是创建新的变量，赋新值后再返回变量，操作数据的这种方式称为不可变性。

```jsx
// 没有遵循不可变性，因为原变量的值一直在变
const add3 = arr => arr.push(3);
const myArr = [1,2]
add3(myArr); // [1,2,3]
add3(myArr); // [1,2,3,3]
// 这里是不可变的
const add3 = arr => arr.concat(3);
const myArr = [1,2]
const res1 = add3(myArr) //[1,2,3]
const res2 = add3(myArr) //[1,2,3]
```

### 纯函数

- 接收至少一个参数，而且返回一个值或函数
- 不造成副作用，比如设置全局变量，改变应用状态
- 纯函数易于测试
- react 里面UI 就是纯函数

```jsx
const Header = props => <h1>{props.title}</h1>;
```

写纯函数三点：1. 接收至少一个参数，2. 返回值或函数，3. 不要改变参数

### 数据转换 Data Transformations

函数式编程是关于把数据从一种形式转换成另一种，我们使用函数产生转换后的数据拷贝，有两个核心的函数，map 和 reduce

- 如果要移除一个元素，我们要使用 filter，而不是 pop 或者 splice，后面的会改变原数组
- reruce 可以用于把一个数组转换为任何 value

```jsx
// 找到数组最大值
[1,2,3,4,5].reduce((max, age) => (age > max ? age : max), 0)
```

### 高阶函数

是操作其他函数的函数，比如 map filter reduce 它们都会接收函数作为参数，那么就是高阶函数。高阶函数接收一个函数作为参数，也可以传入其他参数，然后返回另一个函数。

### 柯里化currying

是函数式编程的技巧，就是将多参数函数转化成但参数函数，这些函数的返回值也是函数

```json
const add = (x,y) => x+y

// 柯里化之后

const add = x => y => x + y
const a = add(1)(2) // 3
```

### 递归 recursion

当需要 loop 时，可以使用递归替代，对于搜索的数据结构很方便。

### 合成 composition

函数化编程会把逻辑分割成一个个很小的纯函数，最终，需要把这些函数组合起来。

有很多的实现，模式和技巧用于合成，在 js 中一个比较通用的是dot chain，也就是函数可以通过dot 调用连接起来。'a'.replace('a', 'b').replace('b', 'c')

```jsx
const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg)
```

### 幂等函数

就是说传入相同的状态时返回同样的UI

## 问题

使用函数式编程实现一个12小时电子表，显示AM 和 PM

[Learning React, 2nd Edition](https://learning.oreilly.com/library/view/learning-react-2nd/9781492051718/ch03.html#functional-programming-with-javascript)