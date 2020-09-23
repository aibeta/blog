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

观察者模式也被称为 订阅-发布者 模式，是一个行为上的模式。意思就是，它处理的是对象之间的交互和沟通。implement 观察者模式时，一个或多个对象作为发布者，干事后会发消息，订阅者会订阅一个或多个发布者，去接收它们发布的消息。浏览器的事件，就是对观察者模式的应用，浏览器是发布者，当用户点击一个按钮后，它会发出消息，js 里面的事件监听函数是订阅者，当事件发生后会去做一些处理。观察者模式有两个子类型：push 和 pull，push 是发布者去通知每个订阅者，pull 是订阅者去处理发布者状态的改变

### NodeJS中的观察者模式

模式定义了一个对象(called subject)，当内部状态变化时，去通知一系列的监听者(listener)。

观察者模式和回调模式的不同在于，这个对象可以通知很多listener，而回调的话只能通知一个 listener。

NodeJS 里有一个 EventEmitter 类，可以允许我们注册一个或多个 function 作为 listener。

```javascript
const { EventEmitter } = require("events");
const eeInstance = new EventEmitter();

几个方法
// .on(event, listener) 注册 listener
// .once(event, listener) 注册后，触发一次后移除
// .emit(event, [arg1], [...]) 触发监听者，并传入参数
// .removeListenr(event, listener)
```

### reference

- [EventEmitter](https://www.notion.so/EventEmitter-b99ae1380699481c8f811c0118f5cce3)
- [observer-design-pattern](https://www.dofactory.com/javascript/design-patterns/observer)