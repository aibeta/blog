# Object Array Module

Object.create(null) 和 {} 相似，除了没有 Object.prototype 的委托 有两种形式：declarative form 和  constructed form

### 对象的子类型

```jsx
function( a callable object), array,String Number Boolean Object Function Array Date RegExp Error
```

### 检测子类型

```jsx
Object.prototype.toString.call( strObject ); // [object String]
```

### defineProperty

可以定义属性的writable、configurable、enumerable（可迭代，false 的话迭代时不出现）

### Object.seal

创建一个 sealed object，不可新增属性，同时已存在的属性都是 不可配置的

### Object.freeze

除了是 sealed 之外，所有属性都是不可修改

### Object.create

```jsx
if (!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    };
}
```

无法判断一个 keys 存在还是 值是 undefined？用 Object.hasOwnProperty('a')这个方法不会去检查原型

### 为对象的属性赋值

[myObj.foo](http://myobj.foo) = "bar" 这样的赋值有三种情况，下面两种可以用 defineProperty 添加属性

3种情况：

1. 如果在原型链上找到了 foo，同时属性是 wirtable: true 那么就在 myObj 内部创建一个 shadowed property
2. 如果找到了，但是 wirtable：false，那么注意，这时是禁止对 foo 属性赋值的，严格模式下会报错
3. 如果 foo 属性在原型链上十个 setter，那么setter 会被调用，但是不会在 myObj 创建属性，也不会redefine setter

```jsx
var anotherObject = {
    a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2 注意下面几个的区别
myObject.a; // 3

anotherObject.a++;
anotherObject.a; // 3

myObject.hasOwnProperty( "a" ); // true
```

### Array

- Array.of 替代了Array 称为数组的构造器，比较 Array(3)，和 Array.of(3)
- Array.from(..) 会把一个 类数组 ，用迭代器产生的值生成新的数组
- 避免空槽: Array.from({length: 4}) 会生成4个长度的undefined数组
- 映射 from第二个参数可以接收一个函数，类似与数组的 map 映射
- copyWithin(..) 从一个数组中复制一部分到同一数组的另一位置
- find 与ES5 some 的工作方式类似，接收一个函数，函数返回true，则find 返回当前的值
- findIndex 与find 类似，只是返回的是index
- include

### Object

- Object.is(..) 通常还是使用 === ，但是 Object.is(x, -0) 的时候用这个
- entries
- Object.getOwnPropertySymbols(..) 获得所有符号属性
- Object.setPrototypeOf(..) 设置对象的 [[Prototype]] 用于**行为委托**
- Object.assign(..)

### Math

新增了三角函数，对数，立方根；
元工具：sign(..) 返回数字符号, trunc(..) 返回数字的整数部分

### Number

Number.isNaN(..)  Number.isInfinite(..) Number.isInteger(..)

### String

"foo".repeat(3) 可以重复字符串

### 模块

- ES6 使用基于文件的模块，就是说一个文件一个模块
- ES6 模块的API 是静态的，也就是说模块的公开API中静态定义所有最高层导出，之后无法修
- ES6的模块是单例，也就是说模块只有一个实例，这个实例维护了它的状态

### 新方法

import 和 export 必需出现在顶层作用域，不能放在 if 条件下

### 命名导出

导出变量/函数的名称绑定，在模块内部的顶层作用域其实是模块本身

```jsx
export function foo() {}

export var a = 1;

var bar = [1,2,3]

// export { bar }

// 可以重命名

export { bar as barbar}
```

### 默认导出

ES6 绝对倾向于 一个模块使用一个 export，称为默认导出，每个模块定义只能有一个default
除了 export default ... 形式导出一个表达式值绑定，其他所有的导出形式都是局部标识符的绑定，对于这些绑定，如果导出之后在模块内部修改某个值，那么外部导入的绑定就会访问到修改后的值

```jsx
function foo() {}

// 导出的是此时到函数表达式值的绑定，而不是标识符foo
// export default 接收的是一个表达式

export default foo;

// 这里默认导出绑定实际上绑定到 foo 标识符而不是它的值
// 区别是这个如果之后修改了foo 的值，在导入一侧看到的值也会更新
export { foo as default}
```

### 几种 import

Reflect.Loader.import( "foo" ) 可以在模块之外来加载模块，返回一个promise

```jsx
import foo from 'foo';

// equal

import { default as foo} from 'foo';

// 另一种default
export default function foo() {...}

export function bar() {}
export function baz() {}

import foo, { bar ,baz as BAZ} from 'foo';

// 通配符, 全部导入

import * as foo from 'foo';
```