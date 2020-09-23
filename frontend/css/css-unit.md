# Css Unit

### 绝对 unit

- px，
- mm，cm，
- in，
- pt（ 印刷术语 1/72nd of an inch），
- pc（pica，12poinits印刷术语）
- 1 in = 25.4mm = 2.54cm = 6pc = 72pt = 96px;

### em

- css 里 1em 相当于当前元素的font-size
- 如果是 font-size: 1.2em; 此时的基础 font-size: inherited;，出现这样的情况的时候，浏览器器计算完font-size，才会去去计算其他属性里面的em

### 计算值

浏览器会根据相对单位计算出绝对值

### em 使用场景

比如 padding height width border-radius 会去适应font-size

### rem

1rem 相当于 html 标签的font-size

- rem 用于字体，
- px：border，
- em：padding， margin，border-raduis

设置页面默认字体14px :root {font-size: .875em}

### 相对unit

vh，vw，vmin，vmax(which of the two(height width) is larger)

### calc

:root { font-size: calc(0.5em + 1vw); }

### 无单位unit

- line-height（其实是em？）
- z-index
- font-weight

### 设置页面默认字体为14px

```css
:root {                            1
  font-size: 0.75em;               1
}                                  1

@media (min-width: 800px) {        2
  :root {                          2
    font-size: 0.875em;            2
  }                                2
}                                  2

@media (min-width: 1200px) {       3
  :root {                          3
    font-size: 1em;                3
  }                                3
}
```