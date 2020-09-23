# Css Collapse

## 外边距塌陷

- 当top 和 bottom 重叠的时候，就会发生合并，合并为宽的那个
- p 标签有默认的1em 的top margin，即使把p放入div 里，也是一样的
- 任何临近的元素都会发生合并

### 解决塌陷

- 使用 flexbox
- 添加padding 或者border
- container 如果是浮动的，inline-block 或者 absolute 和 fixed position 的
- overflow：auto 或者任何不是 visible 的给container（不推荐）
- text-transform: uppercase;

## BFC

BFC 是页面的一个区域，是环绕文档流的一部分，但是把自己的内容和外部的上下文隔离了，隔离做了3点。

1. BFC 包括了 top 和 bottom 的 margin，不会与BFC外部元素发生合并
2. BFC包括了内部的所有浮动元素
3. 它不与BFC 外部的浮动元素重叠

简单说，BFC内部的内容不会和外部元素重叠，如果对一个元素清除浮动，那么它只在当前BFC内部清除浮动；如果强制一个元素拥有BFC，那么它不会和其他的BFC 重叠；页面的root元素也会自动创建一个顶级的BFC

### 触发方式

- float(except none)
- overflow(except: visible)
- postion(fixed,absolute)
- display(inline-block, table-cell, table-caption, flex,inline-flex, grid, inline-grid)所谓块容器

## float

float 会把一个元素（如 img）放在它容器的一侧，允许文档流包裹它，在报纸和杂志上非常常见
floated 元素会被移出文档流，放在容器的边缘，但是文档流会空出这个元素的位置

- 如果有多个元素浮动，那么它们会从左开始排列
- 和普通元素不同，floated 元素的高度不会加到父级元素里，这样如果父级元素本身的高度不够高，floated 元素就会溢出
- 为了解决溢出的问题，在父级 continer 的最后加一个空div 属性 clear:both;这个属性的意思是让该元素移动到floated 元素的底部

注意：浮动元素的 margin 不会造成和容器的合并，但是普通元素会。
如果 floated 的元素不一样高，那么它们的排列可能会不按预期，这时可以用对奇数元素清除左侧浮动来解决

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68734288-59d7-47bf-a433-3e8a425c66da/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68734288-59d7-47bf-a433-3e8a425c66da/Untitled.png) -->

```jsx
.media {
  float: left;
  width: 50%;
  padding: 1.5em;
  background-color: #eee;
  border-radius: 0.5em;
}

.media:nth-child(odd) {       1
  clear: left;                1
}
```

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c0136cb-ad64-4349-abd8-408788c54c3d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c0136cb-ad64-4349-abd8-408788c54c3d/Untitled.png) -->