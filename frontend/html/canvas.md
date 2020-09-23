# Canvas

### 基本知识

1. 使用 ` <canvas id="canvas"/>` 创建
2. 使用 document.querySelectro('#canvas') 拿到元素
3. 使用 ctx = canvas.getContext(‘2d’) 获取上下文
4. 通过 [ctx.style](http://ctx.style) 来设置样式
5. 也可以通过 ctx.height 来设置高，此时不能带有 px ，在 vancas 标签上设置height 属性
6. 通过 ctx.fillStyle = 'red' 来设置画笔的颜色
7. 通过 ctx.fillRect() 来画出一个实心区域，strokeRect 画一个空心区域
8. canvas 一直是一个 image
9. canvas.toDataURL()  会把一个图片转换为base64

### 画一个矩形

1. 可以通过 ctx.beginPath() 开始，此时也可以 fillStyle
2. ctx.moveTo(70,70)
3. ctx.lineTo(10, 50)... ctx.lineTo(70, 70)
4. ctx.fill() 会画出图形，使用 stoke 只会画出一个外轮廓的线

### 画一个圆

1. ctx.beginPath() s
2. ctx.arc(200,200,250,0, 2*Math.PI); 设置可以画圆、半圆
3. ctx.fill() 也可以使用 stoke 画线

### 添加文本

1. ctx.font = '24px fantasy' 可以设置字体
2. ctx.fillText('hello', 20, 20) ，也可以使用 strokeText

### 在图片上画

1. 添加 img =  new Image();  img.src='...';
2. 监听load img.onload = function() {}
3. ctx.drawImage(img, 0, 0,60, 60 ) 在起点和终点画出图片
4. 也可以使用 toDataURL 把一个画出来的图片替换掉原来的 img src 属性

    ```jsx
    // 下载这个图片
    const link = document.createElement('a');
    link.setAttribute('download', 'watname.png');
    link.href = dataurl;
    link.click();
    ```

### 写一个简单drawer

html

```html
canvas#canvas(width="400" height="300");
button.save save
button.claer clear
input#penColor(type="color" value="#ffff00")a
input#penWidth(type="range" min="1" max="20" value="10")
```

```jsx
var $ = (name) => document.querySelector(name)
const canvas = $('#canvas');
const ctx = canvas.getContext('2d');
canvas.style.border = '1px solid black';
const penColor = $('#penColor');
const penWidth = $('#penWidth')
$('.save').addEventListener('click', saveImg);
$('.clear').addEventListener('click', clearImg);

const m = {draw:false, x:0, y:0, lastX:0, lastY:0};
canvas.addEventListener('mousemove', (e) => {
	m.lastX = m.x;
	m.lastY = m.y;
	m.x = e.x - canvas.offsetLeft;
	m.y = e.y - canvas.offsetTop;
	draw('move')
})
canvas.addEventListener('mousedown', (e) => {	draw('down')})
canvas.addEventListener('mouseup', (e) => { 	draw('up')})
canvas.addEventListener('mouseout', (e) => {	draw('up')})

function draw(val) {
	if(val === 'up')		{
		m.draw = false
	}
	if(val === 'down') {
		m.draw = true
	}
	if(m.draw) {
		ctx.beginPath();
		ctx.moveTo(m.latX, m.lastY);
		ctx.lineTo(m.x, m.y)
		ctx.strokeStyle = penColor.value;
		ctx.lineWidth = penWidth.value;
		ctx.stoke();
		ctx.closePath();
	}
}

function saveImg() {
const dataURL = canvas.toDataURL();
const link = document.createElement('a');
document.body.appendChild(link);
link.setAttribute('download', 'watname.png');
link.href = dataurl;
link.click();
document.body.removeChild(link);
}
function clearImg() {
	let temp = confirm('confirm clear?')
	if(!temp) return;
	ctx.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
}

```

### reference

- [https://learning.oreilly.com/videos/learn-html5-canvas/9781838982706/9781838982706-video1_6](https://learning.oreilly.com/videos/learn-html5-canvas/9781838982706/9781838982706-video1_6)