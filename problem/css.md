# css

### 怎么让 在一行的 flex 元素可以溢出. 

给子元素设置为：flex：0 0 auto;

### CSS: 图片在小米浏览器里，设置了auto height，但是却是一张铺满的图片

今天的一个移动端页面，在chrome浏览器手机模式预览下，有两张图因为只指定宽度，没有指定height而产生变形。调试了一番，终于发现: 父容器布局的样式 display: flex， align-items 属性。因为这个属性的默认值导致图片拉伸到容器高度：　　stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。而在火狐的手机模式下预览，就没有这个问题。不管怎么说，既然有这个潜在风险，那就再指定下弹性高度，或者设置 align-items 属性为center。

### 有border 和 没border 的两个元素同样大小? 

使用一个 border：transparent

### 浏览器中存在最小的显示字体，怎么突破最小的font-size 限制?

使用 transform ：scale

### 让很大一行的纯英文不要换行? 

加一个 word-wrap: break-all 就可以了

### 在flex 元素中的text 怎么居中，怎么居底? 

在div 中的文本其实也是一个行内元素，所以可以使用flex 布局：fxd-c jc-fe

### 让 fixed 的元素拥有 placeholder 使用了一个同等级的占位元素 因为似乎不能直接使用样式解决

### display: -webkit-box  是什么?

- 是flexbox 一个比较老版本的属性名称, 现在不推荐使用
- https://stackoverflow.com/questions/16653958/webkit-box-vs-boxflex

### CSS: 处理两行的ug离奇消失

### CSS: flex 元素一行有固定的几个

```css
a.parent
 section.child

.parent {
display: flex;
flex-wrap: wrap;
}
.child {
width: calc((100% - 10px)/3);
margin-right: 5px;
}
```

### css two line ellipsis?

```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
```