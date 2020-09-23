# Vue

## 响应式原理

## 实现一个对象里面所有的数据劫持并打印

```javascript
var state = { a: 1 }

Object.keys(state).forEach(key => {
  const value = state[key]
  console.log(state)
  Object.defineProperty(state, key, {
    get() {
      console.log(state)
      return value
    },
    set(value) {
      console.log(value)
      return value
    }
  })
})
```

## 使用观察者模式实现一个 Dep， 实现依赖跟踪

``` javascript
class Dep() {
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if(activateUpdater) {
     this.subscribers.add(activateUpdater)
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

let activateUpdater

function autorun(updater) {

  function wrapUpdate() {
    activateUpdater = updater;
    updater()
    activateUpdater = null;
  }
  wrapUpdate()
}

const dep = new Dep

autorun(() => {
  dep.depend()
  console.log('updated')
})

dep.notify()

```

## 结合两者

- observe() 让接收到的对象的属性变成响应式，对于每一个转化后的属性，都会被添加一个 Dep 实例，里面有一系列订阅的更新函数，在setter 执行时触发这些函数
- autorun() 接收一个更新函数，更新函数被认为是一个的属性的订阅者，它的执行依赖于那个属性

``` javascript
const state = { count: 0}

function observer(state) {
  Object.keys(state).forEach(key => {
    let value = state[key]

    const dep = new Dep()

    Object.defineProperty(state, key, {
      get() {
        // 注册
        dep.depend()
        return value
      },
      set(newVal) {
        if(value !== newVal) {
          value = newVal
          dep.notify()
        }
      }
    })
  })
}

observe(state);


autorun(() => {
  console.log(state.count)
})

state.count++;

```
