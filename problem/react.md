# react

### React 的 key 应该怎么进行设置?

不建议用 index 做 key，因为顺序有可能会改变，key 在这些兄弟节点之中必须是唯一的.最好能够使用 id

### React.Fragment 是什么? 

Fragment 可以让你返回一个列表的组件而不用增加额外的父节点

### React.lazy() 和 Suspense 的功能主要是什么？

- React.lazy() 让你可以动态的加载一个组件，就是在组件 rendered 之后去加载包，用于减少初始包的大小
- const SomeComponent = React.lazy(() => import('./SomeComponent'));
- React.lazy 接收一个函数，必须调用一个动态的 import，会返回一个 promise，怎么决议？
- 参考：https://reactjs.org/docs/code-splitting.html#reactlazy
- 我们使用 React.Suspense 作为懒加载的回退，即 loading 指示器
- React.Suspense 必须在懒加载组件的上级，可以包含多个懒加载组件
- <React.Suspense fallback={<Spinner />}> 
- 目前这两个不支持服务端渲染
- 好的实践是在需要有指示器的时候，加上 Suspense

### react: component 和 pureComponent 区别是什么

- component 不会自动触发 shouldComponentUpdate()，除非自己去定义
- pureComponent render之前会自动触发 shouldComponentUpdate()，但是传入的参数是 props 和 state 的浅拷贝
- pureComponent 如果接收固定的 props 和 state 返回固定的组件，那么可以使用 PureComponent
- 如果 pureComponent 中复杂的数据结构更新了，那么可以手动调用forceUpdate() 来更新
- 如果数据结构非常复杂，可以考虑使用不可变对象
- 可以把函数式组件包裹在React.memo之中，类型与 pureComponent，仅当组件的 props 改变时，才会触发 rerender
