# Redux

### 问题

- Redux 是什么?
    - 一种思想
- Redux 三大原则？
    - 单一数据源、状态只读、修改由纯函数执行
- Redux 的名字来源？
    - Reducer + flux
- Redux 的核心 store

Redux 的核心是一个 store 对象，这个 store 通过 createStore(reducer[, initialState])生成，所以，想要创建 store，必须传入 reducer，那么 reducer 是什么？其实 reducer 是一个纯函数，用于响应 action 并修改 state 数据。等一下，什么叫响应 action？
我们可以先看 reducer 的函数签名 reducer(previousState, action) => new State ，所谓响应就是根据 action 的不同返回不同的newState。

store 在创建之后，有两个主要方法，store.getState，和 store.dispatch，前者用于获取当前的 state，后者用于分发一个 action。调用的时候 store.dispatch({ type: 'AN_ACTION' })，那么我们不禁要问，它有什么用，其实也简单，我们看源码

```jsx
  function dispatch(action) {
    // ...(一些非空判断)
    if(isDispatching) {
      throw new Error('不样发')
    }
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    // ...(调用监听器通知状态变更)
    listener.slice().forEach(listener => listener())
    return action
  }

```

阔以看到，就是调用 reducer，处理了一下当前的 state，最后返回了处理之后的 action。既然它返回了一个 action，那么我们是不是可以再次 dispatch？

理解了 dispatch，我们就更好理解 redux 中间件，它是为了增强 dispatch 而存在，所谓的增强，就是先对这个 action 进行一系列更改或异步更改，最后去 dispatch(action))

### 中间件

Redux 通过 applyMiddleware 的方法来加载中间件，我们看看源码

```jsx
import compost from '/compose;

export default function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    let store = next(reducer, initialState);
    let dispatch = store.dispatch;
    let chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compost(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    }
  }
}

```

我们再来看一个普通 middleware 的实现，

```jsx
export default store => next => action => {
  console.log('dispatch', action);
  next(action);
  console.log('dispatch', action);
}

```

### 函数的柯里化(curring)

函数式编程的 curring，一个普通函数 const add = (a,b,c) => a + b + c，调用方式 add(1,2,3) === 6;
柯里化之后 const add = a => b => c => a + b + c, 调用方式 add(1)(2)(3) === 6;

### compose

compose 是函数式编程的组合，主要是实现函数的串联，下面是源码

```jsx
function compose(...funcs) {
  return arg => funcs.reduceRight((compose, f) => f(composed), arg)
}

const add2 = add(1)(1);
const add3 = add(1)(2);
const add4 = add(1)(3);

// 将上面3个
const add9 = compose(add2,add3,add4)

// 也就是 add9 = (arg) => add2(add3(add4(arg)))
add9(1) = 10;

let newStore = applyMiddleware(mid1, mid2, mid3)(createStore)(reducer, null);

```

所以一个经过 applyMiddleware 改造的 dispatch 就变成了 mid1(mid2(mid3(action)))

- action 是什么？
- Redux 和 React-Redux 两个库的区别是什么？
    - 类似 React 和 React-DOM
- <Provider /> 和 connect() 是什么？
    - 是 React-Redux 提供的 API和方法, <Provider /> 接收一个 store 作为 props，是 Redux 应用的顶层组件
    - connect 提供了在整个应用任意组件中使用 store 数据的能力

## Redux 是一个可预测的状态容器，什么意思？

- Redux 中间件
    - 提供了一个第三方扩展，在 dispatch an action 的时候，可以分类过滤操作和改变 action
- Redux-thunk
    - 可以把 dispatch(action)里的 action 定义为一个函数，接收(dispath, getState)
- Thunk
    - Thunk 函数实现上就是针对多参数的 currying 以实现函数的惰性求值
- Redux 与路由
    - React，并不是一个框架，而是一个库，Angular 是因为它集成了各种各样的功能
- 路由基本原理
    - 保证 View 与 URL 同步
- yield call 和 yield put

以下来自比较古老版本的 Redux 笔记

1. 注入是什么意思
2. 怎么在 connect 这一级获取 store
    1. connect()() 把 React 和 Redux Store 连接起来，返回一个新的组件
    2. 这一级没法直接获取 store，它只能接收到store 的 dispatch 和 action 创建函数
3. 为什么用 react thunk，这个东西是干什么的
    1. 用于创建异步的 action 创建函数，避免过多重复的代码

Redux

1. 三大原则
    1. 单一数据源：所有的 state 被存储在一个 object tree 当中
    2. state 只读：唯一改变 state 的方式就是触发 action，action 是一个描述已发生事件的普通对象
    3. 使用纯函数来执行修改：为了描述 action 如何改变 state tree 你需要写一些 reducers 函数
        - reducer 只是一些纯函数，它接受旧的 state 和 action ，返回一个新的 state

dispatch 就是发布，他接受一个 object 发送给 reducer

Redux

三个原则

- 单一数据源
    - 好处在于整个应用状态保存在一个对象里
    - 容易实现一个针对整个应用的即时保存
    - 也支持了服务端渲染
- 状态是只读的
    - 我们定义一个 reducer，功能是根据当前触发的 action 对当前应用的状态(state) 进行迭代
    - reducer 提供的 createStore 会根据 reducer 生成 store
    - 最后使用 store.dispatch 来达到修改状态的目的
- 状态修改由纯函数完成
    - 每一个 reducer 都是纯函数
    核心 API
- import {createStore} form ‘redux’;
- const store = createStore(reducers);
    - store 是一个对象包含四个方法
    - getState() 获取 store 中的状态
    - dispatch(action) 分发一个 action，并返回这个 action，这是唯一改变 store 中数据的方法
    - subscribe(listener) 注册一个监听者，在 store 发生变化时被调用
    - replaceReducer(nextReducer) 更新当前 store 里的 reducer