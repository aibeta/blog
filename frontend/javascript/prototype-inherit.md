# Prototype Inherit

## 实例的原型

实例化对象时，会为这个对象添加一个原型,  也就是实例它的构造函数的原型

Objcet.getPrototypeOf(new Foo()); 那么它等同于 Foo.prototype

### 构造函数的原型属性

指的是 Foo.prototype，这里要注意，Foo.prototype == Object.getPrototypeOf(Foo) 可不相同哦

### prototype 属性

是一个对象，存储了我们希望被原型链继承的属性和方法，所以Objcet.prototype.toString() 才可以直接食用。

我们说构造函数的prototype 属性才有意义，因为实例要从它们这里继承方法。但是实例的prototype 属性就是一个普通的属性而已。

如果我们想让实例b继承实例a，那么我们使用 var  b = Object.create(a); 就会让 b 的原型指向a这个对象，那么b就有了a 的所有属性和方法了

### [prototype]

- 指的是每个的对象都有的内部属性，是个引用，指向另一个对象
- 几乎每个对象在创建时都会有一个 non-null 值，也可以创建一个原型是 null 的，不常见
- Object.creatr(obj) 将会创建一个原型是 obj 的对象
- 如果用for.. in 循环迭代一个对象，那么对象原型链上所有的可枚举属性都会被枚举
- ("a"  in obj) 这个 in 操作符也会去原型链上检查该属性是否存在
- 每个普通的原型链的 top end 都是内置的 Object.prototype，包括一些 utilities
- utilities: valueOf(..) hasOwnProperty(..) isPrototypeOf(..)

### shadowing

同样的属性，原型链 low 端的属性总是会遮蔽 top 上面的属性

### __proto__

它的实现可以视为这样，最好把它视为 read-only 的

```jsx
Object.defineProperty( Object.prototype, "__proto__", {
    get: function() {
        return Object.getPrototypeOf( this );
    },
    set: function(o) {
        // setPrototypeOf(..) as of ES6
        Object.setPrototypeOf( this, o );
        return o;
    }
} );
```

### 原型链

当我们访问一个对象的属性时，如果没有直接找到，那么内部的 [[Prototype]] 属性定义了 [[Get]] 操作应该怎么查找，这个针对对象的一级一级查找被定义为原型链

从一个对象到其后备对象的内部原型引用的链接是在创建对象时发生的。展示这一点的最 简单的方法就是使用内置工具 Object.create(..)

```jsx
var foo = {
         a: 42
};
// 创建bar并将其链接到foo
var bar = Object.create( foo );
bar.b = "hello world"; bar.b; // "hello world"
bar.a; // 42 <-- 委托给foo
```

### [[prototype]]

在ES6 中可是直接使用 o.__proto__ 来连接原型 但是更好的的是 Object.setPrototypeOf()

### super

super只允许在简洁方法中出现，只允许以 [super.xxx](http://super.xxx) 的形式出现，不能 super()

```jsx
var o1 = {
  foo() {
	console.log( "o1:foo" ); }
};
var o2 = {
  foo() {
	//这里的 super 就是 Object.getPrototypeOf(o2)
		super.foo();
		console.log( "o2:foo" ); 
	}
};
Object.setPrototypeOf( o2, o1 ); 
o2.foo(); // o1:foo
					// o2:foo
```
