# Nextjs

### 一些基础

- 用类继承的组件构造函数里面 super(props) 才可以继承父类的属性，不执行的话里面无法使用 this.props
- render 应该是纯函数，并且不应该修改 state

生命周期

当props 或 state 变化时

- getDerivedStateFromProps(props,state)
    - 如果state需要更新，那么返回一个 object
    - 只在特定场景下使用
- showCOmponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdatr()

## next

- nextjs 是什么？(是一个React 框架)
- 作用是什么？(类似 php 一样做服务端渲染)
- 怎么创建一个 next 应用？
    - 需要一个 next server ，会把 pages 路径下面 export 的组件当成 html 返回到前台
    - 如果目标页面是 SPA，那么需要用 next/link 来做路由跳转，这样就会在前端进行局部刷新，而不是跳转进 b 页面
    - 跳转后的页面如果刷新就会404，所以我们需要引入 express，在服务端处理这个url
    - 需要在服务端发出的请求，我们应该放在 getInitialProps 里面
    - 如果是在客户端通过 next/link 进入的页面，那么 getInitialProps 里的方法就会在客户端被调用
- 怎么在里面加上样式
    - next 建议的是使用 CSS in Js, 使用一个框架 styled-jsx
    - <style jsx>{``}</style> 注意是有作用域的
- 部署app
    - 可以在多个端口创建多个实例
    - 可以使用 zeit now 来自动部署你的应用，它会自动映射到443端口
- 导出为一个应用，也支持Static Exporting
- nextjs 可以静态和非静态部署