# React Basic Component

## React

react 是创建view 的库，浏览器DOM 由DOM 元素组成，是一个真实的 DOM 元素，React DOM 由 react 元素组成，是对于真实元素的描述。创建完 react 元素后，ReactDOM 会把元素渲染到浏览器，我们会在它里面找到 render 方法。

## 声明式编程

命令式编程描述代码如何工作，声明式表明想实现什么目的。声明式编程往往不使用变量，避免了创建和修改状态。只需要声明希望在屏幕上看到的内容，React 完成剩下的工作

### React 核心包

react.js 是基础lib， react-dom.js 包含了浏览器相关的所有特性，如果只引入这两个包，则不可以使用 jsx 语法。

### Babel

Babel 将ES6 的代码编译为 ES5，也可以将 jsx 编译为 js 函数，这个过程称为转译，也就是将源代码编译成另一份源代码

### JSX

仅仅是语法糖，会被编译成 js 函数。运行 Babel 会把<div /> 转换成 React.createElement('div')。如果有多个同级元素<div />，要封装在一个父级中，因为js 不能返回两个函数。

- 注意 html 普通元素是 <button />，Button 组件应该是大写的 <Button />。
- 如果要使用函数或变量，需要用花括号 { variable } 括起来
- jsx 要用 className ，htmlFor，因为 class 和 for 都是JS 保留字，无法在创建时做属性如 React.createElement('img", {class: 'sth'}) 会出错

    ```json
    return 
    	<div/ >

    // 会被转换为

    return;
    React.createElement("div", null);

    // 因此必需
    return(
    	<div />
    )
    ```

- JSX样式驼峰 jsx 的样式属性需要传入JS对象，而不是CSS 字符串 <div style=({ color: 'red'  }) />
jsx 空格 jsx 元素间的空格会被忽略， 如果要加空格，可以使用 { ' ' } 这样
展开属性 jsx 支持 <div  {...obj} />

### React 元素

一个 react 元素只是一个literal，告诉React 如何构建DOM 元素，调用React.createElement 后返回的元素如下。

```jsx
{
  $$typeof: Symbol(React.element),
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {id: "myh1", children: "title"},
  "_owner": null,
  "_store": {}
}// React 元素
React.createElement('h1', {id: 'myh1'}, "title")

//真实DOM
<h1 id="myh1">title</h1>
```

无论是调用 createClass、继承 Component、无状态函数，都在创建组件。React 使用了**元素**这种特殊类型来控制 UI 流程。type 如果是字符串，那么元素就是一个DOM节点,type 如果是函数，那么元素就是组件，此时React 调用它，传入 props 取回底层元素。

```json
{
	type: Title,
	props: {
		color: 'red',
		children: 'hello world!'
	}
}
```

### 单向数据流

数据从根节点流向叶子节点。

### 设置 input

```jsx
handleChange({ target }) { 
	this.setState({
		[target.name]: target.value, 
	})
}
```

### SPA

通用应用是说应用的代码可以同时用于服务端和客户端，服务端渲染只是react 渲染工作的一半。componentWillMount 服务端渲染和客户端渲染都会触发，另外服务端渲染里不要触发异步API

### Ref

除非很必要，可以设置 ref= {e ⇒ this.e = e} 事件处理的时候，就直接用 this.e

### svg

```jsx
const Circle = ({ x, y, radius, fill }) => (
  <svg>
    <circle cx={x} cy={y} r={radius} fill={fill} />
  </svg>
)
```

```jsx

```

### React 模式分为

容器组件: how things work，fetch data，manage state

- 更关心行为部分;
- 负责渲染对应的表现组件;
- 发起 API 请求并操作数据;
- 定义事件处理器
- 写作类的形式。

表现组件:

- 更关心视觉表现;
- 负责渲染 HTML 标记(或其他组件);
- 以 props 的形式从父组件接收数据;
- 通常写作无状态函数式组件。

### 无状态函数式组件

(props) ⇒ <button />，可以使用解构，this 不指向组件本身，所以不能使用 setState 生命周期等

## 创建组件

createClass 工厂方法/ 继承 React.Component

```jsx

// 工厂方法 
// 区别1
const Button = React.createClass({
	// 区别4
	getInitialStsate() {
		return {
			text: 'Click'
		}
	},
	// 区别2	
	protoType: {
		text: React.Prototype.string
	},
	// 区别3react 特有函数，用于设置默认值
	getDefaultProps() {
		return {
	 		text: 'Click me!'
		}
	},

	// 区别5 createClass 函数内部this 指向组件本身
	handleClick() {
		console.log(this)
	},
	render() {
		return <button  onClick={this.handleClick} />
	}
})

// 继承(推荐)
// 区别1
Class Button extends React.Component(
	// 区别4
	constructor(props) {
		super(props)
		this.state = {
			text: 'click'
		}
		// 区别5
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		console.log(this)
	}
	render() {
		return <button onClick={this.handleClick} />
	}
)
// 区别2
Button.protoType = (
		text: React.Prototype.string
)
// 区别3
Button.defailtProps = {
	text: 'click me!'
}
```

### 高阶组件

const HoC = Component ⇒ EnhancedComponent 其实就是函数，接收组件作为参数，在对组件进行增强后返回。

```jsx
const withClassName = Component => props => (
	<Component {...props} className="mu-class">)
```

### recompose

是一个流行的库，提供了一些高阶组件，可以串联多个高阶组件

### 组件通信

子组件与父组件的通信通常使用回调函数实现，子组件和子组件之间可以通过公用的父组件新型通信。

### key 属性

为列表的每一项添加key，在渲染的过程中不能改变，帮助react 判断哪些修改了.

React.PureComponent 类似 React.memo 但是前面的是 class 组件的版本