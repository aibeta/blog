# Css Abrevation

```css
.title {
  font-style: normal;          1
  font-variant: normal;        1
  font-weight: normal;         1
  font-stretch: normal;        1
  line-height: normal;         1
  font-size: 32px;
  font-family: Helvetica, Arial, sans-serif;
}

// border缩写 里面的顺序无所谓
// border-width 就不行
```

如果使用缩写属性，那么你未指明的那些属性就会被设置为initial，如果你在别处有它的样式，则可能会被覆盖。

- font
- background
- border
- border-width

### TRouBLe 原则

```css
padding: 1em 2em;
padding: 1em 2em 1em;
padding: 1em 2em 1em 2em; 
/* 完全相同 */
padding: 1em;
padding: 1em 1em;
padding: 1em 1em 1em;
padding: 1em 1em 1em 1em;
/* 完全相同 */
```