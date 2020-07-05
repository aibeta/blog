# Mvx

### MVC

1. MVC，全称是 Model View Controller，是模型 (model)－视图 (view)－控制器 (controller) 的缩写。它表示的是一种常见的客户端软件开发框架
2. MVC是一种设计模式，让软件分为三个部分
    - 视图（View）：用户界面。
    - 控制器（Controller）：业务逻辑
    - 模型（Model）：数据保存
3. 所有的数据传递都是单向的
    - View 传送指令到 Controller
    - Controller 完成业务逻辑后，要求 Model 改变状态
    - Model 将新的数据发送到 View，用户得到反馈
4. 互动模式有两种
    1. user => view => controller => model => view 程序通过 view 层接收指令，传递给 controller
    2. 另一种直接通过 controller 来接收： user => controller => model => view

## Model View ViewModel

是一个基于MVC 和 MVP 的设计模式，主要是用于分离UI 曾和业务逻辑及行为，这个模式的实现是利用声明式的数据绑定，从而使views 和其他的layers 分离开。微软最先在2005年的WPF上应用了这个模式。

![https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/httpatomoreillycomsourceoreillyimages1547825.png](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/httpatomoreillycomsourceoreillyimages1547825.png)

### Model

代表着 domain-specific 的数据和信息，比如一个账户(name, avatar, email) 一个音乐(title, year, album)，但是model 不处理业务逻辑，唯一例外是validation，models 可以用于验证数据(比如一个输入的email是否合法)。

### View

- View 来进行格式化数据，这个view 仅仅展示数据，而不接收用户输入。
- view 会响应 viewmodel 的事件处理函数。
- view 并不处理状态！它保持和viewmodel 层的一致。
- view 可以是html，包含声明式的到viewmodel 的绑定，显示viewmodel 的数据，向viewmode 传入指令(事件)，在viewmode 发生改变后进行更新。

### ViewModel

- ViewModel 会处理业务逻辑，可以视为特殊的作为数据转换的 controller ，他把model 的信息转换成 view 的信息，把command 从view 传递到model。viewmodel 用于维持 view 的状态，通过view的动作更新model，以及触发view的事件

```javascript
// 下面是双向数据绑定，就是view 会和viewmodel 的数据保持一致
// viewmodel
var viewmodel = {
	name: ko.observable('john');
}

// view 
<input data-bind="value: name" />
```