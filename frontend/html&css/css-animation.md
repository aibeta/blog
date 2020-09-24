# Css Animation

### keyframe

keyframe 是一个动画中特定的点，我们定义一系列 keyframes，浏览器会填充他们之间点 frames，形成动画。

transition 从概念上和 keyframe 动画是相似点，只是定义了首帧和末帧，浏览器计算了所有的中间值。

Animation 在css 中包括两部分：@keyframe 规则，和 animation 属性。

### animation 属性

```css
animation: over-back 1.5s linear 3;
@keyframes over-and-back {                 
  0% {
    background-color: hsl(0, 50%, 50%);    
    transform: translate(0);               
  }

  50% {                                    
    transform: translate(50px);
  }

  100% {                                   
    background-color: hsl(270, 50%, 90%);  
    transform: translate(0);               
  }                                        
}
```

是一个缩写，包含以下一些属性

1. animation-name 
2. animation-duration 报名动画持续多长时间，可以是s 或 ms
3. animation-timing-function 和 transition 的贝塞尔曲线相同
4. animation-iteration-count 表明动画次数，默认是1，可以设置为 infinite

一些注意点

- 形成动画的属性，不一定在每帧里出现。
- 形成动画的属性，会覆盖任何其他地方的样式，忽略选择器优先级。

### 3D animation

对于一个响应式的 grid 列表，

```html
main.flyin-grid
  .flyin-grid__item.card
    img(src="images/chicken1.jpg" alt="a chicken")
    h4 Mrs. Featherstone
    p She....
	*3 times repeat 
```

第一步先写移动屏幕上样式

```css
/* 在移动屏幕上 */
.flyin-grid {
  margin: 0 1rem;                                    
}

.card {
  margin-bottom: 1em;
  padding: 0.5em;                                    
  background-color: white;                           
  color: hsl(210, 15%, 20%);                         
  box-shadow: 0.2em 0.5em 1em rgba(0, 0, 0, 0.3);    
}
.card > img {
  width: 100%;                                       
}
```

然后增加屏幕的宽度

```css
@media (min-width: 30em) {         
  .flyin-grid {
    display: flex;                 
    flex-wrap: wrap;               
    margin: 0 5rem;                
  }

  .flyin-grid__item {
    flex: 1 1 300px;               
    margin-left: 0.5em;
    margin-right: 0.5em;
    max-width: 600px;
  }
}
```

flexbox 的一个问题是两行列表数量不一样的时候会有问题。

然后增加支持 grid 时候的样式，会确保每一个元素都是同样的宽度。

```css
@media (min-width: 30em) {         
	.flyin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));   
    grid-gap: 2em;
  }

  .flyin-grid__item {
    max-width: initial;
    margin: 0;                                                     
  }
}
```

给上面的几个卡片增加一个 fly-in 效果，注意动画也可以通过 animation-delay 延迟播放，就像 transition-delay 一样。

```css
.flyin-grid {
  margin: 0 1rem;
  perspective: 500px;                               1
}

.flyin-grid__item {
  animation: fly-in 600ms ease-in;                  2
}

@keyframes fly-in {
  0% {
    transform: translateZ(-800px) rotateY(90deg);   3
    opacity: 0;
  }
  56% {
    transform: translateZ(-160px) rotateY(87deg);   4
    opacity: 1;
  }
  100% {
    transform: translateZ(0) rotateY(0);            5
  }
}
```

我们想让元素在不播放动画的时候也处于 0% keyframe 的位置，就需要使用 `animation-fill-mode`属性，让浏览器去拿 keyframe的属性，应用到元素上。

1. none 默认值
2. backwards 使用首帧的 animation 填充播放前
3. forwards 使用尾桢的 animation 填充播放后
4. both 综合2和3

### 一个按钮 spin 指示器的实现

此处使用 position 进行居中。

```css
button.is-loading {
  position: relative;
  color: transparent;                     1
}
button.is-loading::after {
  position: absolute;
  content: "";
  display: block;
  width: 1.4em;
  height: 1.4em;
  top: 50%;                               2
  left: 50%;                              2
  margin-left: -0.7em;                    2
  margin-top: -0.7em;                     2
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;   3
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);            4
  }
}
```

### 相关网站

- [https://animista.net/](https://animista.net/play/background/ken-burns/kenburns-top-left)
- [https://developer.mozilla.org/en-US/docs/Web/API/Animation](https://developer.mozilla.org/en-US/docs/Web/API/Animation)