# Mixin Function Css Lib

### mixin

- 只能和 react.createClass 搭配使用，类不能使用。
- mixin 的一种用法：一次编写，在不同组件中共享，比如 resize 事件。
- mixin 可以定义为对象字面量，和组件拥有同样的属性和方法。
- 如果要在组件中使用mixin,只要将它放入对象的mixin数组中

### Styled Component

使用标签模板字面量，支持sass，less 等

```jsx
const Button = styled.button` 
background-color: #ff0000; 
width: 320px;
padding: 20px;
 border-radius: 5px; 
border: none;
  outline: none;
  &:hover {
    color: #fff;
  }
  &:active {
    position: relative;
    top: 2px;
}
`
```

### CSS 模块

CSS in JS

### CSS loader

css-loader 允许在 js 中导入css 文件

```css
// 会写入全局
.global .button {}

.red {
	color: red;
}

// 组合，很有用
.button {
	compose: red;
}
```

### style-loader

接收 css 模块转换的结果，并将样式注入页面头部

### 原子级CSS

也叫函数式CSS，可以利用 compose

### lib

- [condition](https://www.notion.so/eslint-plugin-react-8e081c1bc6274e309352b070341e1bf9)
    - renderif renderonlyif jsx-control-statement
- [eslint-plugin-react](https://www.notion.so/eslint-plugin-react-8e081c1bc6274e309352b070341e1bf9)
    - 检查 react 组件的风格

- [react-docgen](https://www.notion.so/react-docgen-821444db29944c948b06e75454d2a45b)
    - 根据 prop 类型自动为组件生成文档
- [react-storybook](https://www.notion.so/react-storybook-bb231f4e94634795b5797f08e3b94fb6)
    - 跨团队合作
- [react-refetch](https://www.notion.so/react-refetch-c4332e6dcc9f4506922ed6be7ee58db6)
    - 利用 react-refetch 在组件中应用数据获取模式
- [react-jsonschema-form](https://www.notion.so/react-jsonschema-form-fe1ceb207fbe45cabb87da8acb0ab471)
    - 表单的自动创建
- react-addons-css-transition-group，
    - 用于创建动画
- [react-motion](https://www.notion.so/react-motion-a931b20e79c34939a781e6ce2f0ec945)
    - 动画
- [react-addons-perf](https://www.notion.so/react-addons-perf-641cbcf5b3e94974831867f14929cf66)
    - 插件，记录显示性能
- [why-did-you-update](https://www.notion.so/why-did-you-update-bac7ad8f8a8a43d3b8f764c0a8f812dd)
    - 优化
- [chrome-react-perf](https://www.notion.so/chrome-react-perf-35802b22b2574c42ac2d716056ca5486)
    - chrome 优化插件
- [react-addons-test-utils](https://www.notion.so/react-addons-test-utils-95340b712a3f4b4db44f8d71405a53b6)
- raect profiler
    - 性能分析