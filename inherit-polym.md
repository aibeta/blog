# Inherit Polym

### 多态

是说父类的行为可以被子类 overridden，但是修改的是父类的拷贝，类与实例的关系就像设计图与建筑。

### 多重继承

意味着每个父类都被拷贝进子类，会引起诸多问题，js 不提供原生的多重继承，在js 中，只有对象，没有类，它们通过原型链接在一起，也没有拷贝父类这一行为。

### 类继承 OO

Object-oriented 也就是类继承，我们把类继承看成一种设计模式

```jsx
// 一个 OO 的例子
class Widget {
    constructor(width,height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where){
        if (this.$elem) {
            this.$elem.css( {
                width: this.width + "px",
                height: this.height + "px"
            } ).appendTo( $where );
        }
    }
}

class Button extends Widget {
    constructor(width,height,label) {
        super( width, height );
        this.label = label || "Default";
        this.$elem = $( "<button>" ).text( this.label );
    }
    render($where) {
        super( $where );
        this.$elem.click( this.onClick.bind( this ) );
    }
    onClick(evt) {
        console.log( "Button '" + this.label + "' clicked!" );
    }
}

$( document ).ready( function(){
    var $body = $( document.body );
    var btn1 = new Button( 125, 30, "Hello" );
    var btn2 = new Button( 150, 40, "World" );

    btn1.render( $body );
    btn2.render( $body );
} );
```

### OLOO

把a链接到b，然后把b链接到a的话，会报错 OLOO(object linked to other objects)

```jsx
// OO style
function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return "I am " + this.me;
};

function Bar(who) {
    Foo.call( this, who );
}
Bar.prototype = Object.create( Foo.prototype );

Bar.prototype.speak = function() {
    alert( "Hello, " + this.identify() + "." );
};

var b1 = new Bar( "b1" );
var b2 = new Bar( "b2" );

b1.speak();
b2.speak();

// OLOO-style
Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};

Bar = Object.create( Foo );

Bar.speak = function() {
    alert( "Hello, " + this.identify() + "." );
};

var b1 = Object.create( Bar );
b1.init( "b1" );
var b2 = Object.create( Bar );
b2.init( "b2" );

b1.speak();
b2.speak();
```

OLOO 的例子

```jsx
var Widget = {
    init: function(width,height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function($where){
        if (this.$elem) {
            this.$elem.css( {
                width: this.width + "px",
                height: this.height + "px"
            } ).appendTo( $where );
        }
    }
};

var Button = Object.create( Widget );

Button.setup = function(width,height,label){
    // delegated call
    this.init( width, height );
    this.label = label || "Default";

    this.$elem = $( "<button>" ).text( this.label );
};
Button.build = function($where) {
    // delegated call
    this.insert( $where );
    this.$elem.click( this.onClick.bind( this ) );
};
Button.onClick = function(evt) {
    console.log( "Button '" + this.label + "' clicked!" );
};

$( document ).ready( function(){
    var $body = $( document.body );

    var btn1 = Object.create( Button );
    btn1.setup( 125, 30, "Hello" );

    var btn2 = Object.create( Button );
    btn2.setup( 150, 40, "World" );

    btn1.build( $body );
    btn2.build( $body );
} );
```

[]()

关于原型的 Instaceof 比较容易让人混乱，在OLOO下最好用 getPrototypeOf

### mixin

在这里等于extend，拷贝一个对象的值到另一个。就像汤里混入了肉和土豆。

```jsx
function mixin(sourceObj, targetObj) {

	for(var key in sourceObj) {
		if(!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}
	
	return targetObj;
}

//
var Vehicle = {
	drive() {} // 简洁方法
}

var Car = mixin{Vehicle, {
	wheels: 4,
	drive() {
		Vehicle.drive.call(this);
		console.log(this.wheels);
	}
} }
```

### 寄生继承

这种 mixin 的继承，既有值的拷贝，又有implicit 引用的拷贝，就叫寄生继承

```jsx
function Vehicle() {
	this.engines = 1;
}

Vehicle.prototype.ignition = function() {
	console.log("turning on my engine");
}
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log("Steeing and moving forward!")
}

// 寄生继承类 Car
function Car() {
	var car = new Vehicle();
	car.wheels = 4;
	var vehDrive = car.drive();
	car.drive = function() {
		vehDrive.call(this);
		console.log('rolling on all'+ this.wheels);
	}
	return car;
}

var myCar = new Car();

myCar.drive();
```

### 原型继承

可以说是动态语言版本的类继承，继承意味这拷贝，所以js 中更适合叫做 delegation。任何对象都可以被用于实例新对象，因为 constructor 属性指向的包含 prototype 的对象包含了 constructor

### 原型继承的三种写法

b.isProrotypeOf(..) 判断原型

ES5 标准： Object.getPrototypeOf(a) === Foo.prototype // true

部分浏览器 使用 a.__proto__，是一个不可枚举的值，看起来是个属性，但是应该把它视为 setter/getter

```jsx

// 正确的，创建了一个新的对象，原型是Foo 的原型
Bar.prototype = Object.create( Foo.prototype);

// 在ES6 可以用 
Object.setProrotypeOf(Bar.prototype, Foo.prototype);

// doesn't work like you want!
// 没有创建新对象，直接把 Bar 的原型链接到了 Foo.prototype
// 如果要新增方法 Bar.prototype.myLabel=...，就会修改Foo
// 如果是这样的话，那就直接使用Foo.prototype 就好了
Bar.prototype = Foo.prototype;

// works kinda like you want, but with
// side effects you probably don't want :(
// 如果Foo 里面有东西的话，就会不可控制
Bar.prototype = new Foo();
```