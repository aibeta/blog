# Css Cascade

## 瀑布流

包括一系列的规则以解决冲突，有三个样式规则：1.来源，2.选择器，3.顺序。

### 瀑布值

我们说一个声明称为 cascaded value，就是说在以下几个规则下胜出

1. 样式来源
    1. 浏览器默认样式，h1 p ,等，优先级最低
    2. important>行内样式>style 标签样式>样式文件
2. 选择器
    - 选择器优先级：I>C>T ，伪类 :hover 和属性 [type="input"]选择器 和 C 相同
3. 顺序
    - 如果以上原则相同，那么要看样式的前后顺序

### a 链接设置颜色时的优先级可以使用 LoVe/HAte  记忆

- link, visited, hover, active

### 两个原则

尽量不用id，不用 important

### 文档流

Normal document flow refers to the default layout behavior of elements on the page. Inline elements flow along with the text of the page, from left to right, line wrapping when they reach the edge of their container. Block-level elements fall on individual lines, with a line break above and below.

## overflow

- 给元素设置高度就可能溢出：visible/hidden/scroll/auto(when need add scroll bar )
- 给元素的高度设置百分比是有问题的，因为百分比和容器的高度有关，而容器的高度是由内部的子元素的高度确定的，浏览器没法确定环状的高度，所以就忽略这个百分比的高度
- 如果百分比的高度有效，那么父元素必需有精确的高度值
- 如果要让container 全屏，那么应该使用 100vh

## 盒模型

默认的 box-sizing: content-box，意思是设置的height width 只应用于 content，我们可以设置为border-box，那么宽和高就应用于 border padding 和 content

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f7205e0-51a0-4c1e-822f-44babf2d44eb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f7205e0-51a0-4c1e-822f-44babf2d44eb/Untitled.png) -->

### boder-box

```css
*,::before,::after { 
box-sizing: border-box; 
}
/* 如果有引入第三方的css，那么要小心可能有影响 */

/* 第三方库的解决方案 */

:root {
  box-sizing: border-box;           1
}

*,
::before,
::after {
  box-sizing: inherit;              2
}

.third-party-component {
  box-sizing: content-box;
}
```

### block元素和inline元素

block 元素有两个特点，占用所有可用宽度，以及让后面的元素属于下一行 div p h table ul

行内元素则只是占用需要的宽度，不换行。如i span img input textarea，注意行内元素不能设置 width mt mb

inline-block 元素则是综合了inline和block，不换行，只占用需要宽度，可以设置mt mb

### 文本

text 的 imdent align 只用于块儿级元素。

text-align 在css3默认值变成了 start，因为arabic 是从右向左的。有一个 justify 的值，用于印刷多一点

### 响应式设计

三个原则：1. 移动优先，先有移动版本 2. @media rule 3. 使用 fluied layouts，这个让容器根据viewport 自己伸缩

### 移动优先

先设定移动网站，好了之后渐进增加宽屏的设备，移动端的设计主要在于内容，多种尺寸的屏幕使用同一套 html 代码