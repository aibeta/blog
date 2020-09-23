# Css Selector

### +

只作用于那个跟在别人后面的元素，而不会影响第一个元素

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0b7bd70-53b5-4a4c-aa1e-f5df62d1c710/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0b7bd70-53b5-4a4c-aa1e-f5df62d1c710/Untitled.png) -->

```jsx
.button-link + .button-link {     1
  margin-top: 1.5em;              1
}
```

### >

 .site-nav > li + li { margin-left: 1.5em;} .site-nav > .nav-right { margin-left: auto; 2}

### lobotomized owl selector

* + *，以这个符号的视觉效果而命名，用于适用兄弟元素的间隔问题

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c527ba5-1d45-4a18-96ce-7fa301cb5e5e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c527ba5-1d45-4a18-96ce-7fa301cb5e5e/Untitled.png) -->

```jsx
body * + * {
  margin-top: 1.5em;
}
```

这会把sidebar 里面的每一项都均匀分配间隔

[https://codepen.io/ibeta/pen/poJxZdo](https://codepen.io/ibeta/pen/poJxZdo)