Redux
1. 注入是什么意思
    1. 
2. 怎么在 connect 这一级获取 store
    1. connect()() 把 React 和 Redux Store 连接起来，返回一个新的组件
    2. 这一级没法直接获取 store，它只能接收到store 的 dispatch 和 action 创建函数
3. 为什么用 react thunk，这个东西是干什么的
    1. 用于创建异步的 action 创建函数，避免过多重复的代码
    2. 

Redux
1. 三大原则
    1. 单一数据源：所有的 state 被存储在一个 object tree 当中
    2. state 只读：唯一改变 state 的方式就是触发 action，action 是一个描述已发生事件的普通对象
    3. 使用纯函数来执行修改：为了描述 action 如何改变 state tree 你需要写一些 reducers 函数
        * reducer 只是一些纯函数，它接受旧的 state 和 action ，返回一个新的 state

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
