# Iterator Generator

### 迭代器

是一个结构化的模式，用于从源以一次一个的方式提取数据

```jsx
// ES6 规范
// Iterator 接口的要求

Iterator [required]
	next() {mehod}: 取得下一个 IteratorResult

IteratorResult
	value {property}: 当前迭代值或最终返回值
	done {property}: 布尔值，表示完成状态

// 还有一个 Iterable 接口，表述必需能够提供生成器的对象
Iterable
  @@iterator() {method}: 产生一个 Iterator
```

### next()迭代

Map，String，也可以像数组一样，产生迭代器

```jsx
var arr = [1,2,3];
var it = arr[Symbol.iterator]();

it.next();    // { value: 1, done: false }
it.next();  // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { value: undefined, done: ture }
```

```jsx
var myObject = {
    a: 2,
    b: 3
};

Object.defineProperty( myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys( o );
        return {
            next: function() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
            }
        };
    }
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
    console.log( v );
}
// 2
// 3
```

- Each time the for..of loop calls next() on myObject’s iterator object, the internal pointer will advance and return back the next value from the object’s properties list (see the note earlier in this section about iteration ordering on object properties/values).

### 生成器

- 把生成器看成一个受控的，可传递的代码执行
- 可以使用 return 和 throw 提前完成一个生成器
- 声明：function *foo(){}; 这个 * 的位置其实无所谓
- 执行生成器foo(5, 9) 不会运行代码，而是产生一个迭代器控制这个生成器执行代码

```jsx
function *foo() { // ..
}
var it = foo();
// 要启动/继续*foo()，调用it.next(..)
```

### yield

生成器里有一个新关键词：yield 用来表示暂停点

```jsx
function *foo() {
  var x = 10;
  var y = 20;
	yield;
	var z = x + y; 
}
```

yield 是一个表达式，在暂停生成器时发出一个值

```jsx
function *foo() {
	while (true) {
	yield Math.random(); 
	}
}
```

yield 除了发出值，还会接收最终的恢复值

```jsx
function *foo() {
	var arr = [ yield 1, yield 2, yield 3 ]; 
	console.log( arr, yield 4 );
}
```

### yield* 委托

yield 委托，yield * 需要一个iterable，调用这个iterable的迭代器，把自己的生成器控制委托给这个迭代器function *foo() { yield *[1,2,3]; }

```jsx
function *foo() {
         yield 1;
         yield 2;
         yield 3;
         return 4;
}
function *bar() {
	var x = yield *foo(); 
	console.log( "x:", x );
}
for (var v of bar()) { 
	console.log( v );
}
// 1 
// 2 
// 3 
// x: 4
```