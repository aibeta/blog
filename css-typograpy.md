# Css Typograpy

有三个网站 typekit/webtype/googlefont

### serif

就是有foot 的字体,sans-serif 是无 foot 字体

### @font-face

```css
/* 可以使用local 尝试本地字体 */
@font-face {
	src: local('Sansita')
}
```

### line-height

initial: normal 大约1.2 相对于font的em value，理想的是 1.4-1.6，可以把 body 的行高设置为1.4

### letter-spacing

最好也用 em 单位，比如0.01em

### 字符对齐

[https://codepen.io/ibeta/pen/PoqxZrZ](https://codepen.io/ibeta/pen/PoqxZrZ)

这个有 .7 避免不对齐

### flash of instyled text

[https://fontfaceobserver.com/](https://fontfaceobserver.com/)