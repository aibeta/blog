# Javascript Iterator Sync and Async

### 什么是循环loop和遍历traversal？

循环就是重复地执行一些动作，只要实现了这样的目的，就说它是一个循环。
可以看到下面的 JS 方法都是循环的不同实现，用于不同的场景，有着不同的开始和结束条件。

1. for 和 while 循环
2. for...in 会遍历对象的（包括原型链上）可枚举属性（除symbol）
3. Array.prototype.forEach 等方法
4. for...of 是一个迭代循环，遍历被迭代枚举的属性，为每个属性值执行语句

遍历在数据结构里是指逐个访问树形结构的节点。在 js 里我们说遍历一个对象的属性，也就是逐个访问它的属性。

### 什么是迭代？

从编程的角度讲，迭代意味着遍历一个数据结构，通常的实现是一个指针，指向这个数据结构，有一个next方法，可以逐个访问所有元素。循环则是另一种遍历数据结构的实现，通常使用 index ，比如说数组。
但是在js里，上面讲的迭代循环，其实就是迭代一个对象的所有属性，每一次迭代就执行一段重复的代码。

### 什么是可迭代对象？

一个可迭代对象必需实现 @@iterator 方法，意思是该对象（或原型链上)有一个 key 为 @@iterator  的属性，可以通过 Symbol.iterator 来访问该属性，这个属性的值是一个函数，有以下行为
不接收参数，返回值是一个对象
返回的对象里有一个 next 方法
next 返回一个对象，里面有value 和 done 两个属性
value 代表每次迭代的值，done 表示是否终止迭代。

### 什么是异步迭代？

如果可迭代对象内部 next 返回的是一个 promise，也就是说当这个 promise 决议后，才去执行循环里面的代码，因此每一次的迭代都是异步的。
因此需要使用 for await ...of 语法，在迭代对象的内部实现上需要定义，Symbol.asyncIterator 属性，它的next 方法返回的是一个 promise。

### 普通的迭代对象里不能使用异步吗？为什么需要异步迭代?

普通的迭代对象也可以使用异步，但是需要在循环内部使用 await。异步迭代主要是为了解决web开发里面数据流分段流动的问题，以及可以做一些非常好的异步封装。

### reference

- https://www.quora.com/What-is-the-difference-between-a-loop-and-an-iteration
- https://zh.javascript.info/async-iterators-generators
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
