# Css Transform

transfrom 用于改变页面元素的形状和位置。包括在二维或三维下的变化，有以下几种值

- rotate 根据一个轴旋转一个特定的度数，单位 (30deg)
- translate 上下左右移动元素，单位(10px, 100px)
- scale 收缩或者扩展，单位(1.5)
- skew 改变元素形状，顶部朝一个反响移动，底部朝反方向移动

需要注意的是，变形不会改变元素在文档流中的位置。变形不能应用与 inline 元素，但可以用于 inline-block 元素，flex 元素，grid 元素。

### 改变变形起点

默认的起点是元素的中间，可以通过 `transform-origin` 属性来修改。有 top/right/bottom/left/ceter 五个关键词

```css
transform-origin: right center;
transform-origin: 100% 50%;
```

### 多个变形

可以为 `transform`属性设置多个值，用空格隔开，那么会连续变形，顺序是从右向左。

### svg (scalable vector graphics)

可伸缩的向量图，是基于XML的图像格式

- 相比 icon-font 更推荐 svg，性能和用途都更好一点
- 可以用于 img src 里面，也可以创建 svg 雪碧图
- 因为是基于 xml 的所以也可以写入行内
- 行内svg 可以允许动态改变颜色、位置、尺寸

### 与手势motion结合

使用一个例子，有以下功能

1. link hover 的时候放大 icon 的尺寸

    ```css
    .nav-links__icon {
      transition: transform 0.2s ease-out;     
    }
    .nav-links a:hover > .nav-links__icon,
    .nav-links a:focus > .nav-links__icon {
      transform: scale(1.3);                   
    }
    ```

2. 隐藏 link 的 labels，当鼠标在菜单悬停时 fade-in 出现
3. 在 fade-in 的时候，增加一个 fly-in 效果

    ```css
    .nav-links__label {
      display: inline-block;                                        1
      margin-left: 1em;
      padding-right: 1em;
      opacity: 0;                                                   2
      transform: translate(-1em);                                   3
      transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.3),  4
                  opacity 0.4s linear;                              4
    }
    .nav-links:hover .nav-links__label,                             5
    .nav-links a:focus > .nav-links__label {                        5
      opacity: 1;                                                   5
      transform: translate(0);                                      5
    }
    1 Makes the label an inline-block so transforms can be applied to it
    2 Hides the label initially
    3 Shifts the label 1 em to the left
    4 Adds transitions to the values that will change
    5 On hover or focus, makes the label visible and shifts it back to its correct position
    ```

    注意5里面加的focus 会让用户按 tab 的时候也生效。

    隐藏的时候，label 被 translate 变化到左边 1em，然后变化到真实的位置。自定义的贝塞尔曲线有一个弹力(bounce) 的效果。效果很快，可以减慢动画速度来看。

4. 增加一个交错的效果，使用 `translate-delay`实现一个缓慢的波浪的感觉

    ```css
    .nav-links:hover .nav-links__label,
    .nav-links a:focus > .nav-links__label {
      opacity: 1;
      transform: translate(0);
    }
    .nav-links > li:nth-child(2) .nav-links__label {           1
      transition-delay: 0.1s;                                  2
    }
    .nav-links > li:nth-child(3) .nav-links__label {           3
      transition-delay: 0.2s;                                  4
    }
    .nav-links > li:nth-child(4) .nav-links__label {           5
      transition-delay: 0.3s;
    }
    .nav-links > li:nth-child(5) .nav-links__label {           5
      transition-delay: 0.4s;
    }
    1 Targets the second menu item label
    2 Delays its transition by one tenth of a second
    3 Targets the third menu item label
    4 Delays its transition by two tenths of a second
    5 Repeat as many times as needed
    ```

### 性能

我们也可以通过改变元素宽高和放大元素，但是会存在性能问题。浏览器把样式表转换为像素，可以分为三部分：布局、绘制、组合

1. 布局 layer
    - 浏览器会计算每个元素在屏幕上占用的空间
    - 由于文档流的存在，一个元素的大小和位置会影响相邻元素，所以这个阶段会计算所有的元素
    - 任何时候改变元素宽高，以及调整位置(如top，left等)，元素的布局都需要重新计算
    - JS 插入或者移除元素也会导致重新计算
    - 当布局发生改变时，浏览器必须 reflow 页面，重新计算布局
2. 绘制
    - 布局接收后会开始绘制像素，比如画上文本，绘制图片、边框、阴影，上色等
    - 这一阶段不是物理地画到屏幕上，而是先放入内存，一部分页面被绘制到布局上。
    - 如果改变一个元素的背景色，那么会导致 repaint，但是不需要去重新计算布局
    - 在正确的条件下， 页面的元素可以提升自己的 layer 上，这个时候，它的绘制就会和其他的layer 分开
    - 浏览器可以把这个layer发送给GPU来渲染，和另外的 CPU 渲染的 main layer 区分开来，这也被称为硬件加速
3. 组合
    - 在组合阶段，浏览器把所有已经绘制完成的layer 画成最后的图片，此时会按一定的顺序，去正确地绘制
    - 对于上面例子的 opacity 或 transform 改变时，浏览器会将元素提升到一个自己的绘制层，然后使用 GPU 加速，而main layer 不会变化，也不re-paint
    - 如果需要自定义提升一个 layer，需要使用 will-change 属性，但是除非真正遇到性能问题，不要使用它。

### 3D 变化

rotation 和 translation 可以用于三维：X、Y、Z，下面代码等同。

```css
transform: translate(15px, 50px, 10px);
transform: translateX(15px) translateY(50px) translateZ(50px);
```

在为页面增加3D变化时，需要先指定一个Perspective

### Perspective

可以把它看作是 camera 和 scene 之间的距离。如果 camera 很近，那么3D效果就很强，很远则很弱。使用方法两个

1. 在 transform 里面使用 perspective()
2. 使用 perspective 属性

这两个用法之间有一点区别。

### 扩展阅读

- [https://learning.oreilly.com/library/view/css-in-depth/9781617293450/kindle_split_026.html](https://learning.oreilly.com/library/view/css-in-depth/9781617293450/kindle_split_026.html)
- [https://davidwalsh.name/3d-transforms](https://davidwalsh.name/3d-transforms)