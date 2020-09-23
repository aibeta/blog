# Css Flex

### flex box

display:flex; 让元素挨着排列，从左到右，都在一行，flex 外层容器就像display：block 一样填满可用空间。
flex 的 items 可能不会填满容器，它们都有相同的高度，由其内容决定。
display: inline-flex; 会创建一个flex 容器就先 inline-block，会和inline 元素一样，不会自动增加到100%宽度，基本不用它。

### main-axis

flex元素会在主轴上排成一行，从 main-left 到 main-right，相对的有 cross axis，也有 cross-start 和cross-end（用 start 和 end 来描述 axe 会好一点？）
flexbox 允许用 margin:auto; 来填满剩余空间，所以一个元素想排在最后面用 margin-left: auto; 就可以了

### flex: 2

等于 flex: 2 1 0%;就是下面的三个属性，1 和 0%是默认值

### flex-grow

2. flex-basis 为每个元素都计算完成后，相加得到一个宽度，这个宽度可能没有填满容器，剩下的空间会被 flex-grow 消耗，如果flex-grow是0，那么它在flex basis 的基础上就是0增长，任何非0的值，都会给它分配完剩余的空间。如果flex-basis是0，说明剩余的空间就是100%；（会减去区块之间的margin的）

### flex-shrink

2. 如果第一步计算完成后，总宽度超过了100%，就会有shrink 去指明是否需要某个元素进行收缩。如果是 flex-shrink:0，将不会收缩。所有非0的值会导致该元素一直收缩到不overflow，有更大的shrink 的值的会收缩的更多。

### flex-basis

为元素的 size 定义了开始点，可以被设置为任何适用与 width 的值，initial 是 auto，意味着先去看元素是否有 width 的声明，如果有，就是用那个 size，如果没有，那么size 就由自己的content 决定，这意味这如果元素定义了flex-basis那么width 就会被忽略。一旦每个flex item的initial main size 确定了，才会去使用上面两个属性。

### flex-direction

- 应用于 flex-container，initial value：row，
- 还有 column/row-reverse/column-reverse

注意：css里height 是有content决定的，这一点并不会随着旋转有何改变。
通常 block 的宽度是100%，但是input 例外，它的宽度由html 的 size 属性决定，也可以给他设置一个 width 属性

### aign-self

- 控制 在cross axis 上的排列，和 align-items 类似，除了它让你去每次只影响一个元素
- 设置为auto，就会使用 container 的 align-items 的值，flex-start/flex-end/center/stretch/baseline

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be77b6ab-3d4c-4f44-bb6e-7b81818b72fb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be77b6ab-3d4c-4f44-bb6e-7b81818b72fb/Untitled.png) -->

```
.login-form 
input:not([type=checkbox]):not([type=radio]) {        2
  display: block;
  width: 100%;
  margin-top: 0;
}
```

<!-- ### flex-warp

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4167f14a-2c7b-4e60-96c3-cb854ab061f2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4167f14a-2c7b-4e60-96c3-cb854ab061f2/Untitled.png)

### flex-flow 缩写 <flex-direction><flex-wrap>

### justify-content：在main axis 上如何排列

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f628a74-a84b-4605-b5d4-e4290a5b8226/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f628a74-a84b-4605-b5d4-e4290a5b8226/Untitled.png)

### align-items：在cross axis 上如何排列

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/233fd00b-2c19-4f2f-a777-80c633f49744/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/233fd00b-2c19-4f2f-a777-80c633f49744/Untitled.png)

### align-content: only work when flex-wrap

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70587764-e12e-4672-a1c1-6b0af5290fcc/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70587764-e12e-4672-a1c1-6b0af5290fcc/Untitled.png)

### flex-grow

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c344bc8b-60d7-4aa8-8a60-8a066af5aae2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c344bc8b-60d7-4aa8-8a60-8a066af5aae2/Untitled.png)

### slign-self

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6d833d7-15a9-4c40-a37e-e1c805ca270f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6d833d7-15a9-4c40-a37e-e1c805ca270f/Untitled.png) -->
