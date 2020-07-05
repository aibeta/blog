# Singleton

## 单例模式

在有类的语言中，单例模式意味者某个类的实例只会被创建一个，创建新实例时则会返回这个实例。

在JS中，没有类，所以一个对象就是一个单例的对象。

我们可以使用闭包来保护变量实现单例模式。

```javascript
function foo() {
	var self = this;
	
	return function() {
		return self;
	}
}

var Logger = foo();
var instance = new Logger();
```

使用 symbol 来实现单例模式

```javascript
const INSTANCE = Symbol( "instance" ); 
function HappyFace() {
	if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];
	function smile() { .. }
  return HappyFace[INSTANCE] = {
		smile: smile
	}; 
}
var me = HappyFace(),
    you = HappyFace();
me === you; // true
```

也可以使用IIFE 来创建一个单例