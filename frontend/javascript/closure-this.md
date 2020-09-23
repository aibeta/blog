# Closure This

### 闭包

闭包是内部函数可以访问它的外部函数的作用域，即使外部函数已经执行过了。

```jsx
function makeAdder(x) {
	// x is a inner varable
	function add(y) {
		return x + y;
	}
	return add;
}
var plusOne = makeAdder(1);
```

### this

1. 非严格模式下，直接调用函数foo() 会将this设置为全局对象，在严格模式下会有问题
2. obj1.foo() 里面会将 this 设置为obj1
3. foo.call(obj2) 里面会将 this 设置为obj2
4. new foo() 会将this 设置为全新的空对象

## JS 5个基本概念

- scope,
- context,
- prototypal inheritance,
- asynchronoy,
- DOM

### context

- 每个函数都有自己的一系列属性和绑在上面的数据，可以用this 访问到 apply, bind, call 把一个函数的上下文给另一个函数
- call take a list of arguments，while apply take an array of arguments
- 箭头函数就是说，在定义的时候使用父级的 context

### call-site

它的上下文取决与函数的调用环境，也就是说 this 和声明无关，和调用有关。函数执行时，会有执行上下文被创建，this 会绑定这个上下文。this 不指向声明时的函数，也不是函数词法作用域的 reference，而是完全在函数调用时被决定是谁的绑定。this 绑定依赖与 call-site 密切相关

```jsx

function foo() {
	console.log( this.a )
}

// example 1
var obj = {
	a:2,
	foo,
}
var bar = obj.foo; // function reference/alias

var a = 'ops , global';

bar() // "ops global"  <- call-site!

// example 2
function doFoo(fn) {
	// `fn` is another reference to `foo`
	fn() // <- call-site!
}

var obj = {
	a: 2,
	foo
}

var a = 'ops , global'
doFoo(obj.foo) // 'ops, global'
```

### 有四个规则

1. this 指向全局，非严格模式是默认的绑定是全局，严格模式则是undefined
2. 作为一个对象的方法来调用
3. apple call 和 bind，如果第一个参数是null，那么会应用 rule 1
4. 看下面 new foo() 时候的第三条的this 绑定

### 优先级

rule3 或 rule 4 > rule 2 > rule1，三和四规则不并存

1. arrow function，用的是词法作用域下的this
2. Called with `new`? Use the newly constructed object.
3. Called with `call` or `apply` (or `bind`)? Use the specified object.
4. Called with a context object owning the call? Use that context object.
5. Default: `undefined` in `strict mode`, `global` object otherwise.

### call & apply & bind

都接收第一个参数作为 this，apply 可以接收第二个参数作函数调用的参数，foo.bind(obj) 返回一个新函数，以 obj 作为 this 上下文来执行 foo。很多 lib function 有第二个可选参数作为 this context, eg: [1,2,3].forEach(foo, obj)

### 手动实现 bind

ø 可以作为默认的 this（代替null）

```jsx
var bind = function(oThis) {

	var aArgs = Array.prototype.slice.call(arguments,1),
	fToBind = this,
	fNOP = function() {},
	fBound = function() {
		return fToBind.apply(
			(
				this instanceof fNOP &&
				oThis ? this : oThis
			),
			aArgs.concat(
				Array.prototype.slice.call( arguments )
			)
		)
	};
	fNOP.prototype = this.prototype;
	fBound.prototype = new fNOP();
	
	return fBound;
}
```

### 箭头函数

在箭头函数函数内部，this 绑定不是动态的，而是词法的。
箭头函数使用原则
=> 是关于 this、arguments 和 super 的词法绑定。