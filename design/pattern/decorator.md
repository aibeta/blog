# Decorator

## 装饰者模式

装饰者模式是一个结构上的模式，它不关心对象的创建，而是关心怎样 extended。
和继承不同，如果你以线性的方式去 extended，那么你可以拥有一个base 对象，还有一大堆的 decorator 对象来提供额外的功能。
程序可以选择使用哪个decorator，以及以什么样的顺序使用。

```javascript
// 可以看一个装饰者的例子
var obj = {
  doSomething: function () {
    console.log('sure, asap');
  }
  //  ...
};
obj = obj.getDecorator('deco1');
obj = obj.getDecorator('deco13');
obj = obj.getDecorator('deco5');
obj.doSomething();

// 每个装饰者都有 doSomething 方法
// 每次添加装饰者，就会以增强版本重写 obj
// 最后调用 doSOmthing 时，所有装饰者的 do 方法会依次调用

```

```javascript
// 另一个例子
var tree = {};
tree.decorate = function () {
  alert('Make sure the tree won't fall');
};

tree.getDecorator = function (deco) {
  tree[deco].prototype = this;
  return new tree[deco];
};

tree.RedBalls = function () {
  this.decorate = function () {
    this.RedBalls.prototype.decorate();
    alert('Put on some red balls');
  };
};
tree.BlueBalls = function () {
    this.decorate = function () {
    this.BlueBalls.prototype.decorate();
    alert('Add blue balls');
  };
};
tree.Angel = function () {
  this.decorate = function () {
    this.Angel.prototype.decorate();
    alert('An angel on the top');
  };
};

tree = tree.getDecorator('BlueBalls');
tree = tree.getDecorator('Angel');
tree = tree.getDecorator('RedBalls');

tree.decorate();
```