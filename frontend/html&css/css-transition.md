# Css Transition

### transition

它是一个缩写，需要把它应用在目标元素的选择器，而不能是发生变化的选择器。 从前到后依次是四个属性：

### `transition-property`

它指定哪个属性进行变化，也可以是 `all`

可以应用的属性

- color、background-color
- font-size、border

### `transition-duration`

必须指定单位是 s/ms ，否则是一个无效的值

### `transition-timing-function`

默认支持 `liner`, `ease`,`ease-in`, `ease-out`,`ease-in-out`

timing-function 是基于贝塞尔曲线的函数，可以自定义为 `cubic-bezier(0.45, 0.05, 0.55, 0.95)` ，这样的值。

还有一个steps 值，可以让它进行不连续的变化

### `transition-delay`

对于显示和隐藏一个区域，除了改变它的透明度，我们还需要设置它的 visibility，这个属性可以应用于 `transition-delay`

此外，我们在变换一个元素的高度时，是不能从 0 到 auto的，因此必须通过 js 去获取元素的 scrollHeight，并赋值给该元素。

[https://codepen.io/ibeta/pen/MWavvNY](https://codepen.io/ibeta/pen/MWavvNY)