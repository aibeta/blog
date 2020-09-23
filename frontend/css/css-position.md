# Css Position

## 定位元素

postion 的 initial value: static，任何不是 static 的 position 都会被称为定位元素，定位元素会把元素完全地移除文档流，所以你可以定位到任何位置。

### fixed

- fixed 元素会根据 viewport 来定位，通过设置 top/right/bottom/left，我们隐式地定义了元素的宽度和高度。
- 如果想给一个fixed 的元素加上半透明的背景，那就给它加个全屏的透明兄弟元素

### relative

- 通过设置 top... 等无法设置相对元素的宽度，同时 top/bottom 同时使用那么bottom 会被忽略，left/right 同时用right 会被忽略，它的定位容器是自己

### absolute

- 会把祖先元素里最近的一个定位元素作为它的容器，如果一直找不到，就会有一个 initial containing block，尺寸和viewport 相同，但是锚点是page top

### sticky

- 有点想 relative 和 fixed 定位的混合，元素会正常滚动直到到达屏幕里特定的点，然后会 lock in place，常用的是 sidebar 导航

### z-index

默认来说，任何定位的元素会排在未定位元素的前面

### stacking context

stacking context 包括了painted together 的一组元素。

当给一个 positioned 元素加上z-index后，它就成为了 stacking context 的root，它所有的后代元素都成了 stacking context的一部分。
也就是说，a 和 b 是兄弟元素，z-index：1，

1. b在a上面，因为 root 也有一个stacking context
2. 在a 的内部，无论你z-index 是多少，都会在a的里面，b依然在你上面
3. 此外，opacity 小于1/transfrom/filter 属性也会创建

在一个 stacking context 里面的元素遵从以下规则，从后往前

1. stacking context 的 root 元素
2. 定位元素且 z-index为负数的元素（和它们的子孙）
3. 未定位元素
4. 定位元素但是 z-index是 auto 的（和子孙）
5. 定位元素且有 z-index 是正的元素(和子孙)

### 定位伪类

- 弹窗的关闭按钮，最好使用伪类来实现，使用unicode \00D7，
- 绝对定位可用于：popping up menus，tooltips，“info” boxes

```css
.modal-close {
  position: absolute;
  top: 0.3em;
  right: 0.3em;
  padding: 0.3em;
  cursor: pointer;
  font-size: 2em;
  height: 1em;              1
  width: 1em;               1
  text-indent: 10em;        2
  overflow: hidden;         2
  border: 0;
}

.modal-close::after {
  position: absolute;
  line-height: 0.5;
  top: 0.2em;
  left: 0.1em;
  text-indent: 0;
  content: "\00D7";         3
}

1. 让按钮变成一个方块
2. 让其中的文本隐藏（文本是close 给视障人使用）
3. 增加一个关闭按钮
```