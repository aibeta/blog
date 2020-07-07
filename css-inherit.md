# Css Inherit

## 继承

如果一个元素的某个属性没有瀑布值，那么他可以从祖先继承一个，比如给body 设置一个 font-size，继承可以给子孙元素，直到遇到一个瀑布值。

### text 继承

- color,
- font, font-family, font-size, font-weight, font-variant, font-style,
- line-height, letter-spacing,
- text-align, text-indent, text-transform, white-space, and word-spacing

### list 继承

- list-style, list-style -type, list-style-position, and list-style-image

### table 继承

- border-collapse
- border-spacing

### inherit 关键词

可以继承颜色什么的，比较少用

### initial 关键词

每个属性都有一个initial 或者default，设置为它的默认值

对于 width/padding/border-width auto也是initial，display: initial 等于 inline