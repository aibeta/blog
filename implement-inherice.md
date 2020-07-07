# Implement Inherice

### Object.create 继承

```javascript
function Animal(name) {
  this.name = name
}
Animal.prototype.getName = function() {
  return this.name
}

function Gorilla(name) {
  Animal.call(this, name);
}

Gorilla.prototype = Object.create(Animal.prototype);
Gorilla.prototype.construtor = Gorrilla;

var gorilla = new Gorilla();
```

为什么使用 Object.create 创建一个新对象，是因为在子类上定义的方法，不应该绑定到父类上面去。

- https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420