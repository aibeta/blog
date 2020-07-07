# Scope Spread Literal

### 动态编译

基本上可以说 JavaScript 是解释型的，因为每次执行 JavaScript 源码时都需要进行处理。但这 么说并不完全精确。JavaScript 引擎实际上是动态编译程序，然后立即执行编译后的代码。

- prompt("input something");
- 独立的 {...} 是合法的，被称为代码块，只是比较少见
- for 循环包括测试条件，代码块；块的每次执行称为一次迭代

### polyfill

- polyfill 通过方法检测，可以让旧版本兼容新的方法，但是新的语法无法使用polyfill

### transpiling

它由 transforming 和 compiling 组合而成，它的代表是 Babel
JS 中 function 是变量作用域的基本单元

### 作用域

在 JavaScript 中， 每个函数都有自己的作用域。作用域基本上是变量的一个集合以及如何通过名称访问这些 变量的规则。只有函数内部的代码才能访问这个函数作用域中的变量

### 类型

类型：string, number, boolean, null, undefined, object, symbol, bigint; 还有 "function"

- typeof null == "object" 这是一个设计上的bug，但是积重难返
- typeof undefined == "undefined"
- "function” 类型是属于 "object" 类型
- 判断时false: "", 0, -0, NaN, null, undefined, false

无论var 声明的变量处于作用域的哪个位置，都会被提升到最前面

### let

所有的变量声明都应该放在作用域的最前面，以防止暂时性死区，在暂时性死区对变量进行类型检测会报错

- for(let i = 0; i< 10; i++) {} 为每个循环都重新声明了一个i
- let 在 for in 和 for of 中也是一样的

### const

const a = [1,2,3,]; 可以进行 push 操作，因为这里a 是对数组的引用
对一个对象进行常量赋值，意味着这个值在这个常量的词法作用域结束之前不被回收

### 块作用域函数

块内声明的函数，作用域在这个块之内。

### ... 扩展和收集

- spread：...[1,2,3] 该运算符会将 iterable 的变量展开为独立的值
- rest：另一个用法是把所有传入的参数收集起来 function foo(...args) { // args 是数组}
- rest: var [b, ...c] = [1,2,3]; 这里 c  会收集剩余的 2,3 为一个数组[2,3]

### 默认参数值

function foo(a = 1) {}

### 默认值表达式

var w = 1, z = 2;

```jsx
// 1. 找 w 没找到，去未曾找到了，2. x 已经初始化所以 y 可以初始化，3. z 还未初始化
function foo( x = w + 1, y = x + 1, z = z + 1 ) { console.log( x, y, z );
}
foo(); // ReferenceError
```

### 解构

```jsx
var [a, b, c] = foor();
var {x, y, z} = bar(); // 如果属性名和要赋值的变量名相同，注意这里省略掉的是 x: 不是:x
var {x: bam, y: baz, z:bap} = bar(); // 所有得到的是右边的变量，是 value: key，反转了
**解构是个一个通用的赋值操作**，不只是用于上面的声明，还有下面的赋值
var a,b,c,x,y,z;
[a,b,c] = foo();
( {x, y, z} ) = bar(); //前面没有 var 那么要用括号封一下，否则会被当作一个语句
// 同时上面的 a....z 可以换成任何合法的赋值表达式 o.a .... o.z
```

### 解构用法

- 对象映射，把 a 对象的abc 属性，变换为b对象的 xyz 属性
- 把对象映射为数组，或者把数组映射成对象，重新排序一个数组
- 还可以交换两个变量 [a, b] = [b, a]
- 重复赋值：var {a: x, a: y} = {a : 1};
- 解构赋值表达式：p = {a, b, c} = o，
    1. 注意这里 o = [1,2,3] 或者 o = {a: 1, b:2, c:3} 都可以
    2. 这里 p === o 值，p 的赋值为对象 o 的引用
    3. 可以有：[x,y] = [x] = [1, 2,3]   // 1, 2, 1
    4. 可以有：({a} = {b,c} = {a:1, b:2, c:3}) // 1,2,3

    ```jsx
    function foo() {
             return [1,2,3];
    }

    function bar() {
      return {
        x: 4, y: 5, z: 6
    	}; 
    }
    ```

### 嵌套解构

可以利用嵌套解构去把多维数组或对象变平

```jsx
var a1 = [ 1, [2, 3, 4], 5 ];
var o1 = { x: { y: { z: 6 } } };
var [ a, [ b, c, d ], e ] = a1;
var { x: { y: { z: w } } } = o1;
console.log( a, b, c, d, e ); console.log( w );
// 1 2 3 4 5 // 6
```

### 解构参数

function foo(x){};  foo(1); 函数的实参和形参是一个隐性的赋值操作，所以也可以解构
如 foo([x, y]) foo({x,y})

```jsx
function foo([x, y]) {
	console.log(x, y);
}
foo()// 1 2

function foo({x, y}) {
	console.log(x, y);
}
foo({x: 1, y: 2}) // 1, 2
```

### 解构默认值

参数的对象解构已经非常接近一个特性：命名参数，这里可以做面试

```jsx
function f1([ x=2, y=3, z ]) { .. } 
function f2([ x, y, ...z], w) { .. } 
function f3([ x, y, ...z], ...w) { .. }
function f4({ x: X, y }) { .. }
function f5({ x: X = 10, y = 20 }) { .. }
function f6({ x = 10 } = {}, { y } = { y: 10 }) { .. }
```

f6({ x = 10 } = {}, { y } = { y: 10 }) 这里前面的x能保证任何情况下都会被合理赋值

### 解构重组

对于一个对象有多层嵌套，我们要对它重组

```jsx
// 把defaults合并进config 
{
// (带默认值赋值的)解构 
	let {
		options: {
	    remove = defaults.options.remove, 
			enable = defaults.options.enable, 
			instance = defaults.options.instance
		} = {}, 
		log: {
			warn = defaults.log.warn,
			error = defaults.log.error 
		} = {}
	} = config;
// 重组 
  config = {
    options: { remove, enable, instance },
    log: { warn, error }
  };
}
```

### 简洁属性 和 简洁方法

```jsx
// 简洁属性: 
var a=1, b=2; 
var obj = {a, b}
// 简洁方法: 
var o = { 
  x() {} // 除了等于 x: function() {}；还支持 super 方法
  *foo() {} // 这是一个简洁的生成器
}
```

简洁方法其实一个匿名函数，所以不能用于下面的这种情况

```jsx
var o = {
    foo: function foo(x, y) {
        if(x > y) return foo(y, x)
        return y - x;
    }
}

function runSomething(o) { 
  var x = Math.random(), y = Math.random();
  return o.something( x, y ); 
}
runSomething( {
  something: function something(x,y) {
  if (x > y) {
    // 交换x和y的递归调用 return something( y, x );
  }
  return y - x; }
});
```

### Getter/Setter

这里是 ES5 的语法 比较少使用

```jsx
var o = { 
  __id: 10,
  get id() { return this.__id++; },
  set id(v) { this.__id = v; } 
}
o.id; // 10 
o.id; // 11
o.id = 20;
o.id; // 20
// and:
o.__id; // 21
o.__id; // 21--保持不变!
```

### 计算属性名

ES6 新增，计算的表达式可以作为属性名 var o = {  [a +'x' ]: 1  };

### 模板字面量

`${something}` ${...} 里面可以是函数调用、在线函数表达式等合法的表达式

### 标签模板字面量

function foo(){ }，但看到 foo`this is ${desc}!` 的时候知道这个是一个标签，可以用于全球化，本地化等

### 数字字面量扩展

var dec = 42, oct = 0o52, hex = 0x2a, bin = 0b101010; // 都是42，可以使用 toString 反向转换

```jsx
var a = 42;
a.toString(); // "42"--也可以用a.toString( 10 )
a.toString( 8 );  // "52"
a.toString( 16 ); // "2a"
a.toString( 2 ); // "101010"
```

### 原始字符串

使用String.raw`hello\nworld` 可以得到原始的字符串 `hello\nworld`

- 循环的值必须是一个可以转换到一个 iterable 对象的值，iterable 就是一个能够产生迭代器供循环使用的对象
- JS 中默认为iterable的标准内建值：Arrays,Strings,Generators,Collections/TypedArrays
- 如其他循环一样，for..of 可以通过 break, continue, return 提前终止

```jsx
var a = ["a","b","c","d","e"];
for (var idx in a) { console.log( idx );
}
// 0 1 2 3 4
for (var val of a) { console.log( val );
}
// "a" "b" "c" "d" "e"

// for in 循环key
// for of 循环value
```

下面是不用 for..of 的等价代码，也可以用来展示如何手动在迭代器上迭代

```jsx
var a = ["a", "b", "c", "d", "e"];
for(var val, ret, it = a[Symbol.iterator]();
	(ret = it.next()) && !ret.done;
) {
	val = ret.value;
	console.log(val)
}
```