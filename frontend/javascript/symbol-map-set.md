# Symbol Map Set

### Symbol

- 一个新的原生类型：Symbol
- 创建一个var  sym = Symbol("some optional desc")
- 不能使用 new 来创建 symbol
- 创建时 Symbol() 里面的参数是可选的，传入的是这个 symbol 的描述
- 只能用 typeof sym === 'symbol' 来进行 symbol 类型的识别
- 符号本身的值是无法获得的，可视之为应用内部一个自动生成的唯一的字符串
- 符号的主要意义在于穿件一个类字符串的不会与其他任何值冲突的值
- 如果要把这个值当作字符串来用，那么就需要使用String() 来进行转化

### 符号注册

- 可以使用 Symbol.for("") 创建symbol 并注册到全局
- 符号作为对象属性
- 属性符号只可以通过 Object.getOwnPropertySymbols() 来获取

### 内置符号

规范使用 @@ 前缀记法来指代内置符号，最常用的一些是:@@iterator、@@toStringTag、@@toPrimitive，Symbol.toPrimitive 和类型转换有关。

### Symbol.spcies

如果定义一个Array 的子类，但是想要这些方法仍让构造真正的Array 实例而不是子类实例的话可以用。*Symbol.species 即@@species，这个符号控制要生成新实例时，类的内置方法使用哪一个构造器。*

```jsx
class MyCoolArray extends Array {
	// 强制species 为父构造器
	static get [Symbol.species]() {return Array;}
}

var a = new MyCoolArray(1, 2, 3);

a instanceof Array; // true
```

### Symbol.iterator

Symbol.iterator 表示任意对象上的一个专门位置（属性），语言机制自动在这个位置上寻找一个方法，这个方法构造一个迭代器来消耗这个对象的值

```jsx
var arr = [4,5,6,7]

for (var v of arr) {
	console.log(v);
}

// 4,5,6,7

// 定义一个只在奇数索引上产生值的迭代器

arr[Symbol.iterator] = function*() {
	var idx = 1;
	do {
		yield this[idx];
	} while ((idx + =2) < this.length);
} 

for (var v of arr) {
	console.log(v);
}

// 5,7
```
### Map

- 就像是一个对象 (key/value)，但是 key 可以是任何值，甚至是另一个对象或者Map
- 缺点是不能使用方括号[]语法设置和获取值，但是可以使用 .get 和 .set；,，
- .size 属性可以得到长度
- .delete 可以删除指定key
- .clear 可以清除所有Map
- values(..) 会返回一个所有values的迭代器，是它所有值
- keys(..) 返回一个所有keys的迭代器
- has(..) 返回是否有某个key

### WeakMap

- WeakMap 只接收对象作为key，这些对象是弱持有的，如果对象被回收，那么这个项也会被移除
- 没有 clear 和 size

### Set

- 与数组类似，但是其中对值是唯一的，如果新增对值是重复对则会被忽略
- API 和 map 类似，只是 add(..)方法代替另 set
- Set 不存在 get 方法，而是使用 has 去测试一个值是否存在
- set 的唯一性不允许强制转换，所以 1和 “1” 是不同的值

### WeakSet

的值必需是对象