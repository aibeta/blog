# Javascript Problem1

### 包装类型是什么？

除了 null 和 undefined，其他基本类型都有包装类型。创建方法是使用 new 关键字，把基本类型包装成了一个对象，取值可以用 valueOf 方法。事实上，当我们通过字面量声明一个字符串a，访问它时引擎会自动转换成new String('')在使用完成后会销毁a，这样a也就有了很多的方法和属性了。

### 在 constructor 里面为什么要先 super？

super 有三种用法

1. 在一个派生类的构造函数里调用 super()
2. 在派生类里也可以调用父类的静态方法 super.log()
3. 在对象字面量里面可以调用父对象的方法 wuper.log()

注意只是在构造函数里是作为函数调用的。

在第一个用法里面，super 去调用父类的构造函数，实例化了子类，然后才可以在构造函数里使用this。这一步是为了确保子类是一个父类的实例，所以才可以在构造函数里使用this。

如果不自定义构造函数，类内部会默认调用构造函数，所以子类的其他函数里其他依然可以使用 this。所以 super 事实上相当于是调用了ParentClassName.prototype.construtor.call(this, …)

### static 静态方法是干什么的？

static 是只出现在类里面的方法，类的实例无法调用静态方法。有两种调用方式:

1. 通过 className.staticFuncName()
2. 通过子类里面的 super.staticFuncName()

### reference

- https://blog.csdn.net/aimingoo/article/details/6676530
- https://www.zhihu.com/question/40683360
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super
- https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420