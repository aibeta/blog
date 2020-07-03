# Observer

当一个对象的状态改变时，所有依赖它的对象都会被通知和改变

观察者模式提供了一个订阅的模型，可以让对象订阅了一个事件，当这个事件触发时，会通知这个对象。在前端领域的事件和事件handler就是一个观察者模式的示例。

我们用代码来实现一个点击事件的订阅和发布

观察者有两部分：subject 和 observer

- Click 实例是 subject，它来保存所有的观察者列表，实现了订阅和取消订阅的功能，同时它在一些事件触发时会去执行所有的 observer，只不过在本例中我们是手动触发
- clickHandler 在订阅之后是一个 observer

```javascript
class Click() {
  consructor() {
    this.handlers = []
  }
  subcribe(fn) {
    this.handlers.push(fn)
  }
  unsubscribe(fn) {
    this.handlers.filter((item) => {
      return item !== fn
    })
  }
  fire(event, thisScope) {
    const scope = thisScope || window
    this.handlers.forEach((fn) => {
      fn.call(thisScope, event)
    })
  }
}


function run() {
  const click = new Click()

  function clickHandler('msg') {
    console.log('msg')
  }

  click.subcribe(clickHandler)
  click.fire('click fired') 
}
run()
```

### reference

- [observer-design-pattern](https://www.dofactory.com/javascript/design-patterns/observer)