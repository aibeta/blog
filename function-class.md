# Function Class

### new a function

1. 创建一个新对象 aka contructed object
2. 新的 contructed object 的 [[Prototype]] 被链接 ？？
3. 新的 contructed object 被设置为函数调用的 this 绑定
4. 自动返回新的 constructed object

```jsx
function foo(a) {
	this.a = a;
}

var bar = new foo(2);

console.log(bar.a) // 2

// 1. new 会创建一个新对象
// 2. 
// 3. 新对象会作为函数调用的 this
// 4. 返回这个新对象
```

### 构造函数

- var a = new Foo(); 当a 使用 new Foo() 创建时，a 得到了一个内部的原型链接到Foo.prototype；
- new Foo() 会导致一个新对象（我们称为a），新对象 a 就是内部的 [[Prorotype]]，指向的是Foo.prototype 对象；
- new Foo() 并没有直接创建链接，反而是 side effect，或者说绕行的方式：把一个对象链接到另一个对象

```jsx
function Foo() {
    // ...
}

var a = new Foo();

Object.getPrototypeOf( a ) === Foo.prototype; // true
```

## class

其实是原型链的语法糖，如果改变了父类的方法，子类也会受影响。super 不是 late-bound，而 this 是 late-bound

```jsx
class C {
    constructor() {
        this.num = Math.random();
    }
    rand() {
        console.log( "Random: " + this.num );
    }
}

var c1 = new C();
c1.rand(); // "Random: 0.4324299..."

C.prototype.rand = function() {
    console.log( "Random: " + Math.round( this.num * 1000 ));
};

var c2 = new C();
c2.rand(); // "Random: 867"

c1.rand(); // "Random: 432" -- oops!!!
```

### class 里面的 constructor

只是普通的函数，只要有 new 操作符，就会默认调用它的constructor 方法，相当于它并不是一个 constructor function 而是不是 construction call

### 类的 constructor 方法

意思是类进行实例时，会调用这个方法

### constructor function

构造函数，就是可以一个函数，可以通过它来实例对象。

### 对象的 counstructor 属性

函数自己并不是构造器  constructor ，然而当使用 new Foo 时会让函数调用是一个 “constructor call”，事实上，new 劫持了普通的函数调用它构造一个对象。

对象的 constuctor 属性 does not mean constructed by，它是个属性，不枚举，可写，不可信赖，别用。

每个构造函数的 protottype 属性是一个对象，这里面都包括一个construtor 属性，这个属性指向起始的 construtor function

每一个对象都有一个 constructor 属性，指向的是一个函数，说明该对象由这个 constructor function生成；

```jsx
function NothingSpecial() {
    console.log( "Don't mind me!" );
}

var a = new NothingSpecial();
// "Don't mind me!"

a; // {}
```

NothingSpecial 只是一个普通的函数，用 new 调用的时候，它会构造一个对象（可以视为side effect），我们赋值给a，这个调用我们称之为 constuctor call

但是 NothingSpecial 自己并不是一个构造器 construtor

函数本身并不是构造器，但是使用 new 来调用函数的时候，这次调用叫做 construtor call

所以在 js 里，这个“ constructor” 就是任何在new 关键词后面的函数

### class

- class Foo 表明一个名为 Foo 的函数
- constructor() 指定Foo 函数的签名以及函数体内容
- 类方法使用来简洁方法的语法，注意类方法是不可枚举的，但是对象方法可以
- 和对象字面量不一样，class 定义体内部不用逗号分隔成员

```jsx
class Foo() {
	constructor(a, b) {
		this.x = a;
		this.y = b;
	}

	gimmeXY() [
		return this.x + this.y;
	}
}

// 可以把类粗略的理解为下面的代码

function Foo(a,b) { 
	this.x = a; this.y = b;
}
Foo.prototype.gimmeXY = function() { 
	return this.x * this.y;
}
```

### class和function 区别

- class Foo 的 Foo() 调用必需通过new 来实现
- function Foo 是提升的，但是 class 在 new 之前必需先要声明它
- class Foo 并没有像function Foo 一样创建一个同名的全局对象属性
- class 只是创建了一个同名的构造器函数，所以 instanceof 依然有效

### extends

是一个语法糖，用来在两个函数原型之间简历 [[Prototype]] 委托链接

### super

- 在构造器中，super 指向父构造器，就是 Foo()
- 在方法中，super 会指向父对象，这样就可以访问其属性/方法了，如super.gimmeXY()
- super 不仅限于 class中使用，也可以在对象字面值中使用

### 子类构造器

子类构造器中调用 super(..) 之后才可以访问 this。因为创建实例this 的实际上是父构造器

```jsx
class Foo() {
	constructor(a, b) {
		this.x = a;
		this.y = b;
	}

	gimmeXY() [
		return this.x + this.y;
	}
}

// 这里把 Bar.prototype 的[[Prototype]] 
// 连接到 Foo.prototype
class Bar extends Foo {
  constructor(a,b,c) {
		// super 指的是 Foo
		super( a, b ); 
		this.z = c;
	}
	gimmeXYZ() {
		// super 指的是 Foo.prototype
		return super.gimmeXY() * this.z;
	}
}

var b = new Bar(5, 15, 25);

b.x  //5
b.y //15
b.z //25
b.gimmerXYZ // 1875
```

### 扩展原生类

自定义 array，error 等，非常好用

```jsx
class MyCoolArray extends Array {
	first() { return this[0]; }
	last() { return this[this.length - 1]; 
}
}

var a = new MyCoolArray( 1, 2, 3 );

a.length; 
a;
a.first(); 
a.last();
```

### static

*一个类的 static 方法直接添加到这个类到函数对象上，而不是这个函数对象的 prototype 对象上。*

*不要误以为 static 成员在类的原型链上，实际上它们在函数构造器之间的双向/并行链上。*

```jsx
class Foo() {
	static cool() { console.log("cool"); }
	wow() {console.log("wow")}
}

class Bar extends Foo() {
	static awesome() {
		super.cool();
		console.log("awesome");
	}
	
	neat() {
		super.wow();
		console.log("neat");
	}
}

Foo.cool() // 'cool'

Bar.cool() // 'cool'
Bar.awesome() // 'cool' \n 'awesone'

var b = new Bar();
b.neat(); // "wow" /n "neat"

b.awesome; // undefined
b.cool; // undefined
```